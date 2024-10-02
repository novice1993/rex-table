## 1. Introduction

- tanstack/react-table, jotai를 활용해 구현된 테이블 라이브러리입니다.
- React 기반의 프로젝트에서 활용이 가능합니다.
- 테이블 column/data 설정, _sorting, pagination, 테이블 데이터 커스텀 기능을 제공합니다.
  <span style="color: darkgray;"> _ sorting 기능은 "No"라는 이름을 가진 column에 제한적으로 적용됩니다</span>
- headless UI로 제작되어 자유롭게 스타일링 커스텀이 가능합니다.

## 2. Dependencies (Libraries Used)

##### \* 버전 기준일 : 2024년 9월

- 라이브러리는 명시된 버전 이상을 사용하는 것이 권장됩니다.
- 각 라이브러리의 버전은 모듈 개발 당시 안정화된 최신 버전을 기준으로 합니다.

#### 1) Dependencies

- @tanstack/react-table (^8.20.5)
- jotai (^2.9.3)
- jotai-immer (^18.3.1)

#### 2) PeerDependencies

- react (^18.3.1)
- react-dom (^18.3.1)

## 3. Structure (Directories and Files)

<pre>
📦src
 ┣ 📂atom
 ┃ ┗ 📜subRowContentsAtom.ts
 ┣ 📂components
 ┃ ┣ 📂TableBody
 ┃ ┃ ┣ 📜DefaultSubRow.tsx
 ┃ ┃ ┣ 📜TableBodyCell.tsx
 ┃ ┃ ┣ 📜TableBodyRow.tsx
 ┃ ┃ ┣ 📜TableSubRow.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂TableContainer
 ┃ ┃ ┗ 📜TableContainer.tsx
 ┃ ┣ 📂TableFooter
 ┃ ┃ ┣ 📜TablePageNumbers.tsx
 ┃ ┃ ┣ 📜TablePageSizeSelect.tsx
 ┃ ┃ ┣ 📜TablePagination.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂TableHeader
 ┃ ┃ ┣ 📜TableHeaderCell.tsx
 ┃ ┃ ┣ 📜TableHeaderRow.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hook
 ┃ ┣ 📜useSubRowContent.ts
 ┃ ┗ 📜useTable.ts
 ┣ 📂provider
 ┃ ┗ 📜TableProvider.tsx
 ┣ 📂type
 ┃ ┗ 📜type.ts
 ┣ 📂util
 ┃ ┣ 📜body.util.ts
 ┃ ┣ 📜footer.util.ts
 ┃ ┗ 📜header.util.ts
 ┗ 📜index.ts
</pre>

#### 1) TableProvider

- TableHeader, TableBody, TableFooter를 감싸는 최상위 컴포넌트로, 각 컴포넌트에서 활용되는 props를 전달하는 역할을 수행합니다.

| Props             | explain                                                            | required |
| ----------------- | ------------------------------------------------------------------ | -------- |
| `SubRowComponent` | Custom SubRow 활용이 필요할 때 props로 전달하여 활용할 수 있습니다 | optional |
| `subtitle`        | 부제목을 나타냅니다.                                               | 선택     |
| `onClick`         | 클릭 이벤트 핸들러                                                 | 필수     |
| `disabled`        | 버튼 비활성화 여부                                                 | 선택     |
| `style`           | 추가 스타일 설정                                                   | 선택     |

#### 2) TableContainer

<div>- TableProvider 내부에 위치하여 TableHeader, TableBody, TableFooter를 감싸는 최상위 UI 컴포넌트로 테이블에 공통으로 적용되어야 할 스타일을 설정합니다.</div>

#### 3) TableHeader

<div>- 테이블 열 (column) 제목을 렌더링하는 컴포넌트입니다.</div>
<div>- header option을 props로 전달하여 열 제목의 layer, rowSpan, colSpan 을 제어할 수 있습니다.</div>

#### 4) TableBody

<div>- 실제 테이블 데이터를 렌더링하는 컴포넌트로, 각 행(row)rhk 셀(cell)로 구성됩니다.</div>

#### 5) TableFooter

<div>- 페이지네이션 기능을 담당하는 컴포넌트입니다.</div>
<div>- 2개의 컴포넌트로 구성됩니다. (TablePageSizeSelect, TablePagination)
</div>

###### 1) TablePageSizeSelect : 한 페이지 당 표시하는 데이터 개수를 변경하는 기능을 수행합니다.

###### 2) TablePagination : 페이지 번호를 변경하는 기능을 수행합니다.

#### 6) hook

