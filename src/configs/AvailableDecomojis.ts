import { DecomojiBasic } from "@/configs/DecomojiBasic";
import { DecomojiExplicit } from "@/configs/DecomojiExplicit";
import { DecomojiExtra } from "@/configs/DecomojiExtra";
import { DecomojiName } from "@/models/DecomojiName";
import { DecomojiPreview } from "@/configs/DecomojiPreview";

export const AvailableDecomojis = Object.freeze({
  basic: DecomojiBasic as DecomojiName[],
  extra: DecomojiExtra as DecomojiName[],
  explicit: DecomojiExplicit as DecomojiName[],
  preview: DecomojiPreview as DecomojiName[]
});
