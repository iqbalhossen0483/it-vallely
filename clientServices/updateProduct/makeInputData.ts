import { Dispatch, SetStateAction } from "react";

export type ProductInputs = {
  specipications: { label: any; type: string; defaltValue: string }[];
  others: {
    label:
      | "name"
      | "price"
      | "prevPrice"
      | "stock"
      | "category"
      | "productCode"
      | "brand"
      | "tags"
      | "keyFeatures";
    type: string;
    defaltValue: string | number;
  }[];
};

export function MakeInputDataForUpdateProduct(
  data: Product,
  setProductInputs: Dispatch<SetStateAction<ProductInputs>>
) {
  const specipications = [];
  let item: any;
  if (data.specifications) {
    for (item of data.specifications) {
      let toStr = "";
      Object.entries(item).forEach(([key, value], index, arr) => {
        if (key !== "header") {
          toStr += `${key}: ${value}${arr.length !== index + 1 ? " | " : ""}`;
        }
      });
      specipications.push({
        label: item.header,
        type: "text",
        defaltValue: toStr,
      });
    }
  }
  setProductInputs({
    specipications,
    others: [
      { label: "name", type: "text", defaltValue: data.name },
      { label: "price", type: "number", defaltValue: data.price },
      { label: "prevPrice", type: "number", defaltValue: data.prevPrice || "" },
      { label: "stock", type: "text", defaltValue: data.stock },
      { label: "category", type: "text", defaltValue: data.category },
      { label: "productCode", type: "text", defaltValue: data.productCode },
      { label: "brand", type: "text", defaltValue: data.brand },
      { label: "tags", type: "text", defaltValue: `${data.tags.join(" | ")}` },
      {
        label: "keyFeatures",
        type: "text",
        defaltValue: `${data.keyFeatures.join(" | ")}`,
      },
    ],
  });
}
