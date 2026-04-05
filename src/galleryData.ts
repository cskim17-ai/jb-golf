export interface GalleryItem {
  id: string;
  type: 'video' | 'photo';
  title?: string;
  description?: string;
  url: string;
  thumbnail?: string;
}

const base = import.meta.env.BASE_URL;

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'v1',
    type: 'video',
    title: '가성비 동계골프1 시리즈 시작',
    description: '여행사 패키지가 아닌 순수 경험을 바탕으로, 스스로 예약하고 라운드하는 가성비 동계 골프의 전체적인 가이드 시리즈를 시작하는 인트로 영상입니다.',
    url: 'https://www.youtube-nocookie.com/embed/lN_LWfM26bY',
  },
  {
    id: 'v2',
    type: 'video',
    title: '가성비 동계골프 1 (재편집 버전)',
    description: '국내 골프장 비용 부담을 피해 해외로 눈을 돌리는 골퍼들을 위해, 스스로 일정을 짜고 릴랙스할 수 있는 가성비 시리즈의 목적을 설명합니다.',
    url: 'https://www.youtube-nocookie.com/embed/h-kMrLGDdjo',
  },
  {
    id: 'v3',
    type: 'video',
    title: '가성비동계골프2 가성비의 정의',
    description: "단순 견적보다 '불포함 금액(카트비, 캐디팁 등)'을 최소화하는 것이 핵심입니다. 마진을 줄이고 자유로운 일정을 만드는 가성비 여행의 개념을 정리합니다.",
    url: 'https://www.youtube-nocookie.com/embed/HB5el0iWGbs',
  },
  {
    id: 'v4',
    type: 'video',
    title: '가성비 동계골프 2 (심화 버전)',
    description: '여행사 견적에 숨겨진 불포함 비용의 함정을 파악하고, 이를 직접 예약과 노캐디 라운드로 극복하여 비용을 절반으로 줄이는 전략을 제시합니다.',
    url: 'https://www.youtube-nocookie.com/embed/Qg448bG_1-Y',
  },
  {
    id: 'v5',
    type: 'video',
    title: '가성비동계골프3-1 말레이시아 추천',
    description: '괌, 사이판보다 합리적인 가격대에 노캐디 라운드가 일반적인 말레이시아를 추천하며, 직접 예약을 통해 비용을 절감하는 노하우를 공유합니다.',
    url: 'https://www.youtube-nocookie.com/embed/UPk2WcVkfcI',
  },
  {
    id: 'v6',
    type: 'video',
    title: '가성비동계골프3-1 (재안내 버전)',
    description: '노캐디 골프가 가능한 동남아 지역 중 말레이시아를 최종 후보로 선정한 배경과 100% 내돈내산 경험담임을 강조하며 신뢰도를 높인 영상입니다.',
    url: 'https://www.youtube-nocookie.com/embed/lhL72XX697Y',
  },
  {
    id: 'v7',
    type: 'video',
    title: '가성비동계골프3-2 조호바루의 장점',
    description: '말레이시아 3대 골프 지역(KL, 조호바루, 코타) 중 조호바루가 날씨와 접근성 면에서 왜 가성비 동계 골프의 성지인지 상세히 비교 설명합니다.',
    url: 'https://www.youtube-nocookie.com/embed/LTDcAywXZzs',
  },
  {
    id: 'v8',
    type: 'video',
    title: '가성비동계골프3-2 (중복 정보 포함)',
    description: '말레이시아 지역별 골프 특징을 재정리하며, 특히 조호바루가 타 지역에 비해 날씨가 쾌적하고 가성비가 높은 이유를 다시 한번 강조합니다.',
    url: 'https://www.youtube-nocookie.com/embed/z2Yd6Bg16Rg',
  },
  {
    id: 'v9',
    type: 'video',
    title: '가성비동계골프4 실제 경비 공개',
    description: '최근 2년간 조호바루 골프 여행의 1인당 총경비(항공, 숙박, 라운드 포함)를 공개하여 여행사 상품 대비 얼마나 경제적인지 구체적 수치로 보여줍니다.',
    url: 'https://www.youtube-nocookie.com/embed/rF8HS9ZJxYw',
  },
  {
    id: 'v10',
    type: 'video',
    title: '가성비동계골프5 조호바루 가는 법',
    description: '싱가포르 육로 입국과 쿠알라룸푸르 국내선 환승 방법을 비교합니다. 출입국 절차와 항공사별 노선을 고려할 때 환승 이용이 더 편리할 수 있음을 안내합니다.',
    url: 'https://www.youtube-nocookie.com/embed/x8sSfSb7FBU',
  },
  {
    id: 'v11',
    type: 'video',
    title: '가성비동계골프6 조호바루 골프장 현황',
    description: '조호바루 내 노캐디 운영 골프장과 캐디 필수 골프장을 구분해 줍니다. 한국인이 많은 곳과 공항 근처 라운딩 팁 등 골프장별 특징을 요약합니다.',
    url: 'https://www.youtube-nocookie.com/embed/9woUYn98C20',
  },
  {
    id: 'v12',
    type: 'video',
    title: '가성비동계골프7 추천 골프장 리스트',
    description: '포레스트 시티, 탄종 푸테리 등 가성비와 코스 품질을 모두 잡은 골프장들을 소개하며, 시니어 할인 혜택 및 이동 편의성에 따른 추천 명소를 정리합니다.',
    url: 'https://www.youtube-nocookie.com/embed/1S2_c15l7EQ',
  },
  {
    id: 'v13',
    type: 'video',
    title: '가성비동계골프8 골프장 예약 방법',
    description: "말레이시아 채팅 앱인 'WhatsApp'을 설치하면 직접 예약도 어렵지 않습니다. 번역기를 활용해 현지 골프장과 소통하며 직접 예약하는 법을 소개합니다.",
    url: 'https://www.youtube-nocookie.com/embed/5zlFATWHHtg',
  },
  {
    id: 'v14',
    type: 'video',
    title: '가성비동계골프9 숙소의 종류',
    description: '골프텔도 좋지만 시내 이동이 편리한 레지던스를 추천합니다. 에어비앤비와 호텔 예약 사이트 가격을 비교하여 가성비 있게 예약하는 팁을 제공합니다.',
    url: 'https://www.youtube-nocookie.com/embed/3jHRr7uJmvg',
  },
  {
    id: 'v15',
    type: 'video',
    title: '가성비동계골프10 #조호바루 숙소 위치',
    description: '조호바루 시내(시티 센터, 오스틴 등)에 숙소를 잡으면 그랩 이동이 쉽고 맛집과 쇼핑몰 접근성이 좋아 골프와 현지 문화를 동시에 즐기기 최적입니다.',
    url: 'https://www.youtube-nocookie.com/embed/OEg-wgP22Rk',
  },
  {
    id: 'p1',
    type: 'photo',    
    url: `${base}image/20250114_171725.jpg`,
  },
  {
    id: 'p2',
    type: 'photo',    
    url: `${base}image/20250115_084441.jpg`,
  },
  {
    id: 'p3',
    type: 'photo',    
    url: `${base}image/20250115_103712.jpg`,
  },
  {
    id: 'p4',
    type: 'photo',    
    url: `${base}image/20250114_115818.jpg`,
  },
  {
    id: 'p5',
    type: 'photo',    
    url: `${base}image/20250115_141634.jpg`,
  },
  {
    id: 'p6',
    type: 'photo',    
    url: `${base}image/20250116_085020.jpg`,
  },
  {
    id: 'p7',
    type: 'photo',    
    url: `${base}image/20250116_131554.jpg`,
  },
  {
    id: 'p8',
    type: 'photo',    
    url: `${base}image/20250116_194604.jpg`,
  }
];
