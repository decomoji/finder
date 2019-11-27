import { config } from '@vue/test-utils'

config.logModifiedComponents = false

/**
 * Polyfill - Array.prototype.flat
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 */
if (!Array.prototype.flat) {
  Array.prototype.flat = function(depth: number = 0) {
    const flattened = []
    ;(function flat(array, depth) {
      for (let el of array) {
        if (Array.isArray(el) && depth > 0) {
          flat(el, depth - 1)
        } else {
          flattened.push(el)
        }
      }
    })(this, Math.floor(depth) || 1)

    return flattened
  }
}

/**
 * Polyfill - Array.prototype.flatMap
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 */
if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function(...args: any) {
    return Array.prototype.map.apply(this, args).flat(1)
  }
}
