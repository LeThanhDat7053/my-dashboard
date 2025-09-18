import React, { useState } from 'react';
import '../styles/features.css';
import AddFeatureModal from '../components/features/AddFeatureModal';
import EditPostModal from '../components/features/EditPostModal';
import TranslateModal from '../components/features/TranslateModal';

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

interface Feature {
  id: number;
  name: string;
  category: string;
  icon: string;
  iconColor: string;
  status: 'active' | 'inactive';
  posts: Post[];
}

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

const Features: React.FC = () => {
  const [features] = useState<Feature[]>([
    {
      id: 1,
      name: "Check-in Process",
      category: "general",
      icon: "fa-sign-in-alt",
      iconColor: "linear-gradient(135deg, #667eea, #764ba2)",
      status: "active",
      posts: [
        {
          id: 1,
          title: "Hướng dẫn Nhận phòng",
          excerpt: "Chào mừng quý khách đến với Khách sạn Tabi Tower! Quy trình nhận phòng của chúng tôi được thiết kế để thuận tiện và hiệu quả. Thời gian nhận phòng từ 14:00, chúng tôi sẽ cần xem giấy tờ tùy thân...",
          locale: "vi",
          localeName: "Vietnamese",
          flagClass: "vi",
          status: "draft",
          updatedAt: "Dec 14, 2024",
          content: '<p>Chào mừng quý khách đến với <strong>Khách sạn Tabi Tower</strong>! Quy trình nhận phòng của chúng tôi được thiết kế để thuận tiện và nhanh chóng.</p><h3>Thông tin nhận phòng:</h3><ul><li>Thời gian nhận phòng từ 14:00</li><li>Giấy tờ cần thiết: CCCD/Passport và xác nhận đặt phòng</li><li>Nhân viên sẽ hỗ trợ quý khách với hành lý</li></ul><p>Mọi thắc mắc xin liên hệ lễ tân: <a href="tel:+84123456789">+84 123 456 789</a>.</p>'
        },
        {
          id: 2,
          title: "Hotel Check-in Guidelines",
          excerpt: "Welcome to Tabi Tower Hotel! Our check-in process is designed to be smooth and efficient. Check-in time is from 2:00 PM, and we'll need to see your ID and reservation confirmation...",
          locale: "en",
          localeName: "English",
          flagClass: "en",
          status: "draft",
          updatedAt: "Dec 14, 2024",
          content: '<p>Welcome to <strong>Tabi Tower Hotel</strong>! Our check-in process is designed to be smooth and efficient.</p><h3>Check-in Information:</h3><ul><li>Check-in time: from 2:00 PM</li><li>Required documents: ID and reservation confirmation</li><li>Our friendly staff will assist you with luggage</li></ul><p>For any questions, please contact our front desk at <a href="tel:+84123456789">+84 123 456 789</a>.</p>'
        }
      ]
    },
    {
      id: 2,
      name: "Restaurant & Dining",
      category: "services",
      icon: "fa-utensils",
      iconColor: "linear-gradient(135deg, #ef4444, #dc2626)",
      status: "active",
      posts: [
        {
          id: 3,
          title: "Sky Restaurant Reservations",
          excerpt: "Experience fine dining at our Sky Restaurant on the 20th floor with panoramic city views. Reservation recommended. Open for breakfast (6-10 AM), lunch (11 AM-2 PM), and dinner (6-10 PM)...",
          locale: "en",
          localeName: "English",
          flagClass: "en",
          status: "published",
          updatedAt: "Dec 13, 2024",
          content: '<p>Experience fine dining at our <strong>Sky Restaurant</strong> on the 20th floor with panoramic city views.</p><h3>Operating Hours:</h3><ul><li>Breakfast: 6:00 AM - 10:00 AM</li><li>Lunch: 11:00 AM - 2:00 PM</li><li>Dinner: 6:00 PM - 10:00 PM</li></ul><blockquote>Reservation is highly recommended, especially for dinner service.</blockquote><p>For reservations, call <a href="tel:+84123456788">+84 123 456 788</a> or visit our concierge.</p>'
        }
      ]
    },
    {
      id: 3,
      name: "VIP Butler Service",
      category: "services",
      icon: "fa-crown",
      iconColor: "linear-gradient(135deg, #f59e0b, #d97706)",
      status: "inactive",
      posts: []
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedFeatures, setExpandedFeatures] = useState<Set<number>>(new Set());
  
  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [translateModalOpen, setTranslateModalOpen] = useState(false);
  const [addFeatureModalOpen, setAddFeatureModalOpen] = useState(false);
  const [currentEditingPost, setCurrentEditingPost] = useState<Post | null>(null);
  const [currentTranslatingPost, setCurrentTranslatingPost] = useState<Post | null>(null);

  // Filter features based on search and filters
  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || feature.category === categoryFilter;
    const matchesStatus = !statusFilter || feature.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Toggle feature expansion
  const toggleFeature = (featureId: number) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  // Post management functions
  const editPost = (post: Post) => {
    setCurrentEditingPost(post);
    setEditModalOpen(true);
  };

  const translatePost = (post: Post) => {
    setCurrentTranslatingPost(post);
    setTranslateModalOpen(true);
  };

  const deletePost = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      alert(`Post #${postId} deleted successfully!`);
    }
  };

  const addPost = (featureId: number) => {
    setCurrentEditingPost(null);
    setEditModalOpen(true);
  };

  // Modal handlers
  const handleSavePost = (postData: any) => {
    console.log('Saving post:', postData);
    alert('Post saved successfully!');
    setEditModalOpen(false);
  };

  const handleSaveFeature = (featureData: FormData) => {
    console.log('Creating feature:', featureData);
    alert('Feature created successfully!');
    setAddFeatureModalOpen(false);
  };

  const handleTranslate = (translationData: any) => {
    console.log('Translation data:', translationData);
    alert('Translation accepted and will be saved as a new post!');
  };

  return (
    <div className="features-page">
      {/* Header */}
      <div className="features-header">
        <div>
          <h2 className="features-title">Hotel Features & Posts</h2>
          <p className="features-subtitle">Manage features and edit their content directly</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setAddFeatureModalOpen(true)}
        >
          <i className="fas fa-plus"></i>
          Add Feature
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="general">General</option>
          <option value="services">Services</option>
          <option value="facilities">Facilities</option>
          <option value="activities">Activities</option>
        </select>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Features List */}
      <div className="features-list">
        {filteredFeatures.map(feature => (
          <div key={feature.id} className="feature-item">
            <div
              className={`feature-header ${expandedFeatures.has(feature.id) ? 'expanded' : ''}`}
              onClick={() => toggleFeature(feature.id)}
            >
              <div className="feature-icon" style={{ background: feature.iconColor }}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <div className="feature-info">
                <div className="feature-details">
                  <h3>{feature.name}</h3>
                  <div className="feature-meta">
                    <span className="feature-category">{feature.category}</span>
                    <div className="posts-count">
                      <i className="fas fa-file-alt"></i>
                      <span>{feature.posts.length} posts</span>
                    </div>
                    <span className={`status-badge status-${feature.status}`}>
                      {feature.status}
                    </span>
                  </div>
                </div>
              </div>
              <i className="fas fa-chevron-down expand-icon"></i>
            </div>
            
            <div className={`feature-content ${expandedFeatures.has(feature.id) ? 'expanded' : ''}`}>
              <div className="posts-section">
                <div className="posts-header">
                  <h4 className="posts-title">Posts in this Feature</h4>
                  <button
                    className="add-post-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addPost(feature.id);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                    Add Post
                  </button>
                </div>
                
                {feature.posts.length === 0 ? (
                  <div className="empty-posts">
                    <div className="empty-icon">
                      <i className="fas fa-file-plus"></i>
                    </div>
                    <p>No posts created yet for this feature.</p>
                    <p>Click "Add Post" to create the first post.</p>
                  </div>
                ) : (
                  <div className="posts-list">
                    {feature.posts.map(post => (
                      <div key={post.id} className="post-item">
                        <div className="post-header">
                          <div className="post-locale">
                            <div className={`locale-flag ${post.flagClass}`}>
                              {post.flagClass === 'vi' ? 'VN' : post.flagClass.toUpperCase()}
                            </div>
                            {post.localeName}
                          </div>
                          <div className="post-actions">
                            <button
                              className="btn-small btn-edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                editPost(post);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                              Edit
                            </button>
                            <button
                              className="btn-small btn-translate"
                              onClick={(e) => {
                                e.stopPropagation();
                                translatePost(post);
                              }}
                            >
                              <i className="fas fa-language"></i>
                              Translate
                            </button>
                            <button
                              className="btn-small btn-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deletePost(post.id);
                              }}
                            >
                              <i className="fas fa-trash"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="post-content">
                          <div className="post-title">{post.title}</div>
                          <div className="post-excerpt">{post.excerpt}</div>
                        </div>
                        <div className="post-meta">
                          <div className="post-status">
                            <div className={`status-dot status-${post.status}`}></div>
                            {post.status}
                          </div>
                          <span>Updated: {post.updatedAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddFeatureModal
        isOpen={addFeatureModalOpen}
        onClose={() => setAddFeatureModalOpen(false)}
        onSave={handleSaveFeature}
      />

      <EditPostModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        post={currentEditingPost}
        onSave={handleSavePost}
      />

      <TranslateModal
        isOpen={translateModalOpen}
        onClose={() => setTranslateModalOpen(false)}
        post={currentTranslatingPost}
        onTranslate={handleTranslate}
      />
    </div>
  );
};

export default Features;