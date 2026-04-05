import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { ChevronLeft, ChevronRight, ExternalLink, Flag } from 'lucide-react';

interface GolferQuote {
  id: string;
  name: string;
  nationality: string;
  birthYear: string;
  gender: string;
  photoUrl: string;
  quote: string;
  source: string;
  stats: string;
}

const INITIAL_QUOTES: GolferQuote[] = [
  {
    id: '1',
    name: '벤 호건 (Ben Hogan)',
    nationality: '미국',
    birthYear: '1912년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Ben+Hogan+golf+photo&tbm=isch',
    quote: '"가장 중요한 샷은 바로 다음 샷이다." (The most important shot in golf is the next one.)',
    source: '그의 자서전 및 인터뷰',
    stats: 'PGA 투어 통산 64승 (메이저 9승 포함)'
  },
  {
    id: '2',
    name: '바비 존스 (Bobby Jones)',
    nationality: '미국',
    birthYear: '1902년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Bobby+Jones+golf+photo&tbm=isch',
    quote: '"골프는 5인치 경기다. 바로 당신의 양쪽 귀 사이의 공간이다." (Golf is a game that is played on a five-inch course — the distance between your ears.)',
    source: '1930년 그랜드 슬램 달성 후 인터뷰',
    stats: '아마추어 신분으로 메이저 대회 13승 (연간 그랜드 슬램 달성)'
  },
  {
    id: '3',
    name: '아놀드 파머 (Arnold Palmer)',
    nationality: '미국',
    birthYear: '1929년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Arnold+Palmer+golf+photo&tbm=isch',
    quote: '"항상 공격적으로 플레이하라. 그것이 승리의 유일한 길이다." (Always play aggressively. It\'s the only way to win.)',
    source: '저서 \'My Game and Yours\'',
    stats: 'PGA 투어 통산 62승 (메이저 7승 포함)'
  },
  {
    id: '4',
    name: '잭 니클라우스 (Jack Nicklaus)',
    nationality: '미국',
    birthYear: '1940년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Jack+Nicklaus+golf+photo&tbm=isch',
    quote: '"자신감은 준비에서 나온다. 준비가 안 된 상태의 자신감은 허세다." (Confidence is the most important single factor in this game, and no matter how great your natural talent, there is only one way to obtain and sustain it: work.)',
    source: '레슨서 \'Golf My Way\'',
    stats: 'PGA 투어 통산 73승 (메이저 18승 - 역대 최다 기록)'
  },
  {
    id: '5',
    name: '게리 플레이어 (Gary Player)',
    nationality: '남아프리카공화국',
    birthYear: '1935년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Gary+Player+golf+photo&tbm=isch',
    quote: '"연습을 하면 할수록, 나는 더욱 운이 좋아진다." (The harder I practice, the luckier I get.)',
    source: '1960년대 경기 후 인터뷰',
    stats: 'PGA 투어 24승 (전 세계 통산 160승 이상, 커리어 그랜드 슬램 달성)'
  },
  {
    id: '6',
    name: '타이거 우즈 (Tiger Woods)',
    nationality: '미국',
    birthYear: '1975년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Tiger+Woods+golf+photo&tbm=isch',
    quote: '"나는 항상 나 자신과 경쟁한다. 어제의 나보다 나아지는 것이 목표다." (I\'m always competing against myself, trying to get better every day.)',
    source: '마스터스 우승 인터뷰 등',
    stats: 'PGA 투어 통산 82승 (역대 공동 1위, 메이저 15승)'
  },
  {
    id: '7',
    name: '샘 스니드 (Sam Snead)',
    nationality: '미국',
    birthYear: '1912년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Sam+Snead+golf+photo&tbm=isch',
    quote: '"그립은 새를 잡듯 부드럽게 쥐어라." (Hold the club as if you had a little bird in your hand.)',
    source: '그의 기술 지도서 및 강연',
    stats: 'PGA 투어 통산 82승 (역대 공동 1위, 메이저 7승)'
  },
  {
    id: '8',
    name: '박세리 (Se-ri Pak)',
    nationality: '대한민국',
    birthYear: '1977년생',
    gender: '여성',
    photoUrl: 'https://www.google.com/search?q=Se-ri+Pak+golf+photo&tbm=isch',
    quote: '"포기하지 마세요. 끝날 때까지는 끝난 게 아닙니다." (Never give up. It’s not over until it’s over.)',
    source: '1998년 US 여자오픈 우승 인터뷰',
    stats: 'LPGA 투어 통산 25승 (메이저 5승, 명예의 전당 헌액)'
  },
  {
    id: '9',
    name: '아니카 소렌스탐 (Annika Sorenstam)',
    nationality: '스웨덴',
    birthYear: '1970년생',
    gender: '여성',
    photoUrl: 'https://www.google.com/search?q=Annika+Sorenstam+golf+photo&tbm=isch',
    quote: '"목표를 높게 잡아라. 그리고 당신이 거기에 도달할 때까지 멈추지 마라." (Set your goals high, and don\'t stop till you get there.)',
    source: '자서전 및 은퇴 연설',
    stats: 'LPGA 투어 통산 72승 (메이저 10승, 여자 골프 유일 59타 기록)'
  },
  {
    id: '10',
    name: '톰 왓슨 (Tom Watson)',
    nationality: '미국',
    birthYear: '1949년생',
    gender: '남성',
    photoUrl: 'https://www.google.com/search?q=Tom+Watson+golf+photo&tbm=isch',
    quote: '"실력보다는 태도가 골퍼를 만든다." (It is your attitude, not your aptitude, that determines your altitude.)',
    source: '인터뷰 및 골프 칼럼',
    stats: 'PGA 투어 통산 39승 (메이저 8승 포함)'
  }
];

