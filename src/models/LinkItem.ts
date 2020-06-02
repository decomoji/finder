import { NullableString } from "@/models/NullableString";

export interface LinkItem {
  title: string;
  href: string;
  target: NullableString;
  rel: NullableString;
}
