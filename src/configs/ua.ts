import { every, some } from "@/utilities/array";

export const isBrowser = Boolean((process as any).browser);
export const ua = navigator.userAgent;
export const lowerCasingUa = ua.toLocaleLowerCase();
export const isIOS = every([
  // @see https://www.bit-hive.com/articles/20190820
  isBrowser,
  some([
    // UAに 'ipad', 'iphone', 'ipod' のいずれかが含まれている
    some(["ipad", "iphone", "ipod"], matchUserAgent),

    every([
      // UAに 'macintosh', 'safari' のどちらも含まれている
      every(["macintosh", "safari"], matchUserAgent),
      // かつ、`navigator.standalone` である
      (navigator as any).standalone,
    ]),
  ]),
]);

/**
 * UserAgentにマッチするか否かを返す
 * @param text
 */
function matchUserAgent(text: string) {
  return lowerCasingUa.includes(text.toLowerCase());
}
