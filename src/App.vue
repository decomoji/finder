<script setup lang="ts">
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import DecomojiAll from 'decomoji/configs/v5_all.json'
import DecomojiVersions from 'decomoji/configs/v5_versions.json'
import { computed, nextTick, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'

type SizeName = string | 's' | 'm' | 'l' | 'll'
type CategoryName = string | 'basic' | 'extra' | 'explicit'
type VersionName = string

interface SizeListItem {
  text: string
  value: SizeName
}

interface CategoryListItem {
  text: string
  value: CategoryName
}

interface VersionListItem {
  text: VersionName
  value: VersionName
}

interface DecomojiItem {
  name: string
  category: CategoryName
  path: string
  created: VersionName
  updated?: VersionName
  collected?: boolean
}

interface CollectedDecomojiItem
  extends Omit<DecomojiItem, 'category' | 'created' | 'updated' | 'collected'> {}

interface MatchesParams {
  name: string
  category: CategoryName
  created: VersionName
  updated?: VersionName
}

interface CategoryParams {
  [key: CategoryName]: boolean
}

interface VersionParams {
  [key: VersionName]: boolean
}

interface State {
  category: CategoryParams
  collected: CollectedDecomojiItem[]
  created: boolean
  dark: boolean
  json: boolean
  reacted: boolean
  search: string
  size: SizeName
  updated: boolean
  version: VersionParams
}

interface ValueBySizeParams {
  [key: SizeName]: number
}

/**
 * オブジェクトのクラス名を文字列で返す
 * @param val
 */
const getObjectClassName = (val: any) => {
  return Object.prototype.toString.call(val)
}

/**
 * 値が文字列であるか否かを返す
 * @param val
 */
const isString = (val: any): val is string => {
  return getObjectClassName(val) === '[object String]'
}

/**
 * 値が空ではない文字列であるか否かを返す
 * @param val
 */
const isStringOfNotEmpty = (val: any): val is string => {
  return isString(val) && val.length > 0
}

const RowGapValue: ValueBySizeParams = {
  ll: 10,
  l: 8,
  m: 5,
  s: 3
}

const RowItemWidthValue: ValueBySizeParams = {
  ll: 128,
  l: 80,
  m: 42,
  s: 24
}

const availableDecomojis: DecomojiItem[] = DecomojiAll
const availableCategories: CategoryName[] = ['basic', 'extra', 'explicit']
const availableVersions: string[] = DecomojiVersions

// { [category_name]: boolean } のオブジェクトを作る
const createCategoryParams: (category: CategoryName[]) => CategoryParams = (category) => {
  return availableCategories.reduce(
    (acc, name) => ({
      ...acc,
      [name]: category.includes(name) ? true : false
    }),
    {}
  )
}

// { [version_name]: boolean } のオブジェクトを作る
const createVersionParams: (version: VersionName[]) => VersionParams = (version) => {
  return availableVersions.reduce(
    (acc, name) => ({
      ...acc,
      [name]: version.includes(name) ? true : false
    }),
    {}
  )
}

// テンプレートで表示するためのサイズリスト
const SIZE_LIST: SizeListItem[] = [
  {
    text: '64px＆名前',
    value: 'll'
  },
  {
    text: '64px',
    value: 'l'
  },
  {
    text: '32px',
    value: 'm'
  },
  {
    text: '16px',
    value: 's'
  }
]

// テンプレートで表示するためのカテゴリーリスト
const CATEGORY_LIST: CategoryListItem[] = [
  {
    text: '基本セット',
    value: 'basic'
  },
  {
    text: '拡張セット',
    value: 'extra'
  },
  {
    text: '露骨セット',
    value: 'explicit'
  }
]

// テンプレートで表示するためのバージョンリスト
const VERSION_LIST: VersionListItem[] = availableVersions
  .map((value) => ({
    text: value,
    value
  }))
  .sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true }))

// このアプリのステート
const state: State = reactive({
  category: createCategoryParams([]),
  collected: [],
  created: false,
  dark: false,
  json: false,
  reacted: false,
  search: '',
  size: '',
  updated: false,
  version: createVersionParams([])
})

// リサイズイベントで要素幅を更新するハンドラー
const containerWidth = ref(window.innerWidth)
const handleResizeWindow = () => {
  nextTick().then(() => {
    if (!(parentRef.value instanceof HTMLElement)) {
      throw new Error('Component must be rendered as an HTMLElement')
    }
    containerWidth.value = parentRef.value.clientWidth
  })
}

// state.size に応じた CSS クラス名のセットを返す
const classBySize = computed(() => {
  let wrapper = 'box-border grid grid-flow-row '
  let cWrapper = wrapper
  let button = 'box-border relative border border-solid rounded-md text-center '
  let cButton = button + 'border border-solid border-transparent bg-[--bgDecomojiCollected] '
  let image = 'm-auto leading-none align-top '
  let name = 'block mt-2.5 text-[--colorDecomoji] break-all'

  switch (state.size) {
    case 's':
      wrapper += 'gap-0.5 grid-cols-[repeat(auto-fill,minmax(24px,1fr))] px-0.5'
      cWrapper += 'gap-0.5 grid-cols-[repeat(auto-fill,minmax(24px,1fr))] p-0.5'
      button += 'h-[25px]'
      cButton += button
      image += 'w-[16px] h-[16px]'
      name = 'sr-only'
      break
    case 'm':
      wrapper += 'gap-1 grid-cols-[repeat(auto-fill,minmax(42px,1fr))] px-1'
      cWrapper += 'gap-1 grid-cols-[repeat(auto-fill,minmax(42px,1fr))] p-1'
      button += 'h-[45px]'
      cButton += button
      image += 'w-[32px] h-[32px]'
      name = 'sr-only'
      break
    case 'l':
      wrapper += 'gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] px-2'
      cWrapper += 'gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-2'
      button += 'h-[80px]'
      cButton += button
      image += 'w-[64px] h-[64px]'
      name = 'sr-only'
      break
    case 'll':
    default:
      wrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(128px,1fr))] px-3'
      cWrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-3'
      button += 'h-[128px]'
      cButton += 'h-[80px]'
      image += 'w-[64px] h-[64px]'
      break
  }
  return {
    wrapper,
    cWrapper,
    button,
    cButton,
    image,
    name
  }
})

// RegExp インスタンスを computed にした方が速い
const searchRegex = computed(() => {
  return RegExp(state.search)
})

// 各種表示条件に合わせてフィルターしたデコモジリストを返す
const filtered = computed(() => {
  const isMatched = ({ name, category, created, updated }: MatchesParams) => {
    // デコモジの名前が検索クエリに含まれるか否か、または検索クエリが空であるか否か
    const nameMatches = searchRegex.value.test(name) || state.search === ''
    // デコモジのカテゴリーが表示するカテゴリーであるか、または何も選択されていないか否か
    const categoryMatches = state.category[category] || categoryParam.value === null
    // デコモジの作成バージョンが、表示するバージョンであるか、または何も選択されていないか否か
    const createdMatches = state.version[created] || versionParam.value === null
    // 修正バージョンが、表示するバージョンであるか否か、または何も選択されていないか否か
    const updatedMatches = updated ? state.version[updated] || versionParam.value === null : false
    // 当該デコモジについて、カテゴリー、名前、バージョン、全てにマッチするか否かを返す
    return nameMatches && categoryMatches && (createdMatches || updatedMatches)
  }

  return availableDecomojis.flatMap((v: DecomojiItem) =>
    isMatched(v)
      ? {
          ...v,
          collected: state.collected.find((collcted) => collcted.name === v.name) ? true : undefined
        }
      : []
  )
})

// n 番目から rowItemLength 目を切り出したデコモジリストを返す
const sliced = computed(() => {
  return (n: number) => {
    const from = rowItemLength.value * n
    const to = from + rowItemLength.value
    return filtered.value.slice(from, to)
  }
})

// 表示カテゴリーをパラメータ文字列に変換したものを返す
const categoryParam = computed(() => {
  const arrayedCategories = Object.keys(state.category).filter((key) => state.category[key])
  return arrayedCategories.length > 0 ? `category=${arrayedCategories.join(',')}` : null
})

// コレクションをパラメータ文字列に変換したものを返す
const collectedParam = computed(() => {
  return state.collected.length > 0
    ? `collected=${state.collected.map((v) => v.name).join(',')}`
    : null
})

// 作成バージョン表示か否かをパラメータ文字列に変換したものを返す
const createdParam = computed(() => {
  return state.created ? 'created' : null
})

// ダークモード表示か否かをパラメータ文字列に変換したものを返す
const darkParam = computed(() => {
  return state.dark ? 'dark' : null
})

// JSONを表示するか否かをパラメータ文字列に変換したものを返す
const jsonParam = computed(() => {
  return state.json ? 'json' : null
})

// リアクション済みスタイルか否かをパラメータ文字列に変換したものを返す
const reactedParam = computed(() => {
  return state.reacted ? 'reacted' : null
})

// 検索クエリをパラメータ文字列に変換したものを返す
const searchParam = computed(() => {
  return isStringOfNotEmpty(state.search) ? `search=${encodeURIComponent(state.search)}` : null
})

// 表示サイズをパラメータ文字列に変換したものを返す
const sizeParam = computed(() => {
  return isStringOfNotEmpty(state.size) ? `size=${state.size}` : null
})

// 修正バージョン表示か否かをパラメータ文字列に変換したものを返す
const updatedParam = computed(() => {
  return state.updated ? 'updated' : null
})

// 表示バージョンをパラメータ文字列に変換したものを返す
const versionParam = computed(() => {
  const versions = (Object.keys(state.version) as VersionName[])
    .filter((key) => state.version[key])
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return versions.length > 0 ? `version=${versions.join(',')}` : null
})

// 各パラメータ文字列を連結したものを返す
const urlParams = computed(() => {
  return [
    searchParam.value,
    sizeParam.value,
    categoryParam.value,
    collectedParam.value,
    versionParam.value,
    createdParam.value,
    updatedParam.value,
    reactedParam.value,
    darkParam.value,
    jsonParam.value
  ]
    .filter((v) => !!v)
    .join('&')
})

// コレクションを JSON 化した URL を返す
const downloadURL = computed(() => {
  const jsonString = JSON.stringify(state.collected)
  const blob = new Blob([jsonString], { type: 'application/json' })
  return window.URL.createObjectURL(blob)
})

// 1行に収められるアイテムの数を返す
const rowItemLength = computed(() => {
  // サイズごとのアイテムのピュアサイズ ＋ gap １つ分
  const item = rowItemWidthBySize.value + gapBySize.value
  // コンテナ幅 - gap １つ分
  const container = containerWidth.value - gapBySize.value
  // 割って切り捨てた数が「１行に収められるアイテムの数」となる
  return Math.floor(container / item)
})

// CSS Grid item の gap 値を返す
const gapBySize = computed(() => {
  return RowGapValue[state.size || 'll']
})

// CSS Grid item 幅の最小値を返す
const rowItemWidthBySize = computed(() => {
  return RowItemWidthValue[state.size || 'll']
})

// 1行分の高さを返す
const rowHeightBySize = computed(() => {
  return rowItemWidthBySize.value + gapBySize.value
})

// Virtual Scroll に必要な変数たち
const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)
const rowVirtualizerOptions = computed(() => {
  return {
    count: Math.ceil(filtered.value.length / rowItemLength.value),
    estimateSize: () => rowHeightBySize.value,
    scrollMargin: parentOffsetRef.value
  }
})
const rowVirtualizer = useWindowVirtualizer(rowVirtualizerOptions)
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())
const measureElement = (el: HTMLElement) => {
  if (!el) {
    return
  }

  rowVirtualizer.value.measureElement(el)

  return undefined
}

// 項目が減って虚無を表示していたらスクロール位置を戻す
watch(filtered, (newList, oldList) => {
  if (newList.length > oldList.length) {
    return
  }

  const el = document.documentElement
  const screenHeight = el.clientHeight

  if (!(parentRef.value instanceof HTMLElement)) {
    throw new Error('Component must be rendered as an HTMLElement')
  }
  const headerHeight = parentRef.value.offsetTop // ということにする

  const numOfRows = filtered.value.length / rowItemLength.value
  const listHeight = rowHeightBySize.value * numOfRows
  const maxScrollTop = headerHeight + listHeight - screenHeight // 下部paddingは省略

  el.scrollTop = Math.min(el.scrollTop, maxScrollTop)
})

// state を監視してURLにパラメータを追加する
watch(state, () =>
  window.history.replaceState(null, '', urlParams.value.length ? `?${urlParams.value}` : '/')
)

// URLパラメータから画面状態を復元する
onBeforeMount(() => {
  const {
    category,
    collected,
    created,
    dark,
    reacted,
    search,
    size,
    updated,
    version,
    json
  }: {
    [key: string]: string
  } = location.search
    // 先頭の `?` の除去
    .substring(1)
    // & で分割
    .split('&')
    // { key: value } に変形
    .reduce((acc, str) => {
      const [key, value] = str.split('=')
      return {
        ...acc,
        // キーだけある場合は真偽値のオプションと見做して　true にする
        [key]: value === undefined ? true : value
      }
    }, {})

  // state の各プロパティを更新
  state.search = search ? decodeURIComponent(search) : state.search
  state.size = size ? (size as SizeName) : state.size
  state.category = category ? createCategoryParams(category.split(',')) : state.category
  state.collected = collected
    ? collected.split(',').map((v) => ({
        name: v,
        path: availableDecomojis.find((decomoji) => decomoji.name === v)!.path
      }))
    : state.collected
  state.version = version ? createVersionParams(version.split(',')) : state.version
  // undefined になり得るので真偽値にキャストする
  state.created = Boolean(created)
  state.dark = Boolean(dark)
  state.reacted = Boolean(reacted)
  state.updated = Boolean(updated)
  state.json = Boolean(json)
})

onMounted(() => {
  window.addEventListener('resize', handleResizeWindow)
  handleResizeWindow()
})
</script>

