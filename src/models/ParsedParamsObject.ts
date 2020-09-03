import { CategoriesObject } from "@/models/CategoriesObject";

export interface ParsedParamsObject extends CategoriesObject {
  category?: string;
  dark?: string;
  reacted?: string;
  search?: string;
  size?: string;
  version?: string;
  vertical?: string;
}
