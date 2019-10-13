import { StateCreator } from '@/store/models'

/**
 * 直属のステートを取り出す
 * @param defaultState
 * @param actualState
 */
export function pickState<T extends { [K: string]: any }>(
  defaultState: StateCreator<T>,
  actualState: T
) {
  const state = defaultState()

  return Object.keys(state).reduce<T>(
    (memo: any, key) => {
      if (state && state.hasOwnProperty(key)) {
        memo[key] = actualState[key]
      }
      return memo
    },
    { ...state }
  )
}
