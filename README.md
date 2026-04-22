# 프로젝트 개발 명세서

## 1. 개요
본 프로젝트는 조호바루 골프 여행 정보를 제공하고 견적 문의를 관리하는 웹 애플리케이션입니다. 사용자에게 골프장 정보, 가격표, 맛집 정보, 갤러리를 제공하며, 관리자 페이지를 통해 데이터를 관리할 수 있습니다.

## 2. 기술 스택
- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: Firestore (Firebase)
- **Build Tool**: Vite
- **기타 라이브러리**:
  - `date-fns`: 날짜 및 시간 처리
  - `emailjs/browser`: 견적 문의 이메일 발송
  - `html2canvas`: 견적서 이미지 캡처
  - `lucide-react`: 아이콘 라이브러리

## 3. 시스템 구조
- **Client-Side**: React SPA (Single Page Application) 구조로 컴포넌트 기반 UI를 구성합니다.
- **Server-Side**: Express 서버가 API 엔드포인트(`/api/*`)를 제공하며, 개발 환경에서는 Vite 미들웨어를 통해 SPA를 서빙합니다.
- **Data Persistence**: 
  - 실시간 데이터는 Firebase Firestore를 통해 관리됩니다.
  - 일부 로컬 데이터는 `src/data/` 내 JSON 파일로 관리됩니다.

## 4. 주요 기능
- **골프장 정보 관리**: 관리자 페이지에서 골프장 가격, 카테고리 등을 설정.
- **가격표 필터링**: 사용자는 프리미엄, 가성비, 접근성 카테고리별로 골프장 가격을 필터링하여 조회 가능.
- **견적 문의**: 사용자가 원하는 골프장과 일정을 선택하여 견적을 문의하면 EmailJS를 통해 이메일 발송 및 Firestore에 저장.
- **갤러리**: 유튜브 영상 리스트를 통해 골프 여행 정보를 시각적으로 제공.

## 5. 개발 구조
- `src/App.tsx`: 메인 애플리케이션 로직 및 컴포넌트 정의.
- `src/constants.ts`: 골프장 데이터 모델 및 기본 상수 정의.
- `src/galleryData.ts`: 갤러리 유튜브 영상 데이터 관리.
- `server.ts`: API 서버 및 Vite 미들웨어 설정.
- `firestore.rules`: Firestore 보안 규칙 정의.
