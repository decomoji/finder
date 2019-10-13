/**
 * 以下の関数用のイテレーター
 * - every
 * - some
 * @param val
 */
const iteratorForEveryOrSome = (val: any) => Boolean(val)

/**
 * 配列の中身を全て消去する
 * @param array
 */
export function clearArray<T = any>(array: T[]) {
  return replaceArray(array)
}

/**
 * array 内の全ての値が iterator によって true を返すならば true を返す
 * @param array
 * @param iterator
 */
export function every<T = any>(array: T[], iterator = iteratorForEveryOrSome) {
  return array.every(iterator)
}

/**
 * 配列の最後の要素を返す
 * @param array
 */
export function getLastOfArray<T = any>(array: T[]) {
  return array[array.length - 1]
}

/**
 * 配列を中身を全て置き換える
 * @param array
 * @param items
 */
export function replaceArray<T = any>(array: T[], ...items: T[]) {
  return array.splice(0, array.length, ...items)
}

/**
 * array 内に iterator が true を返す値があるならば true を返す
 * @param array
 * @param iterator
 */
export function some<T = any>(array: T[], iterator = iteratorForEveryOrSome) {
  return array.some(iterator)
}
