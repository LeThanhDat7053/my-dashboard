// src/components/properties/AddHotelModal.tsx
import React, { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';
import { IconSelector } from './IconSelector';
import { ColorSelector } from './ColorSelector';
import type { HotelFormData } from '../../types/properties';

interface AddHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: HotelFormData) => Promise<void>;
}

export const AddHotelModal: React.FC<AddHotelModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<HotelFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    vrLink: '',
    description: '',
    status: 'active',
    icon: 'fa-building',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  });
  const [bannerPreviews, setBannerPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof HotelFormData, value: string) => {
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
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        vrLink: '',
        description: '',
        status: 'active',
        icon: 'fa-building',
        color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
      });
      setBannerPreviews([]);
    } catch (error) {
      console.error('Error saving hotel:', error);
      alert('Error saving hotel. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Add New Hotel</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Hotel Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Luxury Garden Resort"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+84 123 456 789"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="info@hotel.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address *</label>
            <input
              type="text"
              className="form-input"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Street, District, City"
              required
            />
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
              <i className="fas fa-info-circle"></i> Optional: Link to virtual reality tour of the hotel
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
            <label className="form-label">Icon</label>
            <IconSelector
              selectedIcon={formData.icon}
              onIconSelect={(icon) => handleInputChange('icon', icon)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Icon Color</label>
            <ColorSelector
              selectedColor={formData.color}
              onColorSelect={(color) => handleInputChange('color', color)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hotel Description</label>
            <RichTextEditor
              content={formData.description || ''}
              onChange={(content) => handleInputChange('description', content)}
              placeholder="Describe your hotel..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Creating...' : 'Create Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};