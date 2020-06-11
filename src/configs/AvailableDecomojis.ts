import { DecomojiBasic } from "@/configs/DecomojiBasic";
import { DecomojiExplicit } from "@/configs/DecomojiExplicit";
import { DecomojiExtra } from "@/configs/DecomojiExtra";
import { DecomojiPreview } from "@/configs/DecomojiPreview";

const basics = DecomojiBasic.map(name => ({ name, category: "basic" }));
const extras = DecomojiExtra.map(name => ({ name, category: "extra" }));
const explicits = DecomojiExplicit.map(name => ({
  name,
  category: "explicit"
}));
const previews = DecomojiPreview.map(name => ({ name, category: "preview" }));

export const AvailableDecomojis = [
  ...basics,
  ...extras,
  ...explicits,
  ...previews
].map((item, index) => ({ ...item, ...{ id: index } }));
