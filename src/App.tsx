import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Calendar, Users, MapPin, 
  Star, Clock, Info, 
  Calculator, Map as MapIcon,
  Plane, Car, Mail, Play,
  ChevronLeft, ChevronRight,
  CheckCircle2, AlertCircle, Send, Search,
  Plus, Trash2, ChevronUp, ChevronDown, Image as ImageIcon, Home as HomeIcon, Download
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isWeekend, isSameDay, startOfTomorrow } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import emailjs from '@emailjs/browser';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  onSnapshot, 
  getDocs,
  query, 
  orderBy, 
  serverTimestamp,
  getDocFromServer,
  updateDoc,
  deleteDoc,
  where
} from 'firebase/firestore';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { db, auth } from './firebase';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { GOLF_COURSES, STAY_UNITS, KSL_LOCATION, type StayUnit } from './constants';
import { GALLERY_DATA, type GalleryItem } from './galleryData';
import { Rest } from './Rest';
import WeatherWidget from './WeatherWidget';
import GolferQuotesWidget from './GolferQuotesWidget';
import TravelGuide from './TravelGuide';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}

function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email || undefined,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return `오류: ${errInfo.error} (작업: ${operationType})`;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

const ExchangeRateContext = createContext<number>(315);

export const useExchangeRate = () => useContext(ExchangeRateContext);

