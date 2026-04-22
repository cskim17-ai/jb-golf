import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const quotesData = [
  {
    name: "게리 플레이어", nationality: "남아공", birthYear: "1935", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Gary_Player",
    quote: "\"연습을 하면 할수록 운이 좋아진다.\" (The harder I practice, the luckier I get.)",
    source: "경기 후 인터뷰", stats: "전 세계 160승 이상"
  },
  {
    name: "글레나 콜렛 베어", nationality: "미국", birthYear: "1903", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Glenna_Collett-Vare",
    quote: "\"골프는 자신을 속일 수 없는 유일한 게임이다.\" (In golf, you are your own referee.)",
    source: "아마추어 여왕 시절 인터뷰", stats: "US 아마추어 6회 우승"
  },
  {
    name: "그렉 노먼", nationality: "호주", birthYear: "1955", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Greg_Norman",
    quote: "\"공격적인 실수는 용납되지만 소극적인 실수는 안 된다.\" (I made an aggressive mistake, not a timid one.)",
    source: "경기 사후 분석 중", stats: "PGA 20승 (메이저 2승)"
  },
  {
    name: "김인경", nationality: "한국", birthYear: "1988", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/In-Kyung_Kim",
    quote: "\"실수는 나를 완성하는 과정이다.\" (Mistakes are part of the journey.)",
    source: "30cm 퍼트 실수 극복 후 우승", stats: "LPGA 7승 (메이저 1승)"
  },
  {
    name: "김아림", nationality: "한국", birthYear: "1995", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Kim_A-lim",
    quote: "\"공격적인 플레이가 나의 스타일이다.\" (Go for it.)",
    source: "US 여자오픈 역전 우승 시", stats: "LPGA 1승 (메이저 1승)"
  },
  {
    name: "김효주", nationality: "한국", birthYear: "1995", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Kim_Hyo-joo",
    quote: "\"부드러움이 강함을 이긴다.\" (Softness wins over strength.)",
    source: "에비앙 챔피언십 우승 시", stats: "LPGA 6승 (메이저 1승)"
  },
  {
    name: "김세영", nationality: "한국", birthYear: "1993", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Kim_Se-young",
    quote: "\"빨간 바지의 마법은 자신감에서 나온다.\" (Red pants give me power.)",
    source: "역전 우승의 아이콘 시절", stats: "LPGA 12승 (메이저 1승)"
  },
  {
    name: "고진영", nationality: "한국", birthYear: "1995", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Ko_Jin-young",
    quote: "\"결과는 신의 영역, 나는 과정에만 집중한다.\" (I only focus on my process.)",
    source: "114홀 노보디 기록 시", stats: "LPGA 15승 (메이저 2승)"
  },
  {
    name: "낸시 로페즈", nationality: "미국", birthYear: "1957", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Nancy_Lopez",
    quote: "\"자신을 믿는 것이 가장 강력한 무기다.\" (I play my best when I believe in myself.)",
    source: "전성기 인터뷰", stats: "LPGA 48승 (메이저 3승)"
  },
  {
    name: "넬리 코다", nationality: "미국", birthYear: "1998", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Nelly_Korda",
    quote: "\"매 순간을 소중히 여겨라.\" (Enjoy every moment.)",
    source: "5연승 대기록 달성 시", stats: "LPGA 14승 (메이저 2승)"
  },
  {
    name: "김주형", nationality: "한국", birthYear: "2002", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Tom_Kim_(golfer)",
    quote: "\"내 꿈에는 어떤 한계선도 그어 놓지 않았다.\" (I haven't put any limits on my dreams.)",
    source: "PGA 투어 2승 달성 인터뷰", stats: "PGA 3승"
  },
  {
    name: "노승열", nationality: "한국", birthYear: "1991", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Noh_Seung-yul",
    quote: "\"젊음의 패기는 골프에서 가장 큰 자산이다.\" (Confidence is everything when you're young.)",
    source: "PGA 투어 최연소 기록 시", stats: "PGA 1승"
  },
  {
    name: "닉 팔도", nationality: "영국", birthYear: "1957", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Nick_Faldo",
    quote: "\"스윙을 신뢰하는 것이 기술보다 중요하다.\" (Trust your swing.)",
    source: "메이저 우승 당시", stats: "PGA 9승 (메이저 6승)"
  },
  {
    name: "타이거 우즈", nationality: "미국", birthYear: "1975", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Tiger_Woods",
    quote: "\"나는 항상 나 자신과 경쟁한다. 어제의 나보다 나아지는 것이 목표다.\" (I'm always competing against myself, trying to get better every day.)",
    source: "마스터스 우승 인터뷰 등", stats: "PGA 투어 통산 82승 (역대 공동 1위, 메이저 15승)"
  },
  {
    name: "박세리", nationality: "한국", birthYear: "1977", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Pak_Se-ri",
    quote: "\"포기하지 마세요. 끝날 때까지는 끝난 게 아닙니다.\" (Never give up. It’s not over until it’s over.)",
    source: "1998년 US 여자오픈 우승 인터뷰", stats: "LPGA 투어 통산 25승 (메이저 5승, 명예의 전당 헌액)"
  }
];

async function clearAndUpload() {
  console.log('Clearing existing quotes...');
  const quotesRef = collection(db, 'golferQuotes');
  const snapshot = await getDocs(quotesRef);
  
  let deleted = 0;
  for (const document of snapshot.docs) {
    await deleteDoc(doc(db, 'golferQuotes', document.id));
    deleted++;
  }
  console.log(`Deleted ${deleted} quotes.`);

  console.log('Uploading new quotes...');
  let uploaded = 0;
  for (const quote of quotesData) {
    const newDocRef = doc(quotesRef);
    await setDoc(newDocRef, {
      id: newDocRef.id,
      ...quote
    });
    uploaded++;
  }
  console.log(`Successfully uploaded ${uploaded} quotes.`);
  process.exit(0);
}

clearAndUpload().catch(console.error);
