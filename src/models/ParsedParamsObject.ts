import { CategoriesObject } from "@/models/CategoriesObject";

export interface ParsedParamsObject extends CategoriesObject {
  category?: string;
  created?: string;
  dark?: string;
  reacted?: string;
  search?: string;
  size?: string;
  updated?: string;
  version?: string;
  vertical?: string;
}