##### useTable

- 테이블 설정을 위한 데이터를 반환하는 커스텀 훅입니다. 전체 테이블 데이터 (header, body)와 페이지네이션 관련 데이터를 반환합니다.

##### <div>- 모듈 구현 시 사용되는 tanstack-query 활용과 관련된 함수 및 Provider 입니다.</div>

- QueryProvider : tanstack-query 저장소 활용을 위해 설정해야 하는 Provider
- filterStoredQueries : tanstack-query로 캐싱한 데이터를 브라우저 스토리지와 연동할 때 사용되는 함수 <br/>(캐싱 데이터 중 필요한 것만 선택해서 스토리지에 sava/load 할 수 있도록 처리)
- useGetCachingData : tanstack-query로 캐싱한 데이터를 필요한 컴포넌트에서 호출할 때 사용되는 Custom Hook

#### 5) etc (config, type, atom, util)

##### <div>- 모듈 구성에 활용되는 기타 요소들입니다.</div>

- config : 모듈 관련 세부 설정 (브라우저 저장소 선택, 서버 API 엔드포인트 지정)
- type : useAuthManager 관련된 type
- atom/authExpireTimeAtom : 인증 만료시간 관련 전역상태
- atom/authStateAtom : 로그인 여부와 관련된 전역상태
- atom/authTypeAtom : 인증 방식에 관련된 전역상태 (JWT Token 방식인지, 서버 Session 방식인지)
- util/convertMillisecondsToMMSS : 인증 만료시간 관련 밀리세컨드를 MM:SS 형태로 변경해주는 함수
- util/selectNecessaryData : 인자로 전달한 key 값과 동일한 객체의 프로퍼티 value를 반환하는 함수<br/>(서버 Response에서 인증 데이터 추출할 때 활용)

## 4. Logic (How it Works)

![Logic_Diagram](./asset/logic_diagram.jpg)

##### 0) 초기 값 지정

- 브라우저 스토리지에 저장된 데이터가 있는지 체크 후, 있을 시 초기 값으로 지정
- 관련 데이터 : 로그인 상태 (AUTH_STATE), 인증 정보 (AUTH_INFO)
- 로그인 상태, 인증 정보가 갱신될 때마다 브라우저 스토리지 데이터 역시 갱신 됨

##### 1) 최초 로그인 (브라우저 스토리지에 저장된 데이터 없다고 가정)

- 로그인 페이지에서 로그인 시, Recoil Provider로 관리 중인 전역 상태 변경 됨 (authStateAtom)

##### 2) 인증 정보 관리 (초기 값 설정, 갱신)

- authStateAtom 의 상태 변경이 useAuthManager로 전달 됨
- 이를 통해 로그인 되었음을 인지하고, 초기 인증 값을 받아옴 (setInitAuth 함수 호출)
- 만약 갱신 조건이 참이라면 (useAuthManager의 파라미터 중, isRenew가 true이면) 갱신 주기 (renewInterval) 에 맞춰 인증 값이 갱신 됨 (setAuthRenew 함수 반복 호출)

##### 3-1) 인증 정보 캐싱 처리

- 서버에서 인증 정보를 수신할 때마다 tanstack-query Provider를 활용하여 데이터 캐싱 처리 (설정한 key 값에 매핑)
- 최초 인증 정보 key : loginInfo
- 갱신 인증 정보 key : tokenInfo

##### 3-2) 인증 만료 시간 설정

- 최초 로그인 시 받아온 데이터 중 인증 만료시간 (expireTime) 활용하여 만료 카운트 다운 실행
- 특정 동작 (새로고침, 페이지 경로 변경) 수행 시 만료 시간 초기화

##### 4) 인증 정보 활용

- tanstack-qeury Provider 에 캐싱해놓은 인증 정보 활용하여 HTTP/HTTPS 통신 (haeder의 Authorization 설정)

##### 5) 인증 정보 만료

- 인증 정보 만료될 시 로그아웃 상태로 변경 (authStateAtom 변경)

##### 6) 로그아웃 관련 처리

- authStateAtom가 로그아웃으로 변경됨을 감지하고 관련 작업 처리
<ul>

1. 로그인 페이지로 브라우저 경로 이동</br>
2. tanstack-query Provider에 캐싱된 데이터 제거 요청</br>
3. 브라우저 스토리지에 저장된 데이터 제거</br>
</ul>

##### 7) 캐싱 데이터 제거

- useAuth에서 보낸 요청을 수신하여 캐싱 데이터 제거 (loginInfo, tokenInfo)

## 5. Usage (Sample Code)

##### 1) config.ts

- config.ts 파일에서 아래의 두 가지를 설정

1. 브라우저 스토리지 종류
2. 서버 API 엔드포인트 (현재 환경변수 import 해서 활용하는 형태로 구현)

```
export enum StorageType {
  SESSION_STORAGE = "sessionStorage",
  LOCAL_STORAGE = "localStorage",
}

export const storageType = StorageType.SESSION_STORAGE;
export const serverUrl = process.env.REACT_APP_SERVER_URL;
```

<br/>

##### 2) ./aboutReactQuery/QueryProvider.tsx

- Root Component (ex. index.tsx) 에 Provider 설정 (QueryProvider, RecoilProvider)

```
import ReactDOM from 'react-dom/client';
import { router } from 'Routes';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import QueryProvider from 'module/aboutReactQuery/QueryProvider';
import AppProvider from 'providers/AppProvider';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import ModalProvider from 'providers/ModalProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryProvider>
    <RecoilRoot>
      <AppProvider>
        <SettingsPanelProvider>
          <BreakpointsProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </BreakpointsProvider>
        </SettingsPanelProvider>
      </AppProvider>
    </RecoilRoot>
  </QueryProvider>
);

```

<br/>

##### 3) ./useAuthManager/useAuthManager.ts

- Root Component를 제외한 최상단 컴포넌트에서 useAuthManager 호출
- useAuthManger에 전달하는 parameter 통해 세부 동작 제어 (./type/type.ts 참고)

<table>
  <thead>
    <tr style="text-align:center;">
      <th>Parameter</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr style="text-align:center;">
      <td>authType</td>
      <td>jwtToken / sessionCookie</td>
      <td>O</td>
      <td>인증 타입 (토큰, 세션)</td>
    </tr>
    <tr style="text-align:center;">
      <td>isRenew</td>
      <td>boolean</td>
      <td>O</td>
      <td>인증 정보 갱신 여부</td>
    </tr>
    <tr style="text-align:center;">
      <td>renewInterval</td>
      <td>number</td>
      <td>조건부 (isRenew = true 일 때)</td>
      <td>갱신 주기</td>
    </tr>
    <tr style="text-align:center;">
      <td>authEndTime</td>
      <td>number</td>
      <td>X</td>
      <td>인증 만료 시간</td>
    </tr>
    <tr style="text-align:center;">
      <td>keyName</td>
      <td><div>{ token?: string, </div>
      <div>expireTime: string }</div>
      </td>
      <td>
      <div>{ token: 조건부 (authType === 'jwtToken' 일 때),</div>
      <div>expireTime: 필수 }</div>
       </td>
      <td>서버 response의 프로퍼티 명 (토큰, 만료시간 관련 데이터가 담겨오는 Prop Name)</td>
    </tr>
    <tr style="text-align:center;">
      <td>clientRoutePath</td>
      <td>
      <div>{ initPagePath: string,</div>
      <div>loginPagePath: string }</div>
       </td>
      <td>O</td>
      <td>loginPage, initPage 관련 클라이언트 경로</td>
    </tr>
    <tr style="text-align:center;">
      <td>serverUrl</td>
      <td>
      <div>{ logoutUrl: string,</div>
      <div>authRenewUrl?: string }</div>
       </td>
      <td>
      <div>{ logoutUrl: 필수,</div>
      <div>authRenewUrl: 조건부 (isRenew = true 일 때) }</div>
       </td>
      <td>logout, authRenew 관련 서버 api 경로</td>
    </tr>
  </tbody>
</table>

<br/>

```
import { PropsWithChildren } from 'react';
import useAuthManager from 'module/useAuthManager/useAuthManager';

const Root = ({ children }: PropsWithChildren) => {
  useAuthManager({
    authType: 'jwtToken',
    isRenew: true,
    renewInterval: 1000 * 60,
    keyName: {
      token: 'userToken',
      expireTime: 'userTokenExpire'
    },
    clientRoutePath: {
      loginPagePath: '/auths/sign-in',
      initPagePath: '/dashboard'
    },
    serverUrl: {
      logoutUrl: '/api/v1/sign/signOut',
      authRenewUrl: '/api/v1/sign/signRenew'
    }
  });

  return <>{children}</>;
};

export default Root;
```

## 6. issue

- 모듈에서 전역상태 관리 도구로 사용 중인 Recoil의 공식 업데이트가 중단 됨
- Recoil과 유사하게 Atomic 패턴을 활용하는 Jotai로 마이그레이션 하는 방향 검토
