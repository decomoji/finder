# Viewコンテナ
各ルートのViewを提供する。  
複数のコンポーネントにデータを受け渡す。  
Atomic Design で述べるところのPagesに該当する。

## 命名規則
例） `HogeFuga.vue`  
※ `RouteConfig['name']` と同等であることが望ましい

## できることと役割
- Store を参照できる
- Store に対してアクションを発行できる
- Containerコンポーネントどうしを連携させる
- Compositeコンポーネントどうしを連携させる
- 全てのコンポーネントを含むことができる
- 全てのコンポーネントをレイアウトする

## ルートとの対応
各Viewコンテナはそれぞれルートに対応する。  
`router.ts` に `RouteConfig` を定義してViewコンテナを引き当て、必要なパラメータを設定する。

### Viewコンテナ引き当て
以下の様に `RouteConfig` を定義する。

```ts
{
  path: '/hoge/:param',
  name: 'hoge',
  meta: {
    title: 'ほげ'
  },
  component: () =>
    import(/* webpackChunkName: "hoge" */ './views/Hoge.vue'),
  props: route => {
    const { param } = route.params
    return { param }
  }
}
```

#### `path` プロパティ
当該Viewコンテナを引き当てるパスを指定する。

#### `name` プロパティ
ルートの名称を指定する。

#### `meta.title`
ルートのドキュメントタイトルを指定する。

#### `component` プロパティ
当該Viewコンテナを Dynamic Import する。  
`webpackChunkName` には `name` と同等のものを指定する。

#### `props` プロパティ
当該Viewコンテナに受け渡すプロパティを返す関数を指定する。

### 要認証フラグ
当該Viewコンテナを認証必須にするには `RouteConfig['meta']` に以下のフラグを立てる。

```ts
{
  meta: {
    requiresAuth: true
  }
}
```

### 要画面ロック解除フラグ
当該Viewコンテナを画面ロック解除必須にするには `RouteConfig['meta']` に以下のフラグを立てる。

```ts
{
  meta: {
    requiresUnlock: true
  }
}
```
