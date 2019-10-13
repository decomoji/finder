# ストア

ルートストア以外の全てのストアは名前空間付きモジュールとして定義する。  
モジュールは画面および機能単位で分割する。  
ルートストアに引き当てるモジュールは `models.ts` の `RootState` に partial として追加する必要がある。

## 各モジュールの構成

|ファイル名|目的|
|-----|-----|
|`models.ts`|モジュールの型を定義|
|`index.ts`|モジュール本体とステートの定義|
|`getters.ts`|ゲッター一覧を定義|
|`mutation-types.ts`|ミューテーション名を定義|
|`mutations.ts`|ミューテーション一覧を定義|
|`services.ts`|サービスインスタンスを定義|
|`actions.ts`|アクション一覧を定義|

### モジュール本体

- `index.ts` にて `const storeModule` を `export`
  - leapBffApiClient モジュールに依存する場合は `DefinedWithApiClientModule` 型
  - その他は `DefinedModule` 型

※ leapBffApiClient モジュールについては後述

#### サンプル

##### 実装

```index.ts
/* import は省略 */

const storeModule: DefinedWithApiClientModule<
  State,
  GetterReturns,
  MutationPayloads,
  ActionPayloads
> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    apiClient
  }
}
```

### ステート

- `models.ts` にて型を定義
- `index.ts` にて `const state` を `StateCreator` 型として `export`

#### サンプル

##### 型定義

```index.ts
/* import は省略 */

export interface HogeFugaState {
  /** 中身は省略 **/
}
```

##### 実装

```models.ts
export const state: StateCreator<HogeFugaState> = () => ({
  /** 中身は省略 **/
})
```

### ビューモデル

- `models.ts` にて型を定義
  - leapBffApiClient モジュールに依存する場合は `ViewModelWithApiClient` 型
- `getters.ts` に `viewModel()` として定義
- ステートを内包する
- ゲッターは必ずビューモデルを返さなくてはならない

#### サンプル

##### 型定義

```models.ts
/* import は省略 */

export type HogeFugaViewModel = ViewModelWithApiClient<
  HogeFugaState,
  {
    hoge: string
    fuga: number
  }
>
```

##### 実装

```getters.ts
import { pickApiClientGetters } from '@/store/modules/leapBffApiClient/pickApiClientGetters'
import { state as defaultState } from '@/store/modules/hogeFuga'
import { pickState } from '@/store/utilities'
/* その他の import は省略 */

export const getters /* 型は後述 */ = {
  viewModel: (state, getters) => {
    const { hoge, fuga } = getters

    return {
      ...pickState(defaultState, state),
      ...pickApiClientGetters(getters),
      hoge,
      fuga
    }
  }
}
```

### ゲッター

- `models.ts` にて `VuexGetterReturns` 型を定義
- `getters.ts` にて `const getters` を `export`
  - leapBffApiClient モジュールに依存する場合は `DefinedWithApiClientModuleGetterTree` 型
  - その他は `DefinedGetterTree` 型

#### サンプル

##### 型定義

```models.ts
/* import は省略 */

export type HogeFugaGetterReturns = VuexGetterReturns<
  HogeFugaViewModel,
  Pick<HogeFugaViewModel, 'hoge' | 'fuga'>
>
```

##### 実装

```getters.ts
/* import は省略 */

export const getters: DefinedWithApiClientModuleGetterTree<
  HogeFugaState,
  HogeFugaGetterReturns
> = {
  hoge: () => 'ほげ',
  fuga: () => 1
}
```

### ミューテーション

- `mutation-type.ts` にてミューテーション名を定義
- `models.ts` にて各ミューテーションに渡す引数（payload）の型を定義
- `mutations.ts` にて `const mutations` を `DefinedMutationTree` 型として `export`

#### サンプル

##### ミューテーション名定義

```mutation-types.ts
export const HOGE = 'HOGE'
export const FUGA = 'FUGA'
```

##### 型定義

