## [실행 방법]

npm i 로 패키지 다운 후 npm run dev (서버 url .env 환경변수 처리되어있습니다.)

## [주요 기술 스택]

1. React
2. Typescript
3. SCSS
4. Ant Design
5. Recharts
6. Axios
7. Tanstack Query
8. Zustand(Zustand-Persist)

## [프로젝트 구조]

### 디렉토리 구조 원칙

프로젝트는 **공통/전역 리소스**와 **페이지별 종속 리소스**를 명확히 분리하여 구성했습니다.

- **src/components/**, **src/constants/**, **src/hooks/**: 여러 페이지에서 재사용되는 공통 컴포넌트, 전역 상수, 공통 커스텀 훅
- **pages/{페이지명}/components/**, **pages/{페이지명}/constants/**, **pages/{페이지명}/hooks/**: 해당 페이지에서만 사용하는 컴포넌트, 상수, 훅

### services 디렉토리 구조

API 서비스는 도메인별로 분리되어 있으며, 각 도메인 디렉토리 내부에서 역할에 따라 파일을 분리했습니다.

- **apiInstance.ts**: Axios 인스턴스 설정 (인터셉터, baseURL 등)
- **{도메인}/apis.ts**: 실제 API 호출 함수들 (Axios를 사용한 HTTP 요청)
- **{도메인}/queries.ts**: Tanstack Query의 `useQuery`, `useInfiniteQuery` 훅들
- **{도메인}/mutations.ts**: Tanstack Query의 `useMutation` 훅들
- **{도메인}/queryKeys.ts**: Query Key 상수 관리
- **{도메인}/types.ts**: 해당 도메인의 타입 정의

## [주요 기능]

1. 반응형 레이아웃 설계/구현
2. axios 요청 인터셉터에서 인증 토큰을 전역 헤더에 주입해, 모든 API 요청에 대해 일관된 인증 처리
3. 404 페이지 및 게시글 에러페이지 구현
4. axios 응답 인터셉터를 활용해 API 에러를 전역으로 처리하고, ant-design의 message 토스트를 통해 일관된 예외 UX를 제공 (401 에러 시 로그인 페이지로 리다이렉트)

### [게시판]

1. 게시글 작성 기능 구현 => 금지어 차단, 예외 처리
2. 게시글 조회 => 테이블 형식의 무한스크롤로 구현
3. 게시글 컬럼 숨김/보임 처리
4. 게시글 컬럼 width 조절 기능 => react-resizable 도입
5. 게시글 삭제/모두 삭제 => optimistic update 기법으로 서버부담 감소/UX 개선
6. 게시글 수정 => optimistic update 기법으로 UX 개선, 필드 부분 업데이트
7. 게시글 조회 파라미터 URL 쿼리 스트링으로 관리 => 상세 페이지 이동 후 뒤로가기 시에도 이전 목록 상태를 복원할 수 있도록 UX 설계

### [데이터 차트]

1. ChartLegend 공통 컴포넌트 구현 => 데이터 표시 여부와 색상을 제어, 동일 데이터 그룹의 색상 변경 동기화
2. 바 차트, 도넛 차트, 면적 차트, 멀티 라인 차트 구현
3. 멀티 라인 차트 점선/실선 구분
