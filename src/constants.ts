export interface GolfCourse {
  id: string;
  name: string;
  category: 'Premium' | 'Value' | 'Accessibility';
  travelTime: number; // minutes from KSL
  holes: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  nightGolf: boolean;
  pricing: {
    weekday: { morning: number; afternoon: number };
    weekend: { morning: number; afternoon: number };
    seniorDiscount: number;
    caddyFee: number;
  };
  promotion?: string;
  websiteUrl: string;
  image: string;
  location: { lat: number; lng: number };
}

export interface StayUnit {
  id: string;
  title: string;
  capacity: 4 | 6 | 8;
  type: '2BR' | '3BR' | '4BR/Penthouse';
  pricePerNight: number;
  rating: number;
  image: string;
  airbnbUrl: string;
}

export const EXCHANGE_RATE = 315; // 1 MYR = 315 KRW (Mock)

export const KSL_LOCATION = { lat: 1.485, lng: 103.763 };

export const GOLF_COURSES: GolfCourse[] = [
  {
    id: 'forest-city',
    name: '포레스트 시티 (Forest City)',
    category: 'Premium',
    travelTime: 45,
    holes: 36,
    difficulty: 'Hard',
    nightGolf: false,
    pricing: {
      weekday: { morning: 450, afternoon: 400 },
      weekend: { morning: 650, afternoon: 550 },
      seniorDiscount: 50,
      caddyFee: 120,
    },
    promotion: '3인 이상 예약 시 조식 포함',
    websiteUrl: 'https://fcgolfresort.com/',
    image: 'https://fcgolfresort.com/wp-content/uploads/elementor/thumbs/legecy-r5cqm5mxdou51u46d51gmpsgsc0a56y5sq9pm63n7k.jpg',
    location: { lat: 1.345, lng: 103.523 },
  },
  {
    id: 'tanjung-puteri',
    name: '탄중푸테리 CC (Tanjung Puteri)',
    category: 'Premium',
    travelTime: 40,
    holes: 54,
    difficulty: 'Moderate',
    nightGolf: true,
    pricing: {
      weekday: { morning: 380, afternoon: 320 },
      weekend: { morning: 520, afternoon: 450 },
      seniorDiscount: 40,
      caddyFee: 100,
    },
    promotion: '주중 2인 플레이 가능',
    websiteUrl: 'https://www.tpgr.com/golf',
    image: 'https://d1yei2z3i6k35z.cloudfront.net/12581801/68308d5fa7b10_TPGRGolf1.jpg',
    location: { lat: 1.478, lng: 103.912 },
  },
  {
    id: 'horizon-hills',
    name: '호라이즌힐스 골프 (Horizon Hills)',
    category: 'Premium',
    travelTime: 25,
    holes: 18,
    difficulty: 'Hard',
    nightGolf: false,
    pricing: {
      weekday: { morning: 420, afternoon: 380 },
      weekend: { morning: 600, afternoon: 500 },
      seniorDiscount: 45,
      caddyFee: 110,
    },
    promotion: '비수기 특별 할인 진행 중',
    websiteUrl: 'https://hhgcc.com.my/',
    image: 'https://hhgcc.com.my/wp-content/uploads/2022/02/img1-1-min.jpg',
    location: { lat: 1.465, lng: 103.654 },
  },
  {
    id: 'ponderosa',
    name: '폰데로사 골프 (Ponderosa)',
    category: 'Accessibility',
    travelTime: 10,
    holes: 18,
    difficulty: 'Moderate',
    nightGolf: true,
    pricing: {
      weekday: { morning: 280, afternoon: 240 },
      weekend: { morning: 380, afternoon: 320 },
      seniorDiscount: 30,
      caddyFee: 90,
    },
    promotion: '나이트 골프 패키지 운영',
    websiteUrl: 'https://www.ponderosagolf.com/services/cid/9479/',
    image: 'https://cdn1.npcdn.net/images/1768834893qzzTxH6446d860dbbfe540e9e2cbab5f98f1e3.webp?md5id=2791cbf7a6b8b8c08804168ddcf1c172&new_width=1600&new_height=1600&size=max&w=1773902801&from=png&type=12&off_wm=1',
    location: { lat: 1.492, lng: 103.778 },
  },
  {
    id: 'austin-heights',
    name: '오스틴하이츠 골프 (Austin Heights)',
    category: 'Accessibility',
    travelTime: 15,
    holes: 18,
    difficulty: 'Moderate',
    nightGolf: false,
    pricing: {
      weekday: { morning: 300, afternoon: 260 },
      weekend: { morning: 400, afternoon: 340 },
      seniorDiscount: 35,
      caddyFee: 95,
    },
    promotion: '인근 마사지 샵 연계 할인',
    websiteUrl: 'https://blog.naver.com/108hole/221267537558',
    image: 'https://www.hotelscombined.co.kr/himg/ad/8e/d0/ostrovok-2677777-2263c0-641399.jpg',
    location: { lat: 1.554, lng: 103.782 },
  },
  {
    id: 'starhill',
    name: '스타힐 CC (Starhill)',
    category: 'Value',
    travelTime: 20,
    holes: 36,
    difficulty: 'Easy',
    nightGolf: false,
    pricing: {
      weekday: { morning: 220, afternoon: 180 },
      weekend: { morning: 320, afternoon: 260 },
      seniorDiscount: 25,
      caddyFee: 80,
    },
    promotion: '가성비 최고의 선택',
    websiteUrl: 'https://m.blog.naver.com/iltagolf/222980821984',
    image: 'https://mblogthumb-phinf.pstatic.net/20141209_32/ii202ii_1418083090170l9u5n_JPEG/%B8%BB%B7%B9%C0%CC%BD%C3%BE%C6_%C1%B6%C8%A3%B9%D9%B7%E7_%B0%F1%C7%C1_%BD%BA%C5%B8%C8%FA%B0%F1%C7%C1%C5%AC%B7%B4_%284%29.jpg?type=w420',
    location: { lat: 1.567, lng: 103.712 },
  },
  {
    id: 'daiman18',
    name: '다이만18CC (Daiman 18)',
    category: 'Value',
    travelTime: 15,
    holes: 18,
    difficulty: 'Easy',
    nightGolf: false,
    pricing: {
      weekday: { morning: 180, afternoon: 150 },
      weekend: { morning: 260, afternoon: 220 },
      seniorDiscount: 20,
      caddyFee: 70,
    },
    promotion: '초보자 연습용 추천',
    websiteUrl: 'https://daiman18golf.com/',
    image: 'https://club.tigergds.com/Image?FileName=e3958823f87d4590ab7f797f24d4bee4-1',
    location: { lat: 1.534, lng: 103.812 },
  },
  {
    id: 'impian-emas',
    name: '임피안에마스 (Impian Emas)',
    category: 'Value',
    travelTime: 20,
    holes: 9,
    difficulty: 'Easy',
    nightGolf: true,
    pricing: {
      weekday: { morning: 150, afternoon: 120 },
      weekend: { morning: 220, afternoon: 180 },
      seniorDiscount: 15,
      caddyFee: 60,
    },
    promotion: '9홀 가벼운 라운딩 최적',
    websiteUrl: 'https://siwonsiwon.tistory.com/131',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbtVtZhPm3lz1BDlzfhKjRekUn8iT-254IcQ&s',
    location: { lat: 1.545, lng: 103.689 },
  },
  {
    id: 'permas-jaya',
    name: '퍼마스 자야 골프클럽 (Permas Jaya)',
    category: 'Accessibility',
    travelTime: 12,
    holes: 9,
    difficulty: 'Easy',
    nightGolf: false,
    pricing: {
      weekday: { morning: 140, afternoon: 110 },
      weekend: { morning: 200, afternoon: 160 },
      seniorDiscount: 15,
      caddyFee: 60,
    },
    promotion: '도심 속 접근성 우수',
    websiteUrl: 'https://www.facebook.com/permasjayagolf?mibextid=ZbWKwL',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoChn8idjdGUDitLT8IVfjK3Tip5yw1hxOA&s',
    location: { lat: 1.498, lng: 103.823 },
  },
  {
    id: 'ioi-palm-villa',
    name: 'IOI 팜 빌라 (IOI Palm Villa)',
    category: 'Value',
    travelTime: 30,
    holes: 27,
    difficulty: 'Moderate',
    nightGolf: false,
    pricing: {
      weekday: { morning: 240, afternoon: 200 },
      weekend: { morning: 340, afternoon: 280 },
      seniorDiscount: 30,
      caddyFee: 85,
    },
    promotion: '팜 트리 숲의 아름다운 전경',
    websiteUrl: 'https://www.palmvilla.com.my/Home/',
    image: 'https://www.palmvilla.com.my/data/images/item/img_55_IMG_7509.jpg',
    location: { lat: 1.634, lng: 103.645 },
  },
  {
    id: 'senibong',
    name: '세니봉 (Senibong)',
    category: 'Accessibility',
    travelTime: 15,
    holes: 18,
    difficulty: 'Moderate',
    nightGolf: false,
    pricing: {
      weekday: { morning: 260, afternoon: 220 },
      weekend: { morning: 360, afternoon: 300 },
      seniorDiscount: 30,
      caddyFee: 90,
    },
    promotion: '강변 코스의 시원한 바람',
    websiteUrl: 'https://www.senibonggolfclub.com.my/',
    image: 'https://www.senibonggolfclub.com.my/img/pages/home/banner/xxl.webp',
    location: { lat: 1.485, lng: 103.845 },
  },
];

