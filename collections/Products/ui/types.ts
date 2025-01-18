export type OptionKey = any;
export type Option = OptionKey["values"][number];
export type ProductVariant = any;

export type InfoType = {
  options: {
    key: {
      label: OptionKey["label"];
      slug: OptionKey["slug"];
    };
    label: Option["label"];
    slug: Option["slug"];
  }[];
  price: {
    amount: number;
    currency: string;
  };
  productName: string;
  stock: number;
};
