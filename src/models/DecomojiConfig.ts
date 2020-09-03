import { VersionName } from "@/models/VersionName";

export interface DecomojiConfig {
  name: string;
  path: string;
  created: VersionName;
  updated?: VersionName;
}