<template>
  <div
    :class="[
      'grid grid-rows-[auto_1fr_auto_auto] min-h-screen text-sm text-[--colorBody] bg-[--bgBody]',
      {
        '-dark': state.dark
      }
    ]"
  >
    <header
      class="sticky z-10 top-0 left-0 flex flex-wrap items-center gap-x-5 gap-y-2.5 p-2.5 w-full text-[--colorHeader] bg-[--bgHeader] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_8px_rgba(0,0,0,0.075)]"
    >
      <div class="flex items-center gap-2.5 basis-[40rem] grow">
        <h1 class="flex-[0_0_auto]">
          <a class="block w-8 h-8 rounded-full overflow-hidden" href="/">
            <img class="block" src="/logo.png" alt="デコモジファインダー" width="32" height="32" />
          </a>
        </h1>
        <div class="relative flex-[1_1_auto] text-[--shade-200] focus-within:text-[--shade-800]">
          <input
            v-model="state.search"
            class="py-2.5 pl-10 pr-28 rounded-md w-full text-base bg-[rgba(255,255,255,0.25)] focus-within:bg-[rgba(255,255,255,0.95)]"
            type="text"
            name="search"
            title="検索"
          />
          <span
            class="material-icons pointer-events-none absolute top-[1px] bottom-0 left-2 m-auto w-6 h-6"
            aria-hidden="true"
            >search</span
          >
          <span
            class="pointer-events-none absolute top-0 bottom-0 right-2 m-auto h-4 leading-none"
            aria-hidden="true"
            >{{ filtered.length }}/{{ availableDecomojis.length }}</span
          >
          <span class="sr-only"
            >{{ availableDecomojis.length }}個中{{ filtered.length }}個が該当しています。</span
          >
        </div>

        <details class="relative sm:hidden" name="options">
          <summary class="p-2.5 rounded-md whitespace-nowrap">サイズ</summary>
          <div
            class="absolute right-0 z-10 flex flex-col gap-4 mt-1 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label
              v-for="{ text, value } in SIZE_LIST"
              :key="value"
              class="flex items-center gap-1 whitespace-nowrap"
            >
              <input
                :value="value"
                :checked="state.size === value"
                type="radio"
                name="size"
                @input="state.size = value"
              />
              {{ text }}
            </label>
          </div>
        </details>
      </div>

      <div class="flex items-center gap-2.5 basis-0 grow-[999] min-w-[50%]">
        <details class="relative hidden sm:block" name="options">
          <summary class="py-1 px-2.5 rounded-md">サイズ</summary>
          <div
            class="absolute flex flex-col gap-2 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label
              v-for="{ text, value } in SIZE_LIST"
              :key="value"
              class="flex items-center gap-1 whitespace-nowrap"
            >
              <input
                :value="value"
                :checked="state.size === value"
                type="radio"
                name="size"
                @input="state.size = value"
              />
              {{ text }}
            </label>
          </div>
        </details>

        <details class="relative" name="options">
          <summary class="py-1 px-2.5 rounded-md">カテゴリー</summary>
          <div
            class="absolute flex flex-col gap-2 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label
              v-for="{ text, value } in CATEGORY_LIST"
              :key="value"
              class="flex items-center gap-1 whitespace-nowrap"
            >
              <input
                :value="value"
                :checked="state.category[value]"
                type="checkbox"
                name="category"
                @input="state.category[value] = !state.category[value]"
              />
              {{ text }}
            </label>
          </div>
        </details>

        <details class="relative" name="options">
          <summary class="py-1 px-2.5 rounded-md">バージョン</summary>
          <div
            class="absolute flex flex-col gap-2 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label
              v-for="{ text, value } in VERSION_LIST"
              :key="value"
              class="flex items-center gap-1 whitespace-nowrap"
            >
              <input
                :value="value"
                :checked="state.version[value]"
                type="checkbox"
                name="version"
                @input="state.version[value] = !state.version[value]"
              />
              {{ text }}
            </label>
            <button
              :disabled="Object.values(state.version).every((v) => v)"
              type="button"
              class="flex justify-center items-center py-1 px-2 disabled:text-[rgba(255,255,255,0.25)]"
              @click="availableVersions.forEach((value) => (state.version[value] = true))"
            >
              全選択
            </button>
            <button
              :disabled="!Object.values(state.version).some((v) => v)"
              type="button"
              class="flex justify-center items-center py-1 px-2 disabled:text-[rgba(255,255,255,0.25)]"
              @click="availableVersions.forEach((value) => (state.version[value] = false))"
            >
              全解除
            </button>
          </div>
        </details>

        <details class="relative" name="options">
          <summary class="py-1 px-2.5 rounded-md">オプション</summary>
          <div
            class="absolute right-0 flex flex-col gap-4 mt-1 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label class="flex items-center gap-1 whitespace-nowrap">
              <input
                v-model="state.created"
                :checked="state.created"
                type="checkbox"
                name="option"
              />
              作成バージョンの表示
            </label>
            <label class="flex items-center gap-1 whitespace-nowrap">
              <input
                v-model="state.updated"
                :checked="state.updated"
                type="checkbox"
                name="option"
              />
              修正バージョンの表示
            </label>
            <label class="flex items-center gap-1 whitespace-nowrap">
              <input
                v-model="state.reacted"
                :checked="state.reacted"
                type="checkbox"
                name="option"
              />
              リアクション済みのスタイル
            </label>
            <label class="flex items-center gap-1 whitespace-nowrap">
              <input v-model="state.dark" :checked="state.dark" type="checkbox" name="option" />
              ダークモード
            </label>
            <label class="flex items-center gap-1 whitespace-nowrap">
              <input v-model="state.json" :checked="state.json" type="checkbox" name="option" />
              検索結果をjson表示
            </label>
          </div>
        </details>
      </div>
    </header>

    <main ref="parentRef">
      <h2 class="sr-only">デコモジ一覧</h2>
      <div
        class="relative w-full"
        :style="{
          marginTop: `${gapBySize}px`,
          height: `${totalSize}px`
        }"
      >
        <div
          v-for="{ size, start, index, key } in virtualRows"
          :key="key"
          :class="['absolute top-0 left-0 w-full', classBySize.wrapper]"
          :data-index="index"
          :ref="measureElement"
          :style="{
            height: `${size}px`,
            transform: `translateY(${start}px)`
          }"
        >
          <button
            v-for="{ name, path, collected, created, updated } in sliced(index)"
            :key="name"
            :class="[
              classBySize.button,
              {
                'border-[--borderDecomojiReacted] bg-[--bgDecomojiReacted]':
                  !collected && state.reacted,
                'border-transparent bg-[--bgDecomoji]': !collected && !state.reacted,
                'border-[--borderDecomojiCollected] bg-[--bgDecomojiCollected]': collected
              }
            ]"
            @click="
              collected
                ? state.collected.splice(
                    state.collected.findIndex((v) => v.name === name),
                    1
                  )
                : state.collected.push({
                    name: name,
                    path: path
                  })
            "
          >
            <img :alt="name" :src="path" :class="classBySize.image" height="64" width="64" />
            <span :class="classBySize.name">
              <span aria-hidden="true">:</span>{{ name }}<span aria-hidden="true">:</span>
            </span>
            <span
              v-if="(state.size === 'll' || state.size === '') && state.created"
              class="absolute top-[-8px] left-[-5px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
            >
              <span class="sr-only">created:</span>{{ created }}
            </span>
            <span
              v-if="(state.size === 'll' || state.size === '') && state.updated && updated"
              class="absolute top-[-8px] right-[-5px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
            >
              <span class="sr-only">updated:</span>{{ updated }}</span
            >
          </button>
        </div>
      </div>
    </main>

    <section
      v-if="state.json"
      :class="[
        'sticky left-0 p-3 h-40 text-[--colorCollected] bg-[--bgCollected] shadow-[0_-2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)]',
        {
          'bottom-[12.25rem] sm:bottom-[12.75rem]': state.collected.length > 0,
          'bottom-9 sm:bottom-11': state.collected.length < 1
        }
      ]"
    >
      <h2 class="sr-only">マッチしたデコモジ一覧のJSON形式</h2>
      <textarea
        :value="JSON.stringify(filtered)"
        class="border rounded-md h-full w-full overflow-y-auto scroll-touch resize-none"
        title="マッチしたデコモジ一覧のJSON形式"
        readonly
      ></textarea>
    </section>

    <section
      v-if="state.collected.length"
      class="sticky left-0 bottom-9 sm:bottom-11 h-40 text-[--colorCollected] bg-[--bgCollected] shadow-[0_-2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)] overflow-y-auto scroll-touch"
    >
      <div class="flex justify-between items-center gap-1 p-2.5 pb-0">
        <h2 class="font-bold leading-[1.4]">コレクション：{{ state.collected.length }}</h2>
        <div class="flex gap-1">
          <button
            class="flex justify-center items-center w-10 h-6"
            title="コレクションをアルファベット順にソートする"
            @click="state.collected = state.collected.sort((a, b) => a.name.localeCompare(b.name))"
          >
            <span class="material-icons" aria-hidden="true">sort</span>
          </button>
          <a
            class="flex justify-center items-center w-10 h-6"
            :href="downloadURL"
            download="my-collected.json"
          >
            <span class="sr-only">コレクションをJSON形式でダウンロードする</span>
            <span class="material-icons" aria-hidden="true">save_alt</span>
          </a>
          <button
            class="flex justify-center items-center w-10 h-6"
            title="コレクションを空にする"
            @click="state.collected.splice(0, state.collected.length)"
          >
            <span class="material-icons" aria-hidden="true">delete_forever</span>
          </button>
        </div>
      </div>
      <div :class="classBySize.cWrapper">
        <button
          v-for="({ name, path }, i) in state.collected"
          :key="`collected_${name}`"
          :class="classBySize.cButton"
          @dblclick="state.collected.splice(i, 1)"
          @keydown="state.collected.splice(i, 1)"
        >
          <img :alt="name" :src="path" :class="classBySize.image" height="64" width="64" />
        </button>
      </div>
    </section>

    <footer
      class="sticky z-10 bottom-0 left-0 flex items-center gap-5 p-2.5 w-full text-[--colorFooter] bg-[--bgFooter] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)] text-xs sm:text-base"
    >
      <p>
        このウェブアプリは
        <a
          href="https://twitter.com/otiext"
          class="underline link:text-inherit visited:text-inherit hover:text-inherit active:text-inherit"
          >oti</a
        >
        が作りました。
      </p>
      <p class="ml-auto">
        <a
          href="https://github.com/decomoji/finder/"
          class="underline link:text-inherit visited:text-inherit hover:text-inherit active:text-inherit"
          >GitHub</a
        >, MIT License.
      </p>
    </footer>
  </div>
</template>
