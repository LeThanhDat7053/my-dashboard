// src/data/mockCategories.ts

import type { Category } from '../types/categories';

export const mockCategories: Category[] = [
  {
    id: 1,
    slug: 'general',
    icon: 'info-circle',
    status: 'active',
    type: 'system',
    featureCount: 12,
    translations: {
      en: {
        title: 'General',
        description: 'Basic hotel information like check-in/out, policies, and general guidance'
      },
      vi: {
        title: 'Chung',
        description: 'Thông tin cơ bản về khách sạn như nhận/trả phòng, chính sách và hướng dẫn chung'
      },
      ja: {
        title: '一般',
        description: 'チェックイン/アウト、ポリシー、一般的なガイダンスなどの基本的なホテル情報'
      }
    }
  },
  {
    id: 2,
    slug: 'services',
    icon: 'concierge-bell',
    status: 'active',
    type: 'system',
    featureCount: 21,
    translations: {
      en: {
        title: 'Services',
        description: 'Hotel services like room service, concierge, laundry, and guest assistance'
      },
      vi: {
        title: 'Dịch vụ',
        description: 'Các dịch vụ khách sạn như phục vụ phòng, lễ tân, giặt ủi và hỗ trợ khách'
      },
      ja: {
        title: 'サービス',
        description: 'ルームサービス、コンシェルジュ、ランドリー、ゲストサポートなどのホテルサービス'
      }
    }
  },
  {
    id: 3,
    slug: 'facilities',
    icon: 'building',
    status: 'active',
    type: 'system',
    featureCount: 7,
    translations: {
      en: {
        title: 'Facilities',
        description: 'Physical facilities like spa, gym, pool, and recreational areas'
      },
      vi: {
        title: 'Tiện ích',
        description: 'Các tiện ích vật lý như spa, phòng gym, hồ bơi và khu vui chơi giải trí'
      },
      ja: {
        title: '施設',
        description: 'スパ、ジム、プール、レクリエーションエリアなどの物理的な施設'
      }
    }
  },
  {
    id: 4,
    slug: 'activities',
    icon: 'hiking',
    status: 'active',
    type: 'system',
    featureCount: 8,
    translations: {
      en: {
        title: 'Activities',
        description: 'Activities and entertainment options available to guests'
      },
      vi: {
        title: 'Hoạt động',
        description: 'Các hoạt động và lựa chọn giải trí có sẵn cho khách'
      },
      ja: {
        title: 'アクティビティ',
        description: 'ゲストが利用できるアクティビティとエンターテイメントオプション'
      }
    }
  },
  {
    id: 5,
    slug: 'vip-services',
    icon: 'star',
    status: 'active',
    type: 'custom',
    featureCount: 5,
    translations: {
      en: {
        title: 'VIP Services',
        description: 'Premium services exclusive to VIP and suite guests'
      },
      vi: {
        title: 'Dịch vụ VIP',
        description: 'Dịch vụ cao cấp dành riêng cho khách VIP và khách ở suite'
      },
      ja: {
        title: 'VIPサービス',
        description: 'VIPおよびスイートゲスト限定のプレミアムサービス'
      }
    }
  }
];