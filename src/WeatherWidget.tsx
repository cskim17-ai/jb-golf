import React, { useState, useEffect, useCallback } from 'react';
import { CloudSun, RefreshCw, Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, Umbrella } from 'lucide-react';
import { format } from 'date-fns';

const DEFAULT_SEOUL = { 
  name: '서울', 
  lat: 37.5666, 
  lon: 126.9826,
  address: '서울 중구 을지로 1가',
  naverLink: 'https://weather.naver.com/today/09140104'
};

const JOHOR = { 
  name: '조호바루', 
  lat: 1.4827, 
  lon: 103.7628,
  address: "KSL City Mall",
  naverLink: 'https://weather.naver.com/today/WDMAS00014'
};

const DEFAULT_CITIES = [DEFAULT_SEOUL, JOHOR];

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [geoErrorMsg, setGeoErrorMsg] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setGeoErrorMsg(null);
    try {
      let currentCities = [...DEFAULT_CITIES];
      
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { 
            enableHighAccuracy: false,
            timeout: 15000, // Increased timeout to 15 seconds to allow user to click 'Allow'
            maximumAge: 300000 
          });
        });
        
        const { latitude, longitude } = position.coords;
        
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ko`);
        const geoData = await geoRes.json();
        
        const locationName = geoData.city || geoData.locality || '현재 위치';
        const address = geoData.principalSubdivision ? `${geoData.principalSubdivision} ${locationName}` : locationName;
        
        currentCities[0] = {
          name: locationName,
          lat: latitude,
          lon: longitude,
          address: address,
          naverLink: `https://search.naver.com/search.naver?query=${encodeURIComponent(locationName + ' 날씨')}`
        };
      } catch (geoError: any) {
        console.warn('Geolocation failed or denied, using default Seoul location.', geoError);
        if (geoError.code === 1) {
          setGeoErrorMsg('위치 정보 제공이 거부되었습니다. 기본 위치(서울)를 표시합니다.');
        } else if (geoError.code === 2) {
          setGeoErrorMsg('위치 정보를 사용할 수 없습니다. 기본 위치(서울)를 표시합니다.');
        } else if (geoError.code === 3) {
          setGeoErrorMsg('위치 정보 요청 시간이 초과되었습니다. 기본 위치(서울)를 표시합니다.');
        } else {
          setGeoErrorMsg('위치 정보를 가져오는 중 오류가 발생했습니다. 기본 위치(서울)를 표시합니다.');
        }
      }

      const data = await Promise.all(currentCities.map(async (city) => {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto`
        );
        const json = await response.json();
        
        // Weather code mapping
        const code = json.current.weather_code;
        let description = '맑음';
        let Icon = Sun;
        if (code > 0 && code <= 3) { description = '구름 조금'; Icon = CloudSun; }
        else if (code > 3 && code <= 48) { description = '흐림'; Icon = Cloud; }
        else if (code > 48 && code <= 67) { description = '비'; Icon = CloudRain; }
        else if (code > 67) { description = '눈/비'; Icon = Wind; }

        return { name: city.name, address: city.address, naverLink: city.naverLink, ...json, description, Icon };
      }));
      setWeatherData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return (
    <div className="glass p-8 rounded-[32px] border border-white/10 mb-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3"><CloudSun className="text-lime" /> 실시간 날씨 정보</h3>
          {geoErrorMsg && <p className="text-sm text-red-400 mt-2">{geoErrorMsg}</p>}
        </div>
        <div className="text-right">
          {lastUpdated && <p className="text-sm opacity-60">업데이트: {format(lastUpdated, 'HH:mm:ss')}</p>}
          <p className="text-xs opacity-40 mt-1 mb-2">제공: Open-Meteo</p>
          <p className="text-[10px] opacity-40 font-bold mt-1"></p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><RefreshCw className="animate-spin text-lime" size={48} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weatherData.map((w) => (
            <div key={w.name} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold text-lime flex items-center gap-2">
                  {w.name}
                  <a 
                    href={w.naverLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center w-5 h-5 bg-[#03C75A] rounded-sm text-white hover:opacity-80 transition-opacity" 
                    title="네이버 날씨"
                  >
                    <span className="text-[12px] font-black leading-none" style={{ fontFamily: 'sans-serif' }}>N</span>
                  </a>
                </h4>
                <p className="text-[10px] opacity-50 text-right max-w-[60%] leading-tight mt-1">{w.name}: {w.address}</p>
              </div>
              <div className="flex items-center gap-6 mb-6">
                <w.Icon size={48} className="text-lime" />
                <div>
                  <p className="text-5xl font-bold">{w.current.temperature_2m}°C</p>
                  <p className="text-lg font-medium">{w.description}</p>
                </div>
                <div className="text-sm opacity-80 space-y-1">
                  <p className="flex items-center gap-2"><Thermometer size={16}/> 체감: {w.current.apparent_temperature}°C</p>
                  <p className="flex items-center gap-2"><Droplets size={16}/> 습도: {w.current.relative_humidity_2m}%</p>
                  <p className="flex items-center gap-2"><Umbrella size={16}/> 강수확률: {w.current.precipitation_probability}%</p>
                  <p className="flex items-center gap-2"><Wind size={16}/> 풍속: {w.current.wind_speed_10m}m/s</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs opacity-50 uppercase tracking-wider">주간 예보 (최고기온 / 강수확률)</p>
                <div className="flex justify-between text-xs">
                  {w.daily.time.map((date: string, i: number) => (
                    <div key={date} className="text-center">
                      <p className="opacity-60">{format(new Date(date), 'MM/dd')}</p>
                      <p className="font-bold">{w.daily.temperature_2m_max[i]}°</p>
                      <p className="text-[10px] text-lime">{w.daily.precipitation_probability_max[i]}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
