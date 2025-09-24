import React, { useState } from 'react';
import '../../styles/AddFeatureModal.css';

interface FormData {
  name: string;
  category: string;
  vrLink: string;
  slug: string;
  target: string;
  icon: string;
  color: string;
  description: string;
  status: string;
}

interface AddFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (featureData: FormData) => void;
}

const AddFeatureModal: React.FC<AddFeatureModalProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedIcon, setSelectedIcon] = useState('fa-star');
  const [selectedColor, setSelectedColor] = useState('linear-gradient(135deg, #3b82f6, #1d4ed8)');
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  
  const [featureForm, setFeatureForm] = useState<FormData>({
    name: '',
    category: '',
    vrLink: '',
    slug: '',
    target: 'self',
    icon: 'fa-star',
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    description: '',
    status: 'active'
  });

  const icons = [
    'fa-star', 'fa-swimming-pool', 'fa-utensils', 'fa-wifi', 'fa-car', 'fa-spa',
    'fa-dumbbell', 'fa-cocktail', 'fa-bed', 'fa-concierge-bell', 'fa-coffee',
    'fa-gamepad', 'fa-shopping-bag', 'fa-taxi', 'fa-crown', 'fa-umbrella-beach'
  ];

  const colors = [
    'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    'linear-gradient(135deg, #ef4444, #dc2626)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #667eea, #764ba2)'
  ];

  const selectIcon = (icon: string) => {
    setSelectedIcon(icon);
    setFeatureForm(prev => ({ ...prev, icon }));
    setIconPickerOpen(false);
  };

  const selectColor = (color: string) => {
    setSelectedColor(color);
    setFeatureForm(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureForm.name || !featureForm.category) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(featureForm);
    // Reset form
    setFeatureForm({
      name: '',
      category: '',
      vrLink: '',
      slug: '',
      target: 'self',
      icon: 'fa-star',
      color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      description: '',
      status: 'active'
    });
    setSelectedIcon('fa-star');
    setSelectedColor('linear-gradient(135deg, #3b82f6, #1d4ed8)');
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-feature-modal-overlay" onClick={handleModalClick}>
      <div className="add-feature-modal-content">
        <div className="add-feature-modal-header">
          <h3 className="add-feature-modal-title">Add New Feature</h3>
          <button className="add-feature-close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Feature Name *</label>
            <input
              type="text"
              className="add-feature-form-input"
              value={featureForm.name}
              onChange={(e) => setFeatureForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Swimming Pool"
              required
            />
          </div>

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Category *</label>
            <select
              className="add-feature-form-input"
              value={featureForm.category}
              onChange={(e) => setFeatureForm(prev => ({ ...prev, category: e.target.value }))}
              required
            >
              <option value="">Select category...</option>
              <option value="general">General</option>
              <option value="services">Services</option>
              <option value="facilities">Facilities</option>
              <option value="activities">Activities</option>
            </select>
          </div>

          {/* <div className="add-feature-form-group">
            <label className="add-feature-form-label">VR360 Tour Link</label>
            <input
              type="url"
              className="add-feature-form-input"
              value={featureForm.vrLink}
              onChange={(e) => setFeatureForm(prev => ({ ...prev, vrLink: e.target.value }))}
              placeholder="https://example.com/vr-tour"
            />
            <small className="add-feature-form-hint">
              <i className="fas fa-info-circle"></i> Optional: Link to virtual reality tour of the hotel
            </small>
          </div> */}

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Slug / External Link *</label>
            <input
              type="text"
              className="add-feature-form-input"
              value={featureForm.slug}
              onChange={(e) => setFeatureForm(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="e.g., swimming-pool or https://example.com/pool"
              required
            />
            <small className="add-feature-form-hint">
              <i className="fas fa-link"></i> Enter a slug for internal page or a full URL for external link
            </small>
          </div>

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Open Link In</label>
            <div className="add-feature-radio-group">
              <label className="add-feature-radio-option">
                <input
                  type="radio"
                  name="featureTarget"
                  value="self"
                  checked={featureForm.target === 'self'}
                  onChange={(e) => setFeatureForm(prev => ({ ...prev, target: e.target.value }))}
                />
                <span>Current Page</span>
              </label>
              <label className="add-feature-radio-option">
                <input
                  type="radio"
                  name="featureTarget"
                  value="blank"
                  checked={featureForm.target === 'blank'}
                  onChange={(e) => setFeatureForm(prev => ({ ...prev, target: e.target.value }))}
                />
                <span>New Tab</span>
              </label>
            </div>
          </div>

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Icon</label>
            <div className="add-feature-icon-selector">
              <div className="add-feature-selected-icon" onClick={() => setIconPickerOpen(!iconPickerOpen)}>
                <i className={`fas ${selectedIcon}`}></i>
                <span>Click to change</span>
              </div>
              <div className={`add-feature-icon-picker ${iconPickerOpen ? 'show' : ''}`}>
                <div className="add-feature-icon-grid">
                  {icons.map(icon => (
                    <div
                      key={icon}
                      className="add-feature-icon-option"
                      onClick={() => selectIcon(icon)}
                    >
                      <i className={`fas ${icon}`}></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Icon Color</label>
            <div className="add-feature-color-selector">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`add-feature-color-option ${selectedColor === color ? 'selected' : ''}`}
                  style={{ background: color }}
                  onClick={() => selectColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Description</label>
            <textarea
              className="add-feature-form-textarea"
              value={featureForm.description}
              onChange={(e) => setFeatureForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Feature description..."
              rows={4}
            />
          </div>

          <div className="add-feature-form-group">
            <label className="add-feature-form-label">Status</label>
            <select
              className="add-feature-form-input"
              value={featureForm.status}
              onChange={(e) => setFeatureForm(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="add-feature-modal-actions">
            <button type="button" className="add-feature-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-feature-btn-save">
              Create Feature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeatureModal;