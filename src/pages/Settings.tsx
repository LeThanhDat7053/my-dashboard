import React, { useState, useEffect } from 'react';
import '../styles/settings.css';

// Interfaces for type safety
interface GeneralSettings {
  propertyName: string;
  propertyCode: string;
  propertySlogan: string;
  propertyDescription: string;
}

interface BrandingSettings {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  copyrightText: string;
  termsUrl: string;
  privacyUrl: string;
}

interface LocalizationSettings {
  defaultLanguage: string;
  fallbackLanguage: string;
  supportedLanguages: string[];
  timezone: string;
  dateFormat: string;
}

interface ContactSettings {
  address: string;
  district: string;
  city: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  googleMapUrl: string;
  phoneNumber: string;
  emailAddress: string;
  websiteUrl: string;
  zaloOaId: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
}

interface AdvancedSettings {
  introVideoUrl: string;
  vr360Url: string;
  bannerImages: string;
  autoLanguageDetection: boolean;
  analyticsTracking: boolean;
  cacheSystem: boolean;
  propertyActive: boolean;
}

interface AllSettings {
  general: GeneralSettings;
  branding: BrandingSettings;
  localization: LocalizationSettings;
  contact: ContactSettings;
  advanced: AdvancedSettings;
}

interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

interface NavItem {
  href: string;
  icon: string;
  text: string;
  isActive?: boolean;
  isLogout?: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Form states
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    propertyName: 'Tabi Tower Hotel',
    propertyCode: 'tabi-tower',
    propertySlogan: '',
    propertyDescription: ''
  });

  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    logoUrl: '',
    copyrightText: '',
    termsUrl: '',
    privacyUrl: ''
  });

  const [localizationSettings, setLocalizationSettings] = useState<LocalizationSettings>({
    defaultLanguage: 'en',
    fallbackLanguage: 'en',
    supportedLanguages: ['en', 'vi'],
    timezone: 'Asia/Tokyo',
    dateFormat: 'YYYY-MM-DD'
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    address: '3-1-6 Mita, Minato, Tokyo 108-0068',
    district: 'Minato',
    city: 'Tokyo',
    country: 'Japan',
    postalCode: '108-0068',
    latitude: '',
    longitude: '',
    googleMapUrl: '',
    phoneNumber: '',
    emailAddress: '',
    websiteUrl: '',
    zaloOaId: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    tiktokUrl: ''
  });

  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>({
    introVideoUrl: '',
    vr360Url: '',
    bannerImages: '',
    autoLanguageDetection: true,
    analyticsTracking: true,
    cacheSystem: true,
    propertyActive: true
  });

  const languages: Language[] = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' }
  ];

  const navItems: NavItem[] = [
    { href: '/', icon: 'fas fa-home', text: 'Dashboard' },
    { href: '/categories', icon: 'fas fa-layer-group', text: 'Categories' },
    { href: '/features', icon: 'fas fa-puzzle-piece', text: 'Features' },
    { href: '/properties', icon: 'fas fa-building', text: 'Properties' }
  ];

  const contentNavItems: NavItem[] = [
    { href: '/media', icon: 'fas fa-images', text: 'Media Library' },
    { href: '/analytics', icon: 'fas fa-chart-bar', text: 'Analytics' }
  ];

  const managementNavItems: NavItem[] = [
    { href: '/users', icon: 'fas fa-users', text: 'Users & Roles' }, // ← SỬA THÀNH /users
    { href: '/settings', icon: 'fas fa-cog', text: 'Settings', isActive: true },
    { href: '/login', icon: 'fas fa-sign-out-alt', text: 'Logout', isLogout: true }
  ];

  const tabs = [
    { id: 'general', icon: 'fas fa-cog', text: 'General' },
    { id: 'branding', icon: 'fas fa-palette', text: 'Branding' },
    { id: 'localization', icon: 'fas fa-globe', text: 'Localization' },
    { id: 'contact', icon: 'fas fa-address-card', text: 'Contact Info' },
    { id: 'advanced', icon: 'fas fa-sliders-h', text: 'Advanced' }
  ];

  const timezoneOptions = [
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
    { value: 'Asia/Ho_Chi_Minh', label: 'Asia/Ho Chi Minh (GMT+7)' },
    { value: 'Asia/Seoul', label: 'Asia/Seoul (GMT+9)' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai (GMT+8)' },
    { value: 'UTC', label: 'UTC (GMT+0)' },
    { value: 'America/New_York', label: 'America/New York (GMT-5)' },
    { value: 'Europe/London', label: 'Europe/London (GMT+0)' }
  ];

  const dateFormatOptions = [
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2024-03-15)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (15/03/2024)' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (03/15/2024)' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY (15-03-2024)' }
  ];

  // Auto-save functionality
  const handleAutoSave = (field: string, value: any) => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    const timeout = setTimeout(() => {
      console.log('Auto-saving...', field, value);
    }, 2000);
    setAutoSaveTimeout(timeout);
  };

  // Show success message
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Handle language selection
  const handleLanguageToggle = (languageCode: string) => {
    const newSupportedLanguages = localizationSettings.supportedLanguages.includes(languageCode)
      ? localizationSettings.supportedLanguages.filter(lang => lang !== languageCode)
      : [...localizationSettings.supportedLanguages, languageCode];
    
    setLocalizationSettings(prev => ({
      ...prev,
      supportedLanguages: newSupportedLanguages
    }));
  };

  // Handle color changes
  const handleColorChange = (colorType: 'primary' | 'secondary', color: string) => {
    setBrandingSettings(prev => ({
      ...prev,
      [colorType === 'primary' ? 'primaryColor' : 'secondaryColor']: color
    }));
  };

  // Handle toggle switches
  const handleToggle = (setting: keyof AdvancedSettings) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Save all settings
  const saveAllSettings = () => {
    const allSettings: AllSettings = {
      general: generalSettings,
      branding: brandingSettings,
      localization: localizationSettings,
      contact: contactSettings,
      advanced: advancedSettings
    };
    
    console.log('All settings:', allSettings);
    showSuccess('All settings saved successfully!');
    // In real implementation, send data to server
  };

  // Reset settings
  const resetSettings = (section: string) => {
    if (window.confirm('Are you sure you want to reset these settings?')) {
      switch (section) {
        case 'general':
          setGeneralSettings({
            propertyName: 'Tabi Tower Hotel',
            propertyCode: 'tabi-tower',
            propertySlogan: '',
            propertyDescription: ''
          });
          break;
        case 'branding':
          setBrandingSettings({
            primaryColor: '#3b82f6',
            secondaryColor: '#64748b',
            logoUrl: '',
            copyrightText: '',
            termsUrl: '',
            privacyUrl: ''
          });
          break;
        case 'localization':
          setLocalizationSettings({
            defaultLanguage: 'en',
            fallbackLanguage: 'en',
            supportedLanguages: ['en', 'vi'],
            timezone: 'Asia/Tokyo',
            dateFormat: 'YYYY-MM-DD'
          });
          break;
        case 'contact':
          setContactSettings({
            address: '3-1-6 Mita, Minato, Tokyo 108-0068',
            district: 'Minato',
            city: 'Tokyo',
            country: 'Japan',
            postalCode: '108-0068',
            latitude: '',
            longitude: '',
            googleMapUrl: '',
            phoneNumber: '',
            emailAddress: '',
            websiteUrl: '',
            zaloOaId: '',
            facebookUrl: '',
            instagramUrl: '',
            youtubeUrl: '',
            tiktokUrl: ''
          });
          break;
        case 'advanced':
          setAdvancedSettings({
            introVideoUrl: '',
            vr360Url: '',
            bannerImages: '',
            autoLanguageDetection: true,
            analyticsTracking: true,
            cacheSystem: true,
            propertyActive: true
          });
          break;
      }
      showSuccess('Settings reset to default values.');
    }
  };

  // Handle logout
  const handleLogout = (e: React.MouseEvent) => {
  e.preventDefault();
  if (window.confirm('Are you sure you want to logout?')) {
    // Clear session data
    sessionStorage.clear();
    localStorage.removeItem('currentUser');
    
    // Redirect đến login - thay đổi đường dẫn phù hợp với routing của bạn
    window.location.replace('/login'); // Hoặc đường dẫn login của bạn
  }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  return (
    <div>
      {/* Sidebar */}
      <div className="settings-sidebar">
        <div className="settings-sidebar-header">
          <div className="settings-logo">
            <div className="settings-logo-icon">
              <i className="fas fa-hotel"></i>
            </div>
            <div className="settings-logo-text">HotelLink360</div>
          </div>
        </div>

        <div className="settings-property-selector">
          <div className="settings-property-label">Current Property</div>
          <div className="settings-property-name">Tabi Tower Hotel</div>
        </div>

        <nav className="settings-nav-menu">
          <div className="settings-nav-section">
            <div className="settings-nav-section-title">Main</div>
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`settings-nav-item ${item.isActive ? 'active' : ''}`}
              >
                <i className={item.icon}></i>
                {item.text}
              </a>
            ))}
          </div>

          <div className="settings-nav-section">
            <div className="settings-nav-section-title">Content</div>
            {contentNavItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`settings-nav-item ${item.isActive ? 'active' : ''}`}
              >
                <i className={item.icon}></i>
                {item.text}
              </a>
            ))}
          </div>

          <div className="settings-nav-section">
            <div className="settings-nav-section-title">Management</div>
            {managementNavItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`settings-nav-item ${item.isActive ? 'active' : ''} ${item.isLogout ? 'logout' : ''}`}
                onClick={item.isLogout ? handleLogout : undefined}
              >
                <i className={item.icon}></i>
                {item.text}
              </a>
            ))}
          </div>
        </nav>
      </div>


      {/* Success Message */}
      {showSuccessMessage && (
        <div className="settings-success-message">
          <i className="fas fa-check-circle"></i>
          {successMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="settings-main-content">
        <div className="settings-header">
          <div>
            <h2 className="settings-title">Property Settings</h2>
            <p className="settings-subtitle">Configure your hotel property settings and preferences</p>
          </div>
        </div>
        
        {/* Settings Tabs */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              {tab.text}
            </button>
          ))}
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-tab-content active">
            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'}}>
                      <i className="fas fa-hotel"></i>
                    </div>
                    Basic Information
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure basic property information and display settings.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Property Name</label>
                  <input 
                    type="text" 
                    className="settings-form-input" 
                    value={generalSettings.propertyName}
                    onChange={(e) => {
                      setGeneralSettings(prev => ({ ...prev, propertyName: e.target.value }));
                      handleAutoSave('propertyName', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Property Code</label>
                  <input 
                    type="text" 
                    className="settings-form-input" 
                    value={generalSettings.propertyCode}
                    onChange={(e) => {
                      setGeneralSettings(prev => ({ ...prev, propertyCode: e.target.value }));
                      handleAutoSave('propertyCode', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Slogan</label>
                  <input 
                    type="text" 
                    className="settings-form-input" 
                    placeholder="Your hotel's tagline"
                    value={generalSettings.propertySlogan}
                    onChange={(e) => {
                      setGeneralSettings(prev => ({ ...prev, propertySlogan: e.target.value }));
                      handleAutoSave('propertySlogan', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Description</label>
                  <textarea 
                    className="settings-form-input settings-form-textarea" 
                    placeholder="Brief description of your property"
                    value={generalSettings.propertyDescription}
                    onChange={(e) => {
                      setGeneralSettings(prev => ({ ...prev, propertyDescription: e.target.value }));
                      handleAutoSave('propertyDescription', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('general')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('General settings saved!')}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Branding Settings */}
        {activeTab === 'branding' && (
          <div className="settings-tab-content active">
            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
                      <i className="fas fa-palette"></i>
                    </div>
                    Brand Colors
                  </div>
                </div>
                <div className="settings-card-description">
                  Customize your brand colors that will be used throughout your property pages.
                </div>

                <div className="settings-color-picker-group">
                  <div className="settings-color-input-wrapper">
                    <label className="settings-form-label">Primary Color</label>
                    <div className="settings-color-input">
                      <input 
                        type="color" 
                        value={brandingSettings.primaryColor}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                      />
                      <div className="settings-color-value">{brandingSettings.primaryColor}</div>
                    </div>
                  </div>
                  <div className="settings-color-input-wrapper">
                    <label className="settings-form-label">Secondary Color</label>
                    <div className="settings-color-input">
                      <input 
                        type="color" 
                        value={brandingSettings.secondaryColor}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                      />
                      <div className="settings-color-value">{brandingSettings.secondaryColor}</div>
                    </div>
                  </div>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Logo URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://example.com/logo.png"
                    value={brandingSettings.logoUrl}
                    onChange={(e) => {
                      setBrandingSettings(prev => ({ ...prev, logoUrl: e.target.value }));
                      handleAutoSave('logoUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('branding')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Brand settings saved!')}>Save</button>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
                      <i className="fas fa-copyright"></i>
                    </div>
                    Legal & Footer
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure copyright text and legal links for your property pages.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Copyright Text</label>
                  <input 
                    type="text" 
                    className="settings-form-input" 
                    placeholder="© 2024 Your Hotel Name"
                    value={brandingSettings.copyrightText}
                    onChange={(e) => {
                      setBrandingSettings(prev => ({ ...prev, copyrightText: e.target.value }));
                      handleAutoSave('copyrightText', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Terms & Conditions URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://example.com/terms"
                    value={brandingSettings.termsUrl}
                    onChange={(e) => {
                      setBrandingSettings(prev => ({ ...prev, termsUrl: e.target.value }));
                      handleAutoSave('termsUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Privacy Policy URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://example.com/privacy"
                    value={brandingSettings.privacyUrl}
                    onChange={(e) => {
                      setBrandingSettings(prev => ({ ...prev, privacyUrl: e.target.value }));
                      handleAutoSave('privacyUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('branding')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Legal settings saved!')}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Localization Settings */}
        {activeTab === 'localization' && (
          <div className="settings-tab-content active">
            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                      <i className="fas fa-globe"></i>
                    </div>
                    Language Settings
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure supported languages for your property. Select languages you want to provide content in.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Default Language</label>
                  <select 
                    className="settings-form-select"
                    value={localizationSettings.defaultLanguage}
                    onChange={(e) => {
                      setLocalizationSettings(prev => ({ ...prev, defaultLanguage: e.target.value }));
                      handleAutoSave('defaultLanguage', e.target.value);
                    }}
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Fallback Language</label>
                  <select 
                    className="settings-form-select"
                    value={localizationSettings.fallbackLanguage}
                    onChange={(e) => {
                      setLocalizationSettings(prev => ({ ...prev, fallbackLanguage: e.target.value }));
                      handleAutoSave('fallbackLanguage', e.target.value);
                    }}
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Supported Languages</label>
                  <div className="settings-language-grid">
                    {languages.map((language) => (
                      <div 
                        key={language.code}
                        className={`settings-language-option ${localizationSettings.supportedLanguages.includes(language.code) ? 'active' : ''}`}
                        onClick={() => handleLanguageToggle(language.code)}
                      >
                        <div className="settings-language-info">
                          <div className="settings-language-flag">{language.flag}</div>
                          <div className="settings-language-details">
                            <h4>{language.name}</h4>
                            <div className="settings-language-native">{language.native}</div>
                          </div>
                        </div>
                        <div className="settings-language-checkbox">
                          <i className="fas fa-check"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('localization')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Language settings saved!')}>Save</button>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #ef4444, #dc2626)'}}>
                      <i className="fas fa-clock"></i>
                    </div>
                    Regional Settings
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure timezone and regional display preferences for your property.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Timezone</label>
                  <select 
                    className="settings-form-select"
                    value={localizationSettings.timezone}
                    onChange={(e) => {
                      setLocalizationSettings(prev => ({ ...prev, timezone: e.target.value }));
                      handleAutoSave('timezone', e.target.value);
                    }}
                  >
                    {timezoneOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Date Format</label>
                  <select 
                    className="settings-form-select"
                    value={localizationSettings.dateFormat}
                    onChange={(e) => {
                      setLocalizationSettings(prev => ({ ...prev, dateFormat: e.target.value }));
                      handleAutoSave('dateFormat', e.target.value);
                    }}
                  >
                    {dateFormatOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('localization')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Regional settings saved!')}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Settings */}
        {activeTab === 'contact' && (
          <div className="settings-tab-content active">
            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #06b6d4, #0891b2)'}}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    Address & Location
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure your property's physical address and location information.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Street Address</label>
                  <input 
                    type="text" 
                    className="settings-form-input"
                    value={contactSettings.address}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, address: e.target.value }));
                      handleAutoSave('address', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">District</label>
                  <input 
                    type="text" 
                    className="settings-form-input"
                    value={contactSettings.district}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, district: e.target.value }));
                      handleAutoSave('district', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">City</label>
                  <input 
                    type="text" 
                    className="settings-form-input"
                    value={contactSettings.city}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, city: e.target.value }));
                      handleAutoSave('city', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Country</label>
                  <input 
                    type="text" 
                    className="settings-form-input"
                    value={contactSettings.country}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, country: e.target.value }));
                      handleAutoSave('country', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Postal Code</label>
                  <input 
                    type="text" 
                    className="settings-form-input"
                    value={contactSettings.postalCode}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, postalCode: e.target.value }));
                      handleAutoSave('postalCode', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-color-picker-group">
                  <div className="settings-color-input-wrapper">
                    <label className="settings-form-label">Latitude</label>
                    <input 
                      type="number" 
                      className="settings-form-input" 
                      placeholder="35.6532" 
                      step="0.0001"
                      value={contactSettings.latitude}
                      onChange={(e) => {
                        setContactSettings(prev => ({ ...prev, latitude: e.target.value }));
                        handleAutoSave('latitude', e.target.value);
                      }}
                    />
                  </div>
                  <div className="settings-color-input-wrapper">
                    <label className="settings-form-label">Longitude</label>
                    <input 
                      type="number" 
                      className="settings-form-input" 
                      placeholder="139.7390" 
                      step="0.0001"
                      value={contactSettings.longitude}
                      onChange={(e) => {
                        setContactSettings(prev => ({ ...prev, longitude: e.target.value }));
                        handleAutoSave('longitude', e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Google Maps URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://maps.google.com/..."
                    value={contactSettings.googleMapUrl}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, googleMapUrl: e.target.value }));
                      handleAutoSave('googleMapUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('contact')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Location settings saved!')}>Save</button>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #84cc16, #65a30d)'}}>
                      <i className="fas fa-phone"></i>
                    </div>
                    Contact Details
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure contact information and communication channels.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="settings-form-input" 
                    placeholder="+81-3-1234-5678"
                    value={contactSettings.phoneNumber}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, phoneNumber: e.target.value }));
                      handleAutoSave('phoneNumber', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="settings-form-input" 
                    placeholder="info@tabitower.com"
                    value={contactSettings.emailAddress}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, emailAddress: e.target.value }));
                      handleAutoSave('emailAddress', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Official Website</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://tabitower.com"
                    value={contactSettings.websiteUrl}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, websiteUrl: e.target.value }));
                      handleAutoSave('websiteUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Zalo OA ID</label>
                  <input 
                    type="text" 
                    className="settings-form-input" 
                    placeholder="zalo_oa_id"
                    value={contactSettings.zaloOaId}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, zaloOaId: e.target.value }));
                      handleAutoSave('zaloOaId', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('contact')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Contact settings saved!')}>Save</button>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #f472b6, #ec4899)'}}>
                      <i className="fas fa-share-alt"></i>
                    </div>
                    Social Media
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure your social media presence and links.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Facebook URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://facebook.com/tabitower"
                    value={contactSettings.facebookUrl}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, facebookUrl: e.target.value }));
                      handleAutoSave('facebookUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Instagram URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://instagram.com/tabitower"
                    value={contactSettings.instagramUrl}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, instagramUrl: e.target.value }));
                      handleAutoSave('instagramUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">YouTube URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://youtube.com/c/tabitower"
                    value={contactSettings.youtubeUrl}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, youtubeUrl: e.target.value }));
                      handleAutoSave('youtubeUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">TikTok URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://tiktok.com/@tabitower"
                    value={contactSettings.tiktokUrl}
                    onChange={(e) => {
                      setContactSettings(prev => ({ ...prev, tiktokUrl: e.target.value }));
                      handleAutoSave('tiktokUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                  <button className="settings-btn-secondary" onClick={() => resetSettings('contact')}>Reset</button>
                  <button className="settings-btn-primary" onClick={() => showSuccess('Social media settings saved!')}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="settings-tab-content active">
            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title">
                    <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #6366f1, #4f46e5)'}}>
                      <i className="fas fa-code"></i>
                    </div>
                    Advanced Features
                  </div>
                </div>
                <div className="settings-card-description">
                  Configure advanced features and integrations for your property.
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Intro Video URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://youtube.com/watch?v=..."
                    value={advancedSettings.introVideoUrl}
                    onChange={(e) => {
                      setAdvancedSettings(prev => ({ ...prev, introVideoUrl: e.target.value }));
                      handleAutoSave('introVideoUrl', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">360° Virtual Tour URL</label>
                  <input 
                    type="url" 
                    className="settings-form-input" 
                    placeholder="https://example.com/360tour"
                    value={advancedSettings.vr360Url}
                    onChange={(e) => {
                      setAdvancedSettings(prev => ({ ...prev, vr360Url: e.target.value }));
                      handleAutoSave('vr360Url', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Banner Images (JSON)</label>
                  <textarea 
                    className="settings-form-input settings-form-textarea" 
                    placeholder='["image1.jpg", "image2.jpg"]'
                    value={advancedSettings.bannerImages}
                    onChange={(e) => {
                      setAdvancedSettings(prev => ({ ...prev, bannerImages: e.target.value }));
                      handleAutoSave('bannerImages', e.target.value);
                    }}
                  />
                </div>

                <div className="settings-actions">
                                    <button 
                    className="settings-btn-secondary" 
                    onClick={() => resetSettings('advanced')}
                  >
                    Reset
                  </button>
                  <button 
                    className="settings-btn-primary" 
                    onClick={() => showSuccess('Advanced settings saved!')}
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Feature Toggles */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <div className="settings-card-title">
                      <div className="settings-card-icon" style={{background: 'linear-gradient(135deg, #71717a, #52525b)'}}>
                        <i className="fas fa-database"></i>
                      </div>
                      System Settings
                    </div>
                  </div>
                  <div className="settings-card-description">
                    Configure system-level settings and preferences.
                  </div>

                  <div className="settings-form-group">
                    <div className="settings-toggle-wrapper">
                      <div className="settings-toggle-info">
                        <h4>Auto Language Detection</h4>
                        <div className="settings-toggle-description">Automatically detect visitor's preferred language</div>
                      </div>
                      <div 
                        className={`settings-toggle-switch ${advancedSettings.autoLanguageDetection ? 'active' : ''}`}
                        onClick={() => handleToggle('autoLanguageDetection')}
                      ></div>
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <div className="settings-toggle-wrapper">
                      <div className="settings-toggle-info">
                        <h4>Analytics Tracking</h4>
                        <div className="settings-toggle-description">Enable visitor analytics and tracking</div>
                      </div>
                      <div 
                        className={`settings-toggle-switch ${advancedSettings.analyticsTracking ? 'active' : ''}`}
                        onClick={() => handleToggle('analyticsTracking')}
                      ></div>
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <div className="settings-toggle-wrapper">
                      <div className="settings-toggle-info">
                        <h4>Cache System</h4>
                        <div className="settings-toggle-description">Enable content caching for better performance</div>
                      </div>
                      <div 
                        className={`settings-toggle-switch ${advancedSettings.cacheSystem ? 'active' : ''}`}
                        onClick={() => handleToggle('cacheSystem')}
                      ></div>
                    </div>
                  </div>

                  <div className="settings-form-group">
                    <div className="settings-toggle-wrapper">
                      <div className="settings-toggle-info">
                        <h4>Property Active</h4>
                        <div className="settings-toggle-description">Enable/disable this property entirely</div>
                      </div>
                      <div 
                        className={`settings-toggle-switch ${advancedSettings.propertyActive ? 'active' : ''}`}
                        onClick={() => handleToggle('propertyActive')}
                      ></div>
                    </div>
                  </div>

                  <div className="settings-actions">
                    <button className="settings-btn-secondary" onClick={() => resetSettings('advanced')}>Reset</button>
                    <button className="settings-btn-primary" onClick={() => showSuccess('System settings saved!')}>Save</button>
                  </div>
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;

                  