```models.ts
/* import は省略 */

export interface HogeFugaMutationPayloads {
  [HOGE]: string
  [FUGA]: number
}
```

##### 実装

```index.ts
/* import は省略 */

export const mutations: DefinedMutationTree<
  HogeFugaState,
  HogeFugaMutationPayloads
> = {
  [HOGE](state, payload) => { /* 処理は省略 */ }
  [FUGA](state, payload) => { /* 処理は省略 */ }
}
```

### アクション

- `models.ts` に以下の型を定義
- 各アクションに渡す引数（payload）の型
- アクションツリーを `DefinedActionTree` 型にて
- アクションディスパッチャー一覧を `VuexActionDispatchers` 型にて
- `actions.ts` にて `const actions` を `DefinedActionTree` 型として `export`
- leapBffApiClient モジュールに依存する場合は、API リクエストをする際に `handleRequest()` を使用する

#### サンプル

##### 型定義

```models.ts
/* import は省略 */

export interface HogeFugaActionPayloads {
  fetch: GetHogeFugaParams
}

export type HogeFugaActionTree = DefinedActionTree<
  HogeFugaState,
  HogeFugaActionPayloads
>

export type HogeFugaActionDispatchers = VuexActionDispatchers<
  HogeFugaActionTree,
  HogeFugaState,
  HogeFugaActionPayloads
>
```

##### 実装

```actions.ts
/* import は省略 */

export const actions: HogeFugaActionTree = {
  async fetch({ commit, dispatch }, payload) {
    const res = await handleRequest(dispatch, {
      clear: true, // すでに存在するキューを消去するか否か
      globalLoading: true, // グローバルローディングアニメーションを表示するか否か
      queue: someApiClientService.get(params) // リクエストキュー
    }).catch(error => { throw error })

    commit(HUGA, res.data)

    return res
  }
}
```

## leapBffApiClient モジュール

LEAP の BFF-API にリクエストが必要なストアは leapBffApiClient モジュールを用いる。

```index.ts
import { storeModule as apiClient } from '@/store/modules/leapBffApiClient'
/* その他の import は省略 */

const storeModule: DefinedWithApiClientModule<
  State,
  GetterReturns,
  MutationPayloads,
  ActionPayloads
> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    apiClient
  }
}
```

### ゲッター

leapBffApiClient モジュールは以下の値をゲッターで返す。

```ts
{
  'apiClient/hasQueues': boolean // キューがあるか否か
  'apiClient/hasErrorQueue': boolean // エラー状態のキューがあるか否か
  'apiClient/hasLoadingQueue': boolean // ローディング状態のキューがあるか否か
  'apiClient/isLatestQueueError': boolean // 最後のキューがエラー状態であるか否か
  'apiClient/isLatestQueueLoading': boolean // 最後のキューがローディング状態であるか否か
  'apiClient/isLatestQueueStable': boolean // 最後のキューが正常な状態であるか否か
  'apiClient/latestQueue': LeapBffApiClientRequestQueue // 最後のキューを返す
  'apiClient/latestQueueStatus': LeapBffApiClientRequestQueue['status'] | undefined // 最後のキューのステータスを返す
}
```

### handleRequest 関数

leapBffApiClient モジュールを用いて API にリクエストする際は当該アクションで `handleRequest()` を呼び出すことでステータス管理を行う。

#### サンプル

```actions.ts
/* import は省略 */

export const actions: HogeFugaActionTree = {
  async fetch({ commit, dispatch }, payload) {
    const res = await handleRequest(dispatch, {
      clear: true, // すでに存在するキューを消去するか否か
      globalLoading: true, // グローバルローディングアニメーションを表示するか否か
      queue: someApiClientService.get(params) // リクエストキュー
    }).catch(error => { throw error })

    commit(HUGA, res.data)

    return res
  }
}
```

#### モデル図

