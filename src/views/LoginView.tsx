import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { loginWithGoogle } from '../services/authService';

const LoginView = () => {
  const navigate = useNavigate();

  const handleLogin = async (provider: string) => {
    try {
      if (provider === 'google') {
        await loginWithGoogle();
        navigate('/');
      } else {
        alert(`${provider} 로그인은 현재 준비 중입니다.`);
      }
    } catch (error: any) {
      alert(error.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a150a]">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lime/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-forest/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[40px] max-w-md w-full border border-white/10 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-lime/10 rounded-[25%] flex items-center justify-center mx-auto mb-6">
            <Play className="text-lime w-10 h-10 fill-lime ml-1" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 serif">야나골 골프클럽</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Member Login</p>
        </div>

        <div className="space-y-4">
          {/* Google Login */}
          <button 
            onClick={() => handleLogin('google')}
            className="w-full flex items-center justify-center gap-4 bg-white text-black h-14 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            구글 계정으로 로그인
          </button>

          {/* Kakao Login (Mock) */}
          <button 
            onClick={() => handleLogin('kakao')}
            className="w-full flex items-center justify-center gap-4 bg-[#FEE500] text-black h-14 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
          >
            <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" alt="Kakao" className="w-6 h-6 rounded-md" />
            카카오톡으로 로그인(준비중)
          </button>

          {/* Naver Login (Mock) */}
          <button 
            onClick={() => handleLogin('naver')}
            className="w-full flex items-center justify-center gap-4 bg-[#03C75A] text-white h-14 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
          >
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <span className="text-[#03C75A] font-black text-xs">N</span>
            </div>
            네이버 계정으로 로그인(준비중)
          </button>
        </div>

        <p className="mt-4 text-center text-white/40 text-[10px]">
          로그인 계정별로 회원계정이 생성됩니다.
        </p>

        <div className="mt-8 text-center">
          <p className="text-white/20 text-xs leading-relaxed italic">
            "조호바루의 완벽한 라운딩을 위한<br />야나골 골프 클럽 멤버십"
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginView;
