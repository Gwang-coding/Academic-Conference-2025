# 🍑 하이브리드 검색 시스템 사용 가이드

## 📌 개요

기존의 문자열 검색과 AI 의미 기반 검색을 결합한 하이브리드 검색 시스템입니다.

### 주요 특징

-   **문자열 매칭**: 정확한 키워드 검색 (기존 방식 유지)
-   **AI 의미 검색**: 의미적으로 관련된 내용 검색 (KoSimCSE 모델 사용)
-   **가중 평균 병합**: 두 결과를 지능적으로 결합 (문자열 65%, AI 35%)

## 🚀 빠른 시작

### 🌍 크로스 플랫폼 방법 (Windows/Mac/Linux 모두 지원) ✅

#### 방법 1: 모든 서버 한 번에 시작 (권장)

```bash
# 첫 실행 시 (패키지 설치)
npm run install:all

# 서버 시작
npm run start:all
```

#### 방법 2: 개별 서버 시작

##### Express 서버만 (AI 검색 없이)

```bash
npm install
npm start
# http://localhost:3000
```

##### AI 서버 추가 실행

```bash
# 새 터미널에서
npm run ai:install  # 첫 실행 시
npm run ai          # AI 서버 시작
# http://localhost:8000
```

### 🍎 Mac/Linux 전용 스크립트

```bash
# 실행 권한 부여
chmod +x start-all.sh

# 서버 시작
./start-all.sh
```

### 🪟 Windows 사용자 주의사항

-   Python 설치 시 "Add Python to PATH" 체크 필수
-   npm 명령어 사용 권장 (크로스 플랫폼 호환)

## 📦 설치 요구사항

### Node.js (Express)

-   Node.js 14+ 필요
-   `npm install`로 자동 설치

### Python (AI 서버)

-   Python 3.8+ 필요
-   첫 실행 시 자동으로 필요 패키지 설치

## 🔍 검색 동작 방식

### 검색 흐름도

```
[사용자 검색어 "에너지"]
        ↓
    ┌───┴───┐
    ↓       ↓
[문자열 검색]  [AI 의미 검색]
    ↓           ↓
  "에너지"    "미토콘드리아"
  포함 항목    "ATP" 등 관련
    ↓           ↓
    └───┬───┘
        ↓
  [가중 평균 병합]
   (65% : 35%)
        ↓
  [최종 정렬 결과]
```

### 검색 예시

#### 예시 1: "세포"

-   **문자열 매칭**: "세포", "세포분열" 등 직접 포함
-   **AI 추가**: "DNA", "염색체", "미토콘드리아" 등 관련 개념
-   **결과**: 세포 관련 모든 교육 자료

#### 예시 2: "에너지"

-   **문자열 매칭**: "에너지" 포함 자료
-   **AI 추가**: "광합성", "ATP", "미토콘드리아" 등
-   **결과**: 에너지 개념과 관련된 포괄적 자료

## ⚙️ 설정 조정

### 가중치 변경 (public/index.html)

```javascript
// 🍑 현재: 문자열 65%, AI 35%
const alpha = 0.65;

// 더 정확한 검색 원할 때
const alpha = 0.8; // 문자열 80%, AI 20%

// 더 포괄적인 검색 원할 때
const alpha = 0.5; // 문자열 50%, AI 50%
```

### AI 결과 개수 조정

```javascript
// 🍑 fetchSemanticResults 함수에서
const res = await fetch(`/api/semantic_search?q=${...}&k=20`);
// k=20을 k=30으로 변경하면 더 많은 AI 결과
```

## 🔧 문제 해결

### AI 서버가 실행되지 않을 때

1. Python 3.8+ 설치 확인: `python3 --version`
2. 수동 패키지 설치:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    pip install -r requirements-python.txt
    ```

### "AI 서버가 실행 중이지 않습니다" 메시지

-   **정상 동작**: AI 서버 없이도 기존 문자열 검색은 작동
-   **해결**: `./start-ai.sh` 실행 또는 `./start-all.sh` 사용

### 검색이 느릴 때

-   첫 검색은 모델 로딩으로 3-5초 소요
-   이후 검색은 빠름 (~200ms)
-   🍑 표시로 검색 중임을 알림

## 📊 성능 정보

### 현재 데이터

-   29개 3D 교육 모델
-   모든 연산 < 200ms
-   AI 모델: KoSimCSE-roberta (한국어 특화)

### 확장 가능성

-   ~100개: 현재 구조 유지
-   ~500개: 서버 사이드 검색 고려
-   1000개+: Elasticsearch 등 전문 검색엔진

## 🍑 새로 추가된 코드 위치

모든 새 코드는 🍑 이모지로 표시되어 있습니다:

1. **백엔드**

    - `/semantic_search.py` - AI 서버
    - `/index.js:437-471` - 프록시 API

2. **프론트엔드**

    - `/public/index.html:1169-1284` - 하이브리드 검색
    - `/public/index.html:1429-1462` - 이벤트 핸들러

3. **스크립트**
    - `/start-ai.sh` - AI 서버 시작
    - `/start-all.sh` - 전체 시작

## 📝 추가 개발 아이디어

-   [ ] 검색 히스토리 저장
-   [ ] 실시간 검색 (디바운싱)
-   [ ] 검색어 하이라이팅
-   [ ] 다중 과목 필터
-   [ ] 검색 결과 설명 (왜 이 결과가 나왔는지)

## 🤝 기여하기

개선 사항이나 버그를 발견하면 이슈를 남겨주세요!

---

_🍑 하이브리드 검색으로 더 스마트한 교육 자료 탐색을!_
