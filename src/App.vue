<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import DecomojiBasic from 'decomoji/configs/v5_basic.json'
import DecomojiExtra from 'decomoji/configs/v5_extra.json'
import DecomojiExplicit from 'decomoji/configs/v5_explicit.json'

import { isStringOfNotEmpty } from './utilities/isString'

type DecomojiName = string
type SizeName = 's' | 'm' | 'l' | 'll'
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

interface CategorizedItems {
  [key: string]: DecomojiName[]
}

interface DecomojiItem {
  name: string
  category: CategoryName
  path: string
  created: VersionName
  updated?: VersionName
}

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

// const availableDecomojis: DecomojiItem[] = [...DecomojiBasic, ...DecomojiExtra, ...DecomojiExplicit]
const availableDecomojis: DecomojiItem[] = [...DecomojiBasic]
const categoryParams = ['basic', 'extra', 'explicit'].reduce<CategoryParams>(
  (memo, value: string) => {
    // 全ての value をキーにして false を与えたオブジェクトにまとめる
    return {
      ...memo,
      [value]: false
    }
  },
  {}
)
const creates = availableDecomojis.map((item) => item.created)
const updates = availableDecomojis.flatMap((item) => (item.updated ? item.updated : []))
const uniqued = Array.from(new Set([...creates, ...updates]))
const availableVersions = uniqued.sort((a, b) => a.localeCompare(b))
const versionParams: VersionParams = availableVersions.reduce((memo, value: string) => {
  // 全ての value をキーにして false を与えたオブジェクトにまとめる
  return {
    ...memo,
    [value]: false
  }
}, {})

const DECOMOJI_AMOUNT = availableDecomojis.length
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
const VERSION_LIST: VersionListItem[] = availableVersions
  .map((value: string) => ({
    text: value,
    value
  }))
  .sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true }))

const state = reactive({
  category: categoryParams,
  collection: [],
  created: false,
  dark: false,
  reacted: false,
  search: '',
  size: 'll',
  updated: false,
  vertical: undefined,
  version: versionParams
})

/**
 * 表示カテゴリーをパラメータ文字列に変換したものを返す
 */
const categoryParam = computed(() => {
  const arrayedCategories = (Object.keys(state.category) as CategoryName[]).filter(
    (key) => state.category[key]
  )
  return arrayedCategories.length > 0 ? `category=${arrayedCategories.join(',')}` : null
})

/**
 * コレクションをパラメータ文字列に変換したものを返す
 */
const collectionParam = computed(() => {
  const categorizedItems = state.collection.reduce<CategorizedItems>((acc, { name, category }) => {
    acc[category] ? acc[category].push(name) : (acc[category] = [name])
    return acc
  }, {})

  const paramaterizedArray = (Object.keys(categorizedItems) as CategoryName[]).map(
    (key) => `${key}=${categorizedItems[key].join(',')}`
  )

  return paramaterizedArray.length > 0 ? paramaterizedArray.join('&') : null
})

/**
 * 作成バージョン表示か否かをパラメータ文字列に変換したものを返す
 */
const createdParam = computed(() => {
  return state.created ? 'created=true' : null
})

/**
 * ダークモード表示か否かをパラメータ文字列に変換したものを返す
 */
const darkParam = computed(() => {
  return state.dark ? 'dark=true' : null
})

/**
 * リアクション済みスタイルか否かをパラメータ文字列に変換したものを返す
 */
const reactedParam = computed(() => {
  return state.reacted ? 'reacted=true' : null
})

/**
 * 検索クエリをパラメータ文字列に変換したものを返す
 */
const searchParam = computed(() => {
  return isStringOfNotEmpty(state.search) ? `search=${encodeURIComponent(state.search)}` : null
})

/**
 * 表示サイズをパラメータ文字列に変換したものを返す
 */
const sizeParam = computed(() => {
  return isStringOfNotEmpty(state.size) ? `size=${state.size}` : null
})

/**
 * 修正バージョン表示か否かをパラメータ文字列に変換したものを返す
 */
const updatedParam = computed(() => {
  return state.updated ? 'updated=true' : null
})

/**
 * 各パラメータ文字列を連結したものを返す
 */
const urlParams = computed(() => {
  return [
    sizeParam.value,
    categoryParam.value,
    darkParam.value,
    reactedParam.value,
    verticalParam.value,
    versionParam.value,
    searchParam.value,
    createdParam.value,
    updatedParam.value,
    collectionParam.value
  ]
    .filter((v) => !!v)
    .join('&')
})

/**
 * 表示バージョンをパラメータ文字列に変換したものを返す
 */
const versionParam = computed(() => {
  const versions = (Object.keys(state.version) as VersionName[])
    .filter((key) => state.version[key])
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return versions.length > 0 ? `version=${versions.join(',')}` : null
})

/**
 * コレクションが垂直分割表示か否かをパラメータ文字列に変換したものを返す
 */
const verticalParam = computed(() => {
  return state.vertical ? 'vertical=true' : null
})

/**
 * 各種表示条件に合わせてフィルターしたデコモジリストを返す
 */
const filteredDecomojis = computed(() => {
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

  return availableDecomojis.filter((v: DecomojiItem) => matches(v))
})

/**
 * コレクションを decomoji-manager 向けの json 形式に変換したものを返す
 */
const formattedJson = computed(() => {
  return state.collection.map((item: DecomojiItem) => ({
    name: item.name,
    path: `./decomoji/${item.category}/${item.name}.png`
  }))
})

