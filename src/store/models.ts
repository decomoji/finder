import { UiState } from '@/store/modules/ui/models'
import { ActionContext, Module, Store } from 'vuex'

/**
 * ルートステート
 */
export interface RootState {
  ui?: UiState
}

/**
 * ルートストア
 */
export type RootStore = Store<RootState>

/**
 * ステート初期化関数
 */
export type StateCreator<T> = () => T

/**
 * getter関数
 */
export type DefinedGetter<State, GetterReturns, Return> = (
  state: State,
  getters: GetterReturns,
  rootState: RootState,
  rootGetters: any
) => Return

/**
 * mutation関数
 */
export type DefinedMutation<State, MutationPayload> = (
  state: State,
  payload: MutationPayload
) => void

/**
 * action関数
 */
export type DefinedAction<State, ActionPayload, Return = any> = (
  this: RootStore,
  injectee: ActionContext<State, RootState>,
  payload: ActionPayload
) => Return

/**
 * getterツリー
 */
export type DefinedGetterTree<
  State,
  GetterReturns,
  ModuleGetterReturns = {}
> = {
  [K in keyof Omit<GetterReturns, keyof ModuleGetterReturns>]: DefinedGetter<
    State,
    GetterReturns & ModuleGetterReturns,
    GetterReturns[K]
  >
}

/**
 * getterの返り値ツリー
 */
export type VuexGetterReturns<
  ViewModel extends { [k: string]: any },
  GetterReturns extends { [k: string]: any }
> = { [K in keyof GetterReturns]: GetterReturns[K] } & {
  viewModel: ViewModel
}

/**
 * mutationツリー
 */
export type DefinedMutationTree<State, MutationPayloads> = {
  [K in keyof MutationPayloads]: DefinedMutation<State, MutationPayloads[K]>
}

/**
 * actionツリー
 */
export type DefinedActionTree<State, ActionPayloads> = {
  [K in keyof ActionPayloads]: DefinedAction<State, ActionPayloads[K]>
}

/**
 * ストアモジュール
 */
export interface DefinedModule<
  State = {},
  GetterReturns = {},
  MutationPayloads = {},
  ActionPayloads = {},
  ModuleGetterReturns = {}
> extends Module<State, RootState> {
  getters?: DefinedGetterTree<State, GetterReturns, ModuleGetterReturns>
  mutations?: DefinedMutationTree<State, MutationPayloads>
  actions?: DefinedActionTree<State, ActionPayloads>
}

/**
 * actionディスパッチャー一覧
 */
export type VuexActionDispatchers<
  ActionTree extends DefinedActionTree<State, ActionPayloads>,
  State,
  ActionPayloads extends { [K in keyof ActionTree]: any }
> = {
  [K in keyof ActionTree]: ActionPayloads[K] extends undefined
    ? <R = any>() => Promise<R>
    : <R = any>(payload: ActionPayloads[K]) => Promise<R>
}
