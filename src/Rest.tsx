import React, { useState } from 'react';
import { Map as MapIcon, ExternalLink, Clock, Phone, MapPin, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { REST_CATEGORIES, REST_DATA } from './restData';
import { SINGAPORE_DATA } from './restDataSingapore';
import { MALACCA_DATA } from './restDataMalacca';
import { SingaporeTransport, MalaccaTransport } from './TransportGuides';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const REGIONS = ['조호바루', '싱가폴', '말라카'];
const ALL_DATA = [...REST_DATA, ...SINGAPORE_DATA, ...MALACCA_DATA];

const getCategoriesForRegion = (region: string) => {
  if (region === '조호바루') return REST_CATEGORIES;
  return ['시내 이동방법(KSL몰 기준)', '쇼핑 & 라이프스타일', '관광 & 랜드마크', '미식 & 나이트 라이프'];
};

export const Rest = () => {
  const [activeRegion, setActiveRegion] = useState<string>(REGIONS[0]);
  const [activeCategory, setActiveCategory] = useState<string>(REST_CATEGORIES[0]);

  React.useEffect(() => {
    setActiveCategory(getCategoriesForRegion(activeRegion)[0]);
  }, [activeRegion]);

  const filteredRest = ALL_DATA.filter(item => {
    const itemRegion = item.region || '조호바루';
    return itemRegion === activeRegion && item.category === activeCategory;
  });

  return (
    <div className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <div className="flex items-center gap-6 mb-8">
          <h1 className="text-7xl serif">Rest <span className="italic text-lime"></span></h1>
        </div>
        <p className="text-xl serif italic opacity-80 mb-12 max-w-2xl">
          "라운딩 후의 완벽한 휴식을 위한 조호바루, 싱가폴, 말라카 추천 가이드"
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10 pb-4">
          {REGIONS.map((region) => (
            <button 
              key={region}
              onClick={() => setActiveRegion(region)}
              className={cn(
                "text-2xl serif transition-colors px-4 py-2 rounded-full",
                activeRegion === region ? "text-lime bg-white/5" : "text-white/40 hover:text-white/80"
              )}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {getCategoriesForRegion(activeRegion).map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "pill-nav",
                activeCategory === cat ? "active-pill" : "text-white/60"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {activeCategory === '시내 이동방법(KSL몰 기준)' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {activeRegion === '싱가폴' ? <SingaporeTransport /> : <MalaccaTransport />}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRest.map((item, index) => {
            const isImageCategory = ['쇼핑 & 라이프스타일', '관광 & 랜드마크', '미식 & 나이트 라이프'].includes(item.category);
          const displayImage = (item.photoUrl && (item.photoUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) || item.photoUrl.startsWith('/')))
            ? item.photoUrl
            : isImageCategory 
              ? `https://picsum.photos/seed/${item.id}/800/500` 
              : undefined;

          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-[32px] border border-white/10 hover:border-lime/30 transition-colors flex flex-col h-full overflow-hidden"
            >
              {displayImage && (
                <div className="w-full h-56 relative shrink-0 bg-white/5">
                  <img 
                    src={displayImage} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl serif font-medium">{item.name}</h3>
              {item.website && (
                <a 
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime hover:text-white transition-colors p-2 bg-white/5 rounded-full"
                  title="웹사이트 방문"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed flex-grow">
              {item.description}
            </p>

            {item.reason && (
              <div className="mb-6 p-4 bg-lime/10 rounded-2xl border border-lime/20">
                <p className="text-sm text-lime/90 leading-relaxed">
                  <span className="font-bold block mb-1">추천 사유:</span>
                  {item.reason}
                </p>
              </div>
            )}

            <div className="space-y-3 text-sm opacity-80 mt-auto">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-lime shrink-0 mt-0.5" />
                <div className="flex items-start gap-2">
                  <span>{item.address}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime hover:text-white transition-colors shrink-0 mt-0.5"
                    title="구글 지도에서 보기"
                  >
                    <MapIcon size={16} />
                  </a>
                </div>
              </div>
              
              {item.contact && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-lime shrink-0" />
                  <span>{item.contact}</span>
                </div>
              )}

              {item.hours && (
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-lime shrink-0" />
                  <span>{item.hours}</span>
                </div>
              )}

              {item.price && (
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/10">
                  <Tag size={16} className="text-lime shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    {item.price.foot && <p><span className="text-white/50 w-20 inline-block">발 마사지:</span> {item.price.foot}</p>}
                    {item.price.body && <p><span className="text-white/50 w-20 inline-block">전신 마사지:</span> {item.price.body}</p>}
                  </div>
                </div>
              )}

              {item.features && (
                <div className="mt-4 pt-4 border-t border-white/10 text-lime/80 italic">
                  * {item.features}
                </div>
              )}
            </div>
            </div>
          </motion.div>
        );
        })}
      </div>
      )}
    </div>
  );
};
