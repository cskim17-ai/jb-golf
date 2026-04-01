import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Calendar, Users, MapPin, 
  Star, Clock, Info, 
  Calculator, Map as MapIcon,
  Plane, Car, Mail,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

import { GOLF_COURSES, STAY_UNITS, EXCHANGE_RATE, KSL_LOCATION, type StayUnit } from './constants';
import { FOOD_DATA, type FoodItem } from './foodData';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Golf Courses', path: '/golf' },
    { name: 'Stay/Food', path: '/stay' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <nav className="fixed top-8 left-0 w-full z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-4xl font-sans font-bold tracking-tighter flex items-center gap-4">
          <img 
            src="src/logo.png" 
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
            src="src/logo.png" 
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
        <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">Contact</h3>
        <p className="text-lg serif">cskim1747@gmail.com</p>
        <p className="text-xs opacity-80 mt-2">궁금하신 사항은 위 메일로 문의해 주세요</p>
        <p className="text-sm opacity-80 mt-4">야나골 골프클럽</p>
      </div>
      <div>
        <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">Quick Links</h3>
        <div className="flex flex-col gap-2">
          <Link to="/golf" className="hover:underline">Golf Courses</Link>
          <Link to="/stay" className="hover:underline">Stay/Food</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/booking" className="hover:underline">Booking</Link>
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

const GolfCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GOLF_COURSES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GOLF_COURSES.length) % GOLF_COURSES.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const course = GOLF_COURSES[currentIndex];

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
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 glass rounded-[40px] border border-white/10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Card: Price & Name */}
          <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-10 flex flex-col justify-between border border-white/10 h-[500px]">
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              <div className="opacity-40 uppercase tracking-widest text-[10px]"></div>
              <div className="opacity-40 uppercase tracking-widest text-[10px] text-right">Morning</div>
              <div className="opacity-40 uppercase tracking-widest text-[10px] text-right">Afternoon</div>
              
              <div className="font-bold text-white/60 text-sm flex items-center">주중</div>
              <div className="text-right">
                <p className="text-2xl font-bold">RM {course.pricing.weekday.morning}</p>
                <p className="text-[10px] opacity-40 italic">₩{(course.pricing.weekday.morning * EXCHANGE_RATE).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">RM {course.pricing.weekday.afternoon}</p>
                <p className="text-[10px] opacity-40 italic">₩{(course.pricing.weekday.afternoon * EXCHANGE_RATE).toLocaleString()}</p>
              </div>

              <div className="font-bold text-white/60 text-sm flex items-center">주말</div>
              <div className="text-right">
                <p className="text-2xl font-bold">RM {course.pricing.weekend.morning}</p>
                <p className="text-[10px] opacity-40 italic">₩{(course.pricing.weekend.morning * EXCHANGE_RATE).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">RM {course.pricing.weekend.afternoon}</p>
                <p className="text-[10px] opacity-40 italic">₩{(course.pricing.weekend.afternoon * EXCHANGE_RATE).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="serif leading-tight mb-6">
                {(() => {
                  const match = course.name.match(/^(.*?)\s*\((.*?)\)$/);
                  const korean = match ? match[1] : course.name;
                  const english = match ? `(${match[2]})` : '';
                  return (
                    <>
                      <span className="block mb-2 tracking-tighter text-3xl">
                        {korean}
                      </span>
                      {english && (
                        <span className="text-xl opacity-50 block font-sans font-light italic">
                          {english}
                        </span>
                      )}
                    </>
                  );
                })()}
              </h3>
              <div className="px-6 py-3 bg-lime/20 text-lime rounded-full text-sm tracking-widest uppercase font-bold inline-block">
                {course.category}
              </div>
            </div>
          </div>

          {/* Center Card: Image */}
          <div className="md:col-span-2 relative rounded-[32px] overflow-hidden h-[500px]">
            <img 
              src={course.image} 
              alt={course.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          </div>

          {/* Right Cards: Info & Promotion */}
          <div className="flex flex-col gap-4 h-[500px]">
            <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-10 border border-white/10 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium">Course Info</h3>
                <div className="w-10 h-10 rounded-full bg-white text-forest flex items-center justify-center">
                  <Info size={20} />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-xl opacity-90">{course.holes}홀 • {course.difficulty} 난이도</p>
                <p className="text-xl opacity-90">{course.nightGolf ? '야간 가능' : '주간 전용'}</p>
              </div>
            </div>

            <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-10 border border-white/10 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium">Promotion</h3>
                <div className="w-10 h-10 rounded-full bg-lime text-forest flex items-center justify-center">
                  <Star size={20} fill="currentColor" />
                </div>
              </div>
              <p className="text-xl text-lime font-medium mt-6 leading-relaxed">
                {course.promotion || '현재 진행중인 프로모션이 없습니다.'}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Navigation */}
      <div className="flex justify-center gap-4 mt-6 lg:hidden">
        <button 
          onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
          className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
          className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {GOLF_COURSES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === i ? "bg-lime w-6" : "bg-white/20"
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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=2000" 
          alt="Golf Course" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/60 to-forest" />
      </div>

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
            <span className="text-lime">조호바루.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            필드 위 짜릿한 샷과 도심 속 화려한 야경을 동시에 누리는 골프 휴가.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-24">
            <Link to="/booking" className="btn-primary">
              Booking
            </Link>
            <Link to="/golf" className="btn-secondary glass">
              Golf Courses
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
  
  const filteredCourses = filter === 'All' 
    ? GOLF_COURSES 
    : GOLF_COURSES.filter(c => c.category === filter);

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-7xl serif mb-8">Johor Bahru <span className="italic">Golf Courses</span></h1>
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
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredCourses.map((course) => (
          <motion.div 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={course.id} 
            className="group"
          >
            <a 
              href={course.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block aspect-[3/4] rounded-[60px] overflow-hidden mb-6 relative border border-white/10"
            >
              <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-6 left-6 px-4 py-1 bg-lime text-forest rounded-full text-[10px] tracking-widest uppercase font-bold">
                {course.category}
              </div>
            </a>
            <h3 className="text-2xl serif mb-4">{course.name}</h3>
            
            <div className="space-y-3 text-sm opacity-70 mb-6">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>숙소(KSL)에서 {course.travelTime}분 소요</span>
              </div>
              <div className="flex items-center gap-2">
                <Info size={14} />
                <span>{course.holes}홀 • {course.difficulty} 난이도 • {course.nightGolf ? '야간 가능' : '주간 전용'}</span>
              </div>
              {course.promotion && (
                <div className="flex items-center gap-2 text-lime font-medium">
                  <Star size={14} fill="currentColor" />
                  <span>Promotion: {course.promotion}</span>
                </div>
              )}
            </div>

            {/* Detailed Pricing Table */}
            <div className="glass rounded-2xl p-6 mb-6 text-xs border border-white/10">
              <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-2 mb-2 opacity-40 uppercase tracking-widest">
                <span>Type</span>
                <span>Morning</span>
                <span>Afternoon</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-1">
                <span className="font-medium">Weekday</span>
                <span>RM {course.pricing.weekday.morning}</span>
                <span>RM {course.pricing.weekday.afternoon}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-medium">Weekend</span>
                <span>RM {course.pricing.weekend.morning}</span>
                <span>RM {course.pricing.weekend.afternoon}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between opacity-60">
                <span>Caddy Fee: RM {course.pricing.caddyFee}</span>
                <span>Senior: -RM {course.pricing.seniorDiscount}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] tracking-widest uppercase opacity-40 mb-1">KRW Reference</p>
                  <p className="text-xl serif">₩{(course.pricing.weekday.morning * EXCHANGE_RATE).toLocaleString()} <span className="text-sm opacity-40 italic">/ Morning</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const STAY_CATEGORIES = [
  { id: '4', label: '4 PERSONS (2BR)', url: "https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=4" },
  { id: '6', label: '6 PERSONS (3BR)', url: "https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=6" },
  { id: '8', label: '8 PERSONS (4BR/PENT)', url: "https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=8" },
];

const FoodCard = ({ item }: { item: FoodItem }) => (
  <div className="glass rounded-[40px] overflow-hidden border border-white/10 flex flex-col h-full">
    <div className="aspect-[16/9] overflow-hidden relative">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4 px-4 py-1 bg-lime text-forest rounded-full text-[10px] font-bold uppercase tracking-widest">
        {item.category}
      </div>
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <div className="mb-6">
        <h3 className="text-2xl serif mb-2">{item.name}</h3>
        {item.tagline && <p className="text-sm italic text-lime opacity-80 mb-4">{item.tagline}</p>}
        <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <h4 className="text-xs uppercase tracking-widest opacity-40 mb-3 flex items-center gap-2">
            <Star size={12} className="text-lime" /> Signature Dishes
          </h4>
          <ul className="space-y-2">
            {item.signatureDishes.map((dish, i) => (
              <li key={i} className="text-sm opacity-80 flex gap-2">
                <span className="text-lime">•</span> {dish}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest opacity-40 mb-3 flex items-center gap-2">
            <Info size={12} className="text-lime" /> Visitor Tips
          </h4>
          <ul className="space-y-2">
            {item.visitorTips.map((tip, i) => (
              <li key={i} className="text-sm opacity-80 flex gap-2 italic">
                <span className="text-lime">→</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 gap-3">
        {item.quickInfo.map((info, i) => (
          <div key={i} className="flex justify-between text-[11px]">
            <span className="opacity-40 uppercase tracking-wider">{info.label}</span>
            <span className="text-right opacity-80">{info.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Stay = () => {
  const [activeStayCat, setActiveStayCat] = useState('4');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Seremban' | 'KSL' | 'Nearby' | 'Market'>('All');
  
  const filteredFood = FOOD_DATA.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const activeStay = STAY_CATEGORIES.find(c => c.id === activeStayCat);

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      {/* Stay Section */}
      <header className="mb-12">
        <h1 className="text-7xl serif mb-8">KSL Residence <span className="italic text-lime">R9</span></h1>
        <p className="text-xl serif italic opacity-80 mb-12 max-w-2xl">
          "KSL 몰과 연결되어 라운딩 후 쇼핑·마사지·식사가 한 번에 가능! Residence R9 홈스테이 추천 리스트"
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          {STAY_CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveStayCat(cat.id)}
              className={cn(
                "pill-nav",
                activeStayCat === cat.id ? "active-pill" : "text-white/60"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="p-8 glass rounded-[32px] border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-xl serif mb-2">실시간 필터링 검색</h4>
            <p className="text-sm opacity-60">
              에어비앤비에서 현재 예약 가능한 모든 {activeStayCat}인 숙소를 실시간으로 확인하세요.
            </p>
          </div>
          <a 
            href={activeStay?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-lime text-forest rounded-full font-bold hover:bg-lime/90 transition-all whitespace-nowrap"
          >
            {activeStayCat}인 숙소 전체 보기
          </a>
        </div>
      </header>

      {/* Food Section */}
      <header className="mb-12 pt-12 border-t border-white/10">
        <h1 className="text-7xl serif mb-8">Food</h1>
        <p className="text-xl serif italic opacity-80 mb-12 max-w-2xl">
          "조호바루와 세렘반의 숨겨진 미식의 세계. 야나골 골프클럽이 추천하는 현지인 맛집 리스트"
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'Nearby', 'Market', 'Seremban', 'KSL'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={cn(
                "pill-nav",
                activeCategory === cat ? "active-pill" : "text-white/60"
              )}
            >
              {cat === 'All' ? '전체보기' : 
               cat === 'Nearby' ? '주변 맛집' : 
               cat === 'Market' ? '야시장' : 
               cat === 'Seremban' ? '세렘반 TOP 10' : 'KSL 시티몰 TOP 10'}
            </button>
          ))}
        </div>

        <div className="p-8 glass rounded-[32px] border border-white/10">
          <h4 className="text-xl serif mb-2">현지 미식 가이드</h4>
          <p className="text-sm opacity-60 max-w-3xl">
            말레이시아 골프 여행의 완성은 맛있는 음식입니다. 조호바루 시내의 활기찬 야시장부터 세렘반의 전통 있는 노포까지, 
            현지인들이 줄 서서 먹는 진짜 맛집들을 엄선했습니다. 각 매장의 대표 메뉴와 방문 팁을 확인해보세요.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredFood.map((item) => (
          <div key={item.id}>
            <FoodCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Pricing = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-7xl serif mb-8">Pricing</h1>
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-1">
            <p className="text-xs tracking-widest uppercase opacity-40">Current Date</p>
            <p className="text-2xl serif">{currentDate}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs tracking-widest uppercase opacity-40">Exchange Rate</p>
            <p className="text-2xl serif">1 MYR = {EXCHANGE_RATE} KRW</p>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto glass rounded-[40px] p-8 border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] tracking-widest uppercase opacity-40">
              <th className="py-4 font-medium">Golf Course</th>
              <th className="py-4 font-medium">Day Type</th>
              <th className="py-4 font-medium">Morning (RM)</th>
              <th className="py-4 font-medium">Morning (KRW)</th>
              <th className="py-4 font-medium">Afternoon (RM)</th>
              <th className="py-4 font-medium">Afternoon (KRW)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {GOLF_COURSES.map((course) => (
              <React.Fragment key={course.id}>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td rowSpan={2} className="py-6 font-serif text-lg pr-8 align-top">
                    {course.name}
                    <div className="text-[10px] tracking-widest uppercase opacity-40 font-sans mt-1">
                      {course.category}
                    </div>
                  </td>
                  <td className="py-4 opacity-60">Weekday</td>
                  <td className="py-4 font-medium">{course.pricing.weekday.morning}</td>
                  <td className="py-4 opacity-60">₩{(course.pricing.weekday.morning * EXCHANGE_RATE).toLocaleString()}</td>
                  <td className="py-4 font-medium">{course.pricing.weekday.afternoon}</td>
                  <td className="py-4 opacity-60">₩{(course.pricing.weekday.afternoon * EXCHANGE_RATE).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 opacity-60">Weekend</td>
                  <td className="py-4 font-medium">{course.pricing.weekend.morning}</td>
                  <td className="py-4 opacity-60">₩{(course.pricing.weekend.morning * EXCHANGE_RATE).toLocaleString()}</td>
                  <td className="py-4 font-medium">{course.pricing.weekend.afternoon}</td>
                  <td className="py-4 opacity-60">₩{(course.pricing.weekend.afternoon * EXCHANGE_RATE).toLocaleString()}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
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
  const [options, setOptions] = useState<Record<string, { day: 'weekday' | 'weekend', time: 'morning' | 'afternoon' }>>({});

  const toggleCourse = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter(i => i !== id));
      const newOptions = { ...options };
      delete newOptions[id];
      setOptions(newOptions);
    } else if (selectedCourses.length < 10) {
      setSelectedCourses([...selectedCourses, id]);
      setOptions({ ...options, [id]: { day: 'weekday', time: 'morning' } });
    }
  };

  const updateOption = (id: string, key: 'day' | 'time', value: string) => {
    setOptions({
      ...options,
      [id]: { ...options[id], [key]: value }
    });
  };

  const calculateTotal = () => {
    return selectedCourses.reduce((acc, id) => {
      const course = GOLF_COURSES.find(c => c.id === id);
      if (!course) return acc;
      const opt = options[id];
      const price = course.pricing[opt.day][opt.time];
      return acc + price;
    }, 0);
  };

  const totalMYR = calculateTotal();

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-7xl serif mb-4">Booking</h1>
            <p className="text-sm opacity-40 tracking-widest uppercase">
              {format(new Date(), 'yyyy.MM.dd')} | Exchange Rate: 1 MYR = {EXCHANGE_RATE} KRW
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-widest uppercase opacity-40 mb-2">Estimated Total</p>
            <p className="text-5xl serif">RM {totalMYR}</p>
            <p className="text-xl serif italic opacity-40">₩{(totalMYR * EXCHANGE_RATE).toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Selection Area */}
        <div className="space-y-12">
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl serif flex items-center gap-3">
                <Calculator size={24} className="opacity-40" />
                1. Select Golf Courses
              </h2>
              <p className="text-xs tracking-widest uppercase opacity-40">
                {selectedCourses.length} / 10 SELECTED
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GOLF_COURSES.map(course => (
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
                  <p className="text-sm font-medium">{course.name}</p>
                  <p className="text-[10px] opacity-40 uppercase mt-1">{course.category}</p>
                </button>
              ))}
            </div>
          </section>

          {selectedCourses.length > 0 && (
            <section className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl serif mb-6">2. Configure Schedule</h2>
              <div className="space-y-6">
                {selectedCourses.map(id => {
                  const course = GOLF_COURSES.find(c => c.id === id);
                  return (
                    <div key={id} className="p-6 glass border border-white/10 rounded-[32px] flex flex-wrap gap-8 items-center justify-between">
                      <p className="serif text-lg">{course?.name}</p>
                      <div className="flex gap-4">
                        <select 
                          value={options[id]?.day} 
                          onChange={(e) => updateOption(id, 'day', e.target.value)}
                          className="bg-transparent border-b border-white/20 py-1 text-xs outline-none"
                        >
                          <option value="weekday" className="bg-forest">Weekday</option>
                          <option value="weekend" className="bg-forest">Weekend</option>
                        </select>
                        <select 
                          value={options[id]?.time} 
                          onChange={(e) => updateOption(id, 'time', e.target.value)}
                          className="bg-transparent border-b border-white/20 py-1 text-xs outline-none"
                        >
                          <option value="morning" className="bg-forest">Morning</option>
                          <option value="afternoon" className="bg-forest">Afternoon</option>
                        </select>
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
          <div className="sticky top-40 glass p-10 rounded-[40px] shadow-2xl shadow-forest/20 border border-white/10 overflow-hidden max-h-[calc(100vh-12rem)] flex flex-col">
            <div className="absolute top-0 left-0 w-full h-2 bg-lime shrink-0" />
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4 shrink-0">
              <h2 className="text-3xl serif">Receipt Summary</h2>
              <span className="text-[10px] tracking-widest uppercase bg-lime text-forest px-3 py-1 rounded-full font-bold">캐디피/팁 제외</span>
            </div>
            
            <div className="space-y-6 mb-8 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {selectedCourses.length === 0 ? (
                <p className="text-sm opacity-40 italic">골프장을 선택하시면 상세 견적이 표시됩니다.</p>
              ) : (
                selectedCourses.map(id => {
                  const course = GOLF_COURSES.find(c => c.id === id);
                  const opt = options[id];
                  if (!course || !opt) return null;
                  const price = course.pricing[opt.day][opt.time];
                  
                  return (
                    <div key={id} className="flex justify-between items-start gap-4">
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{course.name}</p>
                        <p className="text-[10px] opacity-40 uppercase tracking-widest">
                          {opt.day} / {opt.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">RM {price}</p>
                        <p className="text-[10px] opacity-40 italic">₩{(price * EXCHANGE_RATE).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t-2 border-dashed border-white/10 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs tracking-widest uppercase opacity-40">Subtotal (MYR)</p>
                <p className="text-xl serif">RM {totalMYR}</p>
              </div>
              <div className="flex justify-between items-center text-lime">
                <p className="text-xs tracking-widest uppercase font-bold">Total (KRW)</p>
                <p className="text-3xl serif font-bold">₩{(totalMYR * EXCHANGE_RATE).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-10 p-4 bg-white/5 rounded-2xl text-[10px] opacity-60 leading-relaxed">
              <p>• 위 견적은 선택하신 골프장과 스케줄에 따른 예상 금액입니다.</p>
              <p>• 현지 사정 및 환율 변동에 따라 실제 결제 금액과 차이가 있을 수 있습니다.</p>
              <p>• 상세 예약 확정은 이메일(cskim1747@gmail.com) 문의를 통해 진행해 주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router basename="/jb-golf">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/golf" element={<Golf />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
