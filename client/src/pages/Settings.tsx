import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/hooks/useTranslation';

interface SettingsFormData {
  dateRangeDefault: string;
  enableRtlSupport: boolean;
  enableNotifications: boolean;
  refreshInterval: number;
  chartsTheme: string;
  defaultPage: string;
}

export default function Settings() {
  const { toast } = useToast();
  const { language, setLanguage, direction, setDirection } = useLanguage();
  const { t } = useTranslation();
  
  // Default settings from WordPress global
  const wpSettings = (window as any).LDBB_ANALYTICS?.settings || {
    date_range_default: 'month',
    enable_rtl_support: false,
    enable_notifications: true,
    refresh_interval: 5,
    charts_theme: 'light',
    default_page: 'dashboard'
  };
  
  const [settings, setSettings] = useState<SettingsFormData>({
    dateRangeDefault: wpSettings.date_range_default,
    enableRtlSupport: wpSettings.enable_rtl_support,
    enableNotifications: wpSettings.enable_notifications,
    refreshInterval: wpSettings.refresh_interval,
    chartsTheme: wpSettings.charts_theme,
    defaultPage: wpSettings.default_page
  });
  
  // Update direction when RTL setting changes
  useEffect(() => {
    // If language is Hebrew, force RTL
    if (language === 'he') {
      setDirection('rtl');
    } else {
      // Otherwise respect the setting
      setDirection(settings.enableRtlSupport ? 'rtl' : 'ltr');
    }
  }, [settings.enableRtlSupport, language, setDirection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Format the data for WordPress settings API
      const formattedData = {
        date_range_default: settings.dateRangeDefault,
        enable_rtl_support: settings.enableRtlSupport,
        enable_notifications: settings.enableNotifications,
        refresh_interval: settings.refreshInterval,
        charts_theme: settings.chartsTheme,
        default_page: settings.defaultPage
      };
      
      // Use the WordPress API client to save settings
      if ((window as any).LDBB_ANALYTICS?.apiRequest) {
        await (window as any).LDBB_ANALYTICS.apiRequest('settings', 'POST', formattedData);
        
        toast({
          title: t('settings.savedSuccess'),
          description: t('settings.settingsSavedDescription'),
          variant: "default",
        });
      } else {
        // Fallback to native form submission if API not available
        console.warn('WordPress API client not available. Settings will be saved by the native form.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: t('settings.saveError'),
        description: t('settings.settingsSaveErrorDescription'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4" dir={direction}>
      <h2 className="text-3xl font-bold mb-6">{t('settings.title')}</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">{t('settings.tabs.general')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('settings.tabs.appearance')}</TabsTrigger>
          <TabsTrigger value="advanced">{t('settings.tabs.advanced')}</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.generalSettings')}</CardTitle>
                <CardDescription>{t('settings.generalDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultPage">{t('settings.defaultPage')}</Label>
                  <Select
                    value={settings.defaultPage}
                    onValueChange={(value) => setSettings({...settings, defaultPage: value})}
                  >
                    <SelectTrigger id="defaultPage">
                      <SelectValue placeholder={t('settings.selectDefaultPage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">{t('nav.dashboard')}</SelectItem>
                      <SelectItem value="courses">{t('nav.courses')}</SelectItem>
                      <SelectItem value="users">{t('nav.users')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateRangeDefault">{t('settings.defaultDateRange')}</Label>
                  <Select
                    value={settings.dateRangeDefault}
                    onValueChange={(value) => setSettings({...settings, dateRangeDefault: value})}
                  >
                    <SelectTrigger id="dateRangeDefault">
                      <SelectValue placeholder={t('settings.selectDateRange')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">{t('dateRange.week')}</SelectItem>
                      <SelectItem value="month">{t('dateRange.month')}</SelectItem>
                      <SelectItem value="quarter">{t('dateRange.quarter')}</SelectItem>
                      <SelectItem value="year">{t('dateRange.year')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableNotifications">{t('settings.enableNotifications')}</Label>
                  <Switch
                    id="enableNotifications"
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.appearanceSettings')}</CardTitle>
                <CardDescription>{t('settings.appearanceDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="chartsTheme">{t('settings.chartsTheme')}</Label>
                  <Select
                    value={settings.chartsTheme}
                    onValueChange={(value) => setSettings({...settings, chartsTheme: value})}
                  >
                    <SelectTrigger id="chartsTheme">
                      <SelectValue placeholder={t('settings.selectTheme')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t('theme.light')}</SelectItem>
                      <SelectItem value="dark">{t('theme.dark')}</SelectItem>
                      <SelectItem value="auto">{t('theme.auto')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableRtlSupport">{t('settings.enableRtl')}</Label>
                    <p className="text-sm text-muted-foreground">{t('settings.rtlDescription')}</p>
                  </div>
                  <Switch
                    id="enableRtlSupport"
                    checked={settings.enableRtlSupport}
                    onCheckedChange={(checked) => setSettings({...settings, enableRtlSupport: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">{t('settings.language')}</Label>
                  <Select
                    value={language}
                    onValueChange={(value) => setLanguage(value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder={t('settings.selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="he">עברית (Hebrew)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.advancedSettings')}</CardTitle>
                <CardDescription>{t('settings.advancedDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">{t('settings.refreshInterval')}</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="refreshInterval"
                      type="number"
                      min="1"
                      max="60"
                      value={settings.refreshInterval}
                      onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value) || 5})}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">{t('settings.minutes')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('settings.refreshIntervalDescription')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <div className="mt-6 flex justify-end">
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              {t('settings.saveChanges')}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}