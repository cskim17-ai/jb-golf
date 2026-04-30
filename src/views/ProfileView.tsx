import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Clock, FileText, ChevronRight, Save, LogOut, Camera, Trash2, Phone, Calendar, DollarSign, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db, storage } from '../firebase';
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { logout } from '../services/authService';

const ProfileView = () => {
  const { profile, user, loading } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setEmail(profile.email || '');
      setPhotoURL(profile.photoURL || '');
    }
  }, [profile]);

  useEffect(() => {
    if (profile?.uid) {
      const q = query(
        collection(db, 'quotes'),
        where('userId', '==', profile.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort client-side to avoid missing index error
        const sortedData = data.sort((a: any, b: any) => {
          const timeA = a.serverTimestamp?.toMillis?.() || (a.timestamp ? new Date(a.timestamp).getTime() : 0);
          const timeB = b.serverTimestamp?.toMillis?.() || (b.timestamp ? new Date(b.timestamp).getTime() : 0);
          return timeB - timeA;
        });

        setBookings(sortedData);
      }, (error) => {
        console.error("Profile bookings fetch error:", error);
      });

      return () => unsubscribe();
    }
  }, [profile]);

  const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
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
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const compressed = await compressImage(event.target.result as string);
        setPendingPhoto(compressed);
        setIsPhotoRemoved(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPendingPhoto(null);
    setPhotoURL('');
    setIsPhotoRemoved(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const isNameChanged = displayName !== (profile.displayName || '');
    const isEmailChanged = email !== (profile.email || '');
    const isPhotoChanged = pendingPhoto !== null || isPhotoRemoved;

    if (!isNameChanged && !isEmailChanged && !isPhotoChanged) {
      alert('변경사항이 없습니다.');
      return;
    }

    setIsSaving(true);
    try {
      let finalPhotoURL = photoURL;

      // Handle photo upload or removal in Storage
      const storageRef = ref(storage, `users/${profile.uid}`);

      if (isPhotoRemoved) {
        try {
          await deleteObject(storageRef);
        } catch (e) {
          // Ignore if file doesn't exist
        }
        finalPhotoURL = '';
      } else if (pendingPhoto) {
        await uploadString(storageRef, pendingPhoto, 'data_url');
        finalPhotoURL = await getDownloadURL(storageRef);
      }

      const userRef = doc(db, 'users', profile.uid);
      await updateDoc(userRef, {
        displayName,
        email,
        photoURL: finalPhotoURL,
      });

      let message = '프로필 정보가 저장되었습니다.';
      if (isNameChanged && isEmailChanged) {
        message = `회원명과 이메일 주소가 변경되어 저장되었습니다.`;
      } else if (isNameChanged) {
        message = `회원명이 "${displayName}"(으)로 변경되어 저장되었습니다.`;
      } else if (isEmailChanged) {
        message = `이메일 주소가 "${email}"(으)로 변경되어 저장되었습니다.`;
      }
      
      alert(message);
      setPendingPhoto(null);
      setPhotoURL(finalPhotoURL);
      setIsPhotoRemoved(false);
    } catch (error) {
      console.error('Update Profile Error:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const getAvatarFallback = () => {
    if (displayName) {
      return displayName.charAt(0).toUpperCase();
    }
    return <User size={48} className="text-lime" />;
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a150a]">
        <div className="w-12 h-12 border-4 border-lime/30 border-t-lime rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 max-w-5xl mx-auto">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lime text-3xl font-bold italic serif uppercase"
        >
          회원정보
        </motion.h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-[40px] border border-white/10 sticky top-40">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[40%] bg-lime/10 flex items-center justify-center overflow-hidden border-2 border-lime/20 shadow-2xl shadow-lime/10 transition-transform group-hover:scale-105">
                  {(pendingPhoto || photoURL) ? (
                    <img src={pendingPhoto || photoURL} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-4xl font-bold text-lime serif">
                      {getAvatarFallback()}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 flex gap-2">
                  {(pendingPhoto || photoURL) && (
                    <button 
                      type="button"
                      onClick={handleRemovePhoto}
                      className="w-10 h-10 bg-red-500/80 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-all border-4 border-[#1a2b1a]"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <label className="w-10 h-10 bg-lime text-forest rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-all border-4 border-[#1a2b1a]">
                    <Camera size={18} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase opacity-40 ml-2">회원명</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-lime/40" size={14} />
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:border-lime transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase opacity-40 ml-2">이메일 주소</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-lime/40" size={14} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:border-lime transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={isSaving}
                  className="w-full bg-lime text-forest py-4 rounded-2xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(163,230,53,0.3)] transition-all"
                >
                  {isSaving ? <div className="w-4 h-4 border-2 border-forest/30 border-t-forest rounded-full animate-spin" /> : <Save size={16} />}
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Inquiry History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-10 rounded-[40px] border border-white/10 min-h-[500px]">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl serif italic flex items-center gap-4">
                <div className="w-10 h-10 bg-lime text-forest rounded-full flex items-center justify-center shadow-lg shadow-lime/20">
                  <FileText size={20} />
                </div>
                문의 내역
              </h3>
              <p className="text-[10px] tracking-widest uppercase opacity-40">
                총 {bookings.length}건 요청
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 opacity-20">
                  <Clock size={32} />
                </div>
                <p className="text-white/30 italic">표시할 문의 내역이 없습니다.</p>
                <button 
                  onClick={() => navigate('/booking')}
                  className="mt-8 text-lime text-xs tracking-widest uppercase font-bold border-b border-lime pb-1 hover:text-white hover:border-white transition-all"
                >
                  견적문의
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="p-6 bg-white/5 rounded-[32px] border border-white/5 hover:border-white/20 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-white serif">{booking.golf_courses?.split('\n')[0]}</p>
                          {booking.golf_courses?.split('\n').length > 1 && (
                            <span className="text-xs text-lime/60 font-mono">+{booking.golf_courses.split('\n').length - 1}</span>
                          )}
                        </div>
                        <p className="text-xs text-white/40 tracking-widest uppercase">{booking.travel_period}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm whitespace-nowrap",
                          booking.status === '답변완료' ? "bg-white/10 text-white/40 border border-white/10" : "bg-lime/10 text-lime border border-lime/20"
                        )}>
                          {booking.status || '점수확인'}
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsModalOpen(true);
                          }}
                          className="px-4 py-1.5 bg-lime/10 text-lime rounded-full text-[10px] font-bold tracking-widest uppercase border border-lime/20 hover:bg-lime hover:text-forest transition-colors flex items-center gap-1"
                        >
                          보기
                          <ChevronRight size={10} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                      <div>
                        <p className="text-[9px] tracking-widest uppercase opacity-30 mb-1">총 금액</p>
                        <p className="text-sm font-bold text-lime">{booking.total_cost}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] tracking-widest uppercase opacity-30 mb-1">요청 날짜</p>
                        <p className="text-sm text-white/60 font-mono">
                          {booking.timestamp ? new Date(booking.timestamp).toLocaleDateString() : '-'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <p className="text-xs text-white/30 truncate max-w-[80%] italic">
                        {booking.message || 'No additional message'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-[#1a2b1a] border border-white/10 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Border Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-lime" />

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-lime">문의 상세 내역</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 bg-white/5 rounded-lg text-white/60 hover:text-white border border-white/10 text-[10px] font-bold transition-all"
                  >
                    닫기
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <DetailItem label="신청자명" value={selectedBooking.name || profile?.displayName || 'User'} />
                  <DetailItem 
                    label="문의일시" 
                    value={selectedBooking.timestamp ? new Date(selectedBooking.timestamp).toLocaleString('ko-KR') : '-'} 
                  />
                  <DetailItem label="연락처" value={selectedBooking.phone || '-'} />
                  <DetailItem label="이메일" value={selectedBooking.email || '-'} />
                  
                  <div className="md:col-span-2">
                    <DetailItem 
                      label="골프장" 
                      value={selectedBooking.golf_courses || '-'} 
                      isPre
                    />
                  </div>
                  
                  <DetailItem label="여행 기간" value={selectedBooking.travel_period || '-'} />
                  <DetailItem 
                    label="상태" 
                    value={selectedBooking.status || '접수확인'} 
                    highlight 
                  />
                  
                  {(() => {
                    const priceStr = selectedBooking.total_cost || '';
                    const parts = priceStr.split('/');
                    const rmPart = parts[0]?.trim().replace('RM', '').trim() || '0';
                    const krwPart = parts[1]?.trim().replace('₩', '').trim() || '0';
                    
                    return (
                      <>
                        <DetailItem label="비용(RM)" value={rmPart} />
                        <DetailItem label="비용(₩)" value={`${krwPart}원`} />
                      </>
                    );
                  })()}

                  <div className="md:col-span-2">
                    <DetailItem label="메시지" value={selectedBooking.message || '-'} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailItem = ({ label, value, highlight, isPre }: { label: string, value: string, highlight?: boolean, isPre?: boolean }) => (
  <div className="space-y-0.5">
    <p className="text-[10px] text-white/40">{label}</p>
    {isPre ? (
      <pre className="text-sm font-bold text-white whitespace-pre-wrap font-sans leading-snug">
        {value}
      </pre>
    ) : (
      <p className={cn(
        "text-base font-bold tracking-tight",
        highlight ? "text-lime" : "text-white"
      )}>
        {value}
      </p>
    )}
  </div>
);

const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(' ');
};

export default ProfileView;
