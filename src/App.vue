<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import DecomojiBasic from 'decomoji/configs/v5_basic.json'
import DecomojiExtra from 'decomoji/configs/v5_extra.json'
import DecomojiExplicit from 'decomoji/configs/v5_explicit.json'
import { useVirtualizer } from '@tanstack/vue-virtual'

import { isStringOfNotEmpty } from './utilities/isString'

// なぜかわからないが $event.target には value が生えていないので無理やり型を通す
interface InputEventTarget extends EventTarget {
  value: string
}

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
  collected: boolean
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
  reacted: boolean
  search: string
  size: SizeName
  updated: boolean
  version: VersionParams
}

interface ValueBySizeParams {
  [key: SizeName]: number
}

const RowPaddingValue: ValueBySizeParams = {
  ll: 10,
  l: 8,
  m: 5,
  s: 3
}

const RowGapValue: ValueBySizeParams = {
  ll: 10,
  l: 8,
  m: 5,
  s: 3
}

const MinWidthValue: ValueBySizeParams = {
  ll: 128,
  l: 80,
  m: 42,
  s: 24
}

const RowHeightValue: ValueBySizeParams = {
  ll: 139,
  l: 88,
  m: 50,
  s: 28
}

// 全 デコモジアイテムに collected プロパティを追加する
// TODO: ...DecomojiExtra, を混ぜるとハングアップする
const availableDecomojis: DecomojiItem[] = [
  ...DecomojiBasic,
  // ...DecomojiExtra,
  ...DecomojiExplicit
].map((v) => ({
  ...v,
  collected: false
}))

// { category_name: boolean } の形を作る
const createCategoryParams: (category: CategoryName[]) => CategoryParams = (category) => {
  return ['basic', 'extra', 'explicit'].reduce(
    (acc, name) => ({
      ...acc,
      [name]: category.includes(name) ? true : false
    }),
    {}
  )
}

// created と updated を抽出してユニークなバージョンリストを作る
const availableVersions = Array.from(
  new Set([
    ...availableDecomojis.map((v) => v.created),
    ...availableDecomojis.flatMap((v) => (v.updated ? v.updated : []))
  ])
).sort((a, b) => a.localeCompare(b))

// { version_name: boolean } の形を作る
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
  reacted: false,
  search: '',
  size: 'll',
  updated: false,
  version: createVersionParams([])
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
  return state.created ? 'created=true' : null
})

// ダークモード表示か否かをパラメータ文字列に変換したものを返す
const darkParam = computed(() => {
  return state.dark ? 'dark=true' : null
})

// リアクション済みスタイルか否かをパラメータ文字列に変換したものを返す
const reactedParam = computed(() => {
  return state.reacted ? 'reacted=true' : null
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
  return state.updated ? 'updated=true' : null
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
    darkParam.value
  ]
    .filter((v) => !!v)
    .join('&')
})

// 表示バージョンをパラメータ文字列に変換したものを返す
const versionParam = computed(() => {
  const versions = (Object.keys(state.version) as VersionName[])
    .filter((key) => state.version[key])
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return versions.length > 0 ? `version=${versions.join(',')}` : null
})

// 各種表示条件に合わせてフィルターしたデコモジリストを返す
const filtered = computed(() => {
  const matches = ({ name, category, created, updated }: MatchesParams) => {
    // デコモジの名前が検索クエリに含まれるか否か、または検索クエリが空であるか否か
    const nameMatches = RegExp(state.search).test(name) || state.search === ''
    // デコモジのカテゴリーが表示するカテゴリーであるか、または何も選択されていないか否か
    const categoryMatches = state.category[category] || categoryParam.value === null
    // デコモジの作成バージョンが、表示するバージョンであるか、または何も選択されていないか否か
    const createdMatches = state.version[created] || versionParam.value === null
    // 修正バージョンが、表示するバージョンであるか否か、または何も選択されていないか否か
    const updatedMatches = updated ? state.version[updated] || versionParam.value === null : false
    // 当該デコモジについて、カテゴリー、名前、バージョン、全てにマッチするか否かを返す
    return nameMatches && categoryMatches && (createdMatches || updatedMatches)
  }

  return availableDecomojis
    .filter((v: DecomojiItem) => matches(v))
    .map((decomoji) => ({
      ...decomoji,
      collected: state.collected.find((v) => v.name === decomoji.name) ? true : false
    }))
})

// コレクションを JSON 化した URL を返す
const downloadURL = computed(() => {
  const jsonString = JSON.stringify(state.collected)
  const blob = new Blob([jsonString], { type: 'application/json' })
  return window.URL.createObjectURL(blob)
})

