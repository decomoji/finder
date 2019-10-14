import { NullableString } from '@/models/NullableString'

export interface Link {
  title: string
  href: string
  target: NullableString
  rel: NullableString
}