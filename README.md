## 1. Introduction

- `tanstack/react-table`, `jotai`를 활용해 구현된 테이블 라이브러리입니다.
- `React` 기반의 프로젝트에서 활용이 가능합니다.
- 테이블 column/data 설정, sorting, pagination, 테이블 데이터 커스텀 기능을 제공합니다.
  <span style="color: darkgray;"> sorting 기능은 "No"라는 이름을 가진 column에 제한적으로 적용됩니다</span>
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

<span style="color: gray;">\* 하단의 폴더 트리에서 빨간색으로 표시한 부분이 라이브러리 사용 시 활용되는 요소들입니다.</span>

<pre>
📦src
 ┣ 📂atom
 ┃ ┗ 📜subRowContentsAtom.ts
 ┣ 📂components
 ┃ ┣ <span style="color: red;">📂TableBody</span>
 ┃ ┃ ┣ 📜DefaultSubRow.tsx
 ┃ ┃ ┣ 📜TableBodyCell.tsx
 ┃ ┃ ┣ 📜TableBodyRow.tsx
 ┃ ┃ ┣ 📜TableSubRow.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂TableContainer
 ┃ ┃ ┗ 📜TableContainer.tsx
 ┃ ┣ <span style="color: red;">📂TableFooter</span>
 ┃ ┃ ┣ 📜TablePageNumbers.tsx
 ┃ ┃ ┣ 📜TablePageSizeSelect.tsx
 ┃ ┃ ┣ 📜TablePagination.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ <span style="color: red;">📂TableHeader</span>
 ┃ ┃ ┣ 📜TableHeaderCell.tsx
 ┃ ┃ ┣ 📜TableHeaderRow.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hook
 ┃ ┣ <span style="color: red;">📜useSubRowContent.ts</span>
 ┃ ┗ <span style="color: red;">📜useTable.ts</span>
 ┣ 📂provider
 ┃ ┗ <span style="color: red;">📜TableProvider.tsx</span>
 ┣ 📂type
 ┃ ┗ <span style="color: red;">📜type.ts</span>
 ┣ 📂util
 ┃ ┣ 📜body.util.ts
 ┃ ┣ 📜footer.util.ts
 ┃ ┗ 📜header.util.ts
 ┗ 📜index.ts
</pre>

#### 1) TableProvider

- `TableHeader`, `TableBody`, `TableFooter`를 감싸는 `Provider`로, 각 컴포넌트에 `props`를 전달하는 역할을 수행합니다.
- 컴포넌트 호출 시 전달해야 하는 `props`는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | ---------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | `SubRowComponent` | `ReactNode` | `SubRow` 커스텀이 필요할 경우, 직점 컴포넌트를 전달하여 활용합니다. | `optional` |
  | `useParentRowUi` | `boolean` | `SubRow` 활용 시, 부모 Row의 UI를 그대로 활용할지 여부를 결정합니다. | `optional` |
  | `rowClickEvent` | `function` | `Table` 의 행을 클릭할 때 작동하는 함수입니다. | `optional` |
  | `subRowClickEvent` | `function` | `Sub Row` 의 행을 클릭할 때 작동하는 함수입니다. <br/><br/>\* `useParentRowUi`를 `true`로 설정했을 때에 한함. <br/> `SubRowComponent` 를 전달한 경우, 해당 컴포넌트 내에서 직접 클릭 이벤트를 생성하여 할당 | `optional` |
  | `subRowCellClickEvent` | `function` | `Sub Row` 의 각 셀을 클릭할 때 작동하는 함수입니다. <br/><br/>\* `useParentRowUi`를 `true`로 설정했을 때에 한함. <br/> `SubRowComponent` 를 전달한 경우, 해당 컴포넌트 내에서 직접 클릭 이벤트를 생성하여 할당 | `optional` |

<br/>

#### 2) TableHeader

- 테이블 열 `column` 제목을 렌더링하는 컴포넌트입니다.
- `header option` 을 통해 `layer`, `rowSpan`, `colSpan` 을 제어할 수 있습니다.
- 컴포넌트 호출 시 전달해야 하는 `props` 는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | -------------- | ------------------ | -------------------------------------------------------------------------- | ---------- |
  | `table` | `Table<TData>` | `useTable` 훅이 반환하는 테이블 데이터 및 메서드 관련 인스턴스입니다. | `required` |
  | `style` | `CSSProperties` | `inline Style` 을 통해 `CSS` 속성을 설정할 수 있습니다. | `optional` |
  | `className` | `string` | `class` 를 전달하여 `CSS` 속성을 설정할 수 있습니다. 함수입니다. | `optional` |
  | `headerOption` | `HeaderOptionType` | `header` 렌더링과 관련된 세부 속성을 설정합니다. (자세한 설명 하단에 첨부) | `optional` |

<br/>

- `header option` 의 `type` 은 아래와 같습니다.
  | Property | Type | Explain |
  | ------------- | -------- | ----------------------------------------------------------------------- |
  | `accessorKey` | `string` | `header` 와 `header option`을 매핑하는 `key` 값 입니다. |
  | `layer` | `number` | `header` 가 몇 번째 줄에서 시작할지 결정하는 값입니다. |
  | `rowSpan` | `number` | 설정한 `layer` 를 기준으로 `header` 가 차지할 높이를 결정하는 값입니다. |
  | `colSpan` | `number` | `header` 가 차지할 너비를 결정하는 값입니다. |

<br/>

#### 3) TableBody

- 실제 테이블 데이터를 렌더링하는 컴포넌트로, 각 행 `TableBodyRow` 와 이를 구성하는 셀 `TableBodyCell` 로 구성되어 있습니다.
- 컴포넌트 호출 시 전달해야 하는 `props` 는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | `table` | `Table<TData>` | `useTable` 훅이 반환하는 테이블 데이터 및 메서드 관련 인스턴스입니다. | `required` |
  | `style` | `CSSProperties` | `inline Style` 을 통해 `CSS` 속성을 설정할 수 있습니다. | `optional` |
  | `className` | `string` | `class` 를 전달하여 `CSS` 속성을 설정할 수 있습니다. 함수입니다. | `optional` |
  | `subRowStyle` | `CSSProperties` | `subRow` 에 대한 `CSS` 커스텀이 필요할 경우, 해당 속성을 통해 적용이 가능합니다. <br/><br/> \* `useParentRowUi`를 `true`로 설정했을 때에 한함. <br/> `SubRowComponent` 를 전달한 경우, 해당 컴포넌트 내에서 직접 커스텀 하면 됨 | `optional` |

#### 4) TableFooter

- 페이지네이션 기능을 담당하는 컴포넌트로, 해당 기능이 필요할 경우 선택적으로 활용 가능합니다.
- 총 2개의 컴포넌트로 구성됩니다.

  1. `TablePagaSizeSelect` : 페이지 당 컨텐츠 개수를 변경하는 기능을 수행하는 컴포넌트입니다.
  2. `TablePagination` : 페이지 번호를 변경하는 기능을 수행합니다.
     <br/>

- 컴포넌트 호출 시 전달해야 하는 `props` 는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------- |
  | `pagination` | `PaginationState` | `useTable` 훅이 반환하는 페이지네이션 관련 상태입니다. | `required` |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | `useTable` 훅이 반환하는 페이지네이션 관련 상태관리 함수입니다. | `required` |
  | `totalPageNum` | `number` | `useTable` 훅이 반환하는 전체 페이지 개수 관련 데이터입니다. | `required` |
  | `pageSizeList` | `Array<number>` | 한 페이지 당 표시할 컨텐츠 개수에 대한 옵션 리스트로, 기본 값으로 `[10, 15, 20, 25, 30]` 을 제공합니다. | `optional` |

<br/>

#### 5) useTable

- `TableHeader`, `TableBody`, `TableFooter` 컴포넌트의 `props`로 전달할 데이터를 반환하는 커스텀 훅입니다.
- 훅 호출 시 전달해야 하는 `props` 는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | -------------- | --------------------- | ----------------------------------------------- | ---------- |
  | `data` | `Array<T>` | 테이블 `body` 를 구성하는 데이터입니다. | `required` |
  | `columns` | `Array<ColumnDef<T>>` | 테이블 `column` 설정에 활용되는 데이터입니다. | `required` |
  | `isPagination` | `boolean` | 페이지네이션 설정 여부를 결정하는 데이터입니다. | `optional` |

<br/>

- 훅이 반환하는 값은 아래와 같습니다.
  | Returned Value | Type | Explain |
  | ---------------- | ------------------- | -------------------------------------------- |
  | `table` | `Table<TData>` | 테이블 설정에 활용되는 인스턴스 객체입니다. `TableHeader`, `TableBody` 의 `props` 로 활용됩니다. |
  | `pagination` | `PaginationState` | 페이지네이션 관련 상태입니다. `TableFooter`의 `props` 로 활용됩니다. |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | 페이지네이션 관련 상태관리 함수입니다. `TableFooter`의 `props` 로 활용됩니다. |

<br/>

#### 6) useSubRowContent

- `SubRow` 에 활용되는 데이터를 조회, 수정하는 함수를 반환하는 커스텀 훅입니다.
- 내부적으로 `jotai atom` 을 활용하여 값을 저장합니다.
- 훅이 반환하는 값은 아래와 같습니다.
  | Returned Value | Explain |
  | --------------------------- | ------------------------------------------------------------------------------------------------- |
  | `getSubRowContentOfEntire` | 전체 `SubRow` 데이터를 조회하는 함수입니다. |
  | `setSubRowContentOfEntire` | 전체 `SubRow` 데이터를 수정하는 함수입니다. |
  | `getSubRowContentOfSelected` | 특정 `Row`에 종속되는 `SubRow` 데이터를 조회하는 함수입니다. |
  | `setSubRowContentOfSelected` | 특정 `Row`에 종속되는 `SubRow` 데이터를 수정하는 함수입니다. |

<br/>

#### 7) Type

- `props` 데이터, 커스텀 훅 및 이벤트 핸들러의 파라미터 설정 시 활용되는 `Type` 입니다.
  | Type | Explain |
  | ------------------ | -------------------------------------------------------------------- |
  | `ColumnDef` | `useTable` 의 파라미터 `columns` 데이터 관련 `Type` 입니다. |
  | `Row` | `TableBodyRow` 에 활용되는 `Row` 데이터 관련 `Type` 입니다. |
  | `Cell` | `TableBodyCell` 에 활용되는 `Cell` 데이터 관련 `Type` 입니다. |
  | `HeaderOptionType` | `TableHeader` 에 전달하는 `headerOption` `props` 관련 `Type` 입니다. |

  <br/>

## 4. Logic (How it Works)

## 5. Usage (Sample Code)

##### 1) config.ts

- config.ts 파일에서 아래의 두 가지를 설정

<br/>

##### 2) ./aboutReactQuery/QueryProvider.tsx

<br/>

##### 3) ./useAuthManager/useAuthManager.ts

## 6. issue

- 모듈에서 전역상태 관리 도구로 사용 중인 Recoil의 공식 업데이트가 중단 됨
- Recoil과 유사하게 Atomic 패턴을 활용하는 Jotai로 마이그레이션 하는 방향 검토