const classBySize = computed(() => {
  let wrapper = 'grid grid-flow-row '
  let button =
    'box-border relative border border-solid border-transparent rounded-md text-center bg-[--bgDecomoji] '
  let image = 'm-auto leading-none align-top '
  let name = 'block mt-[--space-sm] text-[--colorDecomoji] break-all'
  switch (state.size) {
    case 'll':
      wrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(128px,1fr))] p-3'
      button += 'h-[129px]'
      image += 'w-[64px] h-[64px]'
      break
    case 'l':
      wrapper += 'gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-2'
      button += 'h-[80px]'
      image += 'w-[64px] h-[64px]'
      name = 'sr-only'
      break
    case 'm':
      wrapper += 'gap-1 grid-cols-[repeat(auto-fill,minmax(42px,1fr))] p-1'
      button += 'h-[45px]'
      image += 'w-[32px] h-[32px]'
      name = 'sr-only'
      break
    case 's':
      wrapper += 'gap-0.5 grid-cols-[repeat(auto-fill,minmax(24px,1fr))] p-0.5'
      button += 'h-[25px]'
      image += 'w-[16px] h-[16px]'
      name = 'sr-only'
      break
  }
  return {
    wrapper,
    button,
    image,
    name
  }
})

const items = ref(filteredDecomojis)
</script>

<template>
  <div
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
          v-model="state.search"
          class="py-[--space-sm] pl-[calc(1.5rem+var(--space-md))] pr-[calc(6.5rem+var(--space-md))] rounded-md w-full text-md bg-[rgba(255,255,255,0.25)] focus-within:bg-[rgba(255,255,255,0.95)]"
          type="text"
          name="search"
          title="検索"
        />
        <span
          class="material-icons pointer-events-none absolute top-[1px] bottom-0 left-[--space-xs] m-auto w-6 h-6"
          aria-hidden="true"
          >search</span
        >
        <span
          class="pointer-events-none absolute top-0 bottom-0 right-[--space-xs] m-auto h-4 leading-none"
          aria-hidden="true"
          >{{ items.length }}/{{ DECOMOJI_AMOUNT }}</span
        >
        <span class="sr-only">{{ DECOMOJI_AMOUNT }}個中{{ items.length }}個が該当しています。</span>
      </div>
    </div>

    <div class="flex items-center gap-[--betweenLogoSearch]">
      <details class="relative" name="selectors">
        <summary class="p-[--space-sm] rounded-md">サイズ</summary>
        <div
          class="absolute flex flex-col gap-[--space-md] mt-1 p-[--space-md] rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
        >
          <label v-for="{ text, value } in SIZE_LIST" :key="value" class="block whitespace-nowrap">
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
        <summary class="p-[--space-sm] rounded-md">カテゴリー</summary>
        <div
          class="absolute flex flex-col gap-[--space-md] mt-1 p-[--space-md] rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
        >
          <label
            v-for="{ text, value } in CATEGORY_LIST"
            :key="value"
            class="block whitespace-nowrap"
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
        <summary class="p-[--space-sm] rounded-md">バージョン</summary>
        <div
          class="absolute flex flex-col gap-[--space-md] mt-1 p-[--space-md] rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
        >
          <label
            v-for="{ text, value } in VERSION_LIST"
            :key="value"
            class="block whitespace-nowrap"
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
            class="flex justify-center items-center p-[calc(var(--space-xs)/2)_var(--space-xs)] disabled:text-[rgba(255,255,255,0.25)]"
            type="button"
          >
            全選択
          </button>
          <button
            class="flex justify-center items-center p-[calc(var(--space-xs)/2)_var(--space-xs)] disabled:text-[rgba(255,255,255,0.25)]"
            type="button"
            disabled
          >
            全解除
          </button>
        </div>
      </details>

      <details class="relative" name="selectors">
        <summary class="p-[--space-sm] rounded-md">オプション</summary>
        <div
          class="absolute right-0 flex flex-col gap-[--space-md] mt-1 p-[--space-md] rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
        >
          <label class="block whitespace-nowrap">
            <input v-model="state.created" :checked="state.created" type="checkbox" name="option" />
            作成バージョンの表示
          </label>
          <label class="block whitespace-nowrap">
            <input v-model="state.updated" :checked="state.updated" type="checkbox" name="option" />
            修正バージョンの表示
          </label>
          <label class="block whitespace-nowrap">
            <input v-model="state.reacted" :checked="state.reacted" type="checkbox" name="option" />
            リアクション済みのスタイル
          </label>
          <label class="block whitespace-nowrap">
            <input v-model="state.dark" :checked="state.dark" type="checkbox" name="option" />
            ダークモード
          </label>
        </div>
      </details>
    </div>
  </div>

  <main>
    <h2 class="sr-only">デコモジ一覧</h2>
    <div :class="classBySize.wrapper">
      <button v-for="item in items" :key="item.name" :class="classBySize.button">
        <img :alt="item.name" :src="item.path" :class="classBySize.image" height="64" width="64" />
        <span :class="classBySize.name">
          <span aria-hidden="true">:</span>{{ item.name }}<span aria-hidden="true">:</span>
        </span>
        <span
          class="absolute top-[-10px] left-[-3px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
        >
          <span class="sr-only">created:</span>{{ item.created }}
        </span>
        <span
          v-if="item.updated"
          class="absolute top-[-10px] right-[-3px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
        >
          <span class="sr-only">updated:</span>{{ item.updated }}</span
        >
      </button>
    </div>
  </main>

  <footer
    class="sticky top-0 left-0 flex items-center p-[--paddingFooter] w-full text-[--colorFooter] bg-[--bgFooter] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)]"
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
</template>
