export interface GalleryItem {
  id: string;
  type: 'video' | 'photo';
  title?: string;
  description?: string;
  url: string;
  thumbnail?: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'v1',
    type: 'video',
    title: '포레스트 시티',
    description: '잭니클라우스 설계, 세계 100대 코스의 위용 클래식/레거시 코스 전경과 고퀄리티 드론 샷 포함',
    url: 'https://www.youtube-nocookie.com/embed/inbdyhFiu2k',
  },
  {
    id: 'v2',
    type: 'video',
    title: '탄중푸테리 CC',
    description: '54홀 대단지 리조트 코스 완벽 가이드. 플랜테이션, 빌리지 코스의 울창한 숲 라운딩 영상',
    url: 'https://www.youtube-nocookie.com/embed/f8gl8DmYphM',
  },
  {
    id: 'v3',
    type: 'video',
    title: '호라이즌 힐스',
    description: '조호바루 NO.1 명문, 아시안투어 개최지 리뷰. 빠른 그린 스피드와 정교한 코스 관리 상태 상세 안내',
    url: 'https://www.youtube-nocookie.com/embed/LtWoOvTcCm4',
  },
  {
    id: 'v4',
    type: 'video',
    title: '오스틴하이츠',
    description: '도심형 리조트 골프의 정석. 기복 있는 지형과 시내 전경이 보이는 코스 브이로그',
    url: 'https://www.youtube-nocookie.com/embed/u0vz-RmyMYY',
  },
  {
    id: 'v5',
    type: 'video',
    title: '폰데로사 골프',
    description: 'KSL 인근, 야간 골프의 낭만과 코스 전략. 도심 속 위치한 구장의 접근성과 야간 조명 시설 안내',
    url: 'https://www.youtube-nocookie.com/embed/MDRkwyKEkrA',
  },
  {
    id: 'v6',
    type: 'video',
    title: '스타힐 CC',
    description: '36홀 대규모 단지. 부킷/빈탕 코스의 상이한 매력과 한국 골퍼 친화적인 부대시설 소개',
    url: 'https://www.youtube-nocookie.com/embed/rDPKX5qenOg',
  },
  {
    id: 'v7',
    type: 'video',
    title: '다이만 18 CC',
    description: '초가성비 라운딩의 정석. 평지형 코스로 초보자에게 적합한 환경과 깔끔한 그린 상태 확인',
    url: 'https://www.youtube-nocookie.com/embed/OMpP9X2RTJk',
  },
  {
    id: 'v8',
    type: 'video',
    title: '임피안 에마스',
    description: '정교하게 관리된 페어웨이와 최상급 숏게임 연습장. 실력 향상을 위한 최적의 골프장 리뷰',
    url: 'https://www.youtube-nocookie.com/embed/s8tbNxWDgTU',
  },
  {
    id: 'v9',
    type: 'video',
    title: '퍼마스 자야',
    description: '도심 속 9홀의 묘미. 부담 없는 가격과 접근성으로 즐기는 실속형 골프 코스 가이드',
    url: 'https://www.youtube-nocookie.com/embed/s8tbNxWDgTU',
  },
  {
    id: 'v10',
    type: 'video',
    title: 'IOI 팜 빌라',
    description: '야자수가 어우러진 이국적인 풍경. 공항 인접성과 넓은 페어웨이를 자랑하는 코스 전경',
    url: 'https://www.youtube-nocookie.com/embed/_I_A7AkweLE',
  },
  {
    id: 'v11',
    type: 'video',
    title: '세니봉 (플레장스)',
    description: '최근 리노베이션을 통한 최상의 컨디션. 짧지만 정교한 샷을 요구하는 숨은 명소 리뷰',
    url: 'https://www.youtube-nocookie.com/embed/kvOIoYp04EI',
  }, 
  {
    id: 'p1',
    type: 'photo',    
    url: 'image/20250114_171725.jpg', // 수정됨
  },
  {
    id: 'p2',
    type: 'photo',    
    url: 'image/20250115_084441.jpg', // 수정됨
  },
  {
    id: 'p3',
    type: 'photo',    
    url: 'image/20250115_103712.jpg', // 수정됨
  },
  {
    id: 'p4',
    type: 'photo',    
    url: 'image/20250114_115818.jpg', // 수정됨
  },
  {
    id: 'p5',
    type: 'photo',    
    url: 'image/20250115_141634.jpg', // 수정됨
  },
  {
    id: 'p6',
    type: 'photo',    
    url: 'image/20250116_085020.jpg', // 수정됨
  },
  {
    id: 'p7',
    type: 'photo',    
    url: 'image/20250116_131554.jpg', // 수정됨
  },
  {
    id: 'p8',
    type: 'photo',    
    url: 'image/20250116_194604.jpg', // 수정됨
  }
];
