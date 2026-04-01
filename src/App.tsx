import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Calendar, Users, MapPin, 
  Star, Clock, Info, 
  Calculator, Map as MapIcon,
  Plane, Car, Mail
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

import { GOLF_COURSES, STAY_UNITS, EXCHANGE_RATE, KSL_LOCATION, type StayUnit } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Golf', path: '/golf' },
    { name: 'Stay', path: '/stay' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <nav className="fixed top-8 left-0 w-full z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl serif font-bold tracking-tighter text-white flex items-center gap-2">
          <span className="text-lime">gol</span>fee
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

        <div className="hidden md:block">
          <Link to="/booking" className="px-6 py-2 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition-all">
            Contact US
          </Link>
        </div>

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
        <h2 className="text-3xl serif italic mb-6">야나골 골프클럽</h2>
        <p className="text-paper/80 text-sm leading-relaxed max-w-xs">
          조호바루 골프 여행의 품격 있는 시작. 
          최고의 숙소와 골프장을 연결하는 프리미엄 커넥트 서비스입니다.
        </p>
      </div>
      <div>
        <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">Contact</h3>
        <p className="text-lg serif">cskim1747@gmail.com</p>
        <p className="text-xs opacity-80 mt-2">궁금하신 사항은 위 메일로 문의해 주세요</p>
        <p className="text-sm opacity-80 mt-4">KSL Residence R9, Johor Bahru</p>
      </div>
      <div>
        <h3 className="text-xs tracking-widest uppercase mb-6 opacity-60">Quick Links</h3>
        <div className="flex flex-col gap-2">
          <Link to="/golf" className="hover:underline">Golf Courses</Link>
          <Link to="/stay" className="hover:underline">Accommodations</Link>
          <Link to="/pricing" className="hover:underline">Pricing Table</Link>
          <Link to="/booking" className="hover:underline">Estimated Quote</Link>
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
          <h1 className="text-6xl md:text-8xl serif leading-[1.1] mb-8">
            Curated Sessions for <br />
            <span className="italic">Every Skill Level</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Book world-class golf courses and professional lessons in just a few clicks. 
            From tee times to training, everything your need is right here.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-24">
            <Link to="/booking" className="btn-primary">
              Book a Tee Time
            </Link>
            <Link to="/golf" className="btn-secondary glass">
              Find Golf Lessons
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Cards */}
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-4 glass rounded-[40px]">
          {/* Rating Card */}
          <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-8 flex flex-col justify-between border border-white/10">
            <div>
              <p className="text-3xl font-bold mb-2">4.9</p>
              <div className="flex gap-1 text-lime mb-4">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[10px] tracking-widest uppercase opacity-60">Based on reviews</p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl serif mb-2">Golf Arena</h3>
              <p className="text-xs opacity-60">Top-notch quality and service!</p>
            </div>
          </div>

          {/* Main Image Card */}
          <div className="md:col-span-2 relative rounded-[32px] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1000" 
              alt="Golf Ball" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          </div>

          {/* Product Cards */}
          <div className="space-y-4">
            <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-8 border border-white/10 relative group cursor-pointer hover:bg-forest/60 transition-all">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-lg font-medium">Putter Golfowy</h3>
                <div className="w-8 h-8 rounded-full bg-white text-forest flex items-center justify-center">
                  <Info size={16} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">$150</p>
                  <p className="text-[10px] tracking-widest uppercase opacity-60">Relieve Pains</p>
                </div>
                <img src="https://picsum.photos/seed/putter/200/200" alt="Putter" className="w-20 h-20 object-contain" referrerPolicy="no-referrer" />
              </div>
            </div>

            <div className="bg-forest/40 backdrop-blur-md rounded-[32px] p-8 border border-white/10 relative group cursor-pointer hover:bg-forest/60 transition-all">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-lg font-medium">Golf Balls</h3>
                <div className="w-8 h-8 rounded-full bg-white text-forest flex items-center justify-center">
                  <Info size={16} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">$40</p>
                  <p className="text-[10px] tracking-widest uppercase opacity-60">Relieve Plains</p>
                </div>
                <img src="https://picsum.photos/seed/balls/200/200" alt="Balls" className="w-20 h-20 object-contain" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
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
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <header className="mb-20">
        <h1 className="text-7xl serif mb-8">Johor Bahru <span className="italic">Golf</span></h1>
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
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] tracking-widest uppercase opacity-40">Visitor Rates (Foreigner)</span>
              </div>
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
                  <p className="text-[10px] tracking-widest uppercase opacity-40 mb-1">KRW Reference (Visitor)</p>
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

const Stay = () => {
  const [capacity, setCapacity] = useState<4 | 6 | 8>(4);
  
  // Sorted by rating (already sorted in constants, but ensuring here)
  const filteredUnits = STAY_UNITS
    .filter(u => u.capacity === capacity)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <header className="mb-20">
        <h1 className="text-7xl serif mb-8">KSL Residence <span className="italic">R9</span></h1>
        <p className="text-xl serif italic opacity-80 mb-12 max-w-2xl">
          "KSL 몰과 연결되어 라운딩 후 쇼핑·마사지·식사가 한 번에 가능! Residence R9 홈스테이 추천 리스트"
        </p>
        <div className="flex flex-wrap gap-4">
          {[4, 6, 8].map((c) => (
            <button 
              key={c}
              onClick={() => setCapacity(c as any)}
              className={cn(
                "pill-nav",
                capacity === c ? "active-pill" : "text-white/60"
              )}
            >
              {c} PERSONS ({c === 4 ? '2BR' : c === 6 ? '3BR' : '4BR/PENT'})
            </button>
          ))}
        </div>

        <div className="mt-12 p-8 glass rounded-[32px] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-xl serif mb-1">실시간 필터링 검색</h4>
            <p className="text-xs opacity-80">에어비앤비에서 현재 예약 가능한 모든 {capacity}인 숙소를 실시간으로 확인하세요.</p>
          </div>
          <a 
            href={`https://www.airbnb.com/s/KSL-D'Esplanade-Residence/homes?adults=${capacity}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {capacity}인 숙소 전체 보기
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredUnits.map((unit) => (
          <div key={unit.id} className="group">
            <a 
              href={unit.airbnbUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative border border-white/10"
            >
              <img src={unit.image} alt={unit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-lime text-forest rounded-full text-[10px] flex items-center gap-1 font-bold">
                <Star size={10} fill="currentColor" />
                {unit.rating.toFixed(2)}
              </div>
            </a>
            <h3 className="text-xl serif mb-2">{unit.title}</h3>
            <div className="flex justify-between items-center">
              <p className="text-lg serif italic opacity-90">RM {unit.pricePerNight} / night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pricing = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <header className="mb-16">
        <h1 className="text-7xl serif mb-8">Pricing <span className="italic">Table</span></h1>
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
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
      <header className="mb-20">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-7xl serif mb-4">예상 <span className="italic">견적</span></h1>
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
              <p>• 상세 예약 확정은 이메일 문의를 통해 진행해 주세요.</p>
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
