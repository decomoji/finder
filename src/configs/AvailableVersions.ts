import { AvailableDecomojis } from "@/configs/AvailableDecomojis";
import { Decomoji } from "@/models/Decomoji";

const creates = AvailableDecomojis.map((item) => item.created);

const updates = AvailableDecomojis.map((item: Decomoji) => item.updated).filter(
  (item): item is Exclude<typeof item, undefined> => item !== undefined
);

// creates と updates をマージして重複を取り除く
const uniqued = Array.from(new Set([...creates, ...updates]));

export const AvailableVersions = uniqued.sort((a, b) => a.localeCompare(b));
