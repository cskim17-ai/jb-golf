import React from 'react';

export const SingaporeTransport = () => {
  return (
    <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 text-white/80 leading-relaxed space-y-8">
      <div>
        <h3 className="text-3xl serif text-lime mb-4">조호바루 KSL 시티 몰 ➔ 싱가포르 시내 이동 방법</h3>
        <p className="text-lg">조호바루 KSL 시티 몰에서 싱가포르 시내로 이동하는 방법은 크게 전용 차량(그랩/사설 픽업) 이용과 대중교통 이용으로 나뉩니다. 두 국가를 넘나드는 여정이므로 국경 검문소(CIQ)에서의 출입국 절차 시간이 핵심입니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-lime text-forest w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
          전용 차량 및 차로 이동 (그랩 / 사설 픽업 / 크로스보더 택시)
        </h4>
        <p className="opacity-90 pl-11">가장 편안한 방법이지만 비용이 높고 출퇴근 시간에는 정체가 심할 수 있습니다.</p>
        <ul className="list-disc pl-16 space-y-3 opacity-80">
          <li><strong className="text-white">이동 경로:</strong> KSL 몰 → 우드랜즈 체크포인트(Woodlands Checkpoint) → 싱가포르 시내</li>
          <li><strong className="text-white">이용 방법:</strong>
            <ul className="list-[circle] pl-6 mt-2 space-y-2">
              <li><strong className="text-lime/90">사설 전용 차량 (Private Car Transfer):</strong> 가장 추천하는 방식입니다. 차에서 내리지 않고 국경을 통과할 수 있어 짐이 많거나 일행이 있을 때 유리합니다. 미리 예약이 필요합니다.</li>
              <li><strong className="text-lime/90">크로스보더 택시 (Yellow Taxi):</strong> 조호바루 라킨 터미널(Larkin)이나 센트럴(JB Sentral)에서 싱가포르 퀸 스트리트(Queen Street)까지 운행하는 전용 택시입니다.</li>
              <li><strong className="text-lime/90">일반 그랩(Grab):</strong> 일반 조호바루 그랩은 싱가포르 국경을 넘을 수 없습니다. 국경(JB Sentral)까지만 이동 후 내려서 걸어서 통과해야 합니다.</li>
            </ul>
          </li>
          <li><strong className="text-white">예상 비용:</strong> 사설 전용차 편도 약 70,000원 ~ 100,000원 (차량당) / 크로스보더 택시 1인당 약 15,000원 ~ 20,000원 (합승 시)</li>
          <li><strong className="text-white">소요 시간:</strong> 1시간 ~ 2시간 (교통 체증 및 입국 심사 대기 시간에 따라 유동적)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-lime text-forest w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
          대중교통 이용 (버스 및 도보)
        </h4>
        <p className="opacity-90 pl-11">가장 경제적인 방법이며, 현지인들이 가장 많이 이용하는 방식입니다.</p>
        <ul className="list-disc pl-16 space-y-3 opacity-80">
          <li><strong className="text-white">이동 단계:</strong>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li><strong>KSL 몰 → JB Sentral (국경 검문소):</strong> KSL 몰 앞에서 S1번 버스를 타거나 그랩을 타고 'JB Sentral'로 이동합니다. (그랩 비 약 2,000원~4,000원)</li>
              <li><strong>말레이시아 출국 심사:</strong> JB Sentral 건물 내 'CIQ' 이정표를 따라가 출국 심사를 받습니다.</li>
              <li><strong>국경 버스 탑승:</strong> 심사 후 에스컬레이터를 타고 내려가 싱가포르로 넘어가는 버스(160, 170, 950번 또는 Causeway Link CW 버스)를 탑승합니다. (비용 약 1,000원 내외)</li>
              <li><strong>싱가포르 입국 심사:</strong> 버스가 'Woodlands Checkpoint'에 도착하면 모두 내려서 입국 심사를 받습니다. (짐을 모두 들고 내려야 함)</li>
              <li><strong>싱가포르 시내 이동:</strong> 심사 통과 후 다시 버스 승강장으로 내려가 아까 탔던 번호의 버스를 다시 타거나, MRT 역으로 가는 버스를 이용해 싱가포르 시내로 진입합니다.</li>
            </ol>
          </li>
          <li><strong className="text-white">예상 비용:</strong> 1인당 총 약 5,000원 이내</li>
          <li><strong className="text-white">소요 시간:</strong> 1시간 30분 ~ 2시간 30분 (대기 줄이 길 경우 더 소요될 수 있음)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-lime text-forest w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
          기차 이용 (셔틀 테브라우 - KTM Shuttle Tebrau)
        </h4>
        <p className="opacity-90 pl-11">미리 예약만 가능하다면 국경을 넘는 가장 빠른 방법입니다.</p>
        <ul className="list-disc pl-16 space-y-3 opacity-80">
          <li><strong className="text-white">이동 경로:</strong> JB Sentral 역 → 싱가포르 Woodlands Train Checkpoint (5분 소요)</li>
          <li><strong className="text-white">이용 방법:</strong> 'KTM 모바일' 앱을 통해 미리 승차권을 예매해야 합니다. (인기가 많아 금방 매진됩니다.)</li>
          <li><strong className="text-white">이후 이동:</strong> 싱가포르 우드랜즈 기차 검문소 도착 후 시내 버스를 타고 MRT 역(Marsiling 또는 Woodlands 역)으로 이동하여 싱가포르 지하철을 이용합니다.</li>
          <li><strong className="text-white">예상 비용:</strong> 편도 약 1,500원 (5링깃)</li>
          <li><strong className="text-white">소요 시간:</strong> 순수 기차 시간은 5분이나, 기차역까지 이동 및 싱가포르 내 이동 포함 총 1시간 내외</li>
        </ul>
      </div>

      <div className="mt-8 p-6 md:p-8 bg-lime/10 rounded-2xl border border-lime/20">
        <h4 className="text-xl font-bold text-lime mb-4 flex items-center gap-2">
          💡 요약 및 추천
        </h4>
        <ul className="list-disc pl-6 space-y-3 text-lime/90">
          <li><strong className="text-lime">가장 편한 방법: 사설 전용 차량.</strong> 짐이 많고 골프백 등이 있다면 차에서 내리지 않는 이 방법이 가장 좋습니다.</li>
          <li><strong className="text-lime">가장 빠른 방법: KTM 기차.</strong> 단, 일주일 전쯤 미리 예매가 필수입니다.</li>
          <li><strong className="text-lime">가장 저렴한 방법: 버스.</strong> KSL 몰에서 JB Sentral까지 그랩으로 이동 후 버스로 국경을 넘는 것이 일반적입니다.</li>
        </ul>
        <div className="mt-6 pt-6 border-t border-lime/20">
          <p className="text-sm text-lime/80 leading-relaxed">
            <strong className="text-lime">주의사항:</strong> 싱가포르 입국 전 반드시 온라인 입국 카드(SG Arrival Card)를 작성해야 하며, 여권 유효기간이 6개월 이상 남아있어야 합니다. 싱가포르 시내로 들어가는 대중교통 이용 시 트래블로그나 컨택리스 카드를 준비하시면 편리합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export const MalaccaTransport = () => {
  return (
    <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 text-white/80 leading-relaxed space-y-8">
      <div>
        <h3 className="text-3xl serif text-lime mb-4">조호바루 KSL 시티 몰 ➔ 말라카 시내 이동 방법</h3>
        <p className="text-lg">조호바루 KSL 시티 몰에서 역사 도시 말라카(Melaka)까지는 약 220km 거리로, 차량으로 약 2시간 30분에서 3시간 정도 소요됩니다. 골프 라운딩 후 이동하시기에 가장 적합한 방법들을 정리해 드립니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-lime text-forest w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
          전용 차량 및 차로 이동 (그랩 / 사설 픽업)
        </h4>
        <p className="opacity-90 pl-11">가장 편안하고 문 앞까지(Door-to-Door) 이동할 수 있는 방법입니다. 일행이 3~4명이라면 비용 대비 효율과 피로도 면에서 가장 추천합니다.</p>
        <ul className="list-disc pl-16 space-y-3 opacity-80">
          <li><strong className="text-white">이용 방법:</strong>
            <ul className="list-[circle] pl-6 mt-2 space-y-2">
              <li><strong className="text-lime/90">그랩(Grab):</strong> KSL 몰에서 그랩 앱을 통해 'Melaka' 또는 구체적인 호텔명을 목적지로 설정합니다. 장거리이므로 드라이버가 배차를 수락하는지 확인이 필요합니다.</li>
              <li><strong className="text-lime/90">사설 전용차 (Private Transfer):</strong> 미리 예약하는 픽업 서비스입니다. 조호바루 현지 여행사나 픽업 업체를 통해 예약하며, 정해진 시간에 KSL 몰 로비에서 탑승합니다.</li>
            </ul>
          </li>
          <li><strong className="text-white">예상 비용:</strong> 그랩 약 250~350링깃 (한화 약 75,000원 ~ 105,000원) - 톨게이트 비용 별도 협의 필요 / 사설 전용차 약 400~500링깃 (한화 약 120,000원 ~ 150,000원) - 7인승 벤 기준</li>
          <li><strong className="text-white">소요 시간:</strong> 약 2시간 30분 ~ 3시간 (고속도로 정체 상황에 따라 변동)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-lime text-forest w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
          대중교통 이용 (시외버스)
        </h4>
        <p className="opacity-90 pl-11">가장 경제적인 방법이며, 말레이시아의 시외버스는 좌석이 넓고 쾌적하여 가성비가 매우 높습니다.</p>
        <ul className="list-disc pl-16 space-y-3 opacity-80">
          <li><strong className="text-white">이동 단계:</strong>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li><strong>KSL 몰 → 라킨 센트럴(Larkin Sentral):</strong> KSL 몰에서 그랩을 타고 조호바루 시외버스 터미널인 '라킨 센트럴'로 이동합니다. (그랩비 약 10~15링깃, 15분 소요)</li>
              <li><strong>티켓 구매:</strong> 터미널 내 중앙 티켓 창구에서 말라카행(Melaka Sentral) 티켓을 구매하거나 'Easybook' 앱으로 미리 예매합니다. (KKKL, Causeway Link 등의 우등 버스 추천)</li>
              <li><strong>말라카 도착:</strong> '말라카 센트럴(Melaka Sentral)' 터미널에 하차합니다.</li>
              <li><strong>터미널 → 말라카 시내:</strong> 말라카 센트럴에서 다시 그랩을 타고 존커 스트리트 등 시내 숙소로 이동합니다. (그랩비 약 10~15링깃, 15분 소요)</li>
            </ol>
          </li>
          <li><strong className="text-white">예상 비용:</strong> 버스비 1인당 약 20~25링깃 (한화 약 6,000원 ~ 7,500원) / 그랩비 포함 총비용 1인 기준 약 15,000원 내외</li>
          <li><strong className="text-white">소요 시간:</strong> 총 약 4시간 ~ 4시간 30분 (버스 대기 및 시내 이동 시간 포함)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="bg-lime text-forest w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
          이동 방법 비교 및 추천
        </h4>
        <div className="overflow-x-auto mt-4 rounded-xl border border-white/10 ml-11">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-white/5">
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 font-bold text-white">구분</th>
                <th className="py-4 px-6 font-bold text-lime">전용 차량 (추천)</th>
                <th className="py-4 px-6 font-bold text-white">대중교통 (버스)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-bold text-white">편의성</td>
                <td className="py-4 px-6">매우 높음 (숙소 바로 연결)</td>
                <td className="py-4 px-6">보통 (터미널 이동 필요)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-bold text-white">비용</td>
                <td className="py-4 px-6">높음 (인원이 많을수록 유리)</td>
                <td className="py-4 px-6">매우 저렴</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-bold text-white">짐 보관</td>
                <td className="py-4 px-6">편리 (골프백 적재 가능)</td>
                <td className="py-4 px-6">번거로움 (터미널 이동 시 불편)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-bold text-white">자유도</td>
                <td className="py-4 px-6">휴게소 이용 등 자유로움</td>
                <td className="py-4 px-6">정해진 노선대로 이동</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 p-6 md:p-8 bg-lime/10 rounded-2xl border border-lime/20">
        <h4 className="text-xl font-bold text-lime mb-4 flex items-center gap-2">
          💡 추천 팁
        </h4>
        <ul className="list-disc pl-6 space-y-3 text-lime/90">
          <li><strong className="text-lime">골프백이 있는 경우:</strong> 무조건 <strong>전용 차량</strong>을 이용하시는 것이 정신 건강과 체력 보존에 좋습니다. 버스는 골프백을 들고 터미널을 오가기가 매우 힘듭니다.</li>
          <li><strong className="text-lime">비용 절감을 원하는 경우:</strong> 우등 버스(VIP Bus)는 좌석이 2-1 배열로 되어 있어 매우 넓고 편안합니다. <strong>KKKL</strong>이나 <strong>Causeway Link</strong> 버스를 선택하시면 만족도가 높습니다.</li>
        </ul>
        <div className="mt-6 pt-6 border-t border-lime/20">
          <p className="text-sm text-lime/80 leading-relaxed">
            <strong className="text-lime">주의사항:</strong> 말라카 시내는 주말(금~일) 저녁에 존커 스트리트 야시장으로 인해 차량 진입이 매우 어렵습니다. 주말에 방문하신다면 시내 진입 시 시간이 더 걸릴 수 있음을 참고하세요.
          </p>
        </div>
      </div>
    </div>
  );
};
