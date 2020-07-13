import { DecomojiBasic } from "@/configs/DecomojiBasic";
import { DecomojiExplicit } from "@/configs/DecomojiExplicit";
import { DecomojiExtra } from "@/configs/DecomojiExtra";
import { CategoryName } from "@/models/CategoryName";

export type Decomoji = {
  name: string;
  category: CategoryName;
};

export type AvailableDecomoji = Decomoji & {
  id: number;
};

const basics = DecomojiBasic.map<Decomoji>((name) => ({
  name,
  category: "basic",
}));
const extras = DecomojiExtra.map<Decomoji>((name) => ({
  name,
  category: "extra",
}));

const explicits = DecomojiExplicit.map<Decomoji>((name) => ({
  name,
  category: "explicit",
}));

export const AvailableDecomojis = [...basics, ...extras, ...explicits];
