import { CategoryId } from "@/models/CategoryId";

export interface DecomojiManagerListItem {
  name: string;
  category: CategoryId;
  path: string;
}

export type DecomojiManagerList = DecomojiManagerListItem[];
