import { DecomojiName } from '@/models/DecomojiName';

export type CategorizedItems = {
  basic: DecomojiName[];
  explicit: DecomojiName[];
  extra: DecomojiName[];
  preview: DecomojiName[];
};