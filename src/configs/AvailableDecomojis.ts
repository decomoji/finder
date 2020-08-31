import DecomojiBasic from "decomoji/configs/v5_basic.json";
import DecomojiExplicit from "decomoji/configs/v5_explicit.json";
import DecomojiExtra from "decomoji/configs/v5_extra.json";
import { CategoryName } from "@/models/CategoryName";

export type Decomoji = {
  name: string;
  category: CategoryName;
};

export type AvailableDecomoji = Decomoji;

const basics = DecomojiBasic.map<Decomoji>((item) => ({
  name: item.name,
  category: "basic",
}));
const extras = DecomojiExtra.map<Decomoji>((item) => ({
  name: item.name,
  category: "extra",
}));

const explicits = DecomojiExplicit.map<Decomoji>((item) => ({
  name: item.name,
  category: "explicit",
}));

export const AvailableDecomojis = [...basics, ...extras, ...explicits];
