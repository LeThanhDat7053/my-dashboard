// src/components/categories/TranslateModal.tsx - UPDATED với CSS classes mới

import React, { useState, useRef, useEffect } from 'react';
import type { Category, Language } from '../../types/categories';

interface TranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onAcceptTranslation: (categoryId: number, targetLang: Language, translatedData: any) => void;
}

const AVAILABLE_LANGS = [
  { code: 'vi' as Language, flag: '🇻🇳', label: 'Vietnamese' },
  { code: 'en' as Language, flag: '🇺🇸', label: 'English' },
  { code: 'ja' as Language, flag: '🇯🇵', label: 'Japanese' },
  { code: 'kr' as Language, flag: '🇰🇷', label: 'Korean' },
  { code: 'fr' as Language, flag: '🇫🇷', label: 'French' }
];

export const TranslateModal: React.FC<TranslateModalProps> = ({
  isOpen,
  onClose,
  category,
  onAcceptTranslation
}) => {
  const [activeTab, setActiveTab] = useState<Language>('vi');
  const [activeTabs, setActiveTabs] = useState<Language[]>(['vi', 'en', 'ja']);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<Record<Language, { title: string; description: string }>>({
    vi: { title: '', description: '' },
    en: { title: '', description: '' },
    ja: { title: '', description: '' },
    kr: { title: '', description: '' },
    fr: { title: '', description: '' }
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (category && isOpen) {
      // Initialize with mock translations
      const mockTranslations: Record<Language, { title: string; description: string }> = {
        vi: { 
          title: 'Hướng dẫn Nhận phòng Khách sạn', 
          description: 'Chào mừng quý khách đến với Khách sạn Tabi Tower! Quy trình nhận phòng của chúng tôi được thiết kế để mượt mà và hiệu quả...' 
        },
        en: { 
          title: category.translations.en?.title || 'Hotel Check-in Guidelines',
          description: category.translations.en?.description || 'Welcome to Tabi Tower Hotel! Our check-in process is designed to be smooth and efficient...'
        },
        ja: { 
          title: 'ホテルチェックインガイドライン', 
          description: 'タビタワーホテルへようこそ！私たちのチェックインプロセスは...' 
        },
        kr: { 
          title: '호텔 체크인 안내', 
          description: '환영합니다, 타비 타워 호텔에 오신 것을! 저희 체크인 절차는 원활하고 효율적으로 진행되도록 준비되어 있습니다...' },
        fr: { 
          title: 'Procédure d’enregistrement à l’hôtel', 
          description: 'Bienvenue au Tabi Tower Hotel ! Notre procédure d’enregistrement est conçue pour être fluide et efficace' }
      };
      
      setTranslatedContent(mockTranslations);
    }
  }, [category, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };

    if (showLangDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLangDropdown]);

  if (!isOpen || !category) return null;

  const handleTabChange = (lang: Language) => {
    setActiveTab(lang);
  };

  const handleAddLanguageTab = (lang: Language) => {
    if (!activeTabs.includes(lang)) {
      setActiveTabs([...activeTabs, lang]);
      setActiveTab(lang);
      
      // Generate mock translation
      const mockTranslation = {
        title: `[AI Translated] ${category.translations.en?.title || 'Untitled'}`,
        description: `[AI Translated] ${category.translations.en?.description || 'No description'}`
      };
      
      setTranslatedContent(prev => ({
        ...prev,
        [lang]: mockTranslation
      }));
    }
    setShowLangDropdown(false);
  };

  const handleContentEdit = (field: 'title' | 'description') => {
    const element = field === 'title' ? titleRef.current : descriptionRef.current;
    if (element) {
      const value = element.textContent || '';
      setTranslatedContent(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [field]: value
        }
      }));
    }
  };

  const handleRegenerateTranslation = () => {
    const mockTranslation = {
      title: `[Regenerated] ${category.translations.en?.title || 'General'} - ${Date.now()}`,
      description: `[Regenerated] ${category.translations.en?.description || 'Basic hotel information like check-in/out, policies, and general guidance'} - ${Date.now()}`
    };
    
    setTranslatedContent(prev => ({
      ...prev,
      [activeTab]: mockTranslation
    }));
  };

  const handleAcceptTranslation = () => {
    onAcceptTranslation(category.id, activeTab, translatedContent[activeTab]);
  };

  const getOriginalContent = () => {
    const originalLang: Language = activeTab === 'en' ? 'vi' : 'en';
    return category.translations[originalLang] || 
           category.translations.en || 
           { title: 'No title', description: 'No description' };
  };

  const getTranslatedContent = () => {
    return translatedContent[activeTab] || { title: '', description: '' };
  };

  const availableLangsToAdd = AVAILABLE_LANGS.filter(lang => !activeTabs.includes(lang.code));

  return (
    <div className="fixed inset-0 translate-modal-overlay flex items-center justify-center">    
      <div className="translate-modal-container">
        {/* Header */}
        <div className="translate-modal-header flex items-center justify-between">
          <h3 className="translate-modal-title">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            AI Translation
          </h3>
          <button
            onClick={onClose}
            className="translate-modal-close"
          >
            ×
          </button>
        </div>

        {/* Language Tabs */}
        <div className="translate-lang-tabs">
          {activeTabs.map(lang => {
            const langInfo = AVAILABLE_LANGS.find(l => l.code === lang);
            return (
              <button
                key={lang}
                onClick={() => handleTabChange(lang)}
                className={`translate-lang-tab ${activeTab === lang ? 'active' : ''}`}
              >
                <span>{langInfo?.flag}</span>
                <span>{lang.toUpperCase()}</span>
              </button>
            );
          })}
          
          {/* Add Language Button */}
          {availableLangsToAdd.length > 0 && (
            <div className="translate-add-lang-wrapper" ref={dropdownRef}>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="translate-add-lang-btn"
              >
                +
              </button>
              
              {showLangDropdown && (
                <div className="translate-lang-dropdown">
                  {availableLangsToAdd.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleAddLanguageTab(lang.code)}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="translate-modal-content">
          {/* Original Content */}
          <div className="translate-content-section">
            <label className="translate-content-label">
              Original Content ({activeTab === 'en' ? 'VI' : 'EN'}):
            </label>
            <div className="translate-content-box original">
              <div className="translate-content-title">
                {getOriginalContent().title}
              </div>
              <div className="translate-content-description">
                {getOriginalContent().description}
              </div>
            </div>
          </div>

          {/* AI Translation */}
          <div className="translate-content-section">
            <label className="translate-content-label">
              AI Translation ({activeTab.toUpperCase()}):
            </label>
            <div className="translate-content-box translated">
              {/* Editable Title */}
              <div
                ref={titleRef}
                contentEditable
                className="translate-content-title"
                suppressContentEditableWarning={true}
                onBlur={() => handleContentEdit('title')}
                dangerouslySetInnerHTML={{ __html: getTranslatedContent().title }}
              />
              
              {/* Editable Description */}
              <div
                ref={descriptionRef}
                contentEditable
                className="translate-content-description"
                suppressContentEditableWarning={true}
                onBlur={() => handleContentEdit('description')}
                dangerouslySetInnerHTML={{ __html: getTranslatedContent().description }}
              />
            </div>
            <div className="translate-helper-text">
              Bạn có thể chỉnh sửa bản dịch trực tiếp tại đây.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="translate-modal-actions">
          <button
            onClick={onClose}
            className="translate-btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleRegenerateTranslation}
            className="translate-btn-regenerate"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
          <button
            onClick={handleAcceptTranslation}
            className="translate-btn-accept"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Use Translation
          </button>
        </div>
      </div>
    </div>
  );
};  