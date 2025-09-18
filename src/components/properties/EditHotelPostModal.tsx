// src/components/properties/EditHotelPostModal.tsx
import React, { useState, useEffect } from 'react';
import { RichTextEditor } from './RichTextEditor.tsx';
import type { HotelPost } from '../../types/properties.ts';

interface EditHotelPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: HotelPost | null;
  onSave: (data: HotelPost) => Promise<void>;
}

export const EditHotelPostModal: React.FC<EditHotelPostModalProps> = ({
  isOpen,
  onClose,
  post,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    phone: '',
    vrLink: '',
    content: '',
    status: 'draft' as 'draft' | 'published'
  });
  const [bannerPreviews, setBannerPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        address: post.address || '',
        phone: post.phone || '',
        vrLink: post.vrLink || '',
        content: post.content,
        status: post.status
      });
    } else {
      // Reset form for new post
      setFormData({
        title: '',
        address: '',
        phone: '',
        vrLink: '',
        content: '',
        status: 'draft'
      });
    }
  }, [post]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (ev.target?.result) {
              previews.push(ev.target.result as string);
              setBannerPreviews([...previews]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert('Please fill in the title and content');
      return;
    }

    setLoading(true);
    try {
      const postData: HotelPost = {
        id: post?.id || Date.now(),
        hotelId: post?.hotelId || '',
        title: formData.title,
        content: formData.content,
        locale: post?.locale || 'en',
        status: formData.status,
        address: formData.address,
        phone: formData.phone,
        vrLink: formData.vrLink,
        updatedAt: new Date().toISOString()
      };
      
      await onSave(postData);
      onClose();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {post ? `Edit Hotel Post #${post.id}` : 'Add New Hotel Post'}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Post Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hotel Information</label>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Full hotel address"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+84 123 456 789"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">VR360 Tour Link</label>
            <input
              type="url"
              className="form-input"
              value={formData.vrLink}
              onChange={(e) => handleInputChange('vrLink', e.target.value)}
              placeholder="https://example.com/vr-tour"
            />
            <small className="form-hint">
              <i className="fas fa-vr-cardboard"></i> Link to virtual reality tour experience
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Banner Images</label>
            <input
              type="file"
              className="form-input"
              accept="image/*"
              multiple
              onChange={handleBannerChange}
            />
            <small className="form-hint">
              <i className="fas fa-info-circle"></i> You can upload multiple images (JPG, PNG)
            </small>
            {bannerPreviews.length > 0 && (
              <div className="banner-preview">
                {bannerPreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index + 1}`} />
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => handleInputChange('content', content)}
              placeholder="Write your hotel post content..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};