export const ExchangeRateProvider = ({ children }: { children: React.ReactNode }) => {
  const [rate, setRate] = useState<number>(315);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/MYR');
        const data = await response.json();
        if (data && data.rates && data.rates.KRW) {
          setRate(Math.round(data.rates.KRW));
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };
    fetchRate();
    const interval = setInterval(fetchRate, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <ExchangeRateContext.Provider value={rate}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

// --- Components ---

// --- Constants ---
const MAX_FILE_SIZE_MB = 0.7;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const compressImage = (base64Str: string, maxWidth = 1200, maxHeight = 1200, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
  });
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '공지사항', path: '/notices' },
    { name: '골프장 소개', path: '/golf' },
    { name: '알거리', path: '/stay' },
    { name: '휴식거리', path: '/rest' },
    { name: '가격표', path: '/pricing' },
    { name: '예약하기', path: '/booking' },
    { name: '갤러리', path: '/gallery' },
    { name: '관리자', path: '/admin', onClick: async () => { await signOut(auth); } },
  ];

  return (
    <nav className="fixed top-8 left-0 w-full z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-4xl font-sans font-bold tracking-tighter flex items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="Logo" 
            className="h-20 w-20 object-contain"
          />
          <div className="flex flex-col gap-3">
            <span className="text-lime leading-none">야나골</span>
            <span className="text-white leading-none">골프클럽</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-3 glass p-2 rounded-full">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={link.onClick}
              className={cn(
                "pill-nav border-none",
                location.pathname === link.path ? "active-pill" : "text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Removed Contact US button */}

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 bg-forest/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-xl serif",
                  location.pathname === link.path ? "text-lime" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-ink text-paper py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h2 className="text-4xl font-sans font-bold italic mb-6 flex items-center gap-4">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="Logo" 
            className="h-16 w-16 object-contain"
          />
          <div className="flex flex-col gap-3">
            <span className="text-lime leading-none">야나골</span>
            <span className="text-white leading-none">골프클럽</span>
          </div>
        </h2>
        <p className="text-paper/80 text-sm leading-relaxed max-w-xs">
          조호바루 골프 여행의 품격 있는 시작. 
          최고의 숙소와 골프장을 연결하는 프리미엄 커넥트 서비스입니다.
        </p>
      </div>
      <div>
        <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">연락하기</h3>
        <p className="text-lg serif">jco119@gmail.com</p>
        <p className="text-lg serif">cskim1747@gmail.com</p>
        <p className="text-xs opacity-80 mt-2">궁금하신 사항은 위 메일로 문의해 주세요</p>
        <p className="text-sm opacity-80 mt-4">야나골 골프클럽</p>
      </div>
      <div>
        <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">빠른 링크</h3>
        <div className="flex flex-col gap-2">
          <Link to="/notices" className="hover:underline">공지사항</Link>
          <Link to="/golf" className="hover:underline">골프장 소개</Link>
          <Link to="/stay" className="hover:underline">알거리</Link>
          <Link to="/rest" className="hover:underline">휴식거리</Link>
          <Link to="/pricing" className="hover:underline">가격표</Link>
          <Link to="/booking" className="hover:underline">예약하기</Link>
          <Link to="/gallery" className="hover:underline">갤러리</Link>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-paper/10 flex justify-between items-center text-[10px] tracking-widest opacity-60">
      <p>© 2026 야나골 골프클럽. ALL RIGHTS RESERVED.</p>
      <p>DESIGNED FOR EXCELLENCE</p>
    </div>
  </footer>
);

// --- Pages ---

const filterLabels: Record<string, string> = {
  'All': '전체',
  'Premium': '프리미엄',
  'Value': '가성비',
  'Accessibility': '접근성'
};

const GolfCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [pricingData, setPricingData] = useState<CoursePricing[]>([]);

  useEffect(() => {
    const unsubscribePricing = onSnapshot(collection(db, 'pricing'), (snapshot) => {
      const data = snapshot.docs
        .filter(doc => !/^\d+$/.test(doc.id)) // Filter out numeric IDs
        .map(doc => {
          const d = doc.data() as CoursePricing;
          return {
            ...d,
            rows: (d.rows || []).map(r => ({
              ...r,
              item: r.item.replace(/\s*\(Green Fee\)/gi, '')
            }))
          };
        });
      // Sort by order
      data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setPricingData(data);
    });
    return () => unsubscribePricing();
  }, []);

  const displayCourses = pricingData;

  const nextSlide = useCallback(() => {
    if (displayCourses.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % displayCourses.length);
  }, [displayCourses.length]);

  const prevSlide = useCallback(() => {
    if (displayCourses.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + displayCourses.length) % displayCourses.length);
  }, [displayCourses.length]);

  useEffect(() => {
    if (!isAutoPlaying || displayCourses.length === 0) return;
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, displayCourses.length]);

  if (displayCourses.length === 0) return null;

  const coursePricing = displayCourses[currentIndex];
  const staticCourse = GOLF_COURSES.find(c => c.name === coursePricing.courseName);

  return (
    <div className="max-w-7xl w-full relative group">
      {/* Navigation Arrows */}
      <button 
        onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20 hidden lg:flex"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20 hidden lg:flex"
      >
        <ChevronRight size={24} />
      </button>

      <AnimatePresence mode="wait">
        <motion.div 
          key={coursePricing.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 glass rounded-[40px] border border-white/10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Card: 프리미엄 가이드 */}
          <div className="md:col-span-3 bg-forest/40 backdrop-blur-md rounded-[32px] px-4 py-8 border border-white/10 h-[500px] flex flex-col">
            <div className="mb-5 px-3">
              <h3 className="text-2xl serif italic text-lime">프리미엄 가이드</h3>
              <div className="h-px w-12 bg-lime/30 mt-2" />
            </div>
            <div className="space-y-4 flex-1 px-3 overflow-y-auto custom-scrollbar">
              {coursePricing.premiumInfo ? (
                <p className="text-[17px] leading-relaxed opacity-90 font-light whitespace-pre-wrap">
                  {coursePricing.premiumInfo}
                </p>
              ) : (
                (staticCourse?.fullDescription || []).map((sentence, idx) => (
                  <div key={idx} className="flex gap-1.5">
                    <span className="text-lime/40 font-mono text-[11px] mt-1.5 shrink-0">0{idx + 1}</span>
                    <p className="text-[17px] leading-relaxed opacity-90 font-light">
                      {sentence}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-auto pt-4 border-t border-white/5 px-3">
              <div className="flex items-center justify-center text-sm">
                <span className="text-lime font-bold">
                  {coursePricing.operatingHours ? `운영시간: ${coursePricing.operatingHours}` : (staticCourse ? `${staticCourse.travelTime} min from KSL` : '')}
                </span>
              </div>
            </div>
          </div>

          {/* Center Card: Image with Name & Address */}
          <div className="md:col-span-6 relative rounded-[32px] overflow-hidden h-[500px]">
            <img 
              src={coursePricing.photoUrl || staticCourse?.image || 'https://picsum.photos/seed/golf/800/600'} 
              alt={coursePricing.courseName} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            
            {/* Top Left Info */}
            <div className="absolute top-8 left-8 right-8">
              <h3 className="serif leading-tight mb-2">
                {(() => {
                  const name = coursePricing.courseName;
                  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
                  const korean = match ? match[1] : name;
                  const english = match ? `(${match[2]})` : '';
                  return (
                    <div className="flex items-baseline gap-3">
                      <span className="tracking-tighter text-4xl text-white">
                        {korean}
                      </span>
                      {english && (
                        <span className="text-xl opacity-70 font-sans font-light italic text-white">
                          {english}
                        </span>
                      )}
                    </div>
                  );
                })()}
              </h3>
              <div className="flex items-center gap-3 group/map">
                <div className="flex items-center gap-2 opacity-80 text-sm">
                  <MapPin size={14} className="text-lime" />
                  <span className="text-white font-light">{coursePricing.address || staticCourse?.address || 'Johor Bahru'}</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coursePricing.courseName + ' ' + (coursePricing.address || staticCourse?.address || ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-lime text-forest flex items-center justify-center hover:scale-110 transition-transform"
                  title="Google Maps"
                >
                  <MapIcon size={14} />
                </a>
              </div>
            </div>

            {/* Bottom Tag */}
            <div className="absolute bottom-8 left-8">
              <div className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs tracking-widest uppercase font-bold">
                {coursePricing.category || '기타'} Collection
              </div>
            </div>
          </div>

          {/* Right Card: Course Info, Pricing, Promotion */}
          {(() => {
            const weekdayRow = (coursePricing.rows || []).find(r => 
              (r.item === '그린피' || r.item.toLowerCase().includes('green')) && 
              (r.division.includes('주중') || r.division.toLowerCase().includes('week'))
            );
            const weekendRow = (coursePricing.rows || []).find(r => 
              (r.item === '그린피' || r.item.toLowerCase().includes('green')) && 
              (r.division.includes('주말') || r.division.toLowerCase().includes('end'))
            );
            
            const weekdayMorning = weekdayRow ? Number(weekdayRow.morning) : (staticCourse?.pricing.weekday.morning || 0);
            const weekdayAfternoon = weekdayRow ? Number(weekdayRow.afternoon) : (staticCourse?.pricing.weekday.afternoon || 0);
            const weekendMorning = weekendRow ? Number(weekendRow.morning) : (staticCourse?.pricing.weekend.morning || 0);
            const weekendAfternoon = weekendRow ? Number(weekendRow.afternoon) : (staticCourse?.pricing.weekend.afternoon || 0);
            
            const courseInfoSubText = coursePricing.courseInfo || (staticCourse ? `${staticCourse.difficulty} • ${staticCourse.nightGolf ? '야간' : '주간'}` : '');
            const promotionSubText = coursePricing.promotionInfo || (staticCourse?.promotion || '현재 진행중인 프로모션이 없습니다.');

            return (
                <div className="md:col-span-3 bg-forest/40 backdrop-blur-md rounded-[32px] p-4 border border-white/10 h-[500px] flex flex-col gap-4">
                {/* Course Info */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[14px] font-bold text-lime uppercase tracking-widest">코스 정보</h3>
                    <Info size={12} className="text-lime opacity-80" />
                  </div>
                  <p className="text-sm opacity-80 font-light">{courseInfoSubText}</p>
                </div>

                {/* Pricing Table */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[14px] font-bold text-lime uppercase tracking-widest">그린피 (RM)</h3>
                    <div className="px-2 py-0.5 bg-lime/20 rounded text-[10px] text-lime">Best Price</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="opacity-50">주중 오전</span>
                      <span className="font-bold">RM {weekdayMorning}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="opacity-50">주중 오후</span>
                      <span className="font-bold">RM {weekdayAfternoon}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="opacity-50">주말 오전</span>
                      <span className="font-bold">RM {weekendMorning}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="opacity-50">주말 오후</span>
                      <span className="font-bold">RM {weekendAfternoon}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-[10px] opacity-40 uppercase tracking-widest mb-1">캐디 정보</p>
                    <p className="text-xs opacity-80">{coursePricing.caddyInfo || (staticCourse ? `RM ${staticCourse.pricing.caddyFee}` : '')}</p>
                  </div>
                </div>

                {/* Promotion */}
                <div className="bg-lime/10 rounded-2xl p-4 border border-lime/20">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-lime shrink-0" fill="currentColor" />
                    <p className="text-sm text-lime font-bold leading-relaxed">
                      {promotionSubText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {displayCourses.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => { setCurrentIndex(idx); setIsAutoPlaying(false); }}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              currentIndex === idx ? "w-8 bg-lime" : "w-2 bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Content */}
      <section className="relative z-10 pt-48 pb-20 px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-[1.2] mb-8 tracking-tighter">
            당신이 꿈꾸던 골프 파라다이스, <br />
            <span className="text-lime">조호바루 프리미엄 골프 컬렉션.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            필드 위 짜릿한 샷과 도심 속 화려한 야경을 동시에 누리는 골프 휴가.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-24">
            <Link to="/booking" className="btn-primary">
              예약하기
            </Link>
            <Link to="/golf" className="btn-secondary glass">
              골프장 소개
            </Link>
          </div>
        </motion.div>

        <GolfCarousel />
      </section>
    </div>
  );
};

const Golf = () => {
  const [filter, setFilter] = useState<'All' | 'Premium' | 'Value' | 'Accessibility'>('All');

  const [pricingData, setPricingData] = useState<CoursePricing[]>([]);
  const [loading, setLoading] = useState(true);
  const exchangeRate = useExchangeRate();

  useEffect(() => {
    const unsubscribePricing = onSnapshot(collection(db, 'pricing'), (snapshot) => {
      const data = snapshot.docs
        .filter(doc => !/^\d+$/.test(doc.id)) // Filter out numeric IDs
        .map(doc => {
          const d = doc.data() as CoursePricing;
          return {
            ...d,
            rows: (d.rows || []).map(r => ({
              ...r,
              item: r.item.replace(/\s*\(Green Fee\)/gi, '')
            }))
          };
        });
      // Sort by order field
      data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setPricingData(data);
      setLoading(false);
    }, (error) => {
      console.error("Pricing fetch error (Golf):", error);
      setLoading(false);
    });

    return () => unsubscribePricing();
  }, []);

  if (loading) return (
    <div className="pt-40 pb-24 px-6 text-center">
      <div className="w-12 h-12 border-4 border-lime/30 border-t-lime rounded-full animate-spin mx-auto mb-4" />
      <p className="serif italic opacity-60">가격 정보를 불러오는 중...</p>
    </div>
  );

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-7xl font-bold mb-8">골프장 소개</h1>
        <div className="flex flex-wrap gap-4">
          {['All', 'Premium', 'Value', 'Accessibility'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "pill-nav",
                filter === f ? "active-pill" : "text-white/60"
              )}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {pricingData
          .filter(p => filter === 'All' || p.category === (filter === 'Premium' ? '프리미엄' : filter === 'Value' ? '가성비' : '접근성'))
          .map((coursePricing) => {
          const staticCourse = GOLF_COURSES.find(c => c.name === coursePricing.courseName);
          
          // Find Green Fee rows with flexible matching for division
          const weekdayRow = (coursePricing.rows || []).find(r => 
            (r.item === '그린피' || r.item.toLowerCase().includes('green')) && 
            (r.division.includes('주중') || r.division.toLowerCase().includes('week'))
          );
          const weekendRow = (coursePricing.rows || []).find(r => 
            (r.item === '그린피' || r.item.toLowerCase().includes('green')) && 
            (r.division.includes('주말') || r.division.toLowerCase().includes('end'))
          );
          
          const weekdayMorning = weekdayRow ? Number(weekdayRow.morning) : (staticCourse?.pricing.weekday.morning || 0);
          const weekdayAfternoon = weekdayRow ? Number(weekdayRow.afternoon) : (staticCourse?.pricing.weekday.afternoon || 0);
          const weekendMorning = weekendRow ? Number(weekendRow.morning) : (staticCourse?.pricing.weekend.morning || 0);
          const weekendAfternoon = weekendRow ? Number(weekendRow.afternoon) : (staticCourse?.pricing.weekend.afternoon || 0);
          
          // New fields from CoursePricing
          const travelTimeText = coursePricing.operatingHours ? `운영시간: ${coursePricing.operatingHours}` : (staticCourse ? `숙소(KSL)에서 ${staticCourse.travelTime}분 소요` : '');
          const courseInfoText = coursePricing.courseInfo || (staticCourse ? `${staticCourse.holes}홀 • ${staticCourse.difficulty} 난이도 • ${staticCourse.nightGolf ? '야간 가능' : '주간 전용'}` : '');
          const promotionText = coursePricing.promotionInfo || (staticCourse?.promotion || '');
          const caddyInfoText = coursePricing.caddyInfo || (staticCourse ? `RM ${staticCourse.pricing.caddyFee}` : '');
          
          const photoUrl = coursePricing.photoUrl || staticCourse?.image || 'https://picsum.photos/seed/golf/800/600';
          const address = coursePricing.address || staticCourse?.address || 'Johor Bahru';
          const websiteUrl = coursePricing.websiteUrl || staticCourse?.websiteUrl || '#';

          return (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={coursePricing.id} 
              className="group flex flex-col h-full"
            >
              <div className="flex-grow">
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block aspect-[3/4] rounded-[60px] overflow-hidden mb-6 relative border border-white/10"
                >
                  <img src={photoUrl} alt={coursePricing.courseName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6 px-4 py-1 bg-lime text-forest rounded-full text-[10px] tracking-widest uppercase font-bold">
                    {coursePricing.category || '기타'}
                  </div>
                </a>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl serif">{coursePricing.courseName}</h3>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coursePricing.courseName + ' ' + address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-lime text-forest flex items-center justify-center hover:scale-110 transition-transform"
                    title="Google Maps"
                  >
                    <MapIcon size={18} />
                  </a>
                </div>
                
                <div className="space-y-3 text-sm opacity-70 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{travelTimeText}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info size={14} />
                    <span>{courseInfoText}</span>
                  </div>
                  {promotionText && (
                    <div className="flex items-center gap-2 text-lime font-medium">
                      <Star size={14} fill="currentColor" />
                      <span>{promotionText}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Pricing Table - Aligned to bottom */}
              <div className="mt-auto">
                <div className="glass rounded-2xl p-6 mb-6 text-sm border border-white/10">
                  <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 mb-2 opacity-40 uppercase tracking-widest text-[10px]">
                    <span>구분</span>
                    <span>오전</span>
                    <span>오후</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-1">
                    <span className="font-medium">주중</span>
                    <span>RM {weekdayMorning}</span>
                    <span>RM {weekdayAfternoon}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium">주말/공휴일</span>
                    <span>RM {weekendMorning}</span>
                    <span>RM {weekendAfternoon}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between opacity-60 text-xs">
                    <span>{caddyInfoText}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase opacity-40 mb-1">원화 참고</p>
                      <p className="text-xl serif">₩{(weekdayMorning * exchangeRate).toLocaleString()} <span className="text-sm opacity-40 italic">/ 오전</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const STAY_CATEGORIES = [
  { id: '4', label: '4인(룸2)', url: "https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=4" },
  { id: '6', label: '6인(룸3)', url: "https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=6" },
  { id: '8', label: '8인(룸4)', url: "https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=8" },
];



const Stay = () => {
  const [activeStayCat, setActiveStayCat] = useState('4');

  const activeStay = STAY_CATEGORIES.find(c => c.id === activeStayCat);

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      {/* Stay Section */}
      <header className="mb-12">
        <div className="flex items-center gap-6 mb-8">
          <h1 className="text-4xl md:text-7xl font-bold">알거리 <span className="italic text-lime"></span></h1>
        </div>
      </header>

      <GolferQuotesWidget />
      <WeatherWidget />

      <div className="glass p-8 rounded-[32px] border border-white/10 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
            <HomeIcon className="text-lime" /> 숙소 정보(에어비앤비)
          </h3>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=KSL+City+Mall+Johor+Bahru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-lime text-forest flex items-center justify-center hover:scale-110 transition-transform"
            title="Google Maps"
          >
            <MapIcon size={20} />
          </a>
        </div>
        <p className="text-xl serif italic opacity-80 mb-8 max-w-2xl">
          "KSL 몰과 연결되어 라운딩 후 쇼핑·마사지·식사가 한 번에 가능! Residence R9 홈스테이 추천 리스트"
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAY_CATEGORIES.map((stay) => (
            <a 
              key={stay.id}
              href={stay.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-lime/50 transition-all group flex flex-col"
            >
              <h4 className="text-2xl font-bold mb-4 text-lime">{stay.label}</h4>
              <p className="text-sm opacity-80 mb-8 flex-grow leading-relaxed">
                에어비앤비에서 현재 예약 가능한 {stay.label} 숙소를 실시간으로 확인하세요.
              </p>
              <div className="inline-block px-6 py-3 bg-white/10 rounded-full font-bold text-center group-hover:bg-lime group-hover:text-forest transition-all self-start">
                숙소 보기
              </div>
            </a>
          ))}
        </div>
      </div>

      <TravelGuide />
    </div>
  );
};

const Pricing = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const [pricingData, setPricingData] = useState<CoursePricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const exchangeRate = useExchangeRate();

  // Helper to get category
  const getCourseCategory = (course: CoursePricing) => {
    if (course.category) return course.category;
    const staticCourse = GOLF_COURSES.find(c => c.name.includes(course.courseName) || course.courseName.includes(c.name));
    if (!staticCourse) return '기타';
    switch (staticCourse.category) {
      case 'Premium': return '프리미엄';
      case 'Value': return '가성비';
      case 'Accessibility': return '접근성';
      default: return '기타';
    }
  };

  useEffect(() => {
    const unsubscribePricing = onSnapshot(collection(db, 'pricing'), (snapshot) => {
      const data = snapshot.docs
        .filter(doc => !/^\d+$/.test(doc.id)) // Filter out numeric IDs
        .map(doc => {
          const d = doc.data() as CoursePricing;
          return {
            ...d,
            category: d.category || getCourseCategory(d),
            rows: (d.rows || []).map(r => ({
              ...r,
              item: r.item.replace(/\s*\(Green Fee\)/gi, '')
            }))
          };
        });
      // Sort by order field
      data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setPricingData(data);
      setLoading(false);
    }, (error) => {
      console.error("Pricing fetch error (Pricing):", error);
      setLoading(false);
    });

    return () => unsubscribePricing();
  }, []);

  if (loading) return (
    <div className="pt-40 pb-24 px-6 text-center">
      <div className="w-12 h-12 border-4 border-lime/30 border-t-lime rounded-full animate-spin mx-auto mb-4" />
      <p className="serif italic opacity-60">가격 정보를 불러오는 중...</p>
    </div>
  );

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-7xl font-bold mb-8">가격표</h1>
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-white/10 pb-8 mb-8">
          <div className="space-y-1">
            <p className="text-xs tracking-widest uppercase opacity-40">현재 날짜</p>
            <p className="text-2xl serif">{currentDate}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs tracking-widest uppercase opacity-40">환율</p>
            <p className="text-2xl serif">1 MYR = {exchangeRate} 원</p>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {['전체', '프리미엄', '가성비', '접근성'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-8 py-2.5 rounded-full border transition-all text-sm font-medium",
                selectedCategory === cat 
                  ? "bg-lime/10 border-lime text-lime shadow-[0_0_20px_rgba(163,230,53,0.15)]" 
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-12">
        {pricingData
          .filter(course => selectedCategory === '전체' || course.category === selectedCategory)
          .map((course) => (
          <div key={course.id} id={`course-${course.id}`} className="glass rounded-[40px] p-8 border border-white/10 scroll-mt-32 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h2 className="text-3xl serif mb-2">{course.courseName}</h2>
                <div className="flex flex-wrap gap-4 text-[10px] tracking-widest uppercase opacity-60 mb-3">
                  {course.operatingHours && (
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.operatingHours}</span>
                  )}
                  {course.courseInfo && (
                    <span className="flex items-center gap-1"><Info size={12} /> {course.courseInfo}</span>
                  )}
                </div>
                {course.address && (
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(course.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs opacity-50 hover:opacity-100 hover:text-lime transition-all group"
                  >
                    <MapPin size={14} className="group-hover:scale-110 transition-transform" />
                    <span className="underline underline-offset-4">{course.address}</span>
                  </a>
                )}
              </div>
              
              {(course.caddyInfo || course.promotionInfo) && (
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm bg-white/5 px-6 py-4 rounded-3xl border border-white/5 w-full md:w-auto">
                  {course.caddyInfo && (
                    <div>
                      <span className="block opacity-40 text-[10px] uppercase mb-1 font-bold tracking-widest">캐디 정보</span>
                      <p className="font-medium">{course.caddyInfo}</p>
                    </div>
                  )}
                  {course.promotionInfo && (
                    <div>
                      <span className="block opacity-40 text-[10px] uppercase mb-1 font-bold tracking-widest">프로모션</span>
                      <p className="text-lime font-medium">{course.promotionInfo}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs tracking-widest uppercase opacity-40">
                      <th className="py-4 font-medium">항목</th>
                      <th className="py-4 font-medium">구분</th>
                      <th className="py-4 font-medium text-right">오전 (RM)</th>
                      <th className="py-4 font-medium text-right">오전 (원)</th>
                      <th className="py-4 font-medium text-right">오후 (RM)</th>
                      <th className="py-4 font-medium text-right">오후 (원)</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {(course.rows || []).map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 font-bold">{row.item}</td>
                        <td className="py-6 opacity-80">{row.division}</td>
                        <td className="py-6 text-right font-bold">RM {row.morning}</td>
                        <td className="py-6 text-right opacity-80">₩{(Number(row.morning) * exchangeRate).toLocaleString()}</td>
                        <td className="py-6 text-right font-bold">RM {row.afternoon}</td>
                        <td className="py-6 text-right opacity-80">₩{(Number(row.afternoon) * exchangeRate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 glass rounded-3xl border border-white/10">
        <h4 className="text-xs tracking-widest uppercase opacity-40 mb-4">Additional Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm opacity-70">
          <p>• 위 요금은 외국인 방문객(Visitor) 기준 요금입니다.</p>
          <p>• 캐디 피(Caddy Fee) 및 카트 피는 골프장별로 상이하며, 현장에서 별도 결제될 수 있습니다.</p>
          <p>• 시니어 할인은 만 60세 이상 여권 지참 시 적용 가능합니다.</p>
          <p>• 환율은 실시간 변동될 수 있으며, 위 금액은 참고용 예상 금액입니다.</p>
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [options, setOptions] = useState<Record<string, Array<{ 
    scheduleId: string,
    day: 'weekday' | 'weekend', 
    time: 'morning' | 'afternoon',
    dates: Date[]
  }>>>({});
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openCalendarKey, setOpenCalendarKey] = useState<string | null>(null);
  const [pricingData, setPricingData] = useState<CoursePricing[]>([]);
  const [pricingLoading, setPricingLoading] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);
  const exchangeRate = useExchangeRate();

  useEffect(() => {
    const unsubscribePricing = onSnapshot(collection(db, 'pricing'), (snapshot) => {
      const data = snapshot.docs
        .filter(doc => !/^\d+$/.test(doc.id)) // Filter out numeric IDs
        .map(doc => {
          const d = doc.data() as CoursePricing;
          return {
            ...d,
            rows: d.rows || []
          };
        });
      // Sort by order field
      data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setPricingData(data);
      setPricingLoading(false);
    }, (error) => {
      console.error("Pricing fetch error (Booking):", error);
      setPricingLoading(false);
    });

    return () => unsubscribePricing();
  }, []);

  const handleOpenQuoteModal = () => {
    // Check if all selected courses have at least one date selected in each of their schedules
    const allDatesSelected = selectedCourses.every(id => {
      const schedules = options[id] || [];
      return schedules.length > 0 && schedules.every(s => (s.dates || []).length > 0);
    });

    if (!allDatesSelected) {
      alert('날짜를 확인해주세요');
      return;
    }

    setIsQuoteModalOpen(true);
  };

  const isAllDatesSelected = selectedCourses.length > 0 && selectedCourses.every(id => {
    const schedules = options[id] || [];
    return schedules.length > 0 && schedules.every(s => (s.dates || []).length > 0);
  });

  const [quoteForm, setQuoteForm] = useState({
    from_name: '',
    email: '',
    phone: '',
    golf_courses: '',
    travel_period: '',
    message: ''
  });

  const golfCoursesRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll golf_courses textarea when content changes
  useEffect(() => {
    if (golfCoursesRef.current) {
      golfCoursesRef.current.scrollTop = golfCoursesRef.current.scrollHeight;
    }
  }, [quoteForm.golf_courses]);

  // Sync selected courses to quote form when modal opens or selection changes
  useEffect(() => {
    if (isQuoteModalOpen) {
      const coursesInfo = selectedCourses.map(id => {
        const course = pricingData.find(c => c.id === id);
        const schedules = options[id] || [];
        if (!course || schedules.length === 0) return '';
        
        const scheduleDetails = (schedules || []).map(opt => {
          const dateStr = (opt.dates || []).length > 0 
            ? opt.dates.map(d => format(d, 'MM/dd')).join(', ')
            : '날짜 미선택';
          return `${dateStr} / ${opt.time.toUpperCase()}`;
        }).join('\n');

        return `${course.courseName}\n${scheduleDetails}`;
      }).filter(Boolean).join('\n\n');
      
      // Calculate overall travel period from all selected dates
      const allDates = selectedCourses.flatMap(id => (options[id] || []).flatMap(s => s.dates || []));
      let period = '';
      if (allDates.length > 0) {
        const sorted = [...allDates].sort((a, b) => a.getTime() - b.getTime());
        const start = format(sorted[0], 'yyyy.MM.dd');
        const end = format(sorted[sorted.length - 1], 'yyyy.MM.dd');
        period = `${start} ~ ${end}`;
      }

      setQuoteForm(prev => ({ 
        ...prev, 
        golf_courses: coursesInfo,
        travel_period: period
      }));
    }
  }, [isQuoteModalOpen, selectedCourses, options, pricingData]);

  const toggleCourse = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter(i => i !== id));
      const newOptions = { ...options };
      delete newOptions[id];
      setOptions(newOptions);
    } else {
      setSelectedCourses([...selectedCourses, id]);
      const today = new Date();
      const initialDay = isWeekend(today) ? 'weekend' : 'weekday';
      setOptions({ 
        ...options, 
        [id]: [{ 
          scheduleId: Math.random().toString(36).substr(2, 9),
          day: initialDay, 
          time: 'morning',
          dates: []
        }]
      });
    }
  };

  const addSchedule = (courseId: string) => {
    const today = new Date();
    const initialDay = isWeekend(today) ? 'weekend' : 'weekday';
    setOptions({
      ...options,
      [courseId]: [
        ...options[courseId],
        {
          scheduleId: Math.random().toString(36).substr(2, 9),
          day: initialDay,
          time: 'morning',
          dates: []
        }
      ]
    });
  };

  const removeSchedule = (courseId: string, scheduleId: string) => {
    if (options[courseId].length <= 1) return;
    setOptions({
      ...options,
      [courseId]: options[courseId].filter(s => s.scheduleId !== scheduleId)
    });
  };

  const updateOption = (courseId: string, scheduleId: string, key: 'day' | 'time' | 'dates', value: any) => {
    const courseSchedules = [...options[courseId]];
    const scheduleIndex = courseSchedules.findIndex(s => s.scheduleId === scheduleId);
    if (scheduleIndex === -1) return;

    let current = { ...courseSchedules[scheduleIndex], [key]: value };

    // Conflict detection
    if (key === 'dates' || key === 'time') {
      const targetDates = key === 'dates' ? (value as Date[]) : current.dates;
      const targetTime = key === 'time' ? (value as string) : current.time;

      if (targetDates && targetDates.length > 0) {
        // Check against ALL other schedules in ALL courses
        for (const cId of selectedCourses) {
          const schedules = options[cId] || [];
          for (const s of schedules) {
            // Skip the current schedule being updated
            if (cId === courseId && s.scheduleId === scheduleId) continue;

            if (s.time === targetTime) {
              const conflictingDates = targetDates.filter(d1 => 
                s.dates.some(d2 => isSameDay(d1, d2))
              );

              if (conflictingDates.length > 0) {
                alert('이미 선택된 날짜입니다. 다른 날짜를 선택해 주세요.');
                return; // Stop update if conflict found
              }
            }
          }
        }
      }
    }

    if (key === 'dates') {
      const dates = value as Date[];
      if (dates.length > 0) {
        // If any date is a weekday, set to weekday. Otherwise weekend.
        const hasWeekday = dates.some(d => !isWeekend(d));
        current.day = hasWeekday ? 'weekday' : 'weekend';
      }
    }

    courseSchedules[scheduleIndex] = current;
    setOptions({ ...options, [courseId]: courseSchedules });
  };

  const calculateTotal = () => {
    return selectedCourses.reduce((acc, id) => {
      const course = pricingData.find(c => c.id === id);
      if (!course) return acc;
      
      const schedules = options[id] || [];
      return acc + schedules.reduce((sAcc, opt) => {
        const division = opt.day === 'weekday' ? '주중' : '주말/공휴일';
        const row = (course.rows || []).find(r => (r.item.includes('그린피') || r.item.toLowerCase().includes('green')) && r.division === division);
        
        let price = 0;
        if (row) {
          price = Number(row[opt.time]);
        } else {
          // Fallback to static data if not found in Firestore rows
          const staticCourse = GOLF_COURSES.find(c => c.name === course.courseName);
          if (staticCourse) {
            price = staticCourse.pricing[opt.day][opt.time];
          }
        }
        
        const count = (opt.dates || []).length || 0;
        return sAcc + (price * count);
      }, 0);
    }, 0);
  };

  const totalMYR = calculateTotal();

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCourses.length === 0) {
      alert('선택된 골프장이 없습니다.');
      return;
    }

    if (!quoteForm.email && !quoteForm.phone) {
      alert('이메일 주소 또는 연락처 중 하나는 반드시 입력해주세요.');
      return;
    }

    setIsSending(true);

    let receiptImageBase64 = '';
    try {
      if (receiptRef.current) {
        // 💡 캡처 시 버튼 등 불필요한 요소 숨기기 위해 임시 처리 가능하지만 
        // 여기서는 전체를 캡처합니다.
        const canvas = await html2canvas(receiptRef.current, {
          backgroundColor: '#1a2e1a', // forest 색상과 유사하게
          scale: 2,
          useCORS: true,
          logging: false,
          ignoreElements: (element) => {
            // 견적 문의하기 버튼은 제외하고 캡처
            return element.tagName === 'BUTTON' && element.textContent?.includes('견적 문의하기');
          }
        });
        receiptImageBase64 = canvas.toDataURL('image/png');
      }
    } catch (error) {
      console.error('이미지 캡처 실패:', error);
    }

    const summary = selectedCourses.map(id => {
      const course = pricingData.find(c => c.id === id);
      const schedules = options[id] || [];
      return schedules.map(opt => {
        let price = 0;
        if (course) {
          const division = opt.day === 'weekday' ? '주중' : '주말/공휴일';
          const row = (course.rows || []).find(r => r.item.includes('그린피') && r.division === division);
          if (row) {
            price = Number(row[opt.time]);
          } else {
            // Fallback to static if row not found
            const staticCourse = GOLF_COURSES.find(c => c.name === course.courseName);
            price = staticCourse?.pricing[opt.day][opt.time] || 0;
          }
        }
        const dateStr = (opt.dates || []).length > 0 ? opt.dates.map(d => format(d, 'MM/dd')).join(', ') : '날짜 미선택';
        return `${course?.courseName} (${dateStr} / ${opt.time}): RM ${price}`;
      }).join('\n');
    }).join('\n\n');

    // 💡 모든 값을 문자열로 변환하여 전송하는 것이 안전합니다.
    const templateParams = {
      from_name: String(quoteForm.from_name),
      name: String(quoteForm.from_name), // Added to match {{name}} in EmailJS template
      email: String(quoteForm.email),
      phone: String(quoteForm.phone),
      contact: `${quoteForm.email} / ${quoteForm.phone}`,
      golf_courses: String(quoteForm.golf_courses),
      travel_period: String(quoteForm.travel_period),
      total_cost: `RM ${totalMYR} / ₩${(totalMYR * exchangeRate).toLocaleString()}`,
      schedule: `${quoteForm.travel_period} (전체 비용: RM ${totalMYR} / ₩${(totalMYR * exchangeRate).toLocaleString()})`,
      message: String(quoteForm.message),
      total_myr: String(totalMYR),
      total_krw: (totalMYR * exchangeRate).toLocaleString() + '원',
      summary: String(summary),
      receipt_image: receiptImageBase64 // 이미지 데이터 추가
    };

    const serviceId = "service_jb_golf";
    const templateId = "template_jb_golf_reserve";
    const publicKey = "FBsRuyiHJUVlj-ptY";

    console.log("EmailJS 전송 시도:", { serviceId, templateId, templateParams });

    setIsSending(true);

    try {
      // Send email via EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });
      console.log('EmailJS 성공:', response.status, response.text);

      // Save quote to Firestore
      await addDoc(collection(db, 'quotes'), {
        ...templateParams,
        timestamp: new Date().toISOString(),
        serverTimestamp: serverTimestamp(),
        status: '접수확인'
      });

      alert('견적 문의가 성공적으로 전송되었습니다!');
      setIsQuoteModalOpen(false);
      setQuoteForm({ from_name: '', email: '', phone: '', golf_courses: '', travel_period: '', message: '' });
    } catch (error: any) {
      console.error('전송 실패:', error);
      if (error.text) {
        alert(`전송 실패: ${error.text}`);
      } else {
        alert('전송 실패. 설정을 확인해주세요.');
      }
    } finally {
      setIsSending(false);
    }
  };
 
  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold mb-4">예약하기</h1>
            <p className="text-sm opacity-40 tracking-widest uppercase">
              {format(new Date(), 'yyyy.MM.dd')} | 환율: 1 MYR = {exchangeRate} 원
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-widest uppercase opacity-40 mb-2">총 예상 비용</p>
            <p className="text-5xl serif">RM {totalMYR}</p>
            <p className="text-xl serif italic opacity-40">₩{(totalMYR * exchangeRate).toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Selection Area */}
        <div className="space-y-12">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl serif flex items-center gap-3">
                <Calculator size={24} className="opacity-40" />
                1. 골프장 선택
              </h2>
              
              <div className="flex items-center gap-4">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 bg-[#1a2e1a] border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-lime transition-all"
                >
                  <option value="전체">전체</option>
                  <option value="프리미엄">프리미엄</option>
                  <option value="가성비">가성비</option>
                  <option value="접근성">접근성</option>
                </select>

                <p className="text-xs tracking-widest uppercase opacity-40">
                  {selectedCourses.length} / {pricingData.length} 선택
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pricingData
                .filter(c => selectedCategory === '전체' || c.category === selectedCategory)
                .map(course => (
                <button
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  className={cn(
                    "p-6 rounded-[32px] border text-left transition-all",
                    selectedCourses.includes(course.id) 
                      ? "bg-lime text-forest border-lime font-bold" 
                      : "glass border-white/10 hover:border-white/30"
                  )}
                >
                  <p className="text-lg font-medium">{course.courseName}</p>
                  <p className="text-[10px] opacity-40 uppercase mt-1">{course.category || '기타'}</p>
                </button>
              ))}
            </div>
          </section>

          {selectedCourses.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl serif mb-6">2. 일정 구성</h2>
              <div className="space-y-8">
                {selectedCourses.map(id => {
                  const course = pricingData.find(c => c.id === id);
                  const schedules = options[id] || [];
                  return (
                    <div 
                      key={id} 
                      className={cn(
                        "p-8 glass border border-white/10 rounded-[40px] space-y-6 transition-all",
                        schedules.some(s => openCalendarKey === `${id}-${s.scheduleId}`) ? "relative z-30" : "relative z-0"
                      )}
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <p className="serif text-xl text-lime">{course?.courseName}</p>
                        <button 
                          onClick={() => addSchedule(id)}
                          className="flex items-center gap-2 text-[10px] tracking-widest uppercase bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors"
                        >
                          <Plus size={12} /> 일정 추가
                        </button>
                      </div>

                      <div className="space-y-4">
                        {schedules.map((opt, idx) => {
                          const calendarKey = `${id}-${opt.scheduleId}`;
                          return (
                            <div key={opt.scheduleId} className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                              <div className="flex flex-wrap items-center gap-4">
                                <span className="text-[10px] opacity-40 font-mono">#{idx + 1}</span>
                                {/* Date Picker Trigger */}
                                <div className="relative">
                                  <button 
                                    onClick={() => setOpenCalendarKey(openCalendarKey === calendarKey ? null : calendarKey)}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-xs transition-colors"
                                  >
                                    <Calendar size={14} className="text-lime" />
                                    <span>
                                      {opt.dates?.length > 0 
                                        ? `${format(opt.dates[0], 'MM/dd')}${opt.dates.length > 1 ? ` 외 ${opt.dates.length - 1}` : ''}`
                                        : '날짜 선택'}
                                    </span>
                                  </button>

                                  <AnimatePresence>
                                    {openCalendarKey === calendarKey && (
                                      <>
                                        <div 
                                          className="fixed inset-0 z-[100]" 
                                          onClick={() => setOpenCalendarKey(null)}
                                        />
                                        <motion.div 
                                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                          animate={{ opacity: 1, y: 0, scale: 1 }}
                                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                          className="absolute top-full mt-2 left-0 z-[110] bg-forest border border-white/10 rounded-3xl p-4 shadow-2xl"
                                        >
                                          <style>{`
                                            .rdp { --rdp-accent-color: #a3e635; --rdp-background-color: rgba(163, 230, 53, 0.1); margin: 0; }
                                            .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: var(--rdp-accent-color); color: #061a14; }
                                            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: var(--rdp-background-color); }
                                            .rdp-day_today { font-weight: bold; color: #a3e635; }
                                          `}</style>
                                          <DayPicker
                                            mode="single"
                                            selected={opt.dates?.[0]}
                                            onSelect={(date) => {
                                              updateOption(id, opt.scheduleId, 'dates', date ? [date] : []);
                                              if (date) setOpenCalendarKey(null);
                                            }}
                                            disabled={{ before: startOfTomorrow() }}
                                            className="text-white"
                                          />
                                        </motion.div>
                                      </>
                                    )}
                                  </AnimatePresence>
                                </div>

                                <select 
                                  value={opt.time} 
                                  onChange={(e) => updateOption(id, opt.scheduleId, 'time', e.target.value)}
                                  className="bg-transparent border-b border-white/20 py-1 text-xs outline-none"
                                >
                                  <option value="morning" className="bg-forest">오전</option>
                                  <option value="afternoon" className="bg-forest">오후</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-4">
                                <p className="text-[10px] opacity-40 uppercase tracking-widest">
                                  {opt.day === 'weekday' ? '평일 요금' : '주말 요금'}
                                </p>
                                {schedules.length > 1 && (
                                  <button 
                                    onClick={() => removeSchedule(id, opt.scheduleId)}
                                    className="text-white/20 hover:text-red-400 transition-colors p-2"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Receipt Area */}
        <div className="relative">
          <div ref={receiptRef} className="sticky top-40 glass p-10 rounded-[40px] shadow-2xl shadow-forest/20 border border-white/10 flex flex-col">
            <div className="absolute top-0 left-0 w-full h-2 bg-lime shrink-0" />
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4 shrink-0">
              <h2 className="text-3xl serif">예상 견적서</h2>
              <span className="text-[10px] tracking-widest uppercase bg-lime text-forest px-3 py-1 rounded-full font-bold">캐디피/팁 제외</span>
            </div>
            
            <div className="space-y-6 mb-8 pr-2 custom-scrollbar">
              {selectedCourses.length === 0 ? (
                <p className="text-base opacity-40 italic">골프장을 선택하시면 상세 견적이 표시됩니다.</p>
              ) : (
                selectedCourses.map(id => {
                  const course = pricingData.find(c => c.id === id);
                  const schedules = options[id] || [];
                  if (!course || schedules.length === 0) return null;
                  
                  return schedules.map(opt => {
                    const division = opt.day === 'weekday' ? '주중' : '주말/공휴일';
                    const row = (course.rows || []).find(r => r.item.includes('그린피') && r.division === division);
                    let price = 0;
                    if (row) {
                      price = Number(row[opt.time]);
                    } else {
                      const staticCourse = GOLF_COURSES.find(c => c.name === course.courseName);
                      price = staticCourse?.pricing[opt.day][opt.time] || 0;
                    }
                    
                    return (
                      <div key={opt.scheduleId} className="flex justify-between items-start gap-4 mb-4 last:mb-0">
                        <div className="flex-grow">
                          <p className="font-medium text-base">{course.courseName}</p>
                          <p className="text-xs opacity-40 uppercase tracking-widest">
                            {(opt.dates || []).length > 0 
                              ? (opt.dates || []).map(d => format(d, 'MM/dd')).join(', ')
                              : (opt.day === 'weekday' ? '주중' : '주말/공휴일')} / {opt.time === 'morning' ? '오전' : '오후'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-medium">RM {price * ((opt.dates || []).length || 1)}</p>
                          <p className="text-xs opacity-40 italic">₩{(price * ((opt.dates || []).length || 1) * exchangeRate).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  });
                })
              )}
            </div>

            <div className="border-t-2 border-dashed border-white/10 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm tracking-widest uppercase opacity-40">합계(링깃)</p>
                <p className="text-2xl serif">RM {totalMYR}</p>
              </div>
              <div className="flex justify-between items-center text-lime">
                <p className="text-sm tracking-widest uppercase font-bold">총 예상 비용(원)</p>
                <p className="text-4xl serif font-bold">₩{(totalMYR * exchangeRate).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-10 p-4 bg-white/5 rounded-2xl text-xs opacity-60 leading-relaxed">
              <p>• 위 견적은 선택하신 골프장과 스케줄에 따른 예상 금액입니다.</p>
              <p>• 현지 사정 및 환율 변동에 따라 실제 결제 금액과 차이가 있을 수 있습니다.</p>
              <p>• 상세 예약 확정은 이메일 문의를 통해 진행해 주세요.</p>
            </div>

            <button
              onClick={handleOpenQuoteModal}
              disabled={!isAllDatesSelected}
              className={cn(
                "mt-6 w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-sm transition-all flex items-center justify-center gap-2",
                isAllDatesSelected
                  ? "bg-lime text-forest hover:shadow-[0_0_30px_rgba(163,230,53,0.3)]"
                  : "bg-white/10 text-white/20 cursor-not-allowed"
              )}
            >
              <Send size={16} />
              견적 문의하기
            </button>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setIsQuoteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass max-w-lg w-full p-6 rounded-[32px] border border-white/10 relative max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-6 text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-4">
                <h2 className="text-xl serif mb-0.5">견적 상담 신청</h2>
                <p className="text-[10px] opacity-40">상세 견적을 위해 정보를 입력해주세요.</p>
              </div>

              <form onSubmit={sendEmail} className="space-y-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] tracking-widest uppercase opacity-40 ml-2">성명 *</label>
                  <input 
                    required
                    type="text" 
                    lang="ko"
                    placeholder="성함을 입력해주세요"
                    value={quoteForm.from_name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, from_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] tracking-widest uppercase opacity-40 ml-2">이메일 주소</label>
                    <input 
                      type="email" 
                      inputMode="email"
                      placeholder="이메일 주소"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] tracking-widest uppercase opacity-40 ml-2">연락처</label>
                    <input 
                      type="tel" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="연락처 (숫자만 입력)"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value.replace(/[^0-9]/g, '') })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] tracking-widest uppercase opacity-40 ml-2">문의사항</label>
                  <textarea 
                    lang="ko"
                    placeholder="추가 문의사항이 있으시면 입력해주세요"
                    rows={2}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime transition-colors resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] tracking-widest uppercase opacity-40 ml-2">관심 골프장(일정) *</label>
                  <textarea 
                    ref={golfCoursesRef}
                    required
                    readOnly
                    lang="ko"
                    placeholder="선택하신 골프장 리스트입니다."
                    rows={3}
                    value={quoteForm.golf_courses}
                    onChange={(e) => setQuoteForm({ ...quoteForm, golf_courses: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime transition-colors resize-none overflow-y-auto cursor-default"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] tracking-widest uppercase opacity-40 ml-2">희망 일정 *</label>
                  <input 
                    required
                    readOnly
                    type="text" 
                    lang="ko"
                    placeholder="예: 2025.05.01 ~ 2025.05.05"
                    value={quoteForm.travel_period}
                    onChange={(e) => setQuoteForm({ ...quoteForm, travel_period: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime transition-colors cursor-default"
                  />
                </div>

                <div className="p-3 bg-lime/10 rounded-2xl border border-lime/20">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[11px] tracking-widest uppercase opacity-60">선택 코스</span>
                    <span className="text-xs font-bold text-lime">
                      {selectedCourses.length} 코스({selectedCourses.reduce((acc, id) => acc + (options[id]?.length || 0), 0)}회)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] tracking-widest uppercase opacity-60">총 예상 금액</span>
                    <span className="text-base serif text-lime">₩{(totalMYR * exchangeRate).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-lime text-forest rounded-xl font-bold tracking-widest uppercase text-[11px] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      견적 신청하기
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AVAILABLE_GOLF_COURSES = [
  '포레스트 시티 (Forest City)',
  '탄중푸테리 CC (Tanjung Puteri)',
  '호라이즌힐스 골프 (Horizon Hills)',
  '폰데로사 골프 (Ponderosa)',
  '오스틴하이츠 골프 (Austin Heights)',
  '스타힐 CC (Starhill)',
  '다이만18CC (Daiman 18)',
  '임피안에마스 (Impian Emas)',
  '퍼마스 자야 골프클럽 (Permas Jaya)',
  'IOI 팜 빌라 (IOI Palm Villa)',
  '세니봉 (Senibong)'
];

interface PricingRow {
  item: string;
  division: string;
  morning: number | string;
  afternoon: number | string;
}

interface CoursePricing {
  id: string;
  courseName: string;
  category?: string;
  remarks: string;
  adminMemo?: string;
  rows: PricingRow[];
  order?: number;
  // New fields
  operatingHours?: string;
  courseInfo?: string;
  caddyInfo?: string;
  promotionInfo?: string;
  premiumInfo?: string;
  photoUrl?: string;
  address?: string;
  websiteUrl?: string;
}

interface QuoteRequest {
  id: string;
  timestamp: string;
  from_name: string;
  email: string;
  phone: string;
  golf_courses: string;
  travel_period: string;
  message: string;
  total_myr: string;
  total_krw: string;
  summary: string;
  status?: '접수확인' | '답변완료' | '견적확정' | '입금완료';
}

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  isPinned?: boolean;
  showAsPopup?: boolean;
  imageUrl?: string;
  author?: string;
}

const NoticeList = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    // 복합 색인 에러를 피하기 위해 쿼리에서는 정렬을 제거하고 클라이언트에서 정렬합니다.
    const q = query(collection(db, 'notices'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Notice);
      
      // 클라이언트 측 정렬: 1. 고정 여부(isPinned) 내림차순, 2. 작성일(createdAt) 내림차순
      data.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setNotices(data);
      setLoading(false);
    }, (error) => {
      console.error("Notice fetch error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="pt-40 pb-24 px-6 text-center">
      <div className="w-12 h-12 border-4 border-lime/30 border-t-lime rounded-full animate-spin mx-auto mb-4" />
      <p className="serif italic opacity-60">공지사항을 불러오는 중...</p>
    </div>
  );

  return (
    <div className="pt-40 pb-24 px-6 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">공지사항</h1>
        <p className="text-xl serif italic opacity-60">야나골 골프클럽의 새로운 소식과 안내사항을 확인하세요.</p>
      </header>

      <div className="space-y-4">
        {notices.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center border border-white/10">
            <p className="opacity-40">등록된 공지사항이 없습니다.</p>
          </div>
        ) : (
          notices.map((notice) => (
            <motion.div 
              key={notice.id}
              layout
              className={cn(
                "glass rounded-3xl border border-white/10 overflow-hidden transition-all",
                selectedNotice?.id === notice.id ? "ring-2 ring-lime/50" : "hover:border-white/20"
              )}
            >
              <button 
                onClick={() => setSelectedNotice(selectedNotice?.id === notice.id ? null : notice)}
                className="w-full text-left p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  {notice.isPinned && (
                    <span className="px-3 py-1 bg-lime text-forest text-[10px] font-bold rounded-full uppercase tracking-widest">
                      Pinned
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl serif group-hover:text-lime transition-colors">{notice.title}</h3>
                    <p className="text-xs opacity-40 mt-1">
                      {format(new Date(notice.createdAt), 'yyyy.MM.dd')}
                    </p>
                  </div>
                </div>
                <div className={cn("transition-transform duration-300", selectedNotice?.id === notice.id ? "rotate-180" : "")}>
                  <ChevronDown size={20} className="opacity-40" />
                </div>
              </button>
              
              <AnimatePresence>
                {selectedNotice?.id === notice.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 pt-2 border-t border-white/5">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap mb-6">
                          {notice.content}
                        </p>
                        {notice.imageUrl && (
                          <div className="rounded-2xl overflow-hidden border border-white/10 max-w-2xl">
                            <img 
                              src={notice.imageUrl} 
                              alt={notice.title} 
                              className="w-full h-auto object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pricing' | 'quotes' | 'notices' | 'golferQuotes'>('pricing');
  const [pricingData, setPricingData] = useState<CoursePricing[]>([]);
  const [quotesData, setQuotesData] = useState<QuoteRequest[]>([]);
  const [noticesData, setNoticesData] = useState<Notice[]>([]);
  const [golferQuotesData, setGolferQuotesData] = useState<GolferQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newNotice, setNewNotice] = useState({ 
    title: '', 
    content: '', 
    isPinned: false,
    showAsPopup: false,
    imageUrl: ''
  });
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '9175938') {
      setIsPasswordVerified(true);
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setPasswordInput('');
      if (newAttempts >= 5) {
        showAlert('비밀번호를 5회 이상 틀렸습니다. 홈화면으로 이동합니다.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        showAlert(`비밀번호가 틀렸습니다. (남은 횟수: ${5 - newAttempts})`);
      }
    }
  };

  useEffect(() => {
    // Clear any existing auth state when entering admin
    signOut(auth);
    setUser(null);
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (email === 'cskim1747@gmail.com' || email === 'jco119@gmail.com') {
        setUser(result.user);
      } else {
        showAlert('관리자에게 문의해 주세요');
        await signOut(auth);
        setUser(null);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      showAlert('로그인에 실패했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      if (user) {
        await signOut(auth);
      }
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };
  
  // Filters for quotes
  const [filterName, setFilterName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Filters for golfer quotes
  const [golferFilterName, setGolferFilterName] = useState('');
  const [golferFilterNationality, setGolferFilterNationality] = useState('전체');
  const [golferFilterGender, setGolferFilterGender] = useState('전체');

  const [modal, setModal] = useState<{
    type: 'alert' | 'confirm' | null;
    message: string;
    onConfirm?: () => void;
  }>({ type: null, message: '' });

  const showAlert = (message: string) => {
    setModal({ type: 'alert', message });
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setModal({ type: 'confirm', message, onConfirm });
  };

  const closeModal = () => {
    setModal({ type: null, message: '' });
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    
    const unsubscribePricing = onSnapshot(collection(db, 'pricing'), (snapshot) => {
      const data = snapshot.docs
        .filter(doc => !/^\d+$/.test(doc.id)) // Filter out numeric IDs
        .map(doc => {
          const d = doc.data() as CoursePricing;
          return {
            ...d,
            rows: d.rows || []
          };
        });
      // Sort by order field
      data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setPricingData(data);
    }, (error) => {
      console.error("Pricing fetch error (Admin):", error);
    });

    const q = query(collection(db, 'quotes'), orderBy('timestamp', 'desc'));
    const unsubscribeQuotes = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as QuoteRequest);
      setQuotesData(data);
      setLoading(false);
    }, (error) => {
      console.error("Quotes fetch error:", error);
      setLoading(false);
    });

    const unsubscribeNotices = onSnapshot(collection(db, 'notices'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Notice);
      
      // 클라이언트 측 정렬: 1. 고정 여부(isPinned) 내림차순, 2. 작성일(createdAt) 내림차순
      data.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setNoticesData(data);
    }, (error) => {
      console.error("Admin notices fetch error:", error);
    });

    const unsubscribeGolferQuotes = onSnapshot(collection(db, 'golferQuotes'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as GolferQuote);
      // Sort by name or some other field if needed, here we just keep the order from Firebase
      setGolferQuotesData(data);
    }, (error) => {
      console.error("Admin golfer quotes fetch error:", error);
    });

    return () => {
      unsubscribePricing();
      unsubscribeQuotes();
      unsubscribeNotices();
      unsubscribeGolferQuotes();
    };
  }, []);

  useEffect(() => {
    const cleanup = fetchData();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [fetchData]);

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'quotes', id), { status });
    } catch (error) {
      console.error("Error updating status:", error);
      showAlert('상태 업데이트에 실패했습니다.');
    }
  };

  const deleteQuote = async (id: string) => {
    showConfirm('정말로 이 문의 내역을 삭제하시겠습니까?', async () => {
      try {
        await deleteDoc(doc(db, 'quotes', id));
        if (selectedQuote?.id === id) {
          setSelectedQuote(null);
        }
      } catch (error) {
        console.error("Error deleting quote:", error);
        showAlert('삭제에 실패했습니다.');
      }
    });
  };

  const exportToExcel = () => {
    if (filteredQuotes.length === 0) {
      showAlert('다운로드할 데이터가 없습니다.');
      return;
    }

    const dataToExport = filteredQuotes.map(quote => ({
      '문의일시': format(new Date(quote.timestamp), 'yyyy-MM-dd HH:mm'),
      '신청자명': quote.from_name,
      '연락처': quote.phone,
      '이메일주소': quote.email,
      '선택한 골프장': quote.golf_courses,
      '희망 일정': quote.travel_period,
      '비용 (RM)': quote.total_myr,
      '비용 (₩)': quote.total_krw,
      '처리상태': quote.status || '접수확인',
      '추가 메시지': quote.message || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "문의내역");
    
    // Generate filename with current date
    const fileName = `문의내역_${format(new Date(), 'yyyyMMdd_HHmm')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const exportGolferQuotesToExcel = () => {
    if (filteredGolferQuotes.length === 0) {
      showAlert('다운로드할 데이터가 없습니다.');
      return;
    }

    const dataToExport = filteredGolferQuotes.map((quote, index) => ({
      '순번': index + 1,
      '골퍼명': quote.name,
      '국적 / 생년 / 성별': `${quote.nationality} / ${quote.birthYear} / ${quote.gender}`,
      '대표사진 URL 주소 (이미지 검색)': quote.photoUrl || '',
      '명언 (원문 포함)': quote.quote,
      '출처': quote.source || '',
      '통산 성적': quote.stats || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "골퍼명언모음");
    
    const fileName = `골퍼명언모음_${format(new Date(), 'yyyyMMdd_HHmm')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleSave = async (dataToSave = pricingData) => {
    // Validation
    const isValid = dataToSave.every(course => {
      if (!course.courseName.trim()) return false;
      return (course.rows || []).every(row => {
        // Check if morning/afternoon are empty strings or NaN
        const m = typeof row.morning === 'string' ? row.morning.trim() : row.morning;
        const a = typeof row.afternoon === 'string' ? row.afternoon.trim() : row.afternoon;
        
        if (m === '' || m === null || isNaN(Number(m))) return false;
        if (a === '' || a === null || isNaN(Number(a))) return false;
        
        return true;
      });
    });

    if (!isValid) {
      showAlert('입력란을 확인해 주세요');
      return;
    }

    // Convert all values to numbers before saving
    const cleanedData = dataToSave.map(course => ({
      ...course,
      rows: (course.rows || []).map(row => ({
        ...row,
        morning: Number(row.morning),
        afternoon: Number(row.afternoon)
      }))
    }));

    setIsSaving(true);
    try {
      // Save each course pricing to Firestore
      const savePromises = dataToSave.map((course, index) => {
        const cleanedCourse = {
          ...course,
          order: index, // Save current order
          rows: (course.rows || []).map(row => ({
            ...row,
            morning: Number(row.morning),
            afternoon: Number(row.afternoon)
          }))
        };
        return setDoc(doc(db, 'pricing', course.id), cleanedCourse).catch(err => {
          throw new Error(handleFirestoreError(err, OperationType.WRITE, `pricing/${course.id}`));
        });
      });

      await Promise.all(savePromises);
      showAlert('저장되었습니다');
    } catch (error: any) {
      console.error("Save error:", error);
      showAlert(error.message || '저장에 실패했습니다');
    } finally {
      setIsSaving(false);
    }
  };

  const addCourse = () => {
    const newCourse: CoursePricing = {
      id: '',
      courseName: '',
      category: '',
      remarks: '',
      operatingHours: '',
      courseInfo: '',
      caddyInfo: '',
      promotionInfo: '',
      premiumInfo: '',
      photoUrl: '',
      address: '',
      websiteUrl: '',
      rows: [
        { item: '그린피', division: '주중', morning: 0, afternoon: 0 },
        { item: '그린피', division: '주말/공휴일', morning: 0, afternoon: 0 },
        { item: '버기피', division: '공통', morning: 0, afternoon: 0 },
        { item: '캐디피', division: '공통', morning: 0, afternoon: 0 }
      ],
      order: pricingData.length
    };
    setPricingData([...pricingData, newCourse]);
  };

  const extractPromotion = (remarks: string) => {
    if (!remarks) return null;
    const lines = remarks.split('\n').map(l => l.trim()).filter(Boolean);
    const promoLine = lines.find(line => 
      line.includes('프로모션') || 
      line.includes('플레이 가능') || 
      line.startsWith('★') ||
      line.startsWith('-')
    );
    if (promoLine) {
      return promoLine.replace(/^[★\-\s]+/, '').trim();
    }
    return null;
  };

  const extractCaddyFee = (remarks: string) => {
    if (!remarks) return null;
    const lines = remarks.split('\n').map(l => l.trim()).filter(Boolean);
    const caddyLine = lines.find(line => line.includes('캐디'));
    if (caddyLine) {
      return caddyLine.replace(/^[★\-\s]+/, '').trim();
    }
    return null;
  };

  const removeCourse = (id: string) => {
    showConfirm('삭제하시겠습니까?', () => {
      const newData = pricingData.filter(c => c.id !== id);
      setPricingData(newData);
      handleSave(newData);
      closeModal();
    });
  };

  const addRow = (courseId: string) => {
    setPricingData(pricingData.map(course => {
      if (course.id === courseId) {
        const greenFeeCount = course.rows.filter(r => r.item === '그린피').length;
        const buggyFeeCount = course.rows.filter(r => r.item === '버기피').length;
        const caddyFeeCount = course.rows.filter(r => r.item === '캐디피').length;

        // Default to 그린피 if possible
        let newItem = '그린피';
        if (greenFeeCount >= 2) {
          if (buggyFeeCount < 1) newItem = '버기피';
          else if (caddyFeeCount < 1) newItem = '캐디피';
          else {
            showAlert('입력할 수 있는 항목이 없습니다.');
            return course;
          }
        }

        const newRow = { 
          item: newItem, 
          division: newItem === '그린피' ? '주중' : '공통', 
          morning: 0, 
          afternoon: 0
        };
        return { ...course, rows: [...course.rows, newRow] };
      }
      return course;
    }));
  };

  const removeRow = (courseId: string, rowIndex: number) => {
    setPricingData(pricingData.map(course => {
      if (course.id === courseId) {
        const newRows = course.rows.filter((_, idx) => idx !== rowIndex);
        return { ...course, rows: newRows };
      }
      return course;
    }));
  };

  const updateRow = (courseId: string, rowIndex: number, field: keyof PricingRow, value: any) => {
    setPricingData(pricingData.map(course => {
      if (course.id === courseId) {
        const newRows = [...course.rows];
        newRows[rowIndex] = { ...newRows[rowIndex], [field]: value };
        return { ...course, rows: newRows };
      }
      return course;
    }));
  };

  const updateCourseField = (id: string, field: keyof CoursePricing, value: string) => {
    setPricingData(pricingData.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const moveCourse = (index: number, direction: 'up' | 'down') => {
    const newData = [...pricingData];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newData.length) return;
    
    [newData[index], newData[targetIndex]] = [newData[targetIndex], newData[index]];
    setPricingData(newData);
  };

  const filteredQuotes = quotesData.filter(quote => {
    const matchesName = quote.from_name.toLowerCase().includes(filterName.toLowerCase());
    const quoteDate = new Date(quote.timestamp);
    const matchesStartDate = filterStartDate ? quoteDate >= new Date(filterStartDate) : true;
    const matchesEndDate = filterEndDate ? quoteDate <= new Date(filterEndDate + 'T23:59:59') : true;
    return matchesName && matchesStartDate && matchesEndDate;
  });

  const filteredGolferQuotes = golferQuotesData.filter(quote => {
    const matchesName = quote.name.toLowerCase().includes(golferFilterName.toLowerCase());
    const matchesNationality = golferFilterNationality === '전체' || quote.nationality === golferFilterNationality;
    const matchesGender = golferFilterGender === '전체' || quote.gender === golferFilterGender;
    return matchesName && matchesNationality && matchesGender;
  });

  const nationalityCounts = golferQuotesData.reduce((acc, quote) => {
    if (quote.nationality) {
      acc[quote.nationality] = (acc[quote.nationality] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedNationalities = Object.entries(nationalityCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([name, count]) => ({ name, count }));

  const nationalitiesOptions = [
    { name: '전체', count: golferQuotesData.length },
    ...sortedNationalities
  ];

  if (loading) return (
    <div className="pt-40 pb-24 px-6 text-center">
      <div className="w-12 h-12 border-4 border-lime/30 border-t-lime rounded-full animate-spin mx-auto mb-4" />
      <p className="serif italic opacity-60">데이터를 불러오는 중...</p>
    </div>
  );


  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <div className="sticky top-0 z-40 bg-forest/80 backdrop-blur-md py-6 mb-12 -mx-6 px-6 border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
          <div className="flex items-center gap-4 mt-2">
            {activeTab === 'pricing' && user && (
              <p className="text-xs opacity-40">
                로그인 계정: <span className="text-lime">{user?.email}</span>
              </p>
            )}
          </div>
          <div className="flex gap-6 mt-4">
            <button 
              onClick={() => setActiveTab('pricing')}
              className={cn(
                "text-lg serif transition-all border-b-2 pb-1",
                activeTab === 'pricing' ? "text-lime border-lime" : "text-white/40 border-transparent hover:text-white/60"
              )}
            >
              골프장 정보
            </button>
            <button 
              onClick={() => setActiveTab('quotes')}
              className={cn(
                "text-lg serif transition-all border-b-2 pb-1",
                activeTab === 'quotes' ? "text-lime border-lime" : "text-white/40 border-transparent hover:text-white/60"
              )}
            >
              문의 내역
            </button>
            <button 
              onClick={() => setActiveTab('notices')}
              className={cn(
                "text-lg serif transition-all border-b-2 pb-1",
                activeTab === 'notices' ? "text-lime border-lime" : "text-white/40 border-transparent hover:text-white/60"
              )}
            >
              공지사항 관리
            </button>
            <button 
              onClick={() => setActiveTab('golferQuotes')}
              className={cn(
                "text-lg serif transition-all border-b-2 pb-1",
                activeTab === 'golferQuotes' ? "text-lime border-lime" : "text-white/40 border-transparent hover:text-white/60"
              )}
            >
              골퍼 명언 모음
            </button>
          </div>
          {activeTab === 'pricing' && user && (
            <div className="mt-4 flex items-center gap-3">
              <div className="relative">
                <select 
                  onChange={(e) => {
                    const element = document.getElementById(`course-${e.target.value}`);
                    if (element) {
                      const offset = 180; 
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      element.classList.add('ring-2', 'ring-lime');
                      setTimeout(() => element.classList.remove('ring-2', 'ring-lime'), 3000);
                    }
                  }}
                  className="bg-white/5 border border-lime/20 rounded-xl px-4 py-2 focus:border-lime outline-none transition-all appearance-none text-white text-xs min-w-[320px] pr-10"
                >
                  <option value="" className="bg-forest">골프장 빠른 조회</option>
                  {pricingData.map(course => (
                    <option key={course.id} value={course.id} className="bg-forest">
                      {course.courseName || '이름 없음'} ({course.id})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <Search size={14} />
                </div>
              </div>
              <span className="text-[10px] opacity-40 italic">총 {pricingData.length}개 등록됨</span>
            </div>
          )}
        </div>
        {activeTab === 'pricing' && user && (
          <div className="flex gap-4">
            <button 
              onClick={handleLogout}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full flex items-center gap-2 transition-all text-xs opacity-60"
            >
              로그아웃
            </button>
            <button 
              onClick={addCourse} 
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full flex items-center gap-2 transition-all"
            >
              <Plus size={18} /> 골프장 추가
            </button>
            <button 
              onClick={() => handleSave()} 
              disabled={isSaving}
              className={cn(
                "bg-lime text-forest px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all",
                isSaving ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_30px_rgba(163,230,53,0.3)]"
              )}
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isSaving ? '저장 중...' : '저장하기'}
            </button>
          </div>
        )}
        {activeTab === 'quotes' && user && (
          <div className="flex gap-4">
            <button 
              onClick={handleLogout}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full flex items-center gap-2 transition-all text-xs opacity-60"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>

      {!user && !isPasswordVerified && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="glass max-w-md w-full p-12 rounded-[40px] border border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="text-lime" size={32} />
            </div>
            <h2 className="text-2xl serif mb-4 text-white">관리자 전용 화면입니다.</h2>
            <p className="text-sm opacity-60 mb-8">비밀번호를 입력해 주세요</p>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-lime outline-none transition-all text-center tracking-[0.5em]"
                placeholder="•••••••"
                autoFocus
              />
              <button 
                type="submit"
                className="w-full py-4 bg-lime text-forest rounded-xl font-bold hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all"
              >
                확인
              </button>
            </form>
            
            {failedAttempts > 0 && (
              <p className="mt-4 text-xs text-red-400">
                비밀번호 오류: {failedAttempts}/5회
              </p>
            )}
          </div>
        </div>
      )}

      {!user && isPasswordVerified && (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="glass max-w-md w-full p-12 rounded-[40px] border border-white/10 text-center">
            <h2 className="text-3xl serif mb-8">
              {activeTab === 'pricing' ? '가격정보관리 로그인' : 
               activeTab === 'notices' ? '공지사항관리 로그인' : '견적요청내역 로그인'}
            </h2>
            <button 
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white text-forest rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google 계정으로 로그인
            </button>
            <p className="mt-8 text-xs opacity-40 leading-relaxed">
              관리자만이 접근 가능합니다.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'pricing' && user && (
        <div className="space-y-12">
          {pricingData.length === 0 ? (
            <div className="text-center py-20 glass rounded-[40px] border border-white/10">
              <p className="opacity-40 italic">등록된 골프장이 없습니다. '골프장 추가' 버튼을 눌러주세요.</p>
            </div>
          ) : (
            pricingData.map((course, index) => (
            <div key={course.id} id={`course-${course.id}`} className="glass p-6 rounded-[40px] border border-white/10 overflow-hidden relative group transition-all duration-500">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => moveCourse(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-20"
                >
                  <ChevronUp size={20} />
                </button>
                <button 
                  onClick={() => moveCourse(index, 'down')}
                  disabled={index === pricingData.length - 1}
                  className="p-1 hover:bg-white/10 rounded disabled:opacity-20"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-white/10 pb-6 ml-8">
                <div className="flex-grow w-full space-y-4">
                  <div className="max-w-xl">
                    <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2">카테고리</label>
                    <select 
                      value={course.category || ''}
                      onChange={(e) => updateCourseField(course.id, 'category', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all appearance-none"
                    >
                      <option value="" className="bg-forest text-white">카테고리 선택</option>
                      <option value="프리미엄" className="bg-forest text-white">프리미엄</option>
                      <option value="가성비" className="bg-forest text-white">가성비</option>
                      <option value="접근성" className="bg-forest text-white">접근성</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2">문서 ID (영문)</label>
                      <input 
                        type="text"
                        value={course.id}
                        onChange={(e) => updateCourseField(course.id, 'id', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="예: forest-city"
                        disabled={pricingData.some(p => p.id === course.id && p !== course)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">골프장명</label>
                      <input 
                        type="text"
                        value={course.courseName || ''}
                        onChange={(e) => updateCourseField(course.id, 'courseName', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xl serif w-full focus:border-lime outline-none transition-all"
                        placeholder="골프장 이름을 입력하세요"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">운영시간</label>
                      <input 
                        type="text"
                        value={course.operatingHours || ''}
                        onChange={(e) => updateCourseField(course.id, 'operatingHours', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="예: 07:00 ~ 19:00"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">코스 정보</label>
                      <input 
                        type="text"
                        value={course.courseInfo || ''}
                        onChange={(e) => updateCourseField(course.id, 'courseInfo', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="예: 18홀 / 파 72"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">캐디 정보</label>
                      <input 
                        type="text"
                        value={course.caddyInfo || ''}
                        onChange={(e) => updateCourseField(course.id, 'caddyInfo', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="예: 1인 1캐디 / 캐디피 별도"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">프로모션 정보</label>
                      <input 
                        type="text"
                        value={course.promotionInfo || ''}
                        onChange={(e) => updateCourseField(course.id, 'promotionInfo', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="예: 평일 레이디 할인"
                      />
                    </div>
                  </div>

                  <div className="max-w-4xl">
                    <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">홈화면 프리미엄 정보 (500자 이상 입력 가능)</label>
                    <textarea 
                      value={course.premiumInfo || ''}
                      onChange={(e) => updateCourseField(course.id, 'premiumInfo', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all min-h-[120px]"
                      placeholder="홈페이지 메인 프리미엄 섹션에 노출될 상세 설명을 입력하세요"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">골프장 주소</label>
                      <input 
                        type="text"
                        value={course.address || ''}
                        onChange={(e) => updateCourseField(course.id, 'address', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="골프장 위치 주소를 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">홈페이지 주소</label>
                      <input 
                        type="text"
                        value={course.websiteUrl || ''}
                        onChange={(e) => updateCourseField(course.id, 'websiteUrl', e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="max-w-4xl">
                    <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2 font-bold">
                      골프장 메인 사진 <span className="text-lime/60 ml-2">(최대 {MAX_FILE_SIZE_MB * 1000}KB)</span>
                    </label>
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="flex-grow w-full">
                        <input 
                          type="text"
                          value={course.photoUrl || ''}
                          onChange={(e) => updateCourseField(course.id, 'photoUrl', e.target.value)}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all mb-2"
                          placeholder="이미지 URL을 입력하거나 파일을 업로드하세요"
                        />
                        <div className="relative">
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > MAX_FILE_SIZE_BYTES) {
                                  showAlert(`이미지 용량이 너무 큽니다. (${MAX_FILE_SIZE_MB * 1000}KB 이하만 가능합니다)`);
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  const compressed = await compressImage(reader.result as string);
                                  updateCourseField(course.id, 'photoUrl', compressed);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl transition-all text-sm flex items-center gap-2">
                            <ImageIcon size={18} />
                            사진 업로드
                          </button>
                        </div>
                      </div>
                      {course.photoUrl && (
                        <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-white/10 group flex-shrink-0">
                          <img src={course.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => updateCourseField(course.id, 'photoUrl', '')}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="max-w-2xl">
                    <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2">관리자 메모 (비공개)</label>
                    <textarea 
                      value={course.adminMemo || ''}
                      onChange={(e) => updateCourseField(course.id, 'adminMemo', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-lime outline-none transition-all resize-none overflow-hidden min-h-[60px] text-lime/80"
                      placeholder="관리자만 볼 수 있는 메모를 입력하세요"
                      rows={Math.max(2, (course.adminMemo || '').split('\n').length)}
                      onFocus={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => removeCourse(course.id)} 
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-all self-start md:self-center"
                  title="골프장 삭제"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="overflow-x-auto ml-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[10px] tracking-widest uppercase opacity-40">
                      <th className="py-2 font-medium px-3">항목</th>
                      <th className="py-2 font-medium px-3">구분</th>
                      <th className="py-2 font-medium px-3 text-center">오전 (RM)</th>
                      <th className="py-2 font-medium px-3 text-center">오후 (RM)</th>
                      <th className="py-2 font-medium px-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(course.rows || []).map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 px-3">
                          <select 
                            value={row.item}
                            onChange={(e) => updateRow(course.id, idx, 'item', e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 w-full focus:border-lime outline-none text-sm appearance-none"
                          >
                            <option value="그린피" className="bg-forest">그린피</option>
                            <option value="버기피" className="bg-forest">버기피</option>
                            <option value="캐디피" className="bg-forest">캐디피</option>
                          </select>
                        </td>
                        <td className="py-2 px-3">
                          <select 
                            value={row.division}
                            onChange={(e) => updateRow(course.id, idx, 'division', e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 w-full focus:border-lime outline-none text-sm appearance-none"
                          >
                            <option value="주중" className="bg-forest">주중</option>
                            <option value="주말/공휴일" className="bg-forest">주말/공휴일</option>
                            <option value="공통" className="bg-forest">공통</option>
                          </select>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex justify-center">
                            <input 
                              type="number"
                              value={row.morning}
                              onChange={(e) => updateRow(course.id, idx, 'morning', e.target.value)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 w-24 focus:border-lime outline-none transition-all text-sm text-center"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <div className="flex justify-center">
                            <input 
                              type="number"
                              value={row.afternoon}
                              onChange={(e) => updateRow(course.id, idx, 'afternoon', e.target.value)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 w-24 focus:border-lime outline-none transition-all text-sm text-center"
                            />
                          </div>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button onClick={() => removeRow(course.id, idx)} className="text-white/20 hover:text-red-400 transition-colors">
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => addRow(course.id)}
                className="mt-4 flex items-center gap-2 text-xs text-lime hover:text-lime/80 transition-colors ml-11"
              >
                <Plus size={12} /> 행 추가
              </button>
            </div>
          ))
        )}
        </div>
      )}
      {activeTab === 'notices' && user && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl serif">공지사항 관리</h2>
            <button 
              onClick={() => {
                setEditingNoticeId(null);
                setNewNotice({ title: '', content: '', isPinned: false, showAsPopup: false, imageUrl: '' });
              }}
              className="bg-lime text-forest px-8 py-3 rounded-full font-bold hover:bg-lime/90 transition-all"
            >
              새 공지사항 작성
            </button>
          </div>

          {/* Notice Form */}
          <div className="glass rounded-[40px] p-8 border border-white/10">
            <h3 className="text-xl serif mb-6">{editingNoticeId ? '공지사항 수정' : '새 공지사항 작성'}</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2">제목</label>
                <input 
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:border-lime outline-none transition-all text-xl serif"
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2">내용</label>
                <textarea 
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 w-full focus:border-lime outline-none transition-all min-h-[300px] resize-none"
                  placeholder="공지사항 내용을 입력하세요"
                />
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 ml-2">
                  <input 
                    type="checkbox"
                    id="isPinned"
                    checked={newNotice.isPinned}
                    onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })}
                    className="w-5 h-5 accent-lime"
                  />
                  <label htmlFor="isPinned" className="text-sm opacity-80 cursor-pointer">상단 고정</label>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  <input 
                    type="checkbox"
                    id="showAsPopup"
                    checked={newNotice.showAsPopup}
                    onChange={(e) => setNewNotice({ ...newNotice, showAsPopup: e.target.checked })}
                    className="w-5 h-5 accent-lime"
                  />
                  <label htmlFor="showAsPopup" className="text-sm opacity-80 cursor-pointer">공지 팝업으로 표시</label>
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2">
                  이미지 첨부 (URL 또는 파일) <span className="text-lime/60 ml-2">(최대 {MAX_FILE_SIZE_MB * 1000}KB)</span>
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="text"
                    value={newNotice.imageUrl}
                    onChange={(e) => setNewNotice({ ...newNotice, imageUrl: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-grow focus:border-lime outline-none transition-all text-sm"
                    placeholder="이미지 URL을 입력하거나 파일을 선택하세요"
                  />
                  <div className="relative">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > MAX_FILE_SIZE_BYTES) { // 800KB limit for Firestore doc size safety
                            showAlert(`이미지 용량이 너무 큽니다. (${MAX_FILE_SIZE_MB * 1000}KB 이하만 가능합니다)`);
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = async () => {
                            const compressed = await compressImage(reader.result as string);
                            setNewNotice({ ...newNotice, imageUrl: compressed });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2 whitespace-nowrap">
                      <ImageIcon size={18} />
                      파일 선택
                    </button>
                  </div>
                </div>
                {newNotice.imageUrl && (
                  <div className="mt-4 relative w-32 h-32 rounded-xl overflow-hidden border border-white/10 group">
                    <img src={newNotice.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setNewNotice({ ...newNotice, imageUrl: '' })}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={async () => {
                    if (!newNotice.title || !newNotice.content) {
                      showAlert('제목과 내용을 입력해주세요.');
                      return;
                    }
                    setIsSaving(true);
                    try {
                      if (editingNoticeId) {
                        await updateDoc(doc(db, 'notices', editingNoticeId), {
                          ...newNotice,
                          updatedAt: new Date().toISOString()
                        });
                        showAlert('공지사항이 수정되었습니다.');
                      } else {
                        await addDoc(collection(db, 'notices'), {
                          ...newNotice,
                          createdAt: new Date().toISOString(),
                          author: user?.email
                        });
                        showAlert('공지사항이 등록되었습니다.');
                      }
                      setNewNotice({ title: '', content: '', isPinned: false, showAsPopup: false, imageUrl: '' });
                      setEditingNoticeId(null);
                    } catch (error) {
                      console.error("Notice save error:", error);
                      showAlert('저장에 실패했습니다.');
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                  disabled={isSaving}
                  className="bg-lime text-forest px-10 py-3 rounded-full font-bold hover:bg-lime/90 transition-all disabled:opacity-50"
                >
                  {isSaving ? '저장 중...' : (editingNoticeId ? '수정 완료' : '등록하기')}
                </button>
                {editingNoticeId && (
                  <button 
                    onClick={() => {
                      setEditingNoticeId(null);
                      setNewNotice({ title: '', content: '', isPinned: false, showAsPopup: false, imageUrl: '' });
                    }}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-3 rounded-full transition-all"
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notices List */}
          <div className="glass rounded-[40px] border border-white/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] tracking-widest uppercase opacity-40">
                  <th className="p-6 font-medium">상태</th>
                  <th className="p-6 font-medium">제목</th>
                  <th className="p-6 font-medium">작성일</th>
                  <th className="p-6 w-32"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {noticesData.map((notice) => (
                  <tr key={notice.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6">
                      {notice.isPinned ? (
                        <span className="px-2 py-0.5 bg-lime/20 text-lime text-[10px] font-bold rounded uppercase tracking-widest">Pinned</span>
                      ) : (
                        <span className="opacity-40">-</span>
                      )}
                    </td>
                    <td className="p-6 font-medium">{notice.title}</td>
                    <td className="p-6 opacity-60">{format(new Date(notice.createdAt), 'yyyy.MM.dd')}</td>
                    <td className="p-6 text-right flex gap-4 justify-end">
                      <button 
                        onClick={() => {
                          setEditingNoticeId(notice.id);
                          setNewNotice({ 
                            title: notice.title, 
                            content: notice.content, 
                            isPinned: !!notice.isPinned,
                            showAsPopup: !!notice.showAsPopup,
                            imageUrl: notice.imageUrl || ''
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-white/40 hover:text-lime transition-colors"
                      >
                        수정
                      </button>
                      <button 
                        onClick={async () => {
                          showConfirm('정말로 이 공지사항을 삭제하시겠습니까?', async () => {
                            try {
                              await deleteDoc(doc(db, 'notices', notice.id));
                              if (editingNoticeId === notice.id) {
                                setEditingNoticeId(null);
                                setNewNotice({ title: '', content: '', isPinned: false, showAsPopup: false, imageUrl: '' });
                              }
                            } catch (error) {
                              console.error("Notice delete error:", error);
                              showAlert('삭제에 실패했습니다.');
                            }
                          });
                        }}
                        className="text-white/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'golferQuotes' && user && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl serif italic">골퍼 명언 모음</h2>
            <button 
              onClick={exportGolferQuotesToExcel}
              className="bg-lime text-forest px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all"
            >
              <Download size={18} /> 엑셀 내보내기
            </button>
          </div>

          {/* Filters */}
          <div className="glass p-6 rounded-3xl border border-white/10 flex flex-wrap gap-8 items-end">
            {/* Golfer Name Search */}
            <div className="flex-grow min-w-[200px]">
              <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2 font-bold">골퍼명 (LIKE 검색)</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                <input 
                  type="text"
                  value={golferFilterName}
                  onChange={(e) => setGolferFilterName(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2 w-full focus:border-lime outline-none transition-all"
                  placeholder="골퍼명 검색..."
                />
              </div>
            </div>

            {/* Nationality Filter */}
            <div className="w-48">
              <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2 font-bold">국적 선택</label>
              <select 
                value={golferFilterNationality}
                onChange={(e) => setGolferFilterNationality(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full focus:border-lime outline-none transition-all appearance-none cursor-pointer"
              >
                {nationalitiesOptions.map(nat => (
                  <option key={nat.name} value={nat.name} className="bg-forest text-white">
                    {nat.name === '전체' ? '전체' : `${nat.name}(${nat.count})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-1 ml-2 font-bold">성별 선택</label>
              <div className="flex gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                {['전체', '남', '여'].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio"
                      name="golferGender"
                      value={gender}
                      checked={golferFilterGender === gender}
                      onChange={(e) => setGolferFilterGender(e.target.value)}
                      className="hidden"
                    />
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                      golferFilterGender === gender ? "border-lime bg-lime/20" : "border-white/20 group-hover:border-white/40"
                    )}>
                      {golferFilterGender === gender && <div className="w-1.5 h-1.5 rounded-full bg-lime" />}
                    </div>
                    <span className={cn(
                      "text-sm transition-all",
                      golferFilterGender === gender ? "text-lime font-bold" : "text-white/40 group-hover:text-white/60"
                    )}>{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={() => {
                setGolferFilterName('');
                setGolferFilterNationality('전체');
                setGolferFilterGender('전체');
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl transition-all text-sm opacity-60"
            >
              초기화
            </button>
          </div>

          <div className="glass rounded-[40px] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] tracking-widest uppercase opacity-40">
                    <th className="p-6 font-medium w-16">순번</th>
                    <th className="p-6 font-medium w-40">골퍼명</th>
                    <th className="p-6 font-medium w-48">국적 / 생년 / 성별</th>
                    <th className="p-6 font-medium w-64">대표사진 URL 주소</th>
                    <th className="p-6 font-medium">명언 (원문 포함)</th>
                    <th className="p-6 font-medium w-48">출처</th>
                    <th className="p-6 font-medium w-48">통산 성적</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredGolferQuotes.map((quote, index) => (
                    <tr key={quote.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors whitespace-nowrap">
                      <td className="p-6 opacity-40">{index + 1}</td>
                      <td className="p-6 font-medium">{quote.name}</td>
                      <td className="p-6 opacity-60">{quote.nationality} / {quote.birthYear} / {quote.gender}</td>
                      <td className="p-6 opacity-60">
                        <div className="truncate max-w-[200px]" title={quote.photoUrl}>
                          {quote.photoUrl}
                        </div>
                      </td>
                      <td className="p-6 opacity-80 truncate max-w-[400px]" title={quote.quote}>{quote.quote}</td>
                      <td className="p-6 opacity-60 truncate max-w-[200px]" title={quote.source}>{quote.source}</td>
                      <td className="p-6 opacity-60 truncate max-w-[200px]" title={quote.stats}>{quote.stats}</td>
                    </tr>
                  ))}
                  {filteredGolferQuotes.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-20 text-center opacity-40 serif italic">
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'quotes' && user && (
        <div className="space-y-8">
          {/* Filters */}
          <div className="glass p-6 rounded-3xl border border-white/10 flex flex-wrap gap-6 items-end">
            <div className="flex-grow min-w-[200px]">
              <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2">신청자명</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                <input 
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2 w-full focus:border-lime outline-none transition-all"
                  placeholder="이름 검색..."
                />
              </div>
            </div>
            <div className="w-48">
              <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2">시작일</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                <input 
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2 w-full focus:border-lime outline-none transition-all"
                />
              </div>
            </div>
            <div className="w-48">
              <label className="text-[10px] tracking-widest uppercase opacity-40 block mb-2 ml-2">종료일</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                <input 
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2 w-full focus:border-lime outline-none transition-all"
                />
              </div>
            </div>
            <button 
              onClick={() => {
                setFilterName('');
                setFilterStartDate('');
                setFilterEndDate('');
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl transition-all"
            >
              초기화
            </button>
            <button 
              onClick={exportToExcel}
              className="bg-lime text-forest hover:bg-lime/90 px-6 py-2 rounded-xl transition-all font-bold flex items-center gap-2"
            >
              엑셀 다운로드
            </button>
          </div>

          {/* Quotes Table */}
          <div className="glass rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] tracking-widest uppercase opacity-40">
                    <th className="px-2 py-3 font-medium whitespace-nowrap">문의일시</th>
                    <th className="px-2 py-3 font-medium whitespace-nowrap">신청자명</th>
                    <th className="px-2 py-3 font-medium whitespace-nowrap">연락처</th>
                    <th className="px-2 py-3 font-medium whitespace-nowrap">이메일</th>
                    <th className="px-2 py-3 font-medium whitespace-nowrap">골프장</th>
                    <th className="px-2 py-3 font-medium whitespace-nowrap">일정</th>
                    <th className="px-2 py-3 font-medium text-right whitespace-nowrap">비용(RM)</th>
                    <th className="px-2 py-3 font-medium text-right whitespace-nowrap">비용(₩)</th>
                    <th className="px-2 py-3 font-medium text-center whitespace-nowrap">상태</th>
                    <th className="px-2 py-3 font-medium text-center whitespace-nowrap">관리</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredQuotes.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-12 text-center opacity-40 italic">
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    filteredQuotes.map((quote) => (
                      <tr key={quote.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-2 py-3 opacity-60 whitespace-nowrap">
                          {format(new Date(quote.timestamp), 'yy-MM-dd HH:mm')}
                        </td>
                        <td className="px-2 py-3 font-medium whitespace-nowrap max-w-[80px] truncate" title={quote.from_name}>{quote.from_name}</td>
                        <td className="px-2 py-3 opacity-60 whitespace-nowrap">{quote.phone}</td>
                        <td className="px-2 py-3 opacity-60 whitespace-nowrap max-w-[100px] truncate" title={quote.email}>{quote.email}</td>
                        <td className="px-2 py-3">
                          <button 
                            onClick={() => setSelectedQuote(quote)}
                            className="max-w-[120px] truncate text-lime hover:underline text-left block w-full" 
                            title="상세 내역 보기"
                          >
                            {quote.golf_courses}
                          </button>
                        </td>
                        <td className="px-2 py-3 opacity-60 whitespace-nowrap max-w-[100px] truncate" title={quote.travel_period || (quote as any).schedule?.split(' (')[0] || '-'}>
                          {quote.travel_period || (quote as any).schedule?.split(' (')[0] || '-'}
                        </td>
                        <td className="px-2 py-3 text-right font-medium whitespace-nowrap">{quote.total_myr}</td>
                        <td className="px-2 py-3 text-right text-lime font-medium whitespace-nowrap">{quote.total_krw}</td>
                        <td className="px-2 py-3 text-center whitespace-nowrap">
                          <select
                            value={quote.status || '접수확인'}
                            onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                            className={cn(
                              "bg-white/5 border border-white/10 rounded-lg px-1 py-1 text-[10px] outline-none transition-colors cursor-pointer",
                              quote.status === '입금완료' ? "text-lime border-lime/30" : 
                              quote.status === '견적확정' ? "text-blue-400 border-blue-400/30" :
                              quote.status === '답변완료' ? "text-yellow-400 border-yellow-400/30" :
                              "text-white/60"
                            )}
                          >
                            <option value="접수확인" className="bg-forest">접수확인</option>
                            <option value="답변완료" className="bg-forest">답변완료</option>
                            <option value="견적확정" className="bg-forest">견적확정</option>
                            <option value="입금완료" className="bg-forest">입금완료</option>
                          </select>
                        </td>
                        <td className="px-2 py-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => deleteQuote(quote.id)}
                            className="text-red-400 hover:text-red-300 transition-colors p-1.5 hover:bg-white/5 rounded-full"
                            title="삭제"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal */}
      <AnimatePresence>
        {modal.type && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-white/20"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="text-lime" size={32} />
                </div>
                <h3 className="text-xl serif text-white mb-2">{modal.message}</h3>
              </div>
              
              <div className="flex gap-3">
                {modal.type === 'confirm' ? (
                  <>
                    <button 
                      onClick={closeModal}
                      className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
                    >
                      아니오
                    </button>
                    <button 
                      onClick={modal.onConfirm}
                      className="flex-1 py-3 rounded-xl bg-lime text-forest font-bold hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all text-sm"
                    >
                      예
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={closeModal}
                    className="w-full py-3 rounded-xl bg-lime text-forest font-bold hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all text-sm"
                  >
                    확인
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Detail Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass max-w-2xl w-full rounded-[40px] border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-3xl serif text-white">
                    {selectedQuote.from_name} 님의 견적 요청 상세
                  </h2>
                  <p className="text-xs tracking-widest uppercase opacity-40 mt-1">
                    Quote Request Details
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content - Styled like the Receipt Summary */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-grow bg-forest/30">
                <div className="space-y-8">
                  {/* Summary Text */}
                  <div className="space-y-6">
                    {selectedQuote.summary.split('\n\n').map((block, i) => (
                      <div key={i} className="glass p-6 rounded-3xl border border-white/5">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed opacity-80">
                          {block}
                        </pre>
                      </div>
                    ))}
                  </div>

                  {/* Totals Section */}
                  <div className="pt-8 border-t border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs tracking-widest uppercase opacity-40">합계(링깃)</span>
                      <span className="text-2xl serif text-white">RM {selectedQuote.total_myr}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs tracking-widest uppercase text-lime font-bold">총 예상 비용(원)</span>
                      <span className="text-3xl serif text-lime font-bold">{selectedQuote.total_krw}</span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs tracking-widest uppercase opacity-40 block mb-1">신청자명</label>
                        <p className="text-base font-medium">{selectedQuote.from_name}</p>
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase opacity-40 block mb-1">문의일시</label>
                        <p className="text-base">{format(new Date(selectedQuote.timestamp), 'yyyy-MM-dd HH:mm')}</p>
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase opacity-40 block mb-1">연락처</label>
                        <p className="text-base">{selectedQuote.phone}</p>
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase opacity-40 block mb-1">이메일</label>
                        <p className="text-base">{selectedQuote.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase opacity-40 block mb-1">희망 일정</label>
                      <p className="text-base">{selectedQuote.travel_period || (selectedQuote as any).schedule?.split(' (')[0]}</p>
                    </div>
                    {selectedQuote.message && (
                      <div>
                        <label className="text-xs tracking-widest uppercase opacity-40 block mb-1">추가 메시지</label>
                        <p className="text-base opacity-70 italic">"{selectedQuote.message}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 text-center shrink-0">
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="bg-lime text-forest px-12 py-3 rounded-full font-bold hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'photo'>('video');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const initialVideo = GALLERY_DATA.find(i => i.type === 'video');
  const [featuredVideo, setFeaturedVideo] = useState<GalleryItem | null>(initialVideo || null);

  const filteredItems = GALLERY_DATA.filter(item => item.type === activeTab);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-lime font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
        >
          눈으로 즐기는 경험
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl serif mb-8"
        >
          갤러리
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl serif italic opacity-60 max-w-2xl mx-auto"
        >
          "조호바루의 푸른 필드와 아늑한 휴식의 순간들. 야나골 골프클럽의 생생한 현장을 만나보세요."
        </motion.p>
        
        <div className="flex justify-center gap-4 mt-12">
          <button 
            onClick={() => setActiveTab('video')}
            className={cn(
              "px-8 py-3 rounded-full border transition-all duration-500 text-sm font-medium tracking-wider",
              activeTab === 'video' 
                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
            )}
          >
            유튜브 추천 동영상
          </button>
          <button 
            onClick={() => setActiveTab('photo')}
            className={cn(
              "px-8 py-3 rounded-full border transition-all duration-500 text-sm font-medium tracking-wider",
              activeTab === 'photo' 
                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
            )}
          >
            사진 보기
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'video' ? (
          <motion.div
            key="video-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-12"
          >
            {/* Featured Video */}
            {featuredVideo && (
              <div className="glass rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <div className="grid lg:grid-cols-3">
                  <div className="lg:col-span-2 aspect-video bg-black">
                    <iframe
                      src={featuredVideo.url}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={featuredVideo.title}
                    ></iframe>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-white/5">
                    <span className="text-lime font-bold text-xs tracking-widest uppercase mb-4">Now Playing</span>
                    <h2 className="text-3xl md:text-4xl serif mb-6 leading-tight">{featuredVideo.title}</h2>
                    <p className="text-white/60 leading-relaxed mb-8">{featuredVideo.description}</p>
                    <div className="flex items-center gap-4 text-xs tracking-widest uppercase opacity-40">
                      <div className="w-12 h-[1px] bg-white" />
                      <span>Featured Content</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_DATA.filter(i => i.type === 'video').map((item) => {
                const ytId = getYouTubeId(item.url);
                const isFeatured = featuredVideo?.id === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setFeaturedVideo(item)}
                    className={cn(
                      "cursor-pointer group relative rounded-3xl overflow-hidden border transition-all duration-500",
                      isFeatured ? "border-lime shadow-[0_0_20px_rgba(163,230,53,0.2)]" : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                          isFeatured ? "bg-lime text-black scale-110" : "bg-white/20 backdrop-blur-md text-white group-hover:bg-white group-hover:text-black"
                        )}>
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 bg-white/5">
                      <h3 className="text-sm font-medium line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">{item.title}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="photo-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {GALLERY_DATA.filter(i => i.type === 'photo').map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden break-inside-avoid shadow-xl"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="space-y-2"
                  >
                    <h3 className="text-xl serif text-white">{item.title}</h3>
                    <p className="text-xs text-white/60 tracking-wider uppercase">View Details</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center"
          >
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-lime">
                    {GALLERY_DATA.filter(i => i.type === 'photo').findIndex(i => i.id === selectedItem.id) + 1}
                  </span>
                </div>
                <span className="text-white/40 text-xs tracking-widest uppercase">
                  / {GALLERY_DATA.filter(i => i.type === 'photo').length}
                </span>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all hover:scale-110 z-10 hidden md:flex"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all hover:scale-110 z-10 hidden md:flex"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={selectedItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center p-4 md:p-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
                <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title} 
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center max-w-2xl">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-5xl serif text-white mb-4"
                  >
                    {selectedItem.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white/60 text-lg leading-relaxed"
                  >
                    {selectedItem.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Mobile Swipe/Tap hints or navigation could be added here */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NoticePopup = () => {
  const [popups, setPopups] = useState<Notice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'notices'), where('showAsPopup', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Notice);
      
      // Filter out those hidden by user (today)
      const hiddenData = JSON.parse(localStorage.getItem('hiddenNotices') || '{}');
      const now = new Date().getTime();
      
      const activePopups = data.filter(n => {
        const hiddenUntil = hiddenData[n.id];
        return !hiddenUntil || now > hiddenUntil;
      });
      
      if (activePopups.length > 0) {
        setPopups(activePopups);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, (error) => {
      console.error("Popup fetch error:", error);
    });
    return () => unsubscribe();
  }, []);

  const closeForToday = () => {
    const hiddenData = JSON.parse(localStorage.getItem('hiddenNotices') || '{}');
    const currentId = popups[currentIndex].id;
    // Hide for 24 hours
    hiddenData[currentId] = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('hiddenNotices', JSON.stringify(hiddenData));
    handleClose();
  };

  const handleClose = () => {
    if (currentIndex < popups.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsVisible(false);
    }
  };

  if (!isVisible || popups.length === 0) return null;

  const currentNotice = popups[currentIndex];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass max-w-lg w-full rounded-[32px] border border-white/20 overflow-hidden shadow-2xl flex flex-col"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-lime/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-lime" size={20} />
              <h3 className="text-lg serif text-white">공지사항</h3>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <h2 className="text-2xl serif mb-4 text-lime">{currentNotice.title}</h2>
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                {currentNotice.content}
              </p>
            </div>
            {currentNotice.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={currentNotice.imageUrl} 
                  alt={currentNotice.title} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 flex justify-between items-center bg-black/20">
            <button 
              onClick={closeForToday}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              오늘 하루 보지 않기
            </button>
            <button 
              onClick={handleClose}
              className="bg-lime text-forest px-8 py-2 rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  useEffect(() => {
    // Test connection - we don't need to sign in anonymously if rules allow public read/create
    const testConnection = async () => {
      try {
        // Just a simple check if Firebase is initialized
        if (!auth.app) {
          console.error("Firebase not initialized");
        }
      } catch (error) {
        console.error("Firebase check error:", error);
      }
    };
    testConnection();
  }, []);

  return (
    <ExchangeRateProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen flex flex-col relative">
          {/* Global Background Image with Overlay */}
          <div className="fixed inset-0 z-[-1]">
            <img 
              src="https://picsum.photos/seed/golf-hero/1920/1080" 
              alt="Golf Course Background" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/60 to-forest" />
          </div>

          <NoticePopup />
          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/golf" element={<Golf />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/rest" element={<Rest />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ExchangeRateProvider>
  );
}
