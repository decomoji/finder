import { CategoryName } from "@/models/CategoryName";
import { DecomojiConfig } from "@/models/DecomojiConfig";

export interface Decomoji extends DecomojiConfig {
  category: CategoryName;
}
