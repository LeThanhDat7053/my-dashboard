import React, { useState } from 'react';
import '../../styles/TranslateModal.css';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  locale: string;
  localeName: string;
  flagClass: string;
  status: 'published' | 'draft';
  updatedAt: string;
  content?: string;
}

interface TranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onTranslate: (translationData: any) => void;
}

const TranslateModal: React.FC<TranslateModalProps> = ({ isOpen, onClose, post, onTranslate }) => {
  const [targetLanguage, setTargetLanguage] = useState('vi');

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRegenerate = () => {
    alert('Regenerating translation...');
  };

  const handleUseTranslation = () => {
    onTranslate({ targetLanguage });
    onClose();
  };

  if (!isOpen || !post) return null;

  return (
    <div className="translate-modal-overlay" onClick={handleModalClick}>
      <div className="translate-modal-content">
        {/* Header */}
        <div className="translate-modal-header">
          <h3 className="translate-modal-title">AI Translation</h3>
          <button className="translate-close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Language selector */}
        <div className="translate-language-select">
          <label>Select target language:</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="vi">Vietnamese (Tiếng Việt)</option>
            <option value="ja">Japanese (日本語)</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Original Content */}
        <div className="translate-section">
          <h4>Original Content:</h4>
          <div className="translate-section-box original-content">
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </div>
        </div>

        {/* AI Translation */}
        <div className="translate-section">
          <h4>AI Translation:</h4>
          <div className="translate-section-box translated-content">
            <strong>Hướng dẫn Nhận phòng Khách sạn</strong>
            <p>
              Chào mừng quý khách đến với Khách sạn Tabi Tower! Quy trình nhận
              phòng của chúng tôi được thiết kế để thuận tiện và hiệu quả. Thời
              gian nhận phòng từ 14:00, và chúng tôi cần xem giấy tờ tùy thân
              cùng xác nhận đặt phòng...
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="translate-modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-regenerate" onClick={handleRegenerate}>
            <i className="fas fa-redo"></i> Regenerate
          </button>
          <button className="btn-use" onClick={handleUseTranslation}>
            <i className="fas fa-check"></i> Use Translation
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslateModal;