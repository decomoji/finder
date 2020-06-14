import { CategoryName } from "@/models/CategoryName";

export interface DecomojiManagerListItem {
  name: string;
  category: CategoryName;
  path: string;
}

export type DecomojiManagerList = DecomojiManagerListItem[];
