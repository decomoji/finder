type State = { [K: string]: any }

/**
 * 直属のステートを取り出す
 * @param defaultState
 * @param actualState
 */
export function pickState<T extends State>(
  defaultState: () => T,
  actualState: T
) {
  const state = defaultState()

  Object.keys(state).reduce((memo: T, key: keyof T) => {
    memo[key] = actualState[key]
    return memo
  }, state)

  return state
}
