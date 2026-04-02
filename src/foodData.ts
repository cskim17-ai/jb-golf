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
  category: 'LocalTop10' | 'KSL' | 'Nearby' | 'Market';
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
  {
    id: 'local-1',
    name: 'Kam Long Ah Zai Curry Fish Head (금롱 커리 피쉬 헤드)',
    tagline: '30년 전통, 조호바루 시내를 지켜온 전설적인 커리 생선머리',
    description: '30년 넘게 조호바루 시내(City Centre)를 지켜온 전설적인 곳입니다. 아침부터 셔터가 올라가기 전 줄을 서야 하며, 단 하나의 메뉴 \'커리 생선머리\'로 빌딩을 세웠다고 할 만큼 유명합니다.',
    signatureDishes: [
      'Curry Fish Head: 뚝배기에 담겨 나오는 진하고 매콤한 커리 국물에 신선한 도미 머리, 유부, 야채가 가득합니다.'
    ],
    visitorTips: [
      '빵을 찍어 먹거나 밥에 비벼 먹으면 밥도둑이 따로 없습니다.',
      '메뉴가 하나뿐이라 자리에 앉으면 인원수대로 바로 주문이 들어가는 노포의 카리스마가 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '7, Jalan Wong Ah Fook, Bandar Johor Bahru (시티스퀘어 인근)' },
      { label: '운영시간', value: '08:00 ~ 16:00' }
    ],
    image: 'https://picsum.photos/seed/kamlong/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-2',
    name: 'Restoran Todak (토닥 해산물 레스토랑)',
    tagline: '바다 위 수상 가옥에서 즐기는 낭만적인 해산물 만찬',
    description: '바다 위에 떠 있는 수상 가옥 형태의 해산물 식당입니다. 30년 전이나 지금이나 조호바루에서 해산물을 하면 가장 먼저 떠올리는 곳으로, 석양을 보며 식사하기 좋습니다.',
    signatureDishes: [
      'Black Pepper Crab: 후추 향이 진한 블랙페퍼 크랩.',
      'Salted Egg Squid: 짭조름한 노른자 소스를 입힌 오징어 튀김.'
    ],
    visitorTips: [
      '직접 수족관에서 해산물을 골라 무게를 달아 주문할 수 있습니다.',
      '바닷바람을 맞으며 로맨틱한 식사가 가능합니다.'
    ],
    quickInfo: [
      { label: '위치', value: '1, Kampung Orang Asli, Telok Jawa, Masai (시내에서 차로 20분)' },
      { label: '운영시간', value: '11:30 ~ 23:30' }
    ],
    image: 'https://picsum.photos/seed/todak/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-3',
    name: 'Hua Mui Restoran (화무이 식당)',
    tagline: '1946년부터 이어온 조호바루의 역사가 담긴 하이난 코피티암',
    description: '1946년부터 시작된 조호바루에서 가장 오래된 하이난 스타일 코피티암입니다. 30년 전 제가 어릴 때 먹던 그 맛 그대로를 간직한 곳입니다.',
    signatureDishes: [
      'Hainanese Chicken Chop: 튀긴 닭고기에 하이난 전통 소스와 감자튀김, 완두콩이 곁들여진 정겨운 맛.'
    ],
    visitorTips: [
      '2층짜리 목조 건물에서 풍기는 빈티지한 분위기가 일품입니다.',
      '무슬림 친구들도 즐겨 찾는 할랄 맛집입니다.'
    ],
    quickInfo: [
      { label: '위치', value: '131, Jalan Trus, Bandar Johor Bahru' },
      { label: '운영시간', value: '08:30 ~ 18:00' }
    ],
    image: 'https://picsum.photos/seed/huamui/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-4',
    name: 'New Meng Kee Steam Fish (뉴 명키 스팀 피쉬)',
    tagline: '현지인들이 생선 찜 하면 가장 먼저 떠올리는 신선한 중국식 요리',
    description: '주민들이 \'생선 찜\' 하면 망설임 없이 가는 곳입니다. 신선함이 생명인 중국식 생선 찜 요리가 기가 막히게 잘합니다.',
    signatureDishes: [
      'Ginger Paste Steam Fish: 곱게 간 생강 소스를 듬뿍 얹어 쪄낸 민물고기.'
    ],
    visitorTips: [
      '비린내가 전혀 없고 입에서 녹는 식감이 특징입니다.',
      '가격대가 합리적이고 생선의 종류가 다양해 취향껏 고를 수 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '36, Jalan Dedap 13, Taman Johor Jaya' },
      { label: '운영시간', value: '11:00 ~ 22:00' }
    ],
    image: 'https://picsum.photos/seed/mengkee/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-5',
    name: 'Restoran Pekin (북경 루)',
    tagline: '격식 있는 자리와 가족 연회에 최적인 고급 중식 레스토랑',
    description: '조호바루 주민들이 결혼식이나 가족 연회를 열 때 가장 선호하는 고급 중식 체인입니다. 타만 수테라 지점이 특히 인기가 많습니다.',
    signatureDishes: [
      'Peking Duck: 바삭한 껍질이 일품인 북경 오리.',
      'Suckling Pig: 어린 돼지 구이는 이곳의 자존심입니다.'
    ],
    visitorTips: [
      '격식 있는 자리나 부모님을 모시고 가기에 가장 안전하고 실패 없는 선택지입니다.'
    ],
    quickInfo: [
      { label: '위치', value: '2, Jalan SUTERA 3, Taman Sutera Utama' },
      { label: '운영시간', value: '11:00 ~ 22:30' }
    ],
    image: 'https://picsum.photos/seed/pekin/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-6',
    name: 'San Low Seafood (산로 해산물)',
    tagline: '펠랑기 지역의 터줏대감, 바삭한 볶음면이 일품인 야식 성지',
    description: '펠랑기(Pelangi) 지역의 터줏대감입니다. 이곳은 특이하게 해산물만큼 유명한 볶음면이 있어 야식 성지로 불립니다.',
    signatureDishes: [
      'San Low Fried Bee Hoon: 눌어붙은 듯 바삭하게 볶아낸 \'납작 비훈\' 면 요리.'
    ],
    visitorTips: [
      '겉바속촉의 정석인 비훈 면은 이곳의 시그니처입니다.',
      '퇴근 후 맥주 한잔하는 현지인들로 항상 북적이는 활기찬 분위기입니다.'
    ],
    quickInfo: [
      { label: '위치', value: 'Jalan Biru, Taman Pelangi' },
      { label: '운영시간', value: '16:30 ~ 01:00 (새벽까지 운영)' }
    ],
    image: 'https://picsum.photos/seed/sanlow/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-7',
    name: 'Re Patisserie (레 파티세리)',
    tagline: '조호바루에서 가장 감각적인 평점 1위 고급 디저트 샵',
    description: '최근 몇 년 사이 조호바루 카페 씬(Scene)에서 평점 1위를 달리고 있는 고급 디저트 샵입니다. 매우 감각적인 인테리어를 자랑합니다.',
    signatureDishes: [
      'Petit Gateau & Croissants: 프랑스 정통 기술을 가미한 예술 작품 같은 케이크와 크로와상.'
    ],
    visitorTips: [
      '인테리어가 매우 세련되어 사진 찍기 좋으며, 조기에 디저트가 품절되는 경우가 많습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '77, Jalan Beringin, Taman Melodies' },
      { label: '운영시간', value: '10:00 ~ 18:00' }
    ],
    image: 'https://picsum.photos/seed/repatisserie/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-8',
    name: 'Restoran Ya Wang (아왕 오리구이)',
    tagline: '싱가포르 유명 맛집의 원조 격인 비법을 가진 약초 오리구이',
    description: '시티스퀘어 근처 약초 오리구이 전문점입니다. 싱가포르의 유명 오리구이 맛집의 원조 격인 비법을 가진 곳으로 알려져 있습니다.',
    signatureDishes: [
      'Herbal Roast Duck: 은은한 약초 향이 배어있는 오리구이.'
    ],
    visitorTips: [
      '잡내가 전혀 없고 껍질은 얇고 바삭합니다.',
      '화무이 식당과 가까워 1차, 2차 맛집 탐방 코스로 묶기 좋습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '28, Jalan Segget, Bandar Johor Bahru' },
      { label: '운영시간', value: '08:00 ~ 18:00' }
    ],
    image: 'https://picsum.photos/seed/yawang/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-9',
    name: 'Bansan Curry Fish Head (반산 커리 피쉬 헤드)',
    tagline: '주택가 주민들의 전폭적인 지지를 받는 진짜 로컬 커리 생선머리',
    description: '1번의 금롱과 쌍벽을 이루는 주민 맛집입니다. 금롱이 시내라면, 이곳은 주택가(Taman Perling) 쪽 주민들의 전폭적인 지지를 받습니다.',
    signatureDishes: [
      'Claypot Curry Fish Head: 금롱보다 국물이 조금 더 부드럽고 야채가 풍부한 것이 특징.'
    ],
    visitorTips: [
      '관광객보다 현지 주민 비중이 훨씬 높아 진짜 로컬 분위기를 느낄 수 있습니다.'
    ],
    quickInfo: [
      { label: '위치', value: '1, Jalan Layang 1, Taman Perling' },
      { label: '운영시간', value: '08:00 ~ 15:30' }
    ],
    image: 'https://picsum.photos/seed/bansan/800/600',
    category: 'LocalTop10'
  },
  {
    id: 'local-10',
    name: 'Principle Cafe by T.A.M',
    tagline: '고전적인 건물을 현대적으로 재해석한 세련된 오아시스 카페',
    description: '조호바루 구시가지의 고전적인 건물을 현대적으로 재해석한 카페 겸 레스토랑입니다. 깔끔한 퓨전 요리로 평점이 매우 높습니다.',
    signatureDishes: [
      'Truffle Mushroom Pasta & Matcha Tart: 깊은 트러플 향의 파스타와 진한 맛의 말차 타르트.'
    ],
    visitorTips: [
      '여성 방문객들에게 특히 인기입니다.',
      '\'화무이\'나 \'아왕\' 같은 노포들 사이에서 세련된 휴식을 제공합니다.'
    ],
    quickInfo: [
      { label: '위치', value: '82, Jalan Trus, Bandar Johor Bahru' },
      { label: '운영시간', value: '10:00 ~ 18:00' }
    ],
    image: 'https://picsum.photos/seed/principle/800/600',
    category: 'LocalTop10'
  },
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
