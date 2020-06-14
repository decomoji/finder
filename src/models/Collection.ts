import { CategoryName } from "@/models/CategoryName";

export interface CollectionItem {
  name: string;
  category: CategoryName;
}

export type Collection = CollectionItem[];
