import React from 'react';
import { MapIcon, Star, Info, CheckCircle, Plane, ShieldCheck, FileText, Briefcase } from 'lucide-react';

const TravelGuide = () => {
  return (
    <div className="pt-20 pb-24 px-6 max-w-6xl mx-auto space-y-16">
      <h2 className="text-4xl md:text-5xl font-bold serif text-center mb-16">조호바루 골프 여행 가이드</h2>

      <section className="glass p-8 rounded-[32px] border border-white/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Briefcase className="text-lime" /> 1. 골프 장비 및 필수 준비물</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <li>• <b>골프채 세트:</b> 드라이버, 우드, 유틸리티, 아이언, 퍼터 등 본인의 클럽 구성 확인.</li>
          <li>• <b>골프백 & 항공커버:</b> 하드케이스 또는 두툼한 쿠션이 있는 항공커버 권장.</li>
          <li>• <b>골프공:</b> 해저드가 많으므로 넉넉히(2~3더즌) 준비.</li>
          <li>• <b>복장:</b> 카라 상의(필수), 반바지, 여분 양말, 모자, 팔토시.</li>
          <li>• <b>기타:</b> 장갑, 티, 거리측정기(충전기), 네임택(영문).</li>
          <li>• <b>여름용품:</b> 선크림(SPF 50+), 우산, 벌레 기피제, 얼음주머니.</li>
        </ul>
      </section>

      <section className="glass p-8 rounded-[32px] border border-white/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ShieldCheck className="text-lime" /> 2. 골프백 파손 방지 패킹 노하우</h3>
        <ul className="space-y-3 text-white/80">
          <li>• <b>클럽 헤드 보호:</b> 헤드 커버 위에 에어캡(뾱뾱이) 또는 수건으로 두툼하게 감싸기.</li>
          <li>• <b>얼라이먼트 스틱 활용:</b> 전용 '백본' 장비를 넣어 위에서 가해지는 압력을 분산.</li>
          <li>• <b>빈 공간 채우기:</b> 골프 의류나 양말을 채워 클럽 흔들림 고정.</li>
          <li>• <b>아이언 역방향 수납:</b> 헤드 무거운 쪽을 아래로 향하게 수납.</li>
        </ul>
      </section>

      <section className="glass p-8 rounded-[32px] border border-white/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Plane className="text-lime" /> 3. 인천공항 출국 및 수하물 절차</h3>
        <ul className="space-y-3 text-white/80">
          <li>• <b>스마트패스(SmartPass):</b> 앱 등록으로 보안검색대 빠르게 통과.</li>
          <li>• <b>체크인:</b> 대형 수하물 안내를 위해 유인 카운터 이용 권장.</li>
          <li>• <b>수하물 규정:</b> 저가항공(LCC)은 스포츠 수하물 옵션 확인 필수.</li>
          <li>• <b>태깅:</b> 대형 수하물(Oversized Baggage) 카운터에 직접 가져다 놓기.</li>
        </ul>
      </section>

      <section className="glass p-8 rounded-[32px] border border-white/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><FileText className="text-lime" /> 5. 말레이시아 입국 절차</h3>
        <ul className="space-y-3 text-white/80">
          <li>• <b>MDAC:</b> 도착 전 3일 이내 온라인 제출 필수.</li>
          <li>• <b>여권:</b> 유효기간 6개월 이상 필수.</li>
          <li>• <b>자동출입국심사:</b> 최초 입국 시 지문 등록 후, 두 번째부터 자동게이트 이용.</li>
        </ul>
      </section>

      <section className="glass p-8 rounded-[32px] border border-white/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Plane className="text-lime" /> 6. 인천에서 조호바루 이동 방법 비교</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80">
          <div>
            <h4 className="font-bold mb-2 text-lime">1) 싱가포르 창이공항 경유</h4>
            <p className="text-sm">직항(6시간) 후 프라이빗 차량 이동(1.5~2시간). 항공편 선택이 자유롭고 쇼핑 병행 가능하나, 국경 교통체증 가능성 있음.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-lime">2) 조호바루 세나이 공항 경유</h4>
            <p className="text-sm">경유 항공(9~12시간) 후 그랩/택시 이동(40분). 국경 통과 번거로움이 없으나, 직항 노선이 드묾.</p>
          </div>
        </div>
      </section>

      <section className="glass p-8 rounded-[32px] border border-white/10">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Briefcase className="text-lime" /> 7. 싱가포르-조호바루 프라이빗 픽업 예약</h3>
        <ul className="space-y-3 text-white/80 text-sm">
          <li>• <b>예약처:</b> 클룩/마이리얼트립, 현지 한인 업체(카카오톡), 전문 에이전시(SG2JB 등).</li>
          <li>• <b>비용:</b> 일반 MPV(약 11~13만원), 대형 스타렉스(약 14~17만원).</li>
          <li>• <b>필수 정보:</b> 항공편명, 도착 시간, 인원수, 골프백 개수, 목적지.</li>
          <li>• <b>이용 팁:</b> 국경 심사 시 차에서 내리지 않고 여권 전달 가능하여 골프백 이동에 최적.</li>
        </ul>
      </section>
    </div>
  );
};

export default TravelGuide;
