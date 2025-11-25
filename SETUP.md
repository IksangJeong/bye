# 롤링페이퍼 서비스 설정 가이드

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. Vercel Postgres 설정

1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. Storage 탭 → "Create Database" 클릭
3. "Postgres" 선택 후 데이터베이스 생성
4. 생성 완료 후 ".env.local" 탭에서 환경변수 복사

### 3. 환경변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 Vercel에서 복사한 환경변수 붙여넣기:

```bash
# .env.local
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NO_SSL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

### 4. 데이터베이스 초기화

```bash
npm install -D tsx
npx tsx src/lib/init-db.ts
```

성공 메시지가 출력되면 준비 완료!

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📂 프로젝트 구조

```
bye/
├── src/
│   ├── app/
│   │   ├── api/notes/          # API 엔드포인트
│   │   ├── yejin/              # 예진 롤링페이퍼 페이지
│   │   ├── sungeun/            # 성은 롤링페이퍼 페이지
│   │   ├── write/              # 메시지 작성 페이지
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 홈페이지
│   │   └── globals.css         # 전역 스타일
│   ├── components/
│   │   ├── Postit.tsx          # 포스트잇 컴포넌트
│   │   ├── PostitBoard.tsx     # 포스트잇 보드 (기본)
│   │   ├── DraggablePostit.tsx # 드래그 가능 포스트잇
│   │   └── DraggableBoard.tsx  # 드래그 가능 보드 (선택)
│   └── lib/
│       ├── db.ts               # 데이터베이스 함수
│       ├── types.ts            # TypeScript 타입
│       ├── utils.ts            # 유틸리티 함수
│       └── init-db.ts          # DB 초기화 스크립트
├── .env.local                  # 환경변수 (gitignore됨)
├── .env.example                # 환경변수 템플릿
└── package.json
```

## 🎨 기능

### ✅ 구현된 기능
- [x] 예진/성은 개별 롤링페이퍼 페이지
- [x] 포스트잇 작성 및 색상 선택 (6가지 색상)
- [x] 랜덤 위치 및 회전 효과
- [x] 모바일 최적화 반응형 디자인
- [x] API rate limiting (IP당 분당 5회)
- [x] 입력값 검증 (Zod)
- [x] 로딩 상태 및 에러 처리

### 🔧 선택적 기능
- [ ] 드래그 앤 드롭 (DraggableBoard 컴포넌트 사용)
- [ ] 관리자 모드
- [ ] 포스트잇 삭제 기능

## 🚢 배포 (Vercel)

### 방법 1: GitHub 연동 (권장)

1. GitHub에 코드 푸시
2. [Vercel 대시보드](https://vercel.com/dashboard)에서 "Import Project"
3. GitHub 저장소 선택
4. 환경변수 설정 (Vercel 대시보드에서 추가)
5. Deploy 클릭

Vercel이 자동으로 빌드 및 배포합니다.

### 방법 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

### 환경변수 설정 (Vercel)

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에서:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- 등등... (모든 Postgres 환경변수)

추가 후 재배포하면 적용됩니다.

## 🛠 개발 팁

### 드래그 앤 드롭 활성화

`src/app/yejin/page.tsx`와 `src/app/sungeun/page.tsx`에서:

```tsx
// 기본 버전
import PostitBoard from '@/components/PostitBoard';

// 드래그 가능 버전으로 변경
import DraggableBoard from '@/components/DraggableBoard';

// 컴포넌트 교체
<DraggableBoard target="yejin" />
```

### 데이터베이스 확인

Vercel 대시보드 → Storage → 데이터베이스 선택 → "Data" 탭에서 SQL 쿼리 실행:

```sql
SELECT * FROM notes ORDER BY created_at DESC;
```

### 로컬 개발 시 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 개발 중에는 `npm run dev`로 실행
- 프로덕션 빌드 테스트: `npm run build && npm start`

## 📱 모바일 테스트

```bash
# 로컬 네트워크에서 접속 가능하게 실행
npm run dev -- -H 0.0.0.0
```

그 후 모바일에서 `http://<your-ip>:3000` 접속

## 🎯 다음 단계

1. ✅ 로컬에서 테스트
2. ✅ Vercel에 배포
3. ✅ 친구들에게 링크 공유
4. 🎉 예진/성은에게 감사 메시지 전달!

## 📞 문제 해결

**데이터베이스 연결 오류**
- `.env.local` 파일이 올바른 위치에 있는지 확인
- 환경변수가 정확한지 Vercel 대시보드에서 재확인

**빌드 오류**
- `npm run build` 실행 후 오류 메시지 확인
- TypeScript 오류는 `npx tsc --noEmit`으로 확인

**배포 후 500 에러**
- Vercel 로그 확인 (Deployments → 로그 보기)
- 환경변수가 프로덕션 환경에 설정되어 있는지 확인
