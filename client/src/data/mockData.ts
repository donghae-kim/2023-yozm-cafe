import type { Cafe, CafeMenu, LocationData, Rank } from '../types';

export const cafeMarker: LocationData[] = [
  {
    id: 1,
    name: '텅 성수 스페이스',
    address: '서울특별시 성동구 성수이로 82 2층',
    latitude: 37.514933,
    longitude: 127.102604,
  },
  {
    id: 2,
    name: '텅 성수 스페이스',
    address: '서울특별시 성동구 성수이로 82 2층',
    latitude: 37.5144,
    longitude: 127.1028,
  },
  {
    id: 3,
    name: '텅 성수 스페이스',
    address: '서울특별시 성동구 성수이로 82 2층',
    latitude: 37.5077,
    longitude: 127.1067,
  },
];

export const RankCafes: Rank[] = [
  { id: 1, rank: 1, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 50 },
  { id: 2, rank: 2, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 49 },
  { id: 3, rank: 3, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 48 },
  { id: 4, rank: 4, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 47 },
  { id: 5, rank: 5, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 46 },
  { id: 6, rank: 6, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 45 },
  { id: 7, rank: 7, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 44 },
  { id: 8, rank: 8, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 43 },
  { id: 9, rank: 9, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 42 },
  { id: 10, rank: 10, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 41 },
  { id: 11, rank: 11, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 40 },
  { id: 12, rank: 12, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 39 },
  { id: 13, rank: 13, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 38 },
  { id: 14, rank: 14, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 37 },
  { id: 15, rank: 15, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 36 },
  { id: 16, rank: 16, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 35 },
  { id: 17, rank: 17, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 34 },
  { id: 18, rank: 18, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 33 },
  { id: 19, rank: 19, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 32 },
  { id: 20, rank: 20, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 31 },
  { id: 21, rank: 21, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 30 },
  { id: 22, rank: 22, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 29 },
  { id: 23, rank: 23, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 28 },
  { id: 24, rank: 24, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 27 },
  { id: 25, rank: 25, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 26 },
  { id: 26, rank: 26, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 25 },
  { id: 27, rank: 27, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 24 },
  { id: 28, rank: 28, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 23 },
  { id: 29, rank: 29, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 22 },
  { id: 30, rank: 30, name: '참치카페', address: '서울 성수', image: '/images/cafe-image-1.png', likeCount: 10 },
];

export const cafes: Cafe[] = [
  {
    id: 1,
    name: '성수 카페',
    address: '성수로 1길',
    images: [
      '/images/cafe-image-1.png',
      '/images/cafe-image-2.png',
      '/images/cafe-image-3.png',
      '/images/cafe-image-4.png',
      '/images/cafe-image-5.png',
    ],
    isLiked: false,
    likeCount: 1,
    detail: {
      mapUrl: 'https://map.kakao/~~',
      description: '우리 카페는 이뻐용',
      openingHours: [
        {
          day: 'MONDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'TUESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'WEDNESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'THURSDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'FRIDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SATURDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SUNDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
      ],
    },
  },
  {
    id: 2,
    name: '성수 카페2',
    address: '성수로 2길',
    images: ['/images/cafe-image-2.png', '/images/cafe-image-2.png'],
    isLiked: true,
    likeCount: 0,
    detail: {
      mapUrl: 'https://map.kakao/~~',
      description: '우리 카페는 귀여워용',
      openingHours: [
        {
          day: 'MONDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'TUESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'WEDNESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'THURSDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'FRIDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SATURDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SUNDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
      ],
    },
  },
  {
    id: 3,
    name: '성수 카페3',
    address: '성수로 3길',
    images: ['/images/cafe-image-3.png', '/images/cafe-image-3.png'],
    isLiked: true,
    likeCount: 0,
    detail: {
      mapUrl: 'https://map.kakao/~~',
      description: '우리 카페는 귀여워용',
      openingHours: [
        {
          day: 'MONDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'TUESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'WEDNESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'THURSDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'FRIDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SATURDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SUNDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
      ],
    },
  },
  {
    id: 4,
    name: '성수 카페4',
    address: '성수로 4길',
    images: ['/images/cafe-image-4.png', '/images/cafe-image-4.png'],
    isLiked: false,
    likeCount: 0,
    detail: {
      mapUrl: 'https://map.kakao/~~',
      description: '우리 카페는 귀여워용',
      openingHours: [
        {
          day: 'MONDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'TUESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'WEDNESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'THURSDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'FRIDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SATURDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SUNDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
      ],
    },
  },
  {
    id: 5,
    name: '성수 카페5',
    address: '성수로 5길',
    images: ['/images/cafe-image-5.png', '/images/cafe-image-5.png'],
    isLiked: false,
    likeCount: 0,
    detail: {
      mapUrl: 'https://map.kakao/~~',
      description: '우리 카페는 귀여워용',
      openingHours: [
        {
          day: 'MONDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'TUESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'WEDNESDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'THURSDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'FRIDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SATURDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
        {
          day: 'SUNDAY',
          open: '15:27',
          close: '15:27',
          opened: true,
        },
      ],
    },
  },
];

export const cafeMenus: CafeMenu[] = [
  {
    cafeId: 1,
    menuBoards: [
      {
        id: 1,
        priority: 1,
        imageUrl: '/images/cafe-menu-board-image-1.jpg',
      },
      {
        id: 2,
        priority: 2,
        imageUrl: '/images/cafe-menu-board-image-2.jpg',
      },
      {
        id: 3,
        priority: 3,
        imageUrl: '/images/cafe-menu-board-image-3.jpg',
      },
    ],
    menus: [
      {
        id: 1,
        priority: 2,
        name: '아메리카노',
        imageUrl: '/images/cafe-menu-image-1.jpg',
        description: '시원한 아메리카노 입니다.',
        price: '5000',
        isRecommended: true,
      },
      {
        id: 2,
        priority: 1,
        name: '라떼',
        imageUrl: null,
        description: '따뜻한 라떼 한잔 어떠세요?',
        price: '6000',
        isRecommended: false,
      },
    ],
  },
  {
    cafeId: 2,
    menuBoards: [
      {
        id: 4,
        priority: 1,
        imageUrl: '/images/cafe-menu-board-image-2.jpg',
      },
      {
        id: 5,
        priority: 2,
        imageUrl: '/images/cafe-menu-board-image-3.jpg',
      },
    ],
    menus: [
      {
        id: 3,
        priority: 1,
        name: '초코라떼',
        imageUrl: '/images/cafe-menu-image-1.jpg',
        description: '맛있는 초코라떼 초콜릿 맛',
        price: '변동',
        isRecommended: true,
      },
      {
        id: 4,
        priority: 2,
        name: '오렌지주스',
        imageUrl: '/images/cafe-menu-image-2.avif',
        description: '상큼한 과일음료 오렌지 주스',
        price: '6500~9000',
        isRecommended: false,
      },
    ],
  },
];
