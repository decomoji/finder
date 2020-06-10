import { RootState } from "@/store/models";
import { UiGetters as ThisGetter, UiState as ThisState } from "./models";
import { GetterTree } from "vuex";

export const getters: GetterTree<ThisState, RootState> = {
  /**
   * ViewModel を返す
   * @param state
   * @param hasGlobalLoadingQueue
   */
  viewModel: (state): ThisGetter["viewModel"] => ({
    ...state
  })
};
