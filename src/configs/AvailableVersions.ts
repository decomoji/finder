import { AvailableDecomojis } from "@/configs/AvailableDecomojis";
import { Decomoji } from "@/models/Decomoji";

const creates = AvailableDecomojis.map((item) => item.created);

const updates = AvailableDecomojis.reduce((memo: string[], item: Decomoji) => {
  return item.updated ? memo.concat(item.updated) : memo;
}, []);

export const AvailableVersions = [
  ...new Set([...creates, ...updates]),
].sort((a, b) => a.localeCompare(b));
