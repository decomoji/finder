<template>
  <main>
    <h1 class="VisuallyHidden">デコモジファインダー</h1>
    <Header />
    <Main />
    <Collection />
  </main>
</template>

<script lang="ts">
import Collection from "@/components/Collection.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import { CategoriesObject } from "@/models/CategoriesObject";
import { CollectionActions } from "@/store/modules/collection/models";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({
  components: {
    Collection,
    Header,
    Main
  }
})
export default class Top extends Vue {
  // アクションを引き当てる
  @Action("collection/receive")
  receive!: CollectionActions["receive"];

  // 入力プロパティを定義する
  @Prop() query!: CategoriesObject;

  /**
   * @lifecyle
   */
  created() {
    return this.receive(this.query);
  }
}
</script>