![sequences.puml "APIにリクエストする際の処理の流れ"](http://www.plantuml.com/plantuml/png/xLLTQzH057tFhmXvQInjyYxRm5hQNK6nLEoJB-Fcxkv0lfoPj8W8tGJNHIiKeOfMKAIj7uLLeKALeZzckbdz5qxYRjTDijlwyI3Ojp1pvvmxzvmpOPXP81SNplF6BW_VyE0j3rxnu2CFMxpnc0VtlZtPv8rsvyvETxqfFg8F3HwiIPAoX655dtKTXh03H96d3LcfkpMOzsj8vk4B7kppS9k71ppSLSxAXQeebIkkvPAPQvOFHXLOfLxk7L0zH91DpnJqkCoGHYF5FFrD3LKOTXsQWsvYwY51e4uaF1DJSeeXZJ64Q_iCZKAkkBQDcLg-L9hBWXqT78AZOX5oe68CDGkIbClJnmmqUheQFNmd54d4QYRhhR63qtNtroIg0MD0gBOifBxecc2f9n8euKdPuwT-b_fekHeeoCEp5WRHoVWEQmHk60HehoDvPcZNyubdWO5M46RzYipzwiWnBLY4wpvGDd3ApTw139i-sTtOdjHpjXEuMuFfZBv4ekju0mikS8m5ujgOGg7Cc7SPo3AkY4wf9wh1wFD8cgR5qKtdjjrfhnr-QlBWGUVpRTxO4cMIXAoucw7AgBNUkVjiVBl7I39mN_15V4URUqBbamyW9ne_hdy1a7UkMYtsSOHZV0jAYICNWVd4eQV1-Tt7Q_vAgJWbY_1e9cBeJv-n64tD1_gF5Odld3cPzNbEl8_I3HQ5T6GxM--ZZKT_Fx9NdPWYV2sM3_TNl-wyZ9uVTFVkdoRvd_CD0TEO8yGbXVHaUpvADWV_273Cxm00 "APIにリクエストする際の処理の流れ")

## View/Container への引き当て

View/Container へのストアモジュールの引き当ては `vuex-class` で行う。  
引き当てることが可能なのは、各モジュールの ViewModel とアクションのみである。

### サンプル

```HogeFuga.vue
import { Action, Getter } from 'vuex-class'
/* その他の import は省略 */

@Component
export default class HogeFuga extends Vue {
  /**
   * ViewModel を引き当てる
   */
  @Getter('hogeFuga/viewModel') hogeFuga!: HogeFugaViewModel

  /**
   * アクションを引き当てる
   */
  @Action('hogeFuga/fetch') fetchHogeFuga!: HogeFugaActionDispatchers['fetch']
}
```

### モデル図

![sequences.puml "View/Container へのストアモジュールの引き当て"](http://www.plantuml.com/plantuml/png/hPA_JeDG5CPtdkBAWWw5tHIYqMWN5pKkwe1uIaa8ry1jZIFSnSN9-09DrC541mThKf_cfEyXKAZbyYUjOULyt-ySllinXxb0pXourVQenqp70vzWEC7m7QDlvFSOZP6FCPeWVqO-HVuMZsRJ9mmVPZ-F6Bv8agwdW2Dw3IuHfaJN9Rc8bqd78CUKiXD6VTWctNuy8HPrgQzVkKCmTWw1CV0tbG6ruM1eczeenojRNIsH6nVUiitsuSx8rHkPf4YE9U0PlKopk3VJIejxakFa74M4NvTBpB-rgfrU7QWZaLsFIvQ9_eeLjMJHIpgh09jog2IA3zYGmd-oJmgKr2pwmEWB-IloppPQj6inXtfBBUe3imPD3Ke5lJLgD5-nxmGtPkoCupfNvaikM-oLcIu9r9IyPgSoRmM-aYhwYdsgWvK2EOs_bPAePA_GhCAZjF4clm00 "View/Container へのストアモジュールの引き当て")

## テスト

`/tests/unit/store` にテストコードを配置する。  
詳細は当該 README を参照されたし。
