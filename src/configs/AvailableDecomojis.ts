import { DecomojiBasic } from "@/configs/DecomojiBasic";
import { DecomojiExplicit } from "@/configs/DecomojiExplicit";
import { DecomojiExtra } from "@/configs/DecomojiExtra";
import { DecomojiItem } from "@/models/DecomojiItem";
import { DecomojiPreview } from "@/configs/DecomojiPreview";

export const AvailableDecomojis = Object.freeze({
  basic: DecomojiBasic as DecomojiItem[],
  extra: DecomojiExtra as DecomojiItem[],
  explicit: DecomojiExplicit as DecomojiItem[],
  preview: DecomojiPreview as DecomojiItem[]
});