// state.size に応じた CSS クラス名のセットを返す
const classBySize = computed(() => {
  let wrapper = 'box-border grid grid-flow-row '
  let cWrapper = wrapper
  let button = 'box-border relative border border-solid rounded-md text-center '
  let cButton = button + 'border border-solid border-transparent bg-[--bgDecomojiCollected] '
  let image = 'm-auto leading-none align-top '
  let name = 'block mt-2.5 text-[--colorDecomoji] break-all'

  switch (state.size) {
    case 'll':
      wrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(128px,1fr))] px-3'
      cWrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-3'
      button += 'h-[128px]'
      cButton += 'h-[80px]'
      image += 'w-[64px] h-[64px]'
      break
    case 'l':
      wrapper += 'gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] px-2'
      cWrapper += 'gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-2'
      button += 'h-[80px]'
      cButton += button
      image += 'w-[64px] h-[64px]'
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
    case 's':
      wrapper += 'gap-0.5 grid-cols-[repeat(auto-fill,minmax(24px,1fr))] px-0.5'
      cWrapper += 'gap-0.5 grid-cols-[repeat(auto-fill,minmax(24px,1fr))] p-0.5'
      button += 'h-[25px]'
      cButton += button
      image += 'w-[16px] h-[16px]'
      name = 'sr-only'
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

const containerWidth = ref(window.innerHeight)

const columnLength = computed(() => {
  const gridItemWidth = minWidthBySize.value + gapBySize.value
  const gridContainerVirtualWidth =
    containerWidth.value + gapBySize.value - rowPaddingBySize.value * 2
  return Math.floor(gridContainerVirtualWidth / gridItemWidth)
})

// CSS Grid container の padding 値を返す
const rowPaddingBySize = computed(() => {
  return RowPaddingValue[state.size || 'll']
})

// CSS Grid item の gap 値を返す
const gapBySize = computed(() => {
  return RowGapValue[state.size || 'll']
})

// CSS Grid item 幅の最小値を返す
const minWidthBySize = computed(() => {
  return MinWidthValue[state.size || 'll']
})

// 1行分の高さを返す
const rowHeightBySize = computed(() => {
  return RowHeightValue[state.size || 'll']
})

const rowDecomojis = (index: number) => {
  const start = columnLength.value * index
  const end = start + columnLength.value
  return filtered.value.slice(start, end)
}

const updateContainerWidth = () => {
  nextTick().then(() => {
    if (!(parentRef.value instanceof HTMLElement)) {
      throw new Error('Component must be rendered as an HTMLElement')
    }
    containerWidth.value = parentRef.value.clientWidth
  })
}

const parentRef = ref<HTMLElement | null>(null)

const rowVirtualizer = useVirtualizer({
  count: Math.ceil(filtered.value.length / columnLength.value),
  getScrollElement: () => parentRef.value,
  estimateSize: () => rowHeightBySize.value,
  overscan: 3
})

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const debounce = ref(0)
const debouncedInputSearch = (value: string) => {
  window.clearTimeout(debounce.value)
  debounce.value = setTimeout(() => {
    state.search = value
  }, 300)
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

  const numOfRows = filtered.value.length / columnLength.value
  const listHeight = rowHeightBySize.value * numOfRows
  const maxScrollTop = headerHeight + listHeight - screenHeight // 下部paddingは省略

  el.scrollTop = Math.min(el.scrollTop, maxScrollTop)
})

// state を監視してURLにパラメータを追加する
watch(state, () => window.history.replaceState({}, '', '?' + urlParams.value))

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
    version
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
        [key]: value
      }
    }, {})

  // state の各プロパティを更新
  state.search = search ? search : state.search
  state.size = size ? (size as SizeName) : state.size
  state.category = category ? createCategoryParams(category.split(',')) : state.category
  state.collected = collected
    ? collected.split(',').map((v) => ({
        name: v,
        path: availableDecomojis.find((decomoji) => decomoji.name === v)!.path
      }))
    : state.collected
  state.version = version ? createVersionParams(version.split(',')) : state.version
  state.created = created === 'true' ? true : false
  state.dark = dark === 'true' ? true : false
  state.reacted = reacted === 'true' ? true : false
  state.updated = updated === 'true' ? true : false
})

