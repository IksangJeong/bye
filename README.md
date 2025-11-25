# 🎓 예진성은 롤링페이퍼

학생회장 예진과 부학생회장 성은을 위한 감성 롤링페이퍼 서비스

## ✨ 특징

- 📱 모바일 최적화 반응형 디자인
- 🎨 6가지 색상의 감성 포스트잇
- 🔄 랜덤 배치 및 회전 효과
- 🚀 Next.js 14 + TypeScript + TailwindCSS
- 💾 Vercel Postgres 데이터베이스
- 🔒 Rate limiting 및 입력 검증

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 환경변수 설정 (.env.local 생성)
cp .env.example .env.local
# Vercel Postgres 정보 입력

# 데이터베이스 초기화
npm install -D tsx
npx tsx src/lib/init-db.ts

# 개발 서버 실행
npm run dev
```

자세한 설정 가이드는 [SETUP.md](./SETUP.md)를 참고하세요.

## 📂 프로젝트 구조

```
src/
├── app/                 # Next.js App Router 페이지
│   ├── api/notes/      # API 엔드포인트
│   ├── yejin/          # 예진 롤링페이퍼
│   ├── sungeun/        # 성은 롤링페이퍼
│   └── write/          # 메시지 작성
├── components/          # React 컴포넌트
└── lib/                # 유틸리티 및 데이터베이스
```

## 🌐 배포

Vercel에 자동 배포됩니다:

1. GitHub에 푸시
2. Vercel에서 프로젝트 Import
3. 환경변수 설정
4. 배포 완료!

## 📝 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Vercel Postgres
- **Validation**: Zod
- **Drag & Drop**: @dnd-kit (선택적)

---

Made with ❤️ for Yejin & Sungeun
