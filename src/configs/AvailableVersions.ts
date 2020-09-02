import { AvailableDecomojis } from "@/configs/AvailableDecomojis";
import { Decomoji } from "@/models/Decomoji";

const creates = AvailableDecomojis.map((item) => item.created);

const updates = AvailableDecomojis.map((item: Decomoji) => item.updated).filter(
  (item): item is Exclude<typeof item, undefined> => item !== undefined
);

export const AvailableVersions = [
  ...new Set([...creates, ...updates]),
].sort((a, b) => a.localeCompare(b));