onMounted(() => {
  window.addEventListener('resize', updateContainerWidth)
  updateContainerWidth()
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
      class="sticky z-10 top-0 left-0 flex items-center gap-5 p-[--paddingHeader] w-full text-[--colorHeader] bg-[--bgHeader] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_8px_rgba(0,0,0,0.075)]"
    >
      <div class="flex items-center gap-[--betweenLogoSearch]">
        <h1 class="flex-[0_0_auto]">
          <a class="block w-8 h-8 rounded-full overflow-hidden" href="/">
            <img class="block" src="/logo.png" alt="デコモジファインダー" width="32" height="32" />
          </a>
        </h1>
        <div class="relative flex-[1_1_auto] text-[--shade-200] focus-within:text-[--shade-800]">
          <input
            :value="state.search"
            class="py-2.5 pl-[calc(1.5rem+var(--space-md))] pr-[calc(6.5rem+var(--space-md))] rounded-md w-full text-md bg-[rgba(255,255,255,0.25)] focus-within:bg-[rgba(255,255,255,0.95)]"
            type="text"
            name="search"
            title="検索"
            @input="debouncedInputSearch(($event.target as InputEventTarget).value)"
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
      </div>

      <div class="flex items-center gap-[--betweenLogoSearch]">
        <details class="relative" name="selectors">
          <summary class="p-2.5 rounded-md">サイズ</summary>
          <div
            class="absolute flex flex-col gap-4 mt-1 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
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

        <details class="relative" name="selectors">
          <summary class="p-2.5 rounded-md">カテゴリー</summary>
          <div
            class="absolute flex flex-col gap-4 mt-1 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
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

        <details class="relative" name="selectors">
          <summary class="p-2.5 rounded-md">バージョン</summary>
          <div
            class="absolute flex flex-col gap-4 mt-1 p-4 rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
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
              class="flex justify-center items-center p-[calc(var(--space-xs)/2)_var(--space-xs)] disabled:text-[rgba(255,255,255,0.25)]"
              @click="availableVersions.forEach((value) => (state.version[value] = true))"
            >
              全選択
            </button>
            <button
              :disabled="!Object.values(state.version).some((v) => v)"
              type="button"
              class="flex justify-center items-center p-[calc(var(--space-xs)/2)_var(--space-xs)] disabled:text-[rgba(255,255,255,0.25)]"
              @click="availableVersions.forEach((value) => (state.version[value] = false))"
            >
              全解除
            </button>
          </div>
        </details>

        <details class="relative" name="selectors">
          <summary class="p-2.5 rounded-md">オプション</summary>
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
          </div>
        </details>
      </div>
    </header>

    <main ref="parentRef" class="overflow-auto">
      <h2 class="sr-only">デコモジ一覧</h2>
      <div class="relative w-full" :style="{ height: `${totalSize}px` }">
        <div
          v-for="{ size, start, index } in virtualRows"
          :key="index"
          :class="['absolute top-0 left-0 w-full', classBySize.wrapper]"
          :style="{
            height: `${size}px`,
            transform: `translateY(${start}px)`
          }"
        >
          <button
            v-for="{ name, path, collected, created, updated } in rowDecomojis(index)"
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
              v-if="state.size === 'll' && state.created"
              class="absolute top-[-10px] left-[-3px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
            >
              <span class="sr-only">created:</span>{{ created }}
            </span>
            <span
              v-if="state.size === 'll' && state.updated && updated"
              class="absolute top-[-10px] right-[-3px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
            >
              <span class="sr-only">updated:</span>{{ updated }}</span
            >
          </button>
        </div>
      </div>
    </main>

    <section
      v-if="state.collected.length"
      class="sticky left-0 bottom-[--heightFooter] max-h-[15rem] text-[--colorCollected] bg-[--bgCollected] shadow-[0_-2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)] overflow-y-auto scroll-touch"
    >
      <div class="flex p-2.5 pb-0">
        <div class="flex flex-grow flex-wrap items-baseline">
          <h2 class="flex-grow mr-2.5 text-base font-bold leading-[1.4]">
            コレクション：{{ state.collected.length }}
          </h2>
          <p class="flex-grow-[9999] mb-2.5 text-sm leading-[1.4]">
            ダブルクリックするか delete キーでコレクションから外せます。
          </p>
        </div>
        <div class="flex gap-2.5">
          <button
            class="flex justify-center items-center w-8 h-8"
            title="コレクションをアルファベット順にソートする"
            @click="state.collected = state.collected.sort((a, b) => a.name.localeCompare(b.name))"
          >
            <span class="material-icons" aria-hidden="true">sort</span>
          </button>
          <!-- <button class="flex justify-center items-center w-8 h-8" title="コレクションリンクをクリップボードにコピーする">
            <span class="material-icons" aria-hidden="true">link</span>
          </button> -->
          <a
            class="flex justify-center items-center w-8 h-8"
            :href="downloadURL"
            download="my-collected.json"
          >
            <span class="sr-only">コレクションをJSON形式でダウンロードする</span>
            <span class="material-icons" aria-hidden="true">save_alt</span>
          </a>
          <button
            class="flex justify-center items-center w-8 h-8"
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
      class="sticky z-10 bottom-0 left-0 flex items-center p-[--paddingFooter] w-full text-[--colorFooter] bg-[--bgFooter] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)]"
    >
      <p>
        このウェブアプリは
        <a
          href="https://twitter.com/otiext"
          class="link:text-inherit visited:text-inherit hover:text-inherit active:text-inherit"
          >oti</a
        >
        が作りました。
      </p>
      <p class="ml-auto">
        <a
          href="https://github.com/decomoji/finder/"
          class="link:text-inherit visited:text-inherit hover:text-inherit active:text-inherit"
          >GitHub</a
        >, MIT License.
      </p>
    </footer>
  </div>
</template>
