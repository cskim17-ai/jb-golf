import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const quotesData = [
  {
    name: "마이크 위어", nationality: "캐나다", birthYear: "1970", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Mike_Weir",
    quote: "\"나는 오직 나의 과정에만 집중한다.\" (Focus on my process.)",
    source: "114홀 노보디 기록 시", stats: "LPGA 15승"
  },
  {
    name: "마크 오메라", nationality: "미국", birthYear: "1957", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Mark_O%27Meara",
    quote: "\"결과는 내가 통제할 수 없으니 과정에만 전념한다.\" (Focus only on the process.)",
    source: "114홀 노보디 기록 시", stats: "LPGA 15승"
  },
  {
    name: "마크 트웨인", nationality: "미국", birthYear: "1835", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Mark_Twain",
    quote: "\"골프는 좋은 산책을 망치는 가장 좋은 방법이다.\" (Golf is a good walk spoiled.)",
    source: "작가의 유명한 풍자", stats: "문학가 (골프 비평)"
  },
  {
    name: "맥 넬슨", nationality: "미국", birthYear: "1912", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Byron_Nelson",
    quote: "\"승리는 오직 정직한 노력의 대가다.\" (Winning is not everything, but wanting to win is.)",
    source: "11연승 대기록 당시", stats: "PGA 52승 (메이저 5승)"
  },
  {
    name: "미야자토 아이", nationality: "일본", birthYear: "1985", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Ai_Miyazato",
    quote: "\"나의 루틴이 나의 안식처다.\" (My routine is my safe place.)",
    source: "세계 랭킹 1위 달성 시", stats: "LPGA 9승"
  },
  {
    name: "미키 라이트", nationality: "미국", birthYear: "1935", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Mickey_Wright",
    quote: "\"골프 스윙은 리듬이다.\" (The golf swing is like a song.)",
    source: "기술 레슨 중", stats: "LPGA 82승 (메이저 13승)"
  },
  {
    name: "바비 존스", nationality: "미국", birthYear: "1902", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Bobby_Jones_(golfer)",
    quote: "\"골프는 양쪽 귀 사이 5인치 공간에서 하는 게임이다.\" (Golf is a game that is played on a five-inch course—the distance between your ears.)",
    source: "1930년 그랜드슬램 달성 후", stats: "메이저 13승 (아마추어)"
  },
  {
    name: "바이런 넬슨", nationality: "미국", birthYear: "1912", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Byron_Nelson",
    quote: "\"우승은 정직한 노력의 결과물이다.\" (Winning is a result of honest effort.)",
    source: "11연승 대기록 달성 당시", stats: "PGA 52승 (메이저 5승)"
  },
  {
    name: "밥 로텔라", nationality: "미국", birthYear: "1948", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Bob_Rotella",
    quote: "\"골프는 완벽함을 추구하는 게임이 아니다.\" (Golf is not a game of perfect.)",
    source: "저서 'Golf is Not a Game of Perfect'", stats: "스포츠 심리학자 (다수 우승 지도)"
  },
  {
    name: "버나드 랑거", nationality: "독일", birthYear: "1957", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Bernhard_Langer",
    quote: "\"나이는 숫자에 불과하다.\" (Age is just a number.)",
    source: "시니어 투어 독주 시", stats: "시니어 투어 46승"
  },
  {
    name: "베이브 루스", nationality: "미국", birthYear: "1895", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Babe_Ruth",
    quote: "\"야구는 골프에 비하면 아무것도 아니다.\" (Baseball is a cinch compared to golf.)",
    source: "골프 애호가로서 남긴 말", stats: "메이저리그 전설 (골프광)"
  },
  {
    name: "베이브 자하리아스", nationality: "미국", birthYear: "1911", gender: "여",
    photoUrl: "https://en.wikipedia.org/wiki/Babe_Zaharias",
    quote: "\"그냥 가서 공을 세게 치면 된다.\" (I just loosen up my girdle and let 'er fly.)",
    source: "장타 비결 인터뷰", stats: "LPGA 41승 (메이저 10승)"
  },
  {
    name: "벤 크렌쇼", nationality: "미국", birthYear: "1952", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Ben_Crenshaw",
    quote: "\"퍼팅은 손이 아니라 가슴으로 하는 것이다.\" (Putting is about touch and heart.)",
    source: "마스터스 우승 인터뷰", stats: "PGA 19승 (메이저 2승)"
  },
  {
    name: "벤 호건", nationality: "미국", birthYear: "1912", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Ben_Hogan",
    quote: "\"가장 중요한 샷은 바로 다음 샷이다.\" (The most important shot in golf is the next one.)",
    source: "자서전 및 인터뷰", stats: "PGA 64승 (메이저 9승)"
  },
  {
    name: "부치 하먼", nationality: "미국", birthYear: "1943", gender: "남",
    photoUrl: "https://en.wikipedia.org/wiki/Butch_Harmon",
    quote: "\"기초를 잊는 순간 스윙은 무너진다.\" (Stick to the fundamentals.)",
    source: "교습 중 남긴 조언", stats: "세계 최고의 교습가"
  }
];

async function uploadMore() {
  console.log('Uploading more quotes...');
  const quotesRef = collection(db, 'golferQuotes');
  let uploaded = 0;
  for (const quote of quotesData) {
    const newDocRef = doc(quotesRef);
    await setDoc(newDocRef, {
      id: newDocRef.id,
      ...quote
    });
    uploaded++;
  }
  console.log(`Successfully uploaded ${uploaded} more quotes.`);
  process.exit(0);
}

uploadMore().catch(console.error);
