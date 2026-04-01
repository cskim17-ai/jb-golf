export interface FoodItem {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  signatureDishes: string[];
  visitorTips: string[];
  quickInfo: {
    label: string;
    value: string;
  }[];
  image: string;
  category: 'Seremban' | 'KSL' | 'Nearby' | 'Market';
}

export const FOOD_DATA: FoodItem[] = [
  {
    id: 'gerai-ayong',
    name: 'Gerai Ayong (Ayong Ikan Bakar)',
    tagline: '1977년부터 이어온 정통 이칸 바카르와 시원한 디저트의 만남',
    description: '조호바루 현지인들이 사랑하는 \'이칸 바카르(생선구이)\' 전문점으로, 합리적인 가격에 풍성한 말레이시아 현지 맛을 경험할 수 있는 곳입니다. 40년 넘는 전통을 자랑하며 \'No Pork, No Lard\' 원칙을 지키는 할랄 친화적 중식 스타일의 요리를 선보입니다.',
    signatureDishes: [
      '이칸 바카르 (Ikan Pari Bakar): 가오리 구이. 겉바속촉 가오리에 매콤달콤 삼발 소스.',
      '타후 바카르 (Tahu Bakar): 구운 두부 사이에 신선한 채소와 땅콩 가루.',
      '소통 캉쿵 (Sotong Kangkung): 데친 오징어와 공심채를 특제 소스에 버무린 요리.',
      'ABC & 첸돌 (Ais Kacang): 팥, 옥수수, 젤리 등이 들어간 시원한 디저트.'
    ],
    visitorTips: [
      '골프 투어 연계: 조호바루 시내와 가까워 라운딩 후 저녁 식사 코스로 적합합니다.',
      '로컬 분위기: 활기찬 야시장 느낌의 푸드코트 분위기를 즐길 수 있습니다.',
      '추천 시간대: 저녁 시간에는 붐빌 수 있으니 조금 일찍 방문하세요.'
    ],
    quickInfo: [
      { label: '위치', value: 'Stall 3A, Medan Selera Tepian Tebrau, Jalan Skudai, Johor Bahru' },
      { label: '운영 시간', value: '오전 11:00 ~ 오후 07:30 (매주 수요일 휴무)' },
      { label: '주요 특징', value: '해산물 구이 전문, No Pork No Lard, 로컬 푸드코트 형태' },
      { label: '연락처', value: '013-775 4488 / 013-721 4121' }
    ],
    image: 'https://picsum.photos/seed/ayong/800/600',
    category: 'Nearby'
  },
  {
    id: 'pasar-karat',
    name: '파사르 카랏 야시장 (Pasar Karat)',
    tagline: '빈티지한 소품부터 길거리 먹거리까지, 조호바루의 활기가 가득한 밤',
    description: '조호바루 시티 스퀘어와 가까운 Jalan Segget 거리를 따라 펼쳐지는 이 야시장은 \'벼룩시장(Flea Market)\'의 성격을 띠고 있습니다. 빈티지한 아이템들과 버스킹 공연이 낭만적인 밤 분위기를 더해줍니다.',
    signatureDishes: [
      '사테(Satay): 즉석에서 구워주는 말레이시아식 꼬치 요리.',
      '오징어 구이(Sotong Bakar): 매콤한 소스를 발라 구운 쫄깃한 식감.',
      '드래곤 브레스(Dragon Breath): 질소 과자로 먹을 때 입에서 연기가 나오는 재미있는 간식.',
      '헤나 체험: 저렴한 가격에 정교한 헤나 타투 체험.'
    ],
    visitorTips: [
      '골든 타임: 오후 8시 30분 이후에 방문하시는 것을 추천합니다.',
      '현금 준비: 대부분의 노점이 현금 거래를 선호합니다.',
      '주차 안내: 매우 붐비므로 \'그랩(Grab)\'을 이용하는 것이 가장 편리합니다.'
    ],
    quickInfo: [
      { label: '주소', value: '26, 20, Jalan Segget, Bandar Johor Bahru, 80000 Johor Bahru, Johor' },
      { label: '운영 시간', value: '화요일 ~ 일요일: 오후 6:00 ~ 새벽 2:00 (매주 월요일 휴무)' },
      { label: '권장 소요시간', value: '약 1 ~ 2시간' },
      { label: '주변 명소', value: '조호바루 구 중국 사원, 시티 스퀘어 몰, 탄히옥 네 거리' }
    ],
    image: 'https://picsum.photos/seed/pasarkarat/800/600',
    category: 'Market'
  },
  // Seremban TOP 10
  {
    id: 'seremban-1',
    name: 'Empayar Seremban Siew Pow (엠파이어 세렘반 슈포)',
    description: '세렘반에 오면 가장 먼저 들러야 할 성지. 산 위에 성처럼 지어져 있어 뷰도 좋고, 세렘반의 명물인 \'슈포\'를 대량으로 구워내는 본점입니다.',
    signatureDishes: [
      'Chicken/Pork Siew Pow: 바삭한 페이스트리와 달콤 짭짤한 고기 양념.',
      'Baked Crab: 특제 소스를 발라 구운 게 요리.'
    ],
    visitorTips: [
      '선물용 박스 포장이 잘 되어 있습니다.',
      '대형 레스토랑이라 단체 방문에도 좋습니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Jalan Besar TBK 4, Taman Bukit Kepayang' },
      { label: '운영시간', value: '09:30 ~ 21:30' }
    ],
    image: 'https://picsum.photos/seed/siewpow/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-2',
    name: 'Yee Kee Beef Noodles (이키 소고기 국수)',
    description: '1930년대부터 영업을 시작한 세렘반 소고기 국수의 대명사. 3대째 가업을 잇고 있으며 깔끔한 인테리어가 특징입니다.',
    signatureDishes: [
      'Dry Beef Noodles: 끈적하고 고소한 땅콩 소스와 진한 소고기 육수.'
    ],
    visitorTips: [
      '소고기 부위별로 선택이 가능합니다.',
      '회전율이 빨라 대기 시간이 길지 않습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '44, Jalan Dato Lee Fong Yee, Bandar Seremban' },
      { label: '운영시간', value: '08:30 ~ 17:00' }
    ],
    image: 'https://picsum.photos/seed/beefnoodle/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-3',
    name: 'Restoran Sin Tai Chew (신 타이 추)',
    description: '세렘반 주민들이 아침 식사를 위해 즐겨 찾는 로컬 코피티암. 활기찬 현지 아침 풍경을 느낄 수 있습니다.',
    signatureDishes: [
      'Pork Noodles: 맑고 시원한 국물에 돼지고기 완자와 내장이 듬뿍.',
      'Roti Bakar & Kopi: 숯불 토스트와 진한 말레이시아식 커피.'
    ],
    visitorTips: [
      '전형적인 현지 야외 식당 분위기입니다.',
      '가성비가 매우 훌륭합니다.'
    ],
    quickInfo: [
      { label: '위치', value: '45, Jalan Dato Sheikh Ahmad, Bandar Seremban' },
      { label: '운영시간', value: '07:00 ~ 14:00' }
    ],
    image: 'https://picsum.photos/seed/sintaichew/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-4',
    name: 'Min Kok Heritage Dim Sum (밍콕 헤리티지 딤섬)',
    description: '세렘반 최고의 대형 딤섬 레스토랑. 카트를 밀고 다니며 딤섬을 고르는 전통 방식을 경험할 수 있습니다.',
    signatureDishes: [
      'Siew Mai & Har Gow: 신선한 새우 하가우와 속이 꽉 찬 샤오마이.',
      'Lau Sar Bao: 달콤한 커스터드 크림이 흘러나오는 황금 유사빵.'
    ],
    visitorTips: [
      '넓은 주차장을 보유하고 있습니다.',
      '서비스가 체계적이라 쾌적합니다.'
    ],
    quickInfo: [
      { label: '위치', value: '7645, Jalan Labu Lama, 70200 Seremban' },
      { label: '운영시간', value: '07:30 ~ 15:00, 18:00 ~ 22:00' }
    ],
    image: 'https://picsum.photos/seed/minkok/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-5',
    name: 'Haji Shariff Cendol (하지 샤리프 첸돌)',
    description: '세렘반 시내 한복판의 전통 빙수 집. 더운 오후에 현지인들이 줄을 서서 먹는 유명한 곳입니다.',
    signatureDishes: [
      'Cendol Pulut: 코코넛 밀크, 구라 멜라카 시럽, 쫀득한 찹쌀의 조화.'
    ],
    visitorTips: [
      '회전율이 매우 빠릅니다.',
      '인도계 스타일 로작(Rojak)과 함께 드셔보세요.'
    ],
    quickInfo: [
      { label: '위치', value: '44, Jalan Yam Tuan, Bandar Seremban' },
      { label: '운영시간', value: '10:30 ~ 18:00 (금요일 휴무)' }
    ],
    image: 'https://picsum.photos/seed/cendol/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-6',
    name: 'Restoran Nelayan (네라얀 전통 요리)',
    description: '네게리 셈빌란 주의 전통 요리인 \'Minangkabau\' 스타일을 제대로 구현하는 곳. 진한 커리 요리가 특징입니다.',
    signatureDishes: [
      'Masak Lemak Cili Api: 노란 코코넛 커리에 훈제 소고기나 생선을 넣은 요리.'
    ],
    visitorTips: [
      '뷔페 형식(Nasi Campur)으로 운영됩니다.',
      '원하는 반찬을 골라 먹는 재미가 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'KM 5, Jalan Tampin, 70450 Seremban' },
      { label: '운영시간', value: '08:00 ~ 17:00' }
    ],
    image: 'https://picsum.photos/seed/nelayan/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-7',
    name: 'Restoran Yi Poh (이포 소고기 국수)',
    description: '이키와 라이벌인 소고기 국수 노포. 면이 조금 더 굵고 쫄깃하며 소스 맛이 진합니다.',
    signatureDishes: [
      'Yi Poh Lou Shu Fun: 진한 갈색 소스에 비벼 먹는 \'쥐똥나무 면\'.'
    ],
    visitorTips: [
      '실내 에어컨 시설이 잘 되어 있어 쾌적합니다.'
    ],
    quickInfo: [
      { label: '위치', value: '26, Jalan Seng Meng Lee, 70200 Seremban' },
      { label: '운영시간', value: '07:30 ~ 18:00' }
    ],
    image: 'https://picsum.photos/seed/yipoh/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-8',
    name: 'Kedai Makanan Reen (린 음식점)',
    description: '세렘반 남부 평점 최고의 말레이 현지 가정식 맛집. 생선 요리와 나시 르막이 일품입니다.',
    signatureDishes: [
      'Ikan Bakar: 바나나 잎에 싸서 구운 생선과 매콤한 삼발 소스.'
    ],
    visitorTips: [
      '주변 골프장 라운딩 전후 점심 식사로 인기가 많습니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Seremban 2 지구 인근' },
      { label: '운영시간', value: '08:00 ~ 16:00' }
    ],
    image: 'https://picsum.photos/seed/reen/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-9',
    name: 'Onn Kee Seremban Bak Kut Teh (온키 바쿠테)',
    description: '세렘반 최고의 바쿠테 맛집. 한약재 향이 적당해 한국인 입맛에도 잘 맞습니다.',
    signatureDishes: [
      'Claypot Bak Kut Teh: 뚝배기에 보글보글 끓여 나오는 국물 바쿠테.',
      'Dry Bak Kut Teh: 짭조름한 소스에 졸여낸 드라이 버전.'
    ],
    visitorTips: [
      '저녁 시간에만 문을 엽니다.',
      '현지인들의 대표적인 외식 장소입니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Jalan Temiang, Seremban' },
      { label: '운영시간', value: '17:00 ~ 22:00' }
    ],
    image: 'https://picsum.photos/seed/onnkee/800/600',
    category: 'Seremban'
  },
  {
    id: 'seremban-10',
    name: 'The Coffeeholic (커피홀릭)',
    description: '세렘반의 힙한 인스타그램 명소 카페. 직접 로스팅한 원두와 퓨전 케이크가 훌륭합니다.',
    signatureDishes: [
      'Artisan Coffee & Cakes: 수준급 커피와 세렘반 스타일 케이크.'
    ],
    visitorTips: [
      '신도시 지역에 위치해 깨끗하고 트렌디합니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Seremban 2, Uptown Avenue' },
      { label: '운영시간', value: '11:00 ~ 22:00' }
    ],
    image: 'https://picsum.photos/seed/coffeeholic/800/600',
    category: 'Seremban'
  },
  // KSL TOP 10
  {
    id: 'ksl-1',
    name: 'Soon Soon Heng Bak Kut Teh (순순흥 바쿠테)',
    description: 'KSL 몰 정문 맞은편의 전설적인 바쿠테 맛집. 싱가포르인들도 줄 서서 먹는 곳입니다.',
    signatureDishes: [
      '클레이팟 바쿠테: 한약재 국물이 일품. 유부와 팽이버섯 추가 추천.'
    ],
    visitorTips: [
      '재료를 직접 골라 넣는 재미가 있습니다.',
      '국물 리필이 가능합니다.'
    ],
    quickInfo: [
      { label: '위치', value: '43, Jalan Serampang, Taman Sri Tebrau (KSL 정문 맞은편)' },
      { label: '운영시간', value: '09:00 ~ 20:00' }
    ],
    image: 'https://picsum.photos/seed/soonsoon/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-2',
    name: 'You Kee XO Restaurant (유기 XO)',
    description: 'KSL 몰 지하 1층의 광둥식 구이 전문점. 거대한 항아리에서 구워내는 고기가 특징입니다.',
    signatureDishes: [
      'XO 로스트 덕 & 차슈: 바삭한 오리구이와 달콤한 돼지고기 바비큐.',
      '항아리 수프(Tonic Soup): 보양식으로 인기.'
    ],
    visitorTips: [
      '쇼핑몰 안에 있어 시원하고 깔끔합니다.',
      '서비스가 매우 빠릅니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'KSL City Mall, LG-33 (지하 1층)' },
      { label: '운영시간', value: '10:00 ~ 22:00' }
    ],
    image: 'https://picsum.photos/seed/youkee/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-3',
    name: 'Restoran Teck Sing (덕성 차찬실)',
    description: '40년 전통의 노포. 종이에 싸서 한약재와 함께 쪄낸 치킨 요리로 유명합니다.',
    signatureDishes: [
      'Teck Sing Paper Baked Chicken: 촉촉한 닭고기와 진한 한약재 국물.'
    ],
    visitorTips: [
      '전형적인 중국계 말레이시아 식당 분위기입니다.',
      '가족 식사에 최적화되어 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '3 & 5, Jalan Sutera 1, Taman Sentosa' },
      { label: '운영시간', value: '11:00 ~ 21:00' }
    ],
    image: 'https://picsum.photos/seed/tecksing/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-4',
    name: 'K Fry Urban Korean Holiday Villa',
    description: 'KSL 몰 바로 옆 가장 핫한 외식 장소. 트렌디한 분위기의 한국 치킨 전문점입니다.',
    signatureDishes: [
      'Krazy Spicy Cheesy Fried Chicken: 테이블에서 직접 치즈를 녹여주는 퍼포먼스.'
    ],
    visitorTips: [
      '항상 붐비므로 대기가 있을 수 있습니다.',
      '젊은 층과 관광객들에게 인기가 많습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '260, Jalan Dato Sulaiman (Holiday Villa 1층)' },
      { label: '운영시간', value: '11:00 ~ 23:00' }
    ],
    image: 'https://picsum.photos/seed/kfry/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-5',
    name: 'Ah Hua Kueh Teow (아화 과조)',
    description: '자극적이지 않고 깊은 국물 맛의 조호바루식 쌀국수 노포입니다.',
    signatureDishes: [
      'Kway Teow Thng (쌀국수): 돼지고기 완자와 신선한 간이 들어간 맑은 국수.'
    ],
    visitorTips: [
      '재료가 신선하고 국물이 담백합니다.',
      '비빔 스타일인 \'Dry\' 버전도 추천합니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Jalan Segget 근처 또는 Taman Melodies 분점' },
      { label: '운영시간', value: '08:00 ~ 14:30' }
    ],
    image: 'https://picsum.photos/seed/ahhua/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-6',
    name: 'D\'Laksa KSL City Mall',
    description: '말레이시아 10대 음식인 \'아삼 락사\'를 대중적으로 즐길 수 있는 곳입니다.',
    signatureDishes: [
      'Asam Laksa: 새콤매콤한 생선 베이스 국물과 통통한 면.'
    ],
    visitorTips: [
      '캐주얼한 분위기에서 빠르게 즐기기 좋습니다.',
      '입맛 없을 때 최고의 선택입니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'KSL City Mall, LG-62 (지하 1층)' },
      { label: '운영시간', value: '10:00 ~ 22:00' }
    ],
    image: 'https://picsum.photos/seed/dlaksa/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-7',
    name: 'Yit Foh Wanton Noodle (익화 완탕면)',
    description: '수십 년간 완탕면 하나로 자리를 지켜온 면발 맛집입니다.',
    signatureDishes: [
      'Wanton Mee (Dry): 특제 소스 비빔면과 바삭한 튀김 완탕.'
    ],
    visitorTips: [
      '가성비가 매우 훌륭합니다.',
      '현지 코피티암의 정취를 느낄 수 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '153, Jalan Harimau, Taman Century' },
      { label: '운영시간', value: '09:00 ~ 21:00 (목요일 휴무)' }
    ],
    image: 'https://picsum.photos/seed/yitfoh/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-8',
    name: 'Restoran Kak Kak (가가 점심차루)',
    description: '전통 카트 방식의 딤섬 집. 원하는 딤섬을 즉석에서 고르는 재미가 있습니다.',
    signatureDishes: [
      '각종 딤섬 & 샤오마이: 투박하지만 정겨운 수제 딤섬.'
    ],
    visitorTips: [
      '아침 일찍 문을 여는 조식 성지입니다.',
      '늦게 가면 메뉴가 소진될 수 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '9, Jalan Maju, Taman Maju Jaya' },
      { label: '운영시간', value: '06:30 ~ 14:00 (화요일 휴무)' }
    ],
    image: 'https://picsum.photos/seed/kakkak/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-9',
    name: 'Cedar Point Food Centre (시더 포인트 푸드코트)',
    description: '수십 개의 노점이 모여 있는 대형 야외 푸드코트. 저녁에 맥주와 함께 즐기기 좋습니다.',
    signatureDishes: [
      '가오리 구이(Ikan Bakar) & 사테: 매콤한 양념의 가오리 구이 필수.'
    ],
    visitorTips: [
      '조호바루 밤 문화의 활기를 느낄 수 있습니다.',
      '선택지가 매우 넓어 여러 명 방문 시 좋습니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Jalan Musang Bulan, Taman Abad' },
      { label: '운영시간', value: '18:00 ~ 밤 늦게까지' }
    ],
    image: 'https://picsum.photos/seed/cedarpoint/800/600',
    category: 'KSL'
  },
  {
    id: 'ksl-10',
    name: 'Sweet Blossom Coffee Roasters',
    description: '전문 로스터리 카페. 주인장의 장인정신이 담긴 라떼 아트로 유명합니다.',
    signatureDishes: [
      '카페 라떼 & 핸드 드립: 직접 볶은 원두의 풍미.'
    ],
    visitorTips: [
      '작고 아담하며 조용하게 커피를 즐기기 좋습니다.',
      '숨은 명소 같은 분위기입니다.'
    ],
    quickInfo: [
      { label: '위치', value: '28, Jalan Taman Melodies' },
      { label: '운영시간', value: '09:00 ~ 17:00 (목요일 휴무)' }
    ],
    image: 'https://picsum.photos/seed/sweetblossom/800/600',
    category: 'KSL'
  }
];