export const STAY_UNITS: StayUnit[] = [
  // 4 Persons (10 units)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `stay-4-${i}`,
    title: `Residence R9 Luxury 2BR Unit #${i + 101}`,
    capacity: 4 as const,
    type: '2BR' as const,
    pricePerNight: 180 + i * 5,
    rating: 4.9 - i * 0.02,
    image: `https://picsum.photos/seed/stay4p${i}/800/600`,
    airbnbUrl: `https://www.stay4_${String(i + 1).padStart(2, '0')}.com`,
  })),
  // 6 Persons (10 units)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `stay-6-${i}`,
    title: `Residence R9 Premium 3BR Unit #${i + 201}`,
    capacity: 6 as const,
    type: '3BR' as const,
    pricePerNight: 280 + i * 10,
    rating: 4.85 - i * 0.02,
    image: `https://picsum.photos/seed/stay6p${i}/800/600`,
    airbnbUrl: `https://www.stay6_${String(i + 1).padStart(2, '0')}.com`,
  })),
  // 8 Persons (10 units)
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `stay-8-${i}`,
    title: `Residence R9 Penthouse 4BR Unit #${i + 301}`,
    capacity: 8 as const,
    type: '4BR/Penthouse' as const,
    pricePerNight: 450 + i * 20,
    rating: 4.95 - i * 0.01,
    image: `https://picsum.photos/seed/stay8p${i}/800/600`,
    airbnbUrl: `https://www.stay8_${String(i + 1).padStart(2, '0')}.com`,
  })),
];
