import { AvailableVersions } from "@/configs/AvailableVersions";
import { VersionItem } from "@/models/VersionItem";

export const DisplayVersionList: VersionItem[] = AvailableVersions.map<
  VersionItem
>((value: string) => ({
  text: value,
  value,
}));
