import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Calendar, Users, MapPin, 
  Star, Clock, Info, 
  Calculator, Map as MapIcon,
  Plane, Car, Mail, Play,
  ChevronLeft, ChevronRight,
  CheckCircle2, AlertCircle, Send,
  Plus, Trash2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isWeekend, isSameDay, startOfTomorrow } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import emailjs from '@emailjs/browser';

import { GOLF_COURSES, STAY_UNITS, EXCHANGE_RATE, KSL_LOCATION, type StayUnit } from './constants';
import { FOOD_DATA, type FoodItem } from './foodData';
import { GALLERY_DATA, type GalleryItem } from './galleryData';

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
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className="fixed top-8 left-0 w-full z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-4xl font-sans font-bold tracking-tighter flex items-center gap-4">
          <img 
            src="logo.png" 
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
            src="logo.png" 
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
          <Link to="/gallery" className="hover:underline">Gallery</Link>
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
          {/* Left Card: Premium Guide */}
          <div className="bg-forest/40 backdrop-blur-md rounded-[32px] px-4 py-8 border border-white/10 h-[500px] flex flex-col">
            <div className="mb-5 px-3">
              <h3 className="text-2xl serif italic text-lime">Premium Guide</h3>
              <div className="h-px w-12 bg-lime/30 mt-2" />
            </div>
            <div className="space-y-4 flex-1 px-3">
              {course.fullDescription.map((sentence, idx) => (
                <div key={idx} className="flex gap-1.5">
                  <span className="text-lime/40 font-mono text-[11px] mt-1.5 shrink-0">0{idx + 1}</span>
                  <p className="text-[17px] leading-relaxed opacity-90 font-light">
                    {sentence}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-white/5 px-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="opacity-40 uppercase tracking-wider">Travel Time</span>
                <span className="text-lime font-medium">{course.travelTime} min from KSL</span>
              </div>
            </div>
          </div>

          {/* Center Card: Image with Name & Address */}
          <div className="md:col-span-2 relative rounded-[32px] overflow-hidden h-[500px]">
            <img 
              src={course.image} 
              alt={course.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            
            {/* Top Left Info */}
            <div className="absolute top-8 left-8 right-8">
              <h3 className="serif leading-tight mb-2">
                {(() => {
                  const match = course.name.match(/^(.*?)\s*\((.*?)\)$/);
                  const korean = match ? match[1] : course.name;
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
                  <span className="text-white font-light">{course.address}</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(course.name + ' ' + course.address)}`}
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
                {course.category} Collection
              </div>
            </div>
          </div>

          {/* Right Card: Course Info, Pricing, Promotion */}
          <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-4 border border-white/10 h-[500px] flex flex-col gap-2.5">
            {/* Course Info */}
            <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
              <div className="flex justify-between items-center mb-0.5">
                <h3 className="text-[13px] font-bold text-lime uppercase tracking-widest">Course Info</h3>
                <Info size={10} className="text-lime opacity-80" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{course.holes}홀</span>
                <span className="text-[13px] text-white/90 font-medium">{course.difficulty} • {course.nightGolf ? '야간' : '주간'}</span>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-bold text-lime uppercase tracking-widest">Pricing (MYR)</h3>
                <Calculator size={12} className="text-lime opacity-80" />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-[12px] text-white/60 font-bold self-end">WEEKDAY</div>
                  <div className="text-right">
                    <p className="text-[12px] text-white/60 font-medium">AM</p>
                    <p className="text-base font-bold text-white">RM {course.pricing.weekday.morning}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-white/60 font-medium">PM</p>
                    <p className="text-base font-bold text-white">RM {course.pricing.weekday.afternoon}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-[12px] text-white/60 font-bold self-end">WEEKEND</div>
                  <div className="text-right">
                    <p className="text-[12px] text-white/60 font-medium">AM</p>
                    <p className="text-base font-bold text-lime">RM {course.pricing.weekend.morning}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-white/60 font-medium">PM</p>
                    <p className="text-base font-bold text-lime">RM {course.pricing.weekend.afternoon}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-[12px] text-white/70 italic font-medium">
                  <span>Caddy: RM {course.pricing.caddyFee}</span>
                  <span>Senior: -RM {course.pricing.seniorDiscount}</span>
                </div>
              </div>
            </div>

            {/* Promotion */}
            <div className="bg-lime/10 rounded-2xl p-2.5 border border-lime/20">
              <div className="flex justify-between items-center mb-0.5">
                <h3 className="text-[13px] font-bold text-lime uppercase tracking-widest">Promotion</h3>
                <Star size={10} className="text-lime" fill="currentColor" />
              </div>
              <p className="text-[13px] text-white font-bold leading-tight">
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
            <span className="text-lime">조호바루 프리미엄 골프 컬렉션.</span>
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
        <h1 className="text-7xl serif mb-8">Golf <span className="italic">Courses</span></h1>
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
            className="group flex flex-col h-full"
          >
            <div className="flex-grow">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl serif">{course.name}</h3>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(course.name + ' ' + (course.address || 'Johor Bahru'))}`}
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
            </div>

            {/* Detailed Pricing Table - Aligned to bottom */}
            <div className="mt-auto">
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl serif">{item.name}</h3>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + (item.quickInfo.find(info => info.label === '위치' || info.label === '주소')?.value || 'Johor Bahru'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-lime text-forest flex items-center justify-center hover:scale-110 transition-transform"
            title="Google Maps"
          >
            <MapIcon size={18} />
          </a>
        </div>
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
  const [activeCategory, setActiveCategory] = useState<'All' | 'LocalTop10' | 'KSL' | 'Nearby' | 'Market'>('All');
  
  const filteredFood = FOOD_DATA.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const activeStay = STAY_CATEGORIES.find(c => c.id === activeStayCat);

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      {/* Stay Section */}
      <header className="mb-12">
        <div className="flex items-center gap-6 mb-8">
          <h1 className="text-7xl serif">Stay <span className="italic text-lime"></span></h1>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=KSL+City+Mall+Johor+Bahru"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-lime text-forest flex items-center justify-center hover:scale-110 transition-transform mt-2"
            title="Google Maps"
          >
            <MapIcon size={24} />
          </a>
        </div>
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
          "조호바루의 숨겨진 미식의 세계. 야나골 골프클럽이 추천하는 현지인 맛집 리스트"
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'Nearby', 'Market', 'LocalTop10', 'KSL'].map((cat) => (
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
               cat === 'LocalTop10' ? '현지인 맛집10' : 'KSL 시티몰 TOP 10'}
            </button>
          ))}
        </div>

        <div className="p-8 glass rounded-[32px] border border-white/10">
          <h4 className="text-xl serif mb-2">현지 미식 가이드</h4>
          <p className="text-sm opacity-60 max-w-3xl">
            말레이시아 골프 여행의 완성은 맛있는 음식입니다. 조호바루 시내의 활기찬 야시장부터 현지인들이 줄 서서 먹는 진짜 맛집들을 엄선했습니다. 각 매장의 대표 메뉴와 방문 팁을 확인해보세요.
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
  const [options, setOptions] = useState<Record<string, Array<{ 
    scheduleId: string,
    day: 'weekday' | 'weekend', 
    time: 'morning' | 'afternoon',
    dates: Date[]
  }>>>({});
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [openCalendarKey, setOpenCalendarKey] = useState<string | null>(null);

  const handleOpenQuoteModal = () => {
    // Check if all selected courses have at least one date selected in each of their schedules
    const allDatesSelected = selectedCourses.every(id => {
      const schedules = options[id] || [];
      return schedules.length > 0 && schedules.every(s => s.dates && s.dates.length > 0);
    });

    if (!allDatesSelected) {
      alert('날짜를 확인해주세요');
      return;
    }

    setIsQuoteModalOpen(true);
  };

  const isAllDatesSelected = selectedCourses.length > 0 && selectedCourses.every(id => {
    const schedules = options[id] || [];
    return schedules.length > 0 && schedules.every(s => s.dates && s.dates.length > 0);
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
        const course = GOLF_COURSES.find(c => c.id === id);
        const schedules = options[id] || [];
        if (!course || schedules.length === 0) return '';
        
        const scheduleDetails = schedules.map(opt => {
          const dateStr = opt.dates?.length > 0 
            ? opt.dates.map(d => format(d, 'MM/dd')).join(', ')
            : '날짜 미선택';
          return `${dateStr} / ${opt.time.toUpperCase()}`;
        }).join('\n');

        return `${course.name}\n${scheduleDetails}`;
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
  }, [isQuoteModalOpen, selectedCourses, options]);

  const toggleCourse = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter(i => i !== id));
      const newOptions = { ...options };
      delete newOptions[id];
      setOptions(newOptions);
    } else if (selectedCourses.length < 10) {
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
      const course = GOLF_COURSES.find(c => c.id === id);
      if (!course) return acc;
      const schedules = options[id] || [];
      return acc + schedules.reduce((sAcc, opt) => {
        const price = course.pricing[opt.day][opt.time];
        const count = opt.dates?.length || 0;
        return sAcc + (price * count);
      }, 0);
    }, 0);
  };

  const totalMYR = calculateTotal();

  const sendEmail = (e: React.FormEvent) => {
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

    const summary = selectedCourses.map(id => {
      const course = GOLF_COURSES.find(c => c.id === id);
      const schedules = options[id] || [];
      return schedules.map(opt => {
        const price = course?.pricing[opt.day][opt.time] || 0;
        const dateStr = opt.dates?.length > 0 ? opt.dates.map(d => format(d, 'MM/dd')).join(', ') : '날짜 미선택';
        return `${course?.name} (${dateStr} / ${opt.time}): RM ${price}`;
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
      schedule: String(quoteForm.travel_period),
      message: String(quoteForm.message),
      total_myr: String(totalMYR),
      total_krw: (totalMYR * EXCHANGE_RATE).toLocaleString() + '원',
      summary: String(summary)
    };

    const serviceId = "service_jb_golf";
    const templateId = "template_jb_golf_reserve";
    const publicKey = "FBsRuyiHJUVlj-ptY";

    console.log("EmailJS 전송 시도:", { serviceId, templateId, templateParams });

    // 초기화 및 전송
    emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    })
      .then((response) => {
        console.log('EmailJS 성공:', response.status, response.text);
        alert('견적 문의가 성공적으로 전송되었습니다!');
        setIsQuoteModalOpen(false);
        setQuoteForm({ from_name: '', email: '', phone: '', golf_courses: '', travel_period: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS 상세 에러:', error);
        // 에러 객체의 내용을 더 자세히 출력
        if (error.text) {
          alert(`전송 실패: ${error.text}`);
        } else {
          alert('전송 실패. EmailJS 설정을 확인해주세요.');
        }
      })
      .finally(() => {
        setIsSending(false);
      });
  };
 
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
              <div className="space-y-8">
                {selectedCourses.map(id => {
                  const course = GOLF_COURSES.find(c => c.id === id);
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
                        <p className="serif text-xl text-lime">{course?.name}</p>
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
                                            onSelect={(date) => updateOption(id, opt.scheduleId, 'dates', date ? [date] : [])}
                                            disabled={{ before: startOfTomorrow() }}
                                            className="text-white"
                                          />
                                          <button 
                                            onClick={() => setOpenCalendarKey(null)}
                                            className="w-full mt-4 py-2 bg-lime text-forest text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-lime/90 transition-colors"
                                          >
                                            선택 완료
                                          </button>
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
                                  <option value="morning" className="bg-forest">Morning</option>
                                  <option value="afternoon" className="bg-forest">Afternoon</option>
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
          <div className="sticky top-40 glass p-10 rounded-[40px] shadow-2xl shadow-forest/20 border border-white/10 flex flex-col">
            <div className="absolute top-0 left-0 w-full h-2 bg-lime shrink-0" />
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4 shrink-0">
              <h2 className="text-3xl serif">Receipt Summary</h2>
              <span className="text-[10px] tracking-widest uppercase bg-lime text-forest px-3 py-1 rounded-full font-bold">캐디피/팁 제외</span>
            </div>
            
            <div className="space-y-6 mb-8 pr-2 custom-scrollbar">
              {selectedCourses.length === 0 ? (
                <p className="text-sm opacity-40 italic">골프장을 선택하시면 상세 견적이 표시됩니다.</p>
              ) : (
                selectedCourses.map(id => {
                  const course = GOLF_COURSES.find(c => c.id === id);
                  const schedules = options[id] || [];
                  if (!course || schedules.length === 0) return null;
                  
                  return schedules.map(opt => {
                    const price = course.pricing[opt.day][opt.time];
                    return (
                      <div key={opt.scheduleId} className="flex justify-between items-start gap-4 mb-4 last:mb-0">
                        <div className="flex-grow">
                          <p className="font-medium text-sm">{course.name}</p>
                          <p className="text-[10px] opacity-40 uppercase tracking-widest">
                            {opt.dates?.length > 0 
                              ? opt.dates.map(d => format(d, 'MM/dd')).join(', ')
                              : opt.day} / {opt.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">RM {price * (opt.dates?.length || 1)}</p>
                          <p className="text-[10px] opacity-40 italic">₩{(price * (opt.dates?.length || 1) * EXCHANGE_RATE).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  });
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

            <button
              onClick={handleOpenQuoteModal}
              disabled={!isAllDatesSelected}
              className={cn(
                "mt-6 w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all flex items-center justify-center gap-2",
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
                    <span className="text-base serif text-lime">₩{(totalMYR * EXCHANGE_RATE).toLocaleString()}</span>
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
          Visual Experience
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl serif mb-8"
        >
          Gallery
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
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
