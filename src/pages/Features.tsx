import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faSignInAlt, faUtensils, faCrown, faFileAlt, faChevronDown, 
  faCirclePlus, faEdit, faLanguage, faTrash 
} from '@fortawesome/free-solid-svg-icons';
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
  const [features, setFeatures] = useState<Feature[]>([
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
  const [expandedFeatures, setExpandedFeatures] = useState<Set<number>>(new Set([1]));
  
  // Modal states
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeFeatureId, setActiveFeatureId] = useState<number | null>(1);

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
  const handleEditPostClick = (post: Post) => {
    setSelectedPost(post);
    setIsEditPostModalOpen(true);
  };

  const handleTranslateClick = (post: Post) => {
    setSelectedPost(post);
    setIsTranslateModalOpen(true);
  };

  const deletePost = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      alert(`Post #${postId} deleted successfully!`);
    }
  };

  const addPost = (featureId: number) => {
    console.log("Adding post to feature:", featureId);
    setSelectedPost(null);
    setIsEditPostModalOpen(true);
  };

  // Modal handlers
  const handleSavePost = (postData: any) => {
    console.log('Saving post:', postData);
    alert('Post saved successfully!');
    setIsEditPostModalOpen(false);
  };

  const handleSaveFeature = (formData: FormData) => {
    console.log('Saving feature:', formData);
    alert('Feature saved successfully!');
    setIsAddFeatureModalOpen(false);
  };

  const handleTranslate = (translationData: any) => {
    console.log('Translated data:', translationData);
    setIsTranslateModalOpen(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'fa-sign-in-alt': return faSignInAlt;
      case 'fa-utensils': return faUtensils;
      case 'fa-crown': return faCrown;
      default: return faFileAlt;
    }
  }

  return (
    <div className="p-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Hotel Features & Posts</h2>
          <p className="text-sm text-slate-600 mt-1">Manage features and edit their content directly</p>
        </div>
        <button
          className="bg-blue-600 text-white border-none px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2 transition-colors hover:bg-blue-700"
          onClick={() => setIsAddFeatureModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Feature
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6 flex gap-4 items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white min-w-[120px]"
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
          className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white min-w-[120px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filteredFeatures.map(feature => (
          <div key={feature.id} className="border-b border-slate-200 last:border-b-0">
            <div
              className={`flex items-center p-4 cursor-pointer transition-all ${expandedFeatures.has(feature.id) ? 'bg-blue-50 border-b border-blue-200' : 'hover:bg-slate-50'}`}
              onClick={() => toggleFeature(feature.id)}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg text-white mr-4" style={{ background: feature.iconColor }}>
                <FontAwesomeIcon icon={getIcon(feature.icon)} />
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{feature.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">{feature.category}</span>
                    <div className="flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faFileAlt} />
                      <span>{feature.posts.length} posts</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${feature.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {feature.status}
                    </span>
                  </div>
                </div>
              </div>
              <FontAwesomeIcon icon={faChevronDown} className={`text-slate-600 text-base transition-transform ${expandedFeatures.has(feature.id) ? 'rotate-180' : ''}`} />
            </div>
            
            <div className={`bg-slate-50 transition-all duration-300 ease-in-out overflow-hidden ${expandedFeatures.has(feature.id) ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-base font-semibold text-slate-900">Posts in this Feature</h4>
                  <button
                    className="bg-green-600 text-white border-none px-4 py-2 rounded-md text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors hover:bg-green-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      addPost(feature.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Post
                  </button>
                </div>
                
                {feature.posts.length === 0 ? (
                  <div className="text-center py-10 text-slate-500">
                    <div className="text-5xl text-slate-300 mb-4">
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </div>
                    <p>No posts created yet for this feature.</p>
                    <p>Click "Add Post" to create the first post.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {feature.posts.map(post => (
                      <div key={post.id} className="bg-white border border-slate-200 rounded-lg p-4 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 font-semibold text-slate-900">
                            <div className={`w-5 h-3.5 rounded-sm flex items-center justify-center text-xs font-bold text-white ${post.flagClass === 'vi' ? 'bg-red-600' : 'bg-blue-900'}`}>
                              {post.flagClass.toUpperCase()}
                            </div>
                            {post.localeName}
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="px-2 py-1 border-none rounded text-xs font-medium cursor-pointer flex items-center gap-1 transition-all bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                              onClick={(e) => { e.stopPropagation(); handleEditPostClick(post); }}
                            >
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button
                              className="px-2 py-1 border-none rounded text-xs font-medium cursor-pointer flex items-center gap-1 transition-all bg-green-50 text-green-800 border border-green-200 hover:bg-green-100"
                              onClick={(e) => { e.stopPropagation(); handleTranslateClick(post); }}
                            >
                              <FontAwesomeIcon icon={faLanguage} /> Translate
                            </button>
                            <button
                              className="px-2 py-1 border-none rounded text-xs font-medium cursor-pointer flex items-center gap-1 transition-all bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                              onClick={(e) => { e.stopPropagation(); deletePost(post.id); }}
                            >
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                          </div>
                        </div>
                        <div className="text-slate-600 text-sm leading-normal">
                          <div className="font-semibold text-slate-900 mb-2">{post.title}</div>
                          <div className="line-clamp-2">{post.excerpt}</div>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${post.status === 'published' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
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
        isOpen={isAddFeatureModalOpen}
        onClose={() => setIsAddFeatureModalOpen(false)}
        onSave={handleSaveFeature}
      />

      <EditPostModal
        isOpen={isEditPostModalOpen}
        onClose={() => setIsEditPostModalOpen(false)}
        post={selectedPost}
        onSave={handleSavePost}
      />

      <TranslateModal
        isOpen={isTranslateModalOpen}
        onClose={() => setIsTranslateModalOpen(false)}
        post={selectedPost}
        onTranslate={handleTranslate}
      />
    </div>
  );
};

export default Features;