const GolferQuotesWidget = () => {
  const [quotes, setQuotes] = useState<GolferQuote[]>(INITIAL_QUOTES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showOnlyKorean, setShowOnlyKorean] = useState(false);

  const filteredQuotes = quotes.filter(q => {
    if (!showOnlyKorean) return true;
    return q.nationality === '한국' || q.nationality === '대한민국';
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [showOnlyKorean]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'golferQuotes'));
        if (!querySnapshot.empty) {
          const fetchedQuotes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as GolferQuote[];
          setQuotes(fetchedQuotes);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handlePrev = useCallback(() => {
    if (filteredQuotes.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? filteredQuotes.length - 1 : prev - 1));
  }, [filteredQuotes.length]);

  const handleNext = useCallback(() => {
    if (filteredQuotes.length === 0) return;
    setCurrentIndex((prev) => (prev === filteredQuotes.length - 1 ? 0 : prev + 1));
  }, [filteredQuotes.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (loading) {
    return <div className="glass p-8 rounded-[32px] border border-white/10 mb-8 h-64 flex items-center justify-center">로딩 중...</div>;
  }

  if (quotes.length === 0) return null;

  const safeIndex = currentIndex >= filteredQuotes.length ? 0 : currentIndex;
  const currentQuote = filteredQuotes[safeIndex];

  return (
    <div className="relative flex items-center mb-16 w-full">
      <button 
        onClick={handlePrev}
        disabled={filteredQuotes.length <= 1}
        className={`absolute left-0 md:-left-6 z-10 w-12 h-12 rounded-full bg-[#3b5e36] border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg ${filteredQuotes.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4c6f47]'}`}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full">
        <div className="glass p-8 rounded-[32px] border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Flag className="text-lime" /> 골프 명언으로 배우는 인생 철학
            </h3>
            <div className="flex items-center gap-2 text-right">
              <input 
                type="checkbox" 
                id="koreanFilter" 
                checked={showOnlyKorean}
                onChange={(e) => setShowOnlyKorean(e.target.checked)}
                className="w-4 h-4 accent-lime cursor-pointer rounded border-white/30 bg-white/10"
              />
              <label htmlFor="koreanFilter" className="text-sm opacity-60 cursor-pointer select-none">
                대한민국 골퍼만 보기
              </label>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[250px] flex flex-col justify-center">
            {filteredQuotes.length === 0 ? (
              <div className="text-center text-white/60 py-12">
                해당하는 명언이 없습니다.
              </div>
            ) : (
              <>
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h4 className="text-xl font-bold text-lime flex items-center gap-2">
                    {currentQuote.name}
                    {currentQuote.photoUrl && (
                      <a 
                        href={currentQuote.photoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        title="사진 검색"
                      >
                        <ExternalLink size={14} className="text-lime" />
                      </a>
                    )}
                  </h4>
                  <p className="text-sm font-bold opacity-80">
                    {currentQuote.nationality} / {currentQuote.birthYear} / {currentQuote.gender}
                  </p>
                </div>

                {/* Quote Section */}
                <div className="mb-10">
                  <p className="text-3xl font-bold text-[#FFD700] leading-snug">
                    {currentQuote.quote.split(/(?=\()/).map((line, i) => (
                      <span key={i} className="block mt-2 first:mt-0">{line.trim()}</span>
                    ))}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-sm font-bold opacity-80 mt-auto">
                  <p>
                    통산 성적: {currentQuote.stats}
                  </p>
                  <p>
                    명언 출처: {currentQuote.source}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={handleNext}
        disabled={filteredQuotes.length <= 1}
        className={`absolute right-0 md:-right-6 z-10 w-12 h-12 rounded-full bg-[#3b5e36] border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg ${filteredQuotes.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4c6f47]'}`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default GolferQuotesWidget;
