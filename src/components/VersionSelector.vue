<template>
  <details class="Detail">
    <summary class="__summary">バージョン</summary>
    <div class="__panel">
      <label
        v-for="version in displayVersionList"
        :key="version.value"
        class="__label"
      >
        <input
          :value="version.value"
          :checked="decomoji.version[version.value]"
          class="__checkbox"
          name="version"
          type="checkbox"
          @change="handleCange(version.value)"
        />
        {{ version.text }}
      </label>
    </div>
  </details>
</template>

<script lang="ts">
import { AvailableVersions } from "@/configs/AvailableVersions";
import { DisplayVersionList } from "@/configs/DisplayVersionList";
import { VersionName } from "@/models/VersionName";
import { VersionItem } from "@/models/VersionItem";
import {
  DecomojiAction,
  DecomojiViewModel,
} from "@/store/modules/decomoji/models";
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

@Component
export default class VersionSelector extends Vue {
  // viewModel を引き当てる
  @Getter("decomoji/viewModel") decomoji!: DecomojiViewModel;

  // アクションを引き当てる
  @Action("decomoji/updateVersion")
  updateVersion!: DecomojiAction["updateVersion"];

  displayVersionList = DisplayVersionList;

  // @listen - 表示カテゴリーを選択する
  handleCange(versionName: VersionName) {
    // 更新前の値を反転してアクションに渡す
    this.updateVersion({
      name: versionName,
      value: !this.decomoji.version[versionName],
    });
  }
}
</script>
