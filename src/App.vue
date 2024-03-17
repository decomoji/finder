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
  collection: CollectedDecomojiItem[]
  created: boolean
  dark: boolean
  reacted: boolean
  search: string
  size: SizeName
  updated: boolean
  version: VersionParams
}

// const availableDecomojis: DecomojiItem[] = [...DecomojiBasic, ...DecomojiExtra, ...DecomojiExplicit]
const availableDecomojis: DecomojiItem[] = [...DecomojiBasic].map((v) => ({ ...v, collected: false}))
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

const state: State = reactive({
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

  return availableDecomojis.filter((v: DecomojiItem) => matches(v)).map((decomoji) => ({
    ...decomoji,
    collected: state.collection.find((item) => item.name === decomoji.name) ? true : false
  }))
})

const downloadURL = computed(() => {
  const jsonString = JSON.stringify(state.collection)
  const blob = new Blob([jsonString], { type: 'application/json' })
  return window.URL.createObjectURL(blob)
})

const classBySize = computed(() => {
  let wrapper = 'grid grid-flow-row '
  let cWrapper = wrapper
  let button = 'box-border relative border border-solid rounded-md text-center '
  let cButton = button + 'border border-solid border-transparent bg-[--bgDecomojiCollected] '
  let image = 'm-auto leading-none align-top '
  let name = 'block mt-[--space-sm] text-[--colorDecomoji] break-all'

  switch (state.size) {
    case 'll':
      wrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(128px,1fr))] p-3'
      cWrapper += 'gap-3 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-3'
      button += 'h-[129px]'
      cButton += 'h-[80px]'
      image += 'w-[64px] h-[64px]'
      break
    case 'l':
      wrapper += 'gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] p-2'
      cWrapper += wrapper
      button += 'h-[80px]'
      cButton += button
      image += 'w-[64px] h-[64px]'
      name = 'sr-only'
      break
    case 'm':
      wrapper += 'gap-1 grid-cols-[repeat(auto-fill,minmax(42px,1fr))] p-1'
      cWrapper += wrapper
      button += 'h-[45px]'
      cButton += button
      image += 'w-[32px] h-[32px]'
      name = 'sr-only'
      break
    case 's':
      wrapper += 'gap-0.5 grid-cols-[repeat(auto-fill,minmax(24px,1fr))] p-0.5'
      cWrapper += wrapper
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

const items = ref(filteredDecomojis)
const collections = ref(state.collection)
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
          <span class="sr-only"
            >{{ DECOMOJI_AMOUNT }}個中{{ items.length }}個が該当しています。</span
          >
        </div>
      </div>

      <div class="flex items-center gap-[--betweenLogoSearch]">
        <details class="relative" name="selectors">
          <summary class="p-[--space-sm] rounded-md">サイズ</summary>
          <div
            class="absolute flex flex-col gap-[--space-md] mt-1 p-[--space-md] rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label
              v-for="{ text, value } in SIZE_LIST"
              :key="value"
              class="block whitespace-nowrap"
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
          <summary class="p-[--space-sm] rounded-md">オプション</summary>
          <div
            class="absolute right-0 flex flex-col gap-[--space-md] mt-1 p-[--space-md] rounded-md max-h-[50vh] bg-[--bgPanel] overflow-y-auto"
          >
            <label class="block whitespace-nowrap">
              <input
                v-model="state.created"
                :checked="state.created"
                type="checkbox"
                name="option"
              />
              作成バージョンの表示
            </label>
            <label class="block whitespace-nowrap">
              <input
                v-model="state.updated"
                :checked="state.updated"
                type="checkbox"
                name="option"
              />
              修正バージョンの表示
            </label>
            <label class="block whitespace-nowrap">
              <input
                v-model="state.reacted"
                :checked="state.reacted"
                type="checkbox"
                name="option"
              />
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
        <button
          v-for="item in items"
          :key="item.name"
          :class="[
            classBySize.button,
            {
              'border-[--borderDecomojiReacted] bg-[--bgDecomojiReacted]': !item.collected && state.reacted,
              'border-transparent bg-[--bgDecomoji]': !item.collected && !state.reacted,
              'border-[--borderDecomojiCollected] bg-[--bgDecomojiCollected]': item.collected
            }
          ]"
          @click="state.collection.push(item)"
        >
          <img
            :alt="item.name"
            :src="item.path"
            :class="classBySize.image"
            height="64"
            width="64"
          />
          <span :class="classBySize.name">
            <span aria-hidden="true">:</span>{{ item.name }}<span aria-hidden="true">:</span>
          </span>
          <span
            v-if="state.created"
            class="absolute top-[-10px] left-[-3px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
          >
            <span class="sr-only">created:</span>{{ item.created }}
          </span>
          <span
            v-if="state.updated && item.updated"
            class="absolute top-[-10px] right-[-3px] border border-solid border-[--borderDecomojiCollected] py-[2px] px-[5px] rounded-md text-[--colorTag] bg-[--bgTag]"
          >
            <span class="sr-only">updated:</span>{{ item.updated }}</span
          >
        </button>
      </div>
    </main>

    <section
      v-if="state.collection.length"
      class="sticky left-0 bottom-[--heightFooter] max-h-[15rem] text-[--colorCollection] bg-[--bgCollection] shadow-[0_-2px_4px_rgba(0,0,0,0.15),0_-8px_8px_rgba(0,0,0,0.075)] overflow-y-auto scroll-touch"
    >
      <div class="flex p-2.5 pb-0">
        <div class="flex flex-grow flex-wrap items-baseline">
          <h2 class="flex-grow mr-2.5 text-base font-bold leading-[1.4]">
            <span aria-hidden="true">コレクション：{{ state.collection.length }}</span
            ><span class="sr-only">コレクション（計{{ state.collection.length }}個）</span>
          </h2>
          <p class="flex-grow-[9999] mb-2.5 text-sm leading-[1.4]">
            ダブルクリックするか delete キーでコレクションから外せます。
          </p>
        </div>
        <div class="flex">
          <button aria-label="コレクションをアルファベット順にソートする">
            <span class="material-icons" aria-hidden="true">sort</span>
          </button>
          <button aria-label="コレクションリンクをクリップボードにコピーする">
            <span class="material-icons" aria-hidden="true">link</span>
          </button>
          <a :href="downloadURL" download="my-collection.json">
            <span class="sr-only">コレクションをJSON形式でダウンロードする</span>
            <span class="material-icons" aria-hidden="true">save_alt</span>
          </a>
          <button aria-label="コレクションを空にする">
            <span class="material-icons" aria-hidden="true">delete_forever</span>
          </button>
        </div>
      </div>
      <div :class="classBySize.cWrapper">
        <button
          v-for="(item, i) in collections"
          :key="`${item.category}/${item.name}`"
          :class="classBySize.cButton"
          @dblclick="state.collection.splice(i, 1)"
          @keydown="state.collection.splice(i, 1)"
        >
          <img
            :alt="item.name"
            :src="item.path"
            :class="classBySize.image"
            height="64"
            width="64"
          />
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
