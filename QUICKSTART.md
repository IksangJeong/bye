# 🚀 빠른 시작 가이드

## 즉시 시작하기 (5분)

### 1. 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (데이터베이스 없이 UI만 확인)
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 2. Vercel Postgres 설정 (필수)

실제 메시지 기능을 사용하려면 데이터베이스가 필요합니다:

1. **Vercel 가입**: [vercel.com](https://vercel.com) (무료)
2. **데이터베이스 생성**:
   - Dashboard → Storage → Create Database
   - Postgres 선택 → 생성
3. **환경변수 복사**:
   - `.env.local` 탭에서 모든 환경변수 복사
   - 프로젝트 루트에 `.env.local` 파일 생성 후 붙여넣기

### 3. 데이터베이스 초기화

```bash
# 테이블 생성
npx tsx src/lib/init-db.ts
```

✅ "Database initialized successfully!" 메시지가 나오면 성공!

### 4. 다시 실행

```bash
npm run dev
```

이제 메시지 작성 기능이 정상 작동합니다! 🎉

## 📁 주요 파일 설명

### 페이지
- `src/app/page.tsx` - 홈 페이지 (예진/성은 선택)
- `src/app/yejin/page.tsx` - 예진 롤링페이퍼
- `src/app/sungeun/page.tsx` - 성은 롤링페이퍼
- `src/app/write/page.tsx` - 메시지 작성 페이지

### API
- `src/app/api/notes/route.ts` - 메시지 GET/POST API

### 컴포넌트
- `src/components/PostitBoard.tsx` - 포스트잇 보드 (기본)
- `src/components/Postit.tsx` - 포스트잇 카드
- `src/components/DraggableBoard.tsx` - 드래그 가능 보드 (선택)

### 데이터베이스
- `src/lib/db.ts` - DB 함수 (getNotes, createNote)
- `src/lib/init-db.ts` - DB 초기화 스크립트

## 🎨 커스터마이징

### 색상 변경

`src/lib/utils.ts` 파일에서 색상 수정:

```typescript
export const COLORS = {
  yellow: 'bg-yellow-200 hover:bg-yellow-300',
  pink: 'bg-pink-200 hover:bg-pink-300',
  // 원하는 색상 추가
}
```

### 드래그 앤 드롭 활성화

페이지 파일에서 컴포넌트 교체:

```typescript
// 기본 (드래그 불가)
import PostitBoard from '@/components/PostitBoard';

// 드래그 가능
import DraggableBoard from '@/components/DraggableBoard';
```

## 🚢 배포하기

### Vercel 자동 배포 (권장)

```bash
# 1. GitHub에 푸시
git add .
git commit -m "Initial commit"
git push origin main

# 2. Vercel에서 Import
# - vercel.com/dashboard → New Project
# - GitHub 저장소 선택
# - 환경변수 추가 (POSTGRES_* 변수들)
# - Deploy 클릭
```

자세한 내용: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📱 테스트

### 로컬 테스트
```bash
# 프로덕션 빌드 테스트
npm run build
npm start
```

### 모바일 테스트
```bash
# 로컬 네트워크에서 접근 가능하게 실행
npm run dev -- -H 0.0.0.0

# 모바일에서 접속: http://<your-ip>:3000
```

## ⚡ 자주 묻는 질문

**Q: 데이터베이스 없이 테스트할 수 있나요?**
A: UI는 볼 수 있지만, 메시지 작성 기능은 작동하지 않습니다. Vercel Postgres는 무료이므로 설정을 권장합니다.

**Q: 비용이 드나요?**
A: Vercel과 Vercel Postgres 모두 무료 플랜으로 충분합니다. (월 10,000회 요청, 256MB 데이터베이스)

**Q: 배포 후 수정하려면?**
A: 코드 수정 후 `git push`만 하면 Vercel이 자동으로 재배포합니다.

**Q: 예진/성은 외에 다른 사람 추가하려면?**
A:
1. `src/app/[이름]/page.tsx` 파일 생성
2. DB 스키마의 `target` enum에 이름 추가
3. 홈페이지에 링크 추가

## 📚 더 알아보기

- [SETUP.md](./SETUP.md) - 상세 설정 가이드
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
- [README.md](./README.md) - 프로젝트 개요

## 🆘 문제 해결

**빌드 에러**
```bash
npm run build
# 에러 확인 후 수정
```

**환경변수 에러**
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 모든 `POSTGRES_*` 변수가 설정되었는지 확인

**데이터베이스 연결 실패**
- Vercel 대시보드에서 최신 환경변수 다시 복사
- 데이터베이스가 활성 상태인지 확인

---

도움이 필요하면 [SETUP.md](./SETUP.md)나 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요!
