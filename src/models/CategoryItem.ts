import { CategoryId } from '@/models/CategoryId'

export interface CategoryItem {
  id: CategoryId
  title_main: string
  title_sub: string
  selected: boolean
}
