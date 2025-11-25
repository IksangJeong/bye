# 배포 가이드

## 🚀 Vercel 배포 단계별 가이드

### 1단계: Vercel Postgres 데이터베이스 생성

1. [Vercel 대시보드](https://vercel.com/dashboard) 로그인
2. **Storage** 탭 클릭
3. **Create Database** 버튼 클릭
4. **Postgres** 선택
5. 데이터베이스 이름 입력 (예: `rolling-paper-db`)
6. Region: **Seoul (icn1)** 선택 (한국 사용자에게 최적)
7. **Create** 클릭

### 2단계: 환경변수 복사

데이터베이스가 생성되면:

1. **.env.local** 탭 클릭
2. **Show secret** 클릭하여 환경변수 확인
3. 모든 `POSTGRES_*` 환경변수 복사

### 3단계: GitHub 저장소 연결

```bash
# Git에 코드 푸시
git add .
git commit -m "Initial commit: Rolling paper service"
git push origin main
```

### 4단계: Vercel 프로젝트 생성

1. [Vercel 대시보드](https://vercel.com/dashboard)에서 **Add New** → **Project**
2. GitHub 저장소 선택 (`bye`)
3. **Import** 클릭

### 5단계: 환경변수 설정

**Environment Variables** 섹션에서:

1. 2단계에서 복사한 모든 `POSTGRES_*` 환경변수 추가:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NO_SSL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

2. 각 환경변수를 **Production**, **Preview**, **Development** 모두에 체크

### 6단계: 배포 시작

1. **Deploy** 버튼 클릭
2. 빌드 로그 확인 (약 1-2분 소요)
3. ✅ 배포 완료!

### 7단계: 데이터베이스 초기화

배포가 완료된 후, 데이터베이스 테이블 생성:

**방법 1: Vercel SQL 쿼리 (권장)**

1. Vercel 대시보드 → **Storage** → 생성한 데이터베이스 선택
2. **Data** 탭 → **Query** 클릭
3. 다음 SQL 실행:

```sql
CREATE TABLE IF NOT EXISTS notes (
  id BIGSERIAL PRIMARY KEY,
  target VARCHAR(20) NOT NULL,
  author VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  color VARCHAR(20) NOT NULL,
  pos_x INTEGER DEFAULT 0,
  pos_y INTEGER DEFAULT 0,
  rotation INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**방법 2: 로컬에서 실행**

```bash
# .env.local에 프로덕션 환경변수 설정 후
npx tsx src/lib/init-db.ts
```

### 8단계: 테스트

1. 배포된 URL 접속 (예: `https://bye-xxx.vercel.app`)
2. 메시지 작성 테스트
3. 예진/성은 페이지에서 메시지 확인

## 🔧 추가 설정

### 커스텀 도메인 연결 (선택)

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 도메인 입력 (예: `rolling-paper.com`)
3. DNS 설정에서 CNAME 레코드 추가
4. 자동 HTTPS 인증서 발급 (무료)

### 자동 배포 설정

- `main` 브랜치에 푸시하면 자동 배포
- Pull Request 생성 시 Preview 배포 자동 생성
- 배포 상태는 GitHub PR에 자동 표시

### 환경변수 수정

1. Vercel 프로젝트 → **Settings** → **Environment Variables**
2. 변수 수정 후 **Save**
3. **Redeploy** 필요 (자동으로 진행됨)

## 📊 모니터링

### 배포 로그 확인

1. Vercel 대시보드 → 프로젝트 선택
2. **Deployments** 탭
3. 특정 배포 클릭 → **Function Logs** 확인

### 데이터베이스 확인

1. Vercel 대시보드 → **Storage** → 데이터베이스 선택
2. **Data** 탭에서 SQL 쿼리 실행:

```sql
-- 모든 메시지 조회
SELECT * FROM notes ORDER BY created_at DESC;

-- 메시지 통계
SELECT target, COUNT(*) as count FROM notes GROUP BY target;
```

### 성능 모니터링

1. Vercel 대시보드 → 프로젝트 → **Analytics**
2. 페이지 로드 시간, 방문자 수 확인

## 🛠 문제 해결

### 배포는 성공했지만 500 에러 발생

**원인**: 환경변수 미설정 또는 데이터베이스 테이블 미생성

**해결**:
1. 환경변수가 모두 설정되었는지 확인
2. 데이터베이스 테이블이 생성되었는지 확인 (7단계)
3. Function Logs에서 에러 메시지 확인

### 데이터베이스 연결 오류

**원인**: 환경변수 값 오류

**해결**:
1. Vercel Storage → 데이터베이스 → **.env.local** 탭에서 최신 값 확인
2. Vercel 프로젝트 설정에서 환경변수 재설정
3. Redeploy

### 빌드 실패

**원인**: TypeScript 오류 또는 의존성 문제

**해결**:
1. 로컬에서 `npm run build` 실행하여 오류 확인
2. 오류 수정 후 다시 푸시
3. Vercel이 자동으로 재배포

## 🎉 배포 완료 체크리스트

- [ ] Vercel Postgres 데이터베이스 생성
- [ ] 환경변수 설정 (모든 `POSTGRES_*` 변수)
- [ ] GitHub 저장소 연결
- [ ] Vercel 프로젝트 생성 및 배포
- [ ] 데이터베이스 테이블 생성 (SQL 실행)
- [ ] 배포된 사이트 접속 테스트
- [ ] 메시지 작성 기능 테스트
- [ ] 예진/성은 페이지 확인
- [ ] 모바일에서 테스트

## 📱 링크 공유

배포 완료 후:

1. Vercel에서 제공하는 URL 복사 (예: `https://bye-xxx.vercel.app`)
2. 학생들에게 공유:
   - 예진 페이지: `https://your-url.vercel.app/yejin`
   - 성은 페이지: `https://your-url.vercel.app/sungeun`
3. QR 코드 생성 (선택): [qr-code-generator.com](https://www.qr-code-generator.com/)

## 🔄 업데이트 배포

코드 수정 후:

```bash
git add .
git commit -m "Update: 기능 설명"
git push origin main
```

Vercel이 자동으로 빌드 및 배포합니다. (약 1-2분 소요)

---

문제가 있으면 Vercel 대시보드의 **Function Logs**를 먼저 확인하세요!
