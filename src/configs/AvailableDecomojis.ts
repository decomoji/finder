import DecomojiBasic from "decomoji/configs/v5_basic.json";
import DecomojiExplicit from "decomoji/configs/v5_explicit.json";
import DecomojiExtra from "decomoji/configs/v5_extra.json";
import { Decomoji } from "@/models/Decomoji";
import { DecomojiConfig } from "@/models/DecomojiConfig";

const basics = DecomojiBasic.map<Decomoji>((item: DecomojiConfig) => {
  const { name, path, created, updated } = item;
  return {
    name,
    path,
    created,
    updated,
    category: "basic",
  };
});
const extras = DecomojiExtra.map<Decomoji>((item: DecomojiConfig) => {
  const { name, path, created, updated } = item;
  return {
    name,
    path,
    created,
    updated,
    category: "extra",
  };
});
const explicits = DecomojiExplicit.map<Decomoji>((item: DecomojiConfig) => {
  const { name, path, created, updated } = item;
  return {
    name,
    path,
    created,
    updated,
    category: "explicit",
  };
});

export const AvailableDecomojis = [...basics, ...extras, ...explicits];
