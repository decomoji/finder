import {
  clearArray,
  every,
  getLastOfArray,
  replaceArray,
  some
} from '@/utilities/array'

describe('clearArray()', () => {
  it('[0, 1, 2] を [] に置き換える', () => {
    const array = [0, 1, 2]
    clearArray(array)
    expect(array).toEqual([])
  })
})

describe('every()', () => {
  it('true を返す', () => {
    expect(every([true, true, true])).toBe(true)
  })

  it('true を返す', () => {
    expect(every([false, false, false], val => !val)).toBe(true)
  })

  it('false を返す', () => {
    expect(every([true, true, false])).toBe(false)
  })

  it('false を返す', () => {
    expect(every([false, false, true], val => !val)).toBe(false)
  })
})

describe('getLastOfArray()', () => {
  it('配列の最後の要素を返す', () => {
    expect(getLastOfArray(['fizz', 'buzz', 'foo'])).toEqual('foo')
  })
})

describe('replaceArray()', () => {
  it('[0, 1, 2] を [3, 4, 5] に置き換える', () => {
    const array = [0, 1, 2]
    replaceArray(array, 3, 4, 5)
    expect(array).toEqual([3, 4, 5])
  })
})

describe('some()', () => {
  it('true を返す', () => {
    expect(some([true, false, false])).toBe(true)
  })

  it('true を返す', () => {
    expect(some([false, true, true], val => !val)).toBe(true)
  })

  it('false を返す', () => {
    expect(some([false, false, false])).toBe(false)
  })

  it('false を返す', () => {
    expect(some([true, true, true], val => !val)).toBe(false)
  })
})
