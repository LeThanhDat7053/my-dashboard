// src/components/properties/TranslateModal.tsx
import React, { useState, useEffect } from 'react';
import type { HotelPost, TranslationData } from '../../types/properties';

interface TranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: HotelPost | null;
  onAccept: (translationData: TranslationData) => void;
}

export const TranslateModal: React.FC<TranslateModalProps> = ({
  isOpen,
  onClose,
  post,
  onAccept
}) => {
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'vi' | 'ja'>('vi');
  const [translationData, setTranslationData] = useState<TranslationData>({
    originalAddress: '',
    originalPhone: '',
    originalContent: '',
    translatedAddress: '',
    translatedPhone: '',
    translatedContent: '',
    targetLanguage: 'vi'
  });
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    if (post) {
      // Mock original data based on post
      const mockData: TranslationData = {
        originalAddress: post.address || '123 Nguyen Hue Street, District 1, Ho Chi Minh City',
        originalPhone: post.phone || '+84 28 3825 1234',
        originalContent: post.content,
        translatedAddress: getTranslatedAddress(targetLanguage, post.address || '123 Nguyen Hue Street, District 1, Ho Chi Minh City'),
        translatedPhone: post.phone || '+84 28 3825 1234',
        translatedContent: getTranslatedContent(targetLanguage, post.content),
        targetLanguage
      };
      setTranslationData(mockData);
    }
  }, [post, targetLanguage]);

  const getTranslatedAddress = (lang: string, original: string) => {
    if (lang === 'vi') {
      if (original.includes('Nguyen Hue Street')) {
        return '123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh';
      } else if (original.includes('Dong Khoi Street')) {
        return '456 Đường Đồng Khởi, Quận 1, TP. Hồ Chí Minh';
      }
    } else if (lang === 'ja') {
      if (original.includes('Nguyen Hue Street')) {
        return '123ホーチミン市1区グエンフエ通り';
      } else if (original.includes('Dong Khoi Street')) {
        return '456ホーチミン市1区ドンコイ通り';
      }
    }
    return original;
  };

  const getTranslatedContent = (lang: string, original: string) => {
    if (lang === 'vi') {
      return '<strong>Chào mừng đến với Khách sạn Tabi Tower</strong><br>Trải nghiệm sự sang trọng và thoải mái ngay trung tâm thành phố Hồ Chí Minh. Khách sạn 5 sao của chúng tôi cung cấp các tiện nghi đẳng cấp thế giới, tầm nhìn tuyệt đẹp ra thành phố...';
    } else if (lang === 'ja') {
      return '<strong>タビタワーホテルへようこそ</strong><br>ホーチミン市の中心部で贅沢と快適さを体験してください。5つ星ホテルは世界クラスの設備、素晴らしい街の景色、優れたサービスを提供します...';
    } else if (lang === 'en') {
      return '<strong>Welcome to Tabi Tower Hotel</strong><br>Experience luxury and comfort at the heart of Ho Chi Minh City. Our 5-star hotel offers world-class amenities, stunning city views, and exceptional service...';
    }
    return original;
  };

  const handleRegenerateTranslation = async () => {
    setIsRegenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate alternative translation
    const newTranslation = { ...translationData };
    
    if (targetLanguage === 'vi') {
      newTranslation.translatedAddress = '123 Đường Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh (Phiên bản 2)';
      newTranslation.translatedContent = '<strong>Chào mừng đến với Khách sạn Tabi Tower (Phiên bản 2)</strong><br>Xin chào và chào mừng đến với Khách sạn Tabi Tower! Chúng tôi đã thiết kế trải nghiệm khách sạn để mang lại sự thuận tiện và hiệu quả tối đa cho quý khách...';
    } else if (targetLanguage === 'ja') {
      newTranslation.translatedAddress = '123ホーチミン市第1区グエンフエ通り (バージョン2)';
      newTranslation.translatedContent = '<strong>タビタワーホテルへようこそ (バージョン2)</strong><br>ホーチミン市の中心部で最高級の贅沢と快適さをお楽しみください。私たちの5つ星ホテルは世界最高水準の設備とサービスを提供いたします...';
    } else if (targetLanguage === 'en') {
      newTranslation.translatedAddress = '123 Nguyen Hue Street, District 1, Ho Chi Minh City (Version 2)';
      newTranslation.translatedContent = '<strong>Welcome to Tabi Tower Hotel (Version 2)</strong><br>Discover unparalleled luxury and comfort in the vibrant heart of Ho Chi Minh City. Our premium 5-star establishment delivers exceptional world-class amenities and service...';
    }
    
    setTranslationData(newTranslation);
    setIsRegenerating(false);
  };

  const handleAcceptTranslation = () => {
    onAccept(translationData);
    onClose();
  };

  if (!isOpen || !post) return null;

  return (
    <div className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">AI Translation</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Select target language:</label>
          <select
            className="form-input"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as 'en' | 'vi' | 'ja')}
          >
            <option value="vi">Vietnamese (Tiếng Việt)</option>
            <option value="ja">Japanese (日本語)</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Hotel Information:</label>
          <div className="translation-section original">
            <div className="form-row">
              <div style={{ flex: 1 }}>
                <label className="translation-label">Original Address:</label>
                <div className="translation-content">{translationData.originalAddress}</div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="translation-label">Original Phone:</label>
                <div className="translation-content">{translationData.originalPhone}</div>
              </div>
            </div>
          </div>
          <div className="translation-section translated">
            <div className="form-row">
              <div style={{ flex: 1 }}>
                <label className="translation-label translated">Translated Address:</label>
                <div className="translation-content">{translationData.translatedAddress}</div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="translation-label translated">Translated Phone:</label>
                <div className="translation-content">{translationData.translatedPhone}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Original Content:</label>
          <div className="translation-section original">
            <div 
              className="translation-content" 
              dangerouslySetInnerHTML={{ __html: translationData.originalContent }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">AI Translation:</label>
          <div className="translation-section translated">
            <div 
              className="translation-content"
              dangerouslySetInnerHTML={{ __html: translationData.translatedContent }}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={handleRegenerateTranslation}
            disabled={isRegenerating}
          >
            {isRegenerating ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Regenerating...
              </>
            ) : (
              <>
                <i className="fas fa-redo"></i>
                Regenerate
              </>
            )}
          </button>
          <button 
            type="button" 
            className="btn-save" 
            onClick={handleAcceptTranslation}
          >
            <i className="fas fa-check"></i>
            Use Translation
          </button>
        </div>
      </div>
    </div>
  );
};