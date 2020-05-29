import { CategoryId } from '@/models/CategoryId'

export interface DecomojiCollectionItem {
  name: string
  category: CategoryId
}

export type DecomojiCollection = DecomojiCollectionItem[]
