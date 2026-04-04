export interface RestItem {
  id: string;
  category: string;
  name: string;
  description: string;
  reason?: string;
  address: string;
  contact?: string;
  price?: {
    foot?: string;
    body?: string;
  };
  hours?: string;
  website?: string;
  features?: string;
  photoUrl?: string;
  region?: '조호바루' | '싱가폴' | '말라카';
}

export const REST_CATEGORIES = [
  'KSL 몰 인근 추천 스파',
  '조호바루 추천 스파 (KSL 외 지역)',
  '쇼핑 & 라이프스타일',
  '관광 & 랜드마크',
  '미식 & 나이트 라이프'
];

export const REST_DATA: RestItem[] = [
  // 1. KSL 몰 인근 추천 스파
  {
    id: 'ksl-spa-1',
    category: 'KSL 몰 인근 추천 스파',
    name: '타이 오디세이 (Thai Odyssey) - KSL City Mall',
    description: '가장 신뢰도 높은 말레이시아 최대 타이 마사지 체인입니다. 격조 높은 서비스와 청결함이 특징입니다.',
    address: 'KSL City Mall, Level 2 (L2-01)',
    contact: '+60 7-289 3693',
    price: {
      foot: '(60분) 129 RM / (90분) 165 RM',
      body: '(60분) 158 RM / (90분) 218 RM (아로마 기준)'
    },
    hours: '10:00 – 22:00',
    website: 'https://thaiodyssey.com'
  },
  {
    id: 'ksl-spa-2',
    category: 'KSL 몰 인근 추천 스파',
    name: '방콕 스파 (Bangkok Spa) - Taman Pelangi',
    description: 'KSL 인근에서 가장 유명한 대형 스파입니다. 무료 픽업 서비스 덕분에 한국 관광객에게 인기가 압도적입니다.',
    address: '58, Jalan Abiad, Taman Pelangi (KSL에서 차로 3분)',
    contact: '+60 17-338 2277 (WhatsApp 예약 가능)',
    price: {
      foot: '(60분) 66 RM / (90분) 99 RM',
      body: '(60분) 66 RM / (90분) 99 RM (타이/발 가격 동일)'
    },
    hours: '11:00 – 05:00 (새벽 운영)',
    website: 'http://thebangkokspa.com'
  },
  {
    id: 'ksl-spa-3',
    category: 'KSL 몰 인근 추천 스파',
    name: '통 타이 (Thong Thai) - KSL City Mall & Opposite',
    description: 'KSL 몰 안과 맞은편에 여러 지점이 있습니다. 편안한 의자에서 영화를 보며 마사지를 즐길 수 있습니다.',
    address: 'KSL City Mall, Ground Floor (및 맞은편 Jalan Harimau Tarum 지점)',
    contact: '+60 14-584 0997',
    price: {
      foot: '(60분) 65 RM / (90분) 85 RM',
      body: '(60분) 88 RM / (90분) 118 RM'
    },
    hours: '10:00 – 03:00 (익일)'
  },
  {
    id: 'ksl-spa-4',
    category: 'KSL 몰 인근 추천 스파',
    name: '시아 오아시스 (Siam Oasis) - KSL City Mall',
    description: '힐링과 테라피에 집중한 고급 스파입니다. \'5 Senses Therapy\'라는 독자적인 코스가 유명합니다.',
    address: 'KSL City Mall, Level 2',
    contact: '+60 7-336 4950',
    price: {
      foot: '(60분) 93 RM / (90분) 125 RM',
      body: '(60분) 156 RM / (90분) 220 RM (로얄 아로마 기준)'
    },
    hours: '10:00 – 22:00',
    website: 'https://www.siamoasisgroup.com'
  },
  {
    id: 'ksl-spa-5',
    category: 'KSL 몰 인근 추천 스파',
    name: '타이 임페리얼 (Thai Imperial) - Taman Abad',
    description: '세련된 인테리어와 숙련된 테라피스트로 평점이 매우 높습니다. KSL 몰에서 도보 5~7분 거리입니다.',
    address: '70, Jalan Seladang, Taman Abad',
    contact: '+60 7-333 1355',
    price: {
      foot: '(60분) 95 RM / (90분) 130 RM',
      body: '(60분) 95 RM / (90분) 139 RM'
    },
    hours: '12:00 – 02:00 (익일)',
    website: 'https://thaiimperialspa.com'
  },
  {
    id: 'ksl-spa-6',
    category: 'KSL 몰 인근 추천 스파',
    name: '프리미엄 터치 (Premium Touch Reflexology) - KSL City Mall',
    description: '가성비 패키지가 잘 구성되어 있어 현지 거주자와 여행객 모두에게 사랑받는 곳입니다.',
    features: '발 60분 + 전신 60분 패키지(115 RM)가 가장 인기입니다.',
    address: 'KSL City Mall, Level 2',
    contact: '+60 7-331 1612',
    price: {
      foot: '(60분) 60 RM / (90분) 85 RM',
      body: '(60분) 85 RM / (90분) 115 RM'
    },
    hours: '10:00 – 22:00'
  },
  {
    id: 'ksl-spa-7',
    category: 'KSL 몰 인근 추천 스파',
    name: '디 아시아 (D\'Asia Massage) - KSL City Mall',
    description: '몰 내 저렴한 층에 위치해 있어 가격 부담이 적고, 가족 단위 방문객이 많습니다.',
    features: '페이스북(D\'Asia KSL)을 통해 프로모션을 자주 공지합니다.',
    address: 'KSL City Mall, LG Floor',
    contact: '+60 17-212 6606',
    price: {
      foot: '(60분) 65 RM / (90분) 95 RM',
      body: '(60분) 85 RM / (90분) 115 RM'
    },
    hours: '10:00 – 22:00'
  },
  {
    id: 'ksl-spa-8',
    category: 'KSL 몰 인근 추천 스파',
    name: '센추리 헬스케어 (Century Health Care) - KSL City Mall',
    description: '중국식 경혈 마사지 전문으로, 강한 압을 선호하는 분들(특히 골프 라운딩 후)께 추천합니다.',
    features: '지압(Accupressure) 위주의 시원한 마사지가 강점입니다.',
    address: 'KSL City Mall, Level 2',
    contact: '+60 7-336 4369',
    price: {
      foot: '(60분) 60 RM / (90분) 85 RM',
      body: '(60분) 85 RM / (90분) 110 RM'
    },
    hours: '11:00 – 22:00'
  },
  {
    id: 'ksl-spa-9',
    category: 'KSL 몰 인근 추천 스파',
    name: '하노이 9 스파 (Hanoi 9 Spa) - KSL City Mall',
    description: '베트남 스타일의 케어를 제공하며, 귀 청소나 샴푸 서비스가 포함된 패키지가 매력적입니다.',
    features: '전신 마사지 시 베트남식 핫스톤이 가미되는 경우가 많습니다.',
    address: 'KSL City Mall, Level 6',
    contact: '현장 문의 (몰 내 안내데스크 인근)',
    price: {
      foot: '(60분) 70 RM / (90분) 100 RM',
      body: '(60분) 90 RM / (90분) 130 RM'
    },
    hours: '10:00 – 22:00'
  },
  {
    id: 'ksl-spa-10',
    category: 'KSL 몰 인근 추천 스파',
    name: 'SQ 마사지 (SQ Massage & Therapy) - KSL City Mall',
    description: '매우 합리적인 가격으로 운영되며, 쇼핑 중 잠시 들러 발의 피로를 풀기 좋습니다.',
    features: '별도의 웹사이트는 없으나 구글 지도 리뷰 관리가 잘 되는 편입니다.',
    address: 'KSL City Mall, Level 2',
    contact: '+60 7-331 1612',
    price: {
      foot: '(60분) 50 RM / (90분) 80 RM',
      body: '(60분) 80 RM / (90분) 110 RM'
    },
    hours: '10:00 – 22:00'
  },

  // 2. 조호바루 추천 스파 (KSL 외 지역)
  {
    id: 'jb-spa-1',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '타이 오디세이 (Thai Odyssey) - Bukit Indah Mall',
    description: '부킷 인다 지역의 랜드마크 스파로, 정성스러운 타이 전통 의식과 완벽한 위생 관리를 자랑합니다.',
    address: 'Lot S11, 2nd Floor, AEON Bukit Indah Shopping Centre, 8, Jalan Indah 15/2, 81200 Johor Bahru',
    contact: '+60 7-232 8299',
    price: {
      foot: '(60분) 125 RM / (90분) 165 RM',
      body: '(60분) 148 RM / (90분) 205 RM'
    },
    hours: '10:00 - 22:00',
    website: 'https://thaiodyssey.com'
  },
  {
    id: 'jb-spa-2',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '우다야 스파 (Udaya Spa) - Taman Pelangi',
    description: '발리풍의 고급스러운 인테리어와 전문적인 테라피스트의 압이 조화로운 프리미엄 스파입니다.',
    address: '22, Jalan Perang, Taman Pelangi, 80400 Johor Bahru',
    contact: '+60 11-5559 3801',
    price: {
      foot: '(60분) 85 RM / (90분) 120 RM',
      body: '(60분) 145 RM / (90분) 195 RM'
    },
    hours: '11:00 - 00:00',
    website: 'https://udayaspa.com'
  },
  {
    id: 'jb-spa-3',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '시암 오아시스 (Siam Oasis) - Mid Valley Southkey',
    description: '최신 쇼핑몰 내 위치하여 접근성이 좋으며, 현대적인 시설에서 고품격 힐링을 선사합니다.',
    address: 'S-032, Level 2, Mid Valley Southkey, 1, Persiaran Southkey 1, 80150 Johor Bahru',
    contact: '+60 7-336 4950',
    price: {
      foot: '(60분) 93 RM / (90분) 125 RM',
      body: '(60분) 156 RM / (90분) 220 RM'
    },
    hours: '10:00 - 22:00',
    website: 'https://www.siamoasisgroup.com'
  },
  {
    id: 'jb-spa-4',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '릴렉스 스파 (Relux Spa) - Bukit Indah',
    description: '부킷 인다 롯데마트 인근 위치, 편안한 분위기와 세심한 서비스로 입소문 난 가성비 스파입니다.',
    address: '29, Jalan Indah 15/2, Taman Bukit Indah, 81200 Johor Bahru',
    contact: '+60 7-232 3000',
    price: {
      foot: '(60분) 65 RM / (90분) 95 RM',
      body: '(60분) 85 RM / (90분) 115 RM'
    },
    hours: '10:00 - 02:00'
  },
  {
    id: 'jb-spa-5',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '네이처스 릴렉솔로지 (Nature\'s Reflexology) - Eco Botanic',
    description: '에코 보타닉의 깔끔한 상권에 위치하여 골퍼들이 라운딩 후 들르기 가장 좋은 곳입니다.',
    address: '45, Jalan Eco Botanic 3/7, Taman Eco Botanic, 79100 Iskandar Puteri',
    contact: '+60 7-522 6606',
    price: {
      foot: '(60분) 75 RM / (90분) 105 RM',
      body: '(60분) 95 RM / (90분) 135 RM'
    },
    hours: '11:00 - 23:00'
  },
  {
    id: 'jb-spa-6',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '레아 스파 (LeA Spa) - Austin Heights',
    description: '오스틴 지역의 인기 스파로, 전문 스킨케어와 바디 테라피를 병행하는 여성 선호도가 높은 샵입니다.',
    address: '12, Jalan Austin Heights 8/2, Taman Mount Austin, 81100 Johor Bahru',
    contact: '+60 7-364 8666',
    price: {
      foot: '(60분) 80 RM / (90분) 110 RM',
      body: '(60분) 130 RM / (90분) 180 RM'
    },
    hours: '11:00 - 21:00'
  },
  {
    id: 'jb-spa-7',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '소울 타이 (Soul Asia) - Nusa Bestari',
    description: '정통 아시아 마사지를 지향하며, 넓고 웅장한 실내 인테리어로 단체 고객 수용이 가능합니다.',
    address: '4, Jalan Bestari 5/2, Taman Nusa Bestari, 81200 Johor Bahru',
    contact: '+60 7-232 8299',
    price: {
      foot: '(60분) 70 RM / (90분) 100 RM',
      body: '(60분) 95 RM / (90분) 135 RM'
    },
    hours: '11:00 - 01:00',
    website: 'https://soulasia.my'
  },
  {
    id: 'jb-spa-8',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '보르네오 스파 (Borneo Spa) - Pulai Springs Resort',
    description: '풀라이 스프링스 리조트 내 위치하여 골프 라운딩 직후 이동 없이 최고급 스파를 즐길 수 있습니다.',
    address: '20km, Jalan Pontian Lama, 81110 Johor Bahru (리조트 내)',
    contact: '+60 7-521 2121',
    price: {
      foot: '(60분) 110 RM / (90분) 150 RM',
      body: '(60분) 180 RM / (90분) 250 RM (리조트 회원가 별도)'
    },
    hours: '10:00 - 22:00',
    website: 'https://www.pulaisprings.com'
  },
  {
    id: 'jb-spa-9',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '헬스랜드 (HealthLand) - Austin Heights',
    description: '말레이시아 전역의 유명 가성비 체인으로, 시스템화된 마사지와 쾌적한 환경을 제공합니다.',
    address: '1, Jalan Austin Heights 8/1, Taman Mount Austin, 81100 Johor Bahru',
    contact: '+60 7-350 3611',
    price: {
      foot: '(60분) 65 RM / (90분) 90 RM',
      body: '(60분) 85 RM / (90분) 115 RM'
    },
    hours: '11:00 - 00:00',
    website: 'https://healthland.com.my'
  },
  {
    id: 'jb-spa-10',
    category: '조호바루 추천 스파 (KSL 외 지역)',
    name: '우부드 발리 스파 (Ubud Bali Spa) - Taman Molek',
    description: '발리의 평온함을 조호바루에 옮겨 놓은 컨셉으로, 향기로운 아로마 오일 테라피가 일품입니다.',
    address: '49, Jalan Molek 1/29, Taman Molek, 81100 Johor Bahru',
    contact: '+60 7-353 3588',
    price: {
      foot: '(60분) 85 RM / (90분) 115 RM',
      body: '(60분) 135 RM / (90분) 185 RM'
    },
    hours: '11:00 - 22:00'
  },

  // 3. 쇼핑 & 라이프스타일
  {
    id: 'shopping-1',
    category: '쇼핑 & 라이프스타일',
    name: '미드 밸리 사우스키 (The Mid Valley Southkey)',
    description: '조호바루에서 가장 현대적이고 규모가 큰 복합 쇼핑몰로, 싱가포르의 고급 몰들과 견주어도 손색없는 쾌적한 시설을 자랑합니다. 고가의 명품 브랜드부터 글로벌 패션 체인, 그리고 대형 프리미엄 슈퍼마켓인 \'SOGO\'가 입점해 있어 쇼핑의 선택지가 매우 넓으며, 내부 인테리어가 화려하여 산책하듯 구경하기 좋습니다.',
    reason: '라운딩 후 뜨거운 열기를 식히며 여유로운 시간을 보내기에 이보다 완벽한 장소는 없습니다. 몰 내부 동선이 넓어 인파에 치이지 않고 쾌적하게 이동할 수 있으며, 특히 한국 골퍼들이 선호하는 세련된 인테리어의 레스토랑과 카페가 밀집해 있어 동반자들과 격식 있는 저녁 식사를 즐기기에 최적화되어 있습니다.',
    address: '1, Persiaran Southkey 1, Southkey, 80150 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/The%2BMid%2BValley%2BSouthkey%2Bphotos'
  },
  {
    id: 'shopping-2',
    category: '쇼핑 & 라이프스타일',
    name: '조호 프리미엄 아울렛 (Johor Premium Outlets, JPO)',
    description: '동남아시아 최초의 프리미엄 아울렛으로, 150여 개의 글로벌 명품 및 스포츠 브랜드가 입점해 있는 야외형 쇼핑 단지입니다. 구찌, 프라다, 버버리 등 럭셔리 라인뿐만 아니라 골퍼들에게 필수적인 테일러메이드, 언더아머, 나이키 등의 매장이 상시 대규모 할인 혜택을 제공하여 전 세계 쇼핑객들의 발길이 끊이지 않는 곳입니다.',
    reason: '한국 골퍼들에게 가장 실질적인 경제적 이득을 줄 수 있는 쇼핑의 성지입니다. 한국에서 고가에 판매되는 최신 골프 의류와 용품들을 파격적인 가격에 구매할 수 있어 쇼핑만으로도 여행 경비를 회수했다는 후기가 많습니다. 공항 및 주요 골프장과의 접근성이 뛰어나 여행 마지막 날 귀국 전 필수 코스로 추천하기 좋습니다.',
    address: 'Jalan Premium Outlets, Indahpura, 81000 Kulai, Johor',
    photoUrl: 'https://www.premiumoutlets.com.my/johor-premium-outlets/'
  },
  {
    id: 'shopping-3',
    category: '쇼핑 & 라이프스타일',
    name: '파라다임 몰 (Paradigm Mall JB)',
    description: '쇼핑뿐만 아니라 \'액티비티\'에 특화된 몰로, 조호바루 최대 규모의 실내 아이스링크와 전문 암벽등반 시설인 \'Camp5\'를 갖추고 있습니다. 지역 내 최대 규모의 서점과 최신식 영화관, 그리고 아이들을 위한 대형 테마파크가 잘 갖춰져 있어 온 가족이 각자의 취향에 맞는 시간을 보낼 수 있는 다목적 복합 문화 공간입니다.',
    reason: '자녀나 가족을 동반한 골프 여행객에게 최고의 선택지입니다. 아빠가 라운딩을 즐기는 동안 가족들이 아이스 스케이트나 암벽등반을 하며 지루함 없이 시간을 보내기에 부족함이 없으며, 내부 푸드코트와 레스토랑의 가성비가 매우 뛰어나 현지인들의 활기찬 생활 문화를 가장 가까이에서 경험하며 식사할 수 있습니다.',
    address: 'Jalan Skudai, 81200 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Paradigm%2BMall%2BJB%2Bphotos'
  },
  {
    id: 'shopping-4',
    category: '쇼핑 & 라이프스타일',
    name: 'KSL 시티 몰 (KSL City Mall)',
    description: '조호바루 도심의 상징적인 몰로, 세련된 느낌보다는 활기차고 저렴한 물가를 자랑하는 전통적인 로컬 쇼핑몰입니다. 주변에 수많은 마사지 샵과 로컬 맛집들이 밀집해 있어 접근성이 뛰어나며, 월요일마다 열리는 야시장은 현지 음식을 맛보고 저렴한 기념품을 사기에 더할 나위 없이 좋은 장소입니다.',
    reason: '가성비를 중시하는 골퍼들이 라운딩 후 가장 많이 찾는 곳입니다. 쇼핑몰 내에서 저렴하게 발 마사지를 받거나 근처 유명 바쿠테 맛집에서 기력을 보충하기에 최적의 위치입니다. 화려함보다는 조호바루 사람들의 실제 삶의 현장을 느끼며 부담 없이 쇼핑과 식사를 해결하고 싶은 여행객들에게 강력하게 권장합니다.',
    address: '33, Jalan Seladang, Taman Abad, 80250 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/KSL%2BCity%2BMall%2Bphotos'
  },
  {
    id: 'shopping-5',
    category: '쇼핑 & 라이프스타일',
    name: '에코 보타닉 시티 (Eco Botanic City)',
    description: '유럽풍의 예쁘고 정돈된 건물들이 모여 있는 고급 상권으로, 최근 조호바루에서 가장 힙한 카페와 레스토랑들이 모여 있는 곳입니다. 호라이즌 힐스 등 인근 골프장과 매우 가까우며, 거리 전체가 깨끗하고 아름답게 조성되어 있어 마치 유럽의 어느 마을에 온 듯한 이국적인 분위기를 풍깁니다.',
    reason: '여성 골퍼들이나 젊은 감성을 선호하는 여행객들에게 인기가 압도적입니다. 라운딩 후 예쁜 테라스 카페에 앉아 애프터눈 티를 즐기거나, 수준 높은 일식, 중식, 양식 레스토랑에서 여유로운 식사를 하기에 최적입니다. 거리가 매우 아름다워 식사 전후로 산책하며 사진을 남기기에도 매우 훌륭한 장소입니다.',
    address: 'Jalan Eco Botanic 3/2, 79100 Iskandar Puteri, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Eco%2BBotanic%2BCity%2Bphotos'
  },
  {
    id: 'shopping-6',
    category: '쇼핑 & 라이프스타일',
    name: '이온 몰 부킷 인다 (Aeon Mall Bukit Indah)',
    description: '일본계 대형 마트인 이온(Aeon)이 입점해 있어 한국인 입맛에 맞는 다양한 식료품과 생활용품을 구하기 매우 편리합니다. 몰 내부가 쾌적하게 관리되고 있으며, 합리적인 가격대의 패션 브랜드와 생활 잡화점이 많아 현지 거주 한국인들이 장을 보거나 가볍게 외식할 때 가장 선호하는 몰 중 하나입니다.',
    reason: '싱가포르로 넘어가기 전 마지막으로 지인 선물을 사거나 현지 식재료를 구매하기에 최적의 장소입니다. 유명한 말레이시아 커피나 과자 등을 저렴하게 대량 구매할 수 있으며, 몰 내부에 깔끔한 프랜차이즈 식당들이 많아 여행 중 익숙하고 편안한 한 끼 식사를 원하는 분들에게 안정적인 만족감을 제공합니다.',
    address: '8, Jalan Indah 15/2, Taman Bukit Indah, 81200 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Aeon%2BMall%2BBukit%2BIndah%2Bphotos'
  },
  {
    id: 'shopping-7',
    category: '쇼핑 & 라이프스타일',
    name: '푸테리 하버 (Puteri Harbour)',
    description: '고급 요트들이 정박해 있는 아름다운 항구 지역으로, 수변을 따라 세련된 노천 레스토랑과 펍들이 길게 늘어서 있습니다. 조호바루 내에서 가장 서구적이고 여유로운 분위기를 느낄 수 있는 곳이며, 주말 저녁에는 버스킹 공연이나 플리마켓이 열려 활기차면서도 로맨틱한 분위기를 동시에 만끽할 수 있습니다.',
    reason: '라운딩 후 동반자들과 탁 트인 바다 전망을 바라보며 시원한 맥주 한잔하기에 최고의 장소입니다. 해 질 녘 노을이 지는 요트 선착장의 풍경은 여행의 감동을 더해주며, 스테이크, 해산물, 타파스 등 다양한 서구식 요리를 야외 테라스에서 즐길 수 있어 조호바루 골프 여행의 낭만을 완성시켜 줄 코스로 손색없습니다.',
    address: 'Persiaran Puteri Selatan, 79100 Iskandar Puteri, Johor',
    photoUrl: 'https://www.puteriharbour.com/'
  },
  {
    id: 'shopping-8',
    category: '쇼핑 & 라이프스타일',
    name: 'R&F 몰 (R&F Mall)',
    description: '조호바루 국경(CIQ)과 다리로 연결된 최첨단 복합 단지로, 세련된 영화관과 인공지능 로봇 카페 등 최신 기술이 접목된 시설들이 눈에 띕니다. 바다를 마주하고 있어 전망이 좋고, 몰 내부가 매우 현대적이며 깔끔하게 관리되고 있어 싱가포르를 오가는 여행객들이 잠시 쉬어가기에 최적화된 고급 쇼핑몰입니다.',
    reason: '싱가포르로 복귀하기 직전이나 도착 직후에 방문하기 가장 좋은 위치입니다. 최고급 시설의 영화관에서 휴식을 취하거나, 바다 전망의 카페에서 여유를 즐기기에 좋으며, 내부에 한국 음식을 파는 식당이나 깔끔한 푸드코트가 잘 갖춰져 있어 여행 중 국경 이동의 피로를 풀며 식사하기에 매우 쾌적한 환경을 제공합니다.',
    address: 'Jalan Tanjung Puteri, 80300 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/R%2526F%2BMall%2BJohor%2BBahru%2Bphotos'
  },
  {
    id: 'shopping-9',
    category: '쇼핑 & 라이프스타일',
    name: '콤타 JBCC (KOMTAR JBCC)',
    description: '조호바루 시내 중심에 위치한 깔끔하고 세련된 몰로, 세포라(Sephora) 등 글로벌 뷰티 및 패션 브랜드가 잘 갖춰져 있습니다. 특히 아이들을 위한 \'앵그리버드 액티비티 파크\'가 내부에 있어 가족 단위 방문객에게 인기가 높으며, 인접한 시티스퀘어 몰과 연결되어 있어 이동이 매우 편리한 것이 특징입니다.',
    reason: '시내 중심가에서 고품질의 쇼핑과 서비스를 원하는 골퍼들에게 적합합니다. 시설이 매우 깨끗하고 정돈되어 있어 쾌적한 쇼핑이 가능하며, 특히 여성분들이 선호하는 화장품 브랜드와 카페들이 잘 갖춰져 있습니다. 싱가포르 입국장과 도보 거리여서 차량 이동 없이도 방문할 수 있다는 점이 큰 장점입니다.',
    address: 'Menara Komtar, Johor Bahru City Centre, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/KOMTAR%2BJBCC%2Bphotos'
  },
  {
    id: 'shopping-10',
    category: '쇼핑 & 라이프스타일',
    name: '시티 스퀘어 (JB City Square)',
    description: '조호바루에서 가장 역사가 깊고 인지도가 높은 몰로, 수많은 의류 매장, 통신사, 환전소 등이 밀집해 있는 대형 쇼핑몰입니다. 지하층의 거대한 푸드코트와 층마다 꽉 들어찬 현지 상점들은 조호바루 특유의 활기찬 에너지를 뿜어내며, 싱가포르를 오가는 수많은 사람이 거쳐 가는 교통의 요지이기도 합니다.',
    reason: '조호바루의 가장 대중적인 미식과 문화를 한곳에서 모두 보고 싶은 여행객들에게 필수 코스입니다. 지하 푸드코트에는 말레이시아의 거의 모든 대표 음식이 모여 있어 저렴하고 맛있게 식사할 수 있으며, 환전이나 유심 구매 등 여행에 필요한 실질적인 업무를 처리하기에도 가장 편리합니다.',
    address: '106, 108, Jalan Wong Ah Fook, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/JB%2BCity%2BSquare%2Bphotos'
  },

  // 4. 관광 & 랜드마크
  {
    id: 'landmark-1',
    category: '관광 & 랜드마크',
    name: '술탄 아부 바카르 모스크 (Sultan Abu Bakar State Mosque)',
    description: '19세기 말에 건립된 이 사원은 이슬람 전통 양식에 영국의 빅토리아풍 건축미가 결합된 독특하고 아름다운 건축물입니다. 하얀 외벽과 대조되는 푸른 지붕이 조호 해협의 바다와 어우러져 장엄한 경관을 연출하며, 내부의 화려한 샹들리에와 정교한 장식들은 종교적 성스러움과 예술적 가치를 동시에 보여줍니다.',
    reason: '조호바루에서 가장 품격 있고 이국적인 사진을 남길 수 있는 최고의 명소입니다. 언덕 위에 위치하여 바다 건너 싱가포르의 전경을 한눈에 담을 수 있는 조망권이 일품이며, 잘 가꾸어진 외부 정원과 건축물의 조화는 마치 유럽의 어느 왕궁에 온 듯한 착각을 불러일으킵니다. 조호바루의 역사적 위엄을 느끼기에 완벽한 코스입니다.',
    address: 'Jalan Skudai, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Sultan%2BAbu%2BBakar%2BState%2BMosque%2Bphotos'
  },
  {
    id: 'landmark-2',
    category: '관광 & 랜드마크',
    name: '레고랜드 말레이시아 (Legoland Malaysia)',
    description: '아시아 최초의 레고 테마파크로, 수천만 개의 레고 블록으로 아시아 각국의 랜드마크를 재현한 \'미니랜드\'가 압권입니다. 스릴 넘치는 놀이기구와 시원한 워터파크, 그리고 신비로운 아쿠아리움인 \'씨라이프(Sea Life)\'까지 결합된 복합 테마파크로, 남녀노소 누구나 동심의 세계에서 즐거운 시간을 보낼 수 있는 거대한 놀이 단지입니다.',
    reason: '가족과 함께하는 골프 여행이라면 절대 놓칠 수 없는 필수 관광지입니다. 파크 전체가 알록달록한 레고 블록으로 꾸며져 있어 SNS에 올릴 예쁜 사진을 찍기에 최적화되어 있으며, 아이들이 직접 체험할 수 있는 시설이 많습니다. 골프장들이 밀집한 이스칸다르 푸테리 지역에 위치해 동선이 매우 효율적이라는 점도 큰 장점입니다.',
    address: '7, Jalan Legoland, 79250 Iskandar Puteri, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.legoland.com.my/explore-legoland/gallery/'
  },
  {
    id: 'landmark-3',
    category: '관광 & 랜드마크',
    name: '이스타나 부킷 세레네 (Istana Bukit Serene)',
    description: '현재 조호 국왕이 거주하고 있는 공식 궁전으로, 광장에는 조호 왕실을 상징하는 거대한 다이아몬드 왕관 조형물이 설치되어 있습니다. 밤이 되면 왕관 조형물에 화려한 LED 조명이 켜지고 주변 공원에는 시민들이 모여 여유로운 저녁 시간을 보냅니다. 궁전 내부 출입은 불가하지만 외부에서 바라보는 궁전의 규모와 정원은 대단히 아름답습니다.',
    reason: '조호바루 방문을 상징하는 가장 대표적인 인증샷 스팟입니다. 거대한 왕관 조형물 아래에서 찍는 사진은 여행자들 사이에서 필수 코스로 통하며, 특히 화려한 야경은 조호바루의 밤을 아름답게 장식합니다. 국왕에 대한 현지인들의 존경심을 느낄 수 있는 장소이자, 넓은 광장에서 시원한 밤바람을 맞으며 산책하기 좋아 라운딩 후 휴식 코스로 훌륭합니다.',
    address: 'Jalan Straits View, 80200 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Istana%2BBukit%2BSerene%2Bphotos'
  },
  {
    id: 'landmark-4',
    category: '관광 & 랜드마크',
    name: '아룰미구 스리 라자카리암만 유리 사원 (Glass Temple)',
    description: '전 세계적으로 희귀한 내부 전체가 유리 조각으로 장식된 힌두교 사원입니다. 사원 벽면, 기둥, 천장이 수십만 개의 오색찬란한 유리 조각으로 덮여 있어 빛이 비칠 때마다 보석처럼 반짝이는 환상적인 광경을 연출합니다. 힌두교의 신비로운 신상들과 정교한 유리 공예가 어우러져 독보적인 예술적 가치를 지닌 곳입니다.',
    reason: '조호바루에서만 경험할 수 있는 가장 신비롭고 이색적인 관광지입니다. 사원 내부로 들어서는 순간 펼쳐지는 빛의 향연은 방문객들에게 깊은 감동을 선사하며, 사진 작가들이나 독특한 미학을 선호하는 여행객들에게 최고의 촬영지로 손꼽힙니다. 종교를 떠나 인간의 정교한 손길이 만들어낸 화려한 유리 예술의 진수를 경험하고 싶은 분들께 강력 추천합니다.',
    address: 'Jalan Tebrau, 80100 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Arulmigu%2BSri%2BRajakaliamman%2BGlass%2BTemple%2Bphotos'
  },
  {
    id: 'landmark-5',
    category: '관광 & 랜드마크',
    name: '탄종 푸테리 워터프론트 (Tanjong Puteri Waterfront)',
    description: '싱가포르를 마주 보고 있는 해안 산책로로, 낮에는 평화로운 바다 풍경을, 밤에는 화려하게 빛나는 싱가포르 도심의 야경을 감상할 수 있는 시민들의 휴식처입니다. 조호바루 구시가지와 인접해 있어 주변에 유서 깊은 건물들이 많으며, 해안선을 따라 조성된 공원과 산책로는 잘 정돈되어 있어 걷기에 매우 쾌적한 환경을 제공합니다.',
    reason: '라운딩 후 시원한 바닷바람을 맞으며 하루를 마무리하기에 가장 낭만적인 장소입니다. 바다 건너 손에 잡힐 듯 가까운 싱가포르의 스카이라인을 배경으로 이국적인 사진을 남길 수 있으며, 근처에 분위기 좋은 카페와 로컬 맛집이 많아 가벼운 식사와 산책을 병행하기 좋습니다. 조호바루의 여유로운 밤 분위기를 만끽하고 싶은 분들께 최적의 코스입니다.',
    address: 'Jalan Ibrahim, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Tanjong%2BPuteri%2BWaterfront%2Bphotos'
  },
  {
    id: 'landmark-6',
    category: '관광 & 랜드마크',
    name: '데사루 비치 (Desaru Coast)',
    description: '시내에서 약 1시간 거리에 위치한 광활하고 아름다운 해변 휴양지로, 고급 리조트 단지와 워터파크가 위치해 있습니다. 깨끗한 백사장과 시원한 파도가 어우러진 휴양지 특유의 분위기를 느낄 수 있으며, 수상 스포츠와 해변 승마 등 다양한 액티비티를 즐길 수 있는 조호바루의 대표 해변입니다.',
    reason: '골프와 완벽한 휴양을 결합하고 싶은 여행객들에게 꿈같은 장소입니다. 엘스 클럽 라운딩 후 해변에서 일몰을 감상하거나 해산물 요리를 즐기는 경험은 여행의 만족도를 정점으로 끌어올립니다. 도심의 복잡함에서 벗어나 진정한 말레이시아의 자연과 여유를 만끽하고 사진에 담고 싶은 분들에게 1순위로 추천하는 관광 명소입니다.',
    address: 'Desaru Coast, 81930 Bandar Penawar, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.desarucoast.com/en/explore/gallery'
  },
  {
    id: 'landmark-7',
    category: '관광 & 랜드마크',
    name: '탄중 피아이 국립공원 (Tanjung Piai National Park)',
    description: '유라시아 대륙의 가장 남쪽 지점으로 알려진 상징적인 장소입니다. 광활한 망그로브 숲 사이로 조성된 나무 데크 산책로를 따라 걷다 보면 대륙의 끝을 알리는 기념비를 만날 수 있습니다. 썰물 때는 수많은 게와 짱뚱어를 관찰할 수 있는 자연 생태계가 잘 보존된 곳입니다.',
    reason: '\'대륙의 끝에 섰다\'는 특별한 상징성과 의미를 찾는 여행객들에게 최고의 관광지입니다. 방문객 센터에서 대륙 최남단 방문 인증서를 발급받을 수 있어 여행의 소중한 기념품이 되며, 망그로브 숲의 신비로운 생태를 배경으로 이국적인 사진을 남길 수 있습니다. 골프와는 또 다른 자연의 경이로움을 경험하고 싶은 분들께 추천합니다.',
    address: 'Serkat, 82030 Pontian, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Tanjung%2BPiai%2BNational%2BPark%2Bphotos'
  },
  {
    id: 'landmark-8',
    category: '관광 & 랜드마크',
    name: '이스타나 베사르 (Istana Besar)',
    description: '조호 왕실의 공식 거주지였던 유서 깊은 궁전으로, 현재는 왕실 박물관으로 운영되고 있습니다. 말레이식 건축과 유럽식 스타일이 우아하게 혼합된 외관이 돋보이며, 박물관 내부에는 조호 국왕들이 사용하던 호화로운 유물과 장식품들이 전시되어 있어 말레이시아 왕실의 역사를 엿볼 수 있는 역사적 공간입니다.',
    reason: '조호바루의 역사와 정체성을 깊이 있게 이해하고 싶은 분들에게 필수적인 코스입니다. 박물관 내부의 화려한 전시품들은 방문객들의 눈을 즐겁게 하며, 넓은 궁전 부지와 잘 가꾸어진 정원은 고풍스러운 사진을 찍기에 아주 좋습니다. 단순한 휴양을 넘어 그 도시의 뿌리를 경험하고 싶은 고품격 여행객들에게 매우 추천할 만한 관광 명소입니다.',
    address: 'Grand Palace, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Istana%2BBesar%2BJohor%2Bphotos'
  },
  {
    id: 'landmark-9',
    category: '관광 & 랜드마크',
    name: '구누앙 풀라이 (Gunung Pulai)',
    description: '조호바루 근교의 자연 명소로, 웅장한 폭포와 울창한 정글 트레킹 코스를 제공합니다. 시원하게 떨어지는 폭포 아래에서 물놀이를 즐기거나 열대 우림의 원시적인 아름다움을 감상할 수 있습니다. 주말이면 현지인들이 가족 단위로 피크닉을 즐기러 오는 자연 친화적인 랜드마크입니다.',
    reason: '말레이시아의 생생한 대자연을 만끽하고 싶은 액티브한 여행객들에게 추천합니다. 쏟아지는 폭포를 배경으로 역동적인 사진을 남길 수 있으며, 정글 속 맑은 공기를 마시며 하는 가벼운 트레킹은 라운딩 후의 피로를 씻어내고 정신을 맑게 해줍니다. 자연 그대로의 힐링을 원하는 분들에게 최고의 장소입니다.',
    address: 'Kampung Sri Pulai, 81000 Kulai, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Gunung%2BPulai%2BJohor%2Bphotos'
  },
  {
    id: 'landmark-10',
    category: '관광 & 랜드마크',
    name: '블루 레이크 (Blue Lake Seri Alam)',
    description: '폐석산이었던 곳에 물이 고여 형성된 호수로, 신비로운 에메랄드빛 혹은 푸른빛을 띠는 물 색깔로 인해 SNS 상에서 폭발적인 인기를 얻게 된 숨겨진 명소입니다. 깎아지른 듯한 절벽과 푸른 호수가 어우러진 풍경은 마치 다른 행성에 온 듯한 초현실적인 분위기를 자아내며, 조호바루 젊은이들의 출사지로 각광받고 있습니다.',
    reason: '남들과 다른 특별하고 신비로운 사진을 남기고 싶은 \'인생샷\' 헌터들에게 강력 추천합니다. 정상에 올라 바라보는 비현실적인 푸른 호수의 장관은 그 모든 수고를 잊게 만듭니다. 관광객들에게 널리 알려지지 않은 숨은 비경을 홈페이지 사용자들에게 소개함으로써 \'golfee\'만의 차별화된 정보를 제공할 수 있습니다.',
    address: 'Bandar Seri Alam, 81750 Masai, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Blue%2BLake%2BSeri%2BAlam%2Bphotos'
  },

  // 5. 미식 & 나이트 라이프
  {
    id: 'food-1',
    category: '미식 & 나이트 라이프',
    name: '순순항 바쿠테 (Soon Soon Heng Bak Kut Teh)',
    description: '말레이시아식 돼지갈비 보양식인 \'바쿠테\'를 전문으로 하는 곳으로, 한국의 갈비탕과 한약재가 어우러진 깊은 맛을 냅니다. 고객이 직접 돼지 부위와 추가 재료를 선택하여 뚝배기에 끓여주는 시스템이며, KSL 몰 바로 맞은편에 있어 늘 현지인과 관광객들로 북적이는 조호바루 최고의 인기 맛집입니다.',
    reason: '한국 골퍼들이 가장 좋아하는 현지 음식 1순위입니다. 라운딩 후 소모된 기력을 보충하기에 완벽한 보양식이며, 뜨끈한 국물에 쌀밥을 곁들이면 한국인 특유의 든든함을 느낄 수 있습니다. 고추와 마늘을 넣은 간장 소스에 고기를 찍어 먹는 재미가 쏠쏠하며, 현지의 활기찬 식당 분위기 속에서 진짜 로컬의 맛을 경험할 수 있습니다.',
    address: '11, Jalan Serigala, Taman Abad, 80250 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.tripadvisor.com/Restaurant_Review-g298278-d1020468-Reviews-Soon_Soon_Heng_Bak_Kut_Teh-Johor_Bahru_Johor_Bahru_District_Johor.html'
  },
  {
    id: 'food-2',
    category: '미식 & 나이트 라이프',
    name: '보더스 티 (Borders Tea)',
    description: '조호 해협의 바닷바람을 그대로 맞으며 말레이시아 전통 밀크티인 \'테 타릭(Teh Tarik)\'을 즐길 수 있는 야외 노천 카페입니다. 화려한 인테리어는 없지만 저렴한 가격과 탁 트인 바다 전망 덕분에 밤마다 수많은 현지인이 모여 수다를 떨고 여유를 즐기는 곳입니다. 사테나 미고랭 같은 로컬 간식도 함께 판매합니다.',
    reason: '꾸며지지 않은 조호바루의 생생한 로컬 밤 정취를 느끼기에 이보다 좋은 곳은 없습니다. 밤바다 너머로 보이는 싱가포르의 불빛을 감상하며 마시는 달콤한 밀크티 한 잔은 여행의 소소한 행복을 선사합니다. 플라스틱 의자에 앉아 현지인들의 일상에 스며드는 경험은 골프 여행을 더욱 특별하게 만들어줄 것입니다.',
    address: 'Jalan Skudai, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://foursquare.com/v/borders-tea/4e7474a5d4c063be8f36c53e/photos'
  },
  {
    id: 'food-3',
    category: '미식 & 나이트 라이프',
    name: '치아 비 바쿠테 (Chia Bee Bak Kut Teh)',
    description: '국물이 있는 전통 바쿠테도 훌륭하지만, 소스에 바짝 볶아낸 \'드라이 바쿠테(Dry Bak Kut Teh)\'로 매우 유명한 맛집입니다. 짭조름하고 매콤한 소스가 고기에 깊게 배어 있어 한국인의 입맛에 안주로도 인기가 많으며, 오랜 전통을 가진 로컬 식당답게 깊은 내공의 맛을 자랑하는 노포 분위기를 느낄 수 있습니다.',
    reason: '국물 바쿠테와는 또 다른 매력의 미식 경험을 원하는 골퍼들에게 강력 추천합니다. 볶음 갈비찜과 비슷한 맛을 내는 드라이 바쿠테는 맥주와도 환상적인 궁합을 자랑하여 라운딩 후 동반자들과 가볍게 술잔을 기울이며 식사하기에 최고입니다. 관광객보다는 현지인 단골이 많은 곳에서 진짜 내공 있는 음식을 경험할 수 있습니다.',
    address: '66, Jalan Sutera, Taman Sentosa, 80150 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Chia%2BBee%2BBak%2BKut%2BTeh%2Bphotos'
  },
  {
    id: 'food-4',
    category: '미식 & 나이트 라이프',
    name: '신 콩 키 해산물 (Sin Kiong Kee Seafood)',
    description: '말레이시아 스타일의 신선한 해산물 요리를 합리적인 가격에 맛볼 수 있는 대형 로컬 식당입니다. 블랙 페퍼 크랩, 칠리 크랩, 버터 새우 등 한국인들이 좋아하는 메뉴를 다양하게 갖추고 있으며, 시원한 야외 좌석과 활기찬 분위기 속에서 갓 잡은 싱싱한 해산물을 바로 요리해주는 전형적인 현지 해산물 맛집입니다.',
    reason: '싱가포르 대비 거의 절반 가격에 훌륭한 칠리 크랩 파티를 즐길 수 있어 골프 여행의 호사를 누리기에 최적입니다. 여럿이 모여 다양한 요리를 주문해 나누어 먹는 즐거움이 크며, 화려하게 차려진 해산물 요리들은 인증샷으로도 매우 훌륭합니다. 현지의 풍요로운 저녁 미식을 체험하기에 그만입니다.',
    address: 'Jalan Keris, Taman Sentosa, 80150 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Sin%2BKiong%2BKee%2BSeafood%2BJohor%2Bphotos'
  },
  {
    id: 'food-5',
    category: '미식 & 나이트 라이프',
    name: '카 루 일식 라멘 (Ka-Ru Japanese Ramen)',
    description: '조호바루에서 가장 평점이 높은 일본식 라멘 전문점으로, 진한 육수와 쫄깃한 면발로 현지인들에게 절대적인 지지를 받는 곳입니다. 에코 보타닉의 세련된 거리에 위치해 있어 매장 분위기가 매우 깔끔하고 고급스러우며, 라멘뿐만 아니라 교자나 덮밥 등 사이드 메뉴의 퀄리티도 매우 높아 실패 없는 한 끼를 보장합니다.',
    reason: '라운딩 후 한국인 특유의 \'뜨끈하고 진한 국물\'이 생각날 때 가장 먼저 추천하는 곳입니다. 현지 음식이 입에 잘 맞지 않는 동반자가 있을 때도 완벽한 대안이 되며, 깔끔한 시설과 보장된 맛으로 여행 중 안정적인 식사 경험을 제공합니다. 세련된 매장 외관과 정갈한 음식 세팅은 예쁜 음식 사진을 남기기에도 좋습니다.',
    address: '1, Jalan Eco Botanic 3/5, 79100 Iskandar Puteri, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Ka-Ru%2BJapanese%2BRamen%2Bphotos'
  },
  {
    id: 'food-6',
    category: '미식 & 나이트 라이프',
    name: '파이브 바 (Five Bar)',
    description: '조호바루의 힙한 감성을 느낄 수 있는 대표적인 펍으로, 감각적인 조명과 세련된 인테리어, 그리고 매일 밤 열리는 라이브 밴드 공연이 특징입니다. 다양한 수입 맥주와 칵테일을 즐길 수 있으며, 안주 메뉴 또한 퓨전 스타일로 잘 구성되어 있어 현지의 세련된 나이트 라이프를 선도하는 핫플레이스입니다.',
    reason: '라운딩의 피로를 신나는 음악과 시원한 술 한 잔으로 날려버리고 싶은 골퍼들에게 최고의 선택입니다. 활기찬 분위기 속에서 현지인들과 어울리며 조호바루의 활발한 에너지를 체감할 수 있고, 세련된 바의 분위기는 SNS용 사진 촬영에도 적합합니다. 동반자들과 여행의 즐거운 밤을 장식하기에 이보다 더 좋은 장소는 없습니다.',
    address: 'Jalan Austin Heights 8/1, 81100 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Five%2BBar%2BMount%2BAustin%2Bphotos'
  },
  {
    id: 'food-7',
    category: '미식 & 나이트 라이프',
    name: '페라나칸 테이스티 (Peranakan Tasty)',
    description: '말레이시아와 중국 문화가 융합된 독특한 \'뇨냐(Nyonya) 요리\'를 전문으로 하는 식당입니다. 화려한 색감의 인테리어와 더불어 락사, 오탁오탁 등 독특한 향신료와 재료를 사용한 페라나칸 전통 음식을 깔끔하고 현대적인 방식으로 재해석하여 제공하는 미식 공간입니다.',
    reason: '말레이시아에서만 맛볼 수 있는 특별한 미식 경험을 원하는 여행객들에게 추천합니다. 음식의 색감이 매우 화려하고 독특하여 사진을 찍는 즐거움이 크며, 현지 문화를 맛으로 체험할 수 있다는 점에서 교육적인 의미도 있습니다. 정갈한 상차림 덕분에 동반자들과 대화를 나누며 품격 있게 현지식을 즐기기에 최적입니다.',
    address: '미드밸리 사우스키 내 입점 (LG Floor)',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Peranakan%2BTasty%2BSouthkey%2Bphotos'
  },
  {
    id: 'food-8',
    category: '미식 & 나이트 라이프',
    name: '아부바카르 오탁오탁 (Otak-Otak Cheng Boi)',
    description: '생선 살을 전용 양념에 버무려 잎에 싸서 구운 말레이시아 전통 간식 \'오탁오탁\'의 최고봉으로 불리는 곳입니다. 갓 구워낸 오탁오탁의 고소하고 매콤한 향이 일품이며, 현지인들이 줄을 서서 사 먹을 정도로 중독성 있는 맛을 자랑하는 조호바루 인근의 숨은 맛집입니다.',
    reason: '골프장 이동 중에 들러 가볍게 맛볼 수 있는 최고의 현지 간식입니다. 잎사귀에 싸여 있는 독특한 비주얼은 사진으로 남기기에도 재미있으며, 말레이시아 사람들이 평소에 즐겨 먹는 \'진짜 간식\'이 무엇인지 경험해보고 싶은 분들께 강력 추천합니다. 저렴한 가격에 풍부한 현지의 맛을 느낄 수 있습니다.',
    address: '28-J, Jalan Mawai, 81900 Kota Tinggi, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Otak-Otak%2BCheng%2BBoi%2Bphotos'
  },
  {
    id: 'food-9',
    category: '미식 & 나이트 라이프',
    name: '토디 카페 (Toddy Shop)',
    description: '인도식 전통 코코넛 발효주인 \'토디(Toddy)\'와 함께 매콤한 인도식 안주를 즐길 수 있는 이색적인 공간입니다. 현대적인 세련미보다는 세월의 흔적이 느껴지는 투박한 공간에서 갓 짜낸 신선한 토디를 저렴한 가격에 맛볼 수 있는, 조호바루에서 몇 안 되는 독특한 전통 술집입니다.',
    reason: '아주 특별하고 이국적인 로컬 술 문화를 경험해보고 싶은 모험심 강한 골퍼들에게 추천합니다. 코코넛 향이 감도는 독특한 술맛은 여행의 색다른 재미를 선사하며, 투박한 분위기에서 현지인들과 함께 술잔을 기울이는 경험은 사진으로 담았을 때 더욱 강렬한 기억으로 남을 것입니다.',
    address: '1, Jalan Dhoby, 80000 Johor Bahru, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Toddy%2BShop%2BJohor%2BBahru%2Bphotos'
  },
  {
    id: 'food-10',
    category: '미식 & 나이트 라이프',
    name: '메디니 밥 스테이션 (Medini Bob Station)',
    description: '레고랜드 근처에 위치한 세련된 야시장 컨셉의 푸드 코트입니다. 다양한 스트리트 푸드(사테, 나시르막 등)를 한곳에서 위생적으로 맛볼 수 있으며, 현대적인 조명과 깔끔한 좌석 배치를 갖추고 있어 가족 단위 여행객이나 외국인들도 부담 없이 야시장 분위기를 즐길 수 있는 공간입니다.',
    reason: '복잡하고 지저분한 야시장이 꺼려지는 분들에게 완벽한 대안이 됩니다. 쾌적한 환경에서 여러 종류의 현지 음식을 조금씩 사서 나누어 먹기 좋으며, 조명이 예쁘게 설치되어 있어 밤에 방문했을 때 분위기 있는 사진을 남기기 좋습니다. 골프 라운딩 후 가볍게 현지 야시장의 낭만을 느끼고 싶은 분들께 최적입니다.',
    address: 'Persiaran Medini, 79250 Iskandar Puteri, Johor',
    photoUrl: 'https://www.google.com/search?q=https://www.google.com/maps/search/Medini%2BBob%2BStation%2Bphotos'
  }
];
