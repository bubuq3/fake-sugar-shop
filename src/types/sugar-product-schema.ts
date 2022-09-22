import { RichTextContent } from '@graphcms/rich-text-types';

export type SugarProductSchema = {
  title: string;
  subtitle?: string;
  description?: { raw: RichTextContent };
  brand?: string;
  price?: number;
  coverImage?: { url: string };
  id: string;
  slug?: string;
  stock: number;
  isNewProduct?: boolean;
  isOnDiscount?: boolean;
  discountValue?: number;
  quantity?: number;
};
