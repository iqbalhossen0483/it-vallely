import { Dispatch, SetStateAction } from "react";

export type ProductInputs = {
  specipications: { label: string; type: string; defaltValue: string }[];
  others: {
    label: string;
    type: string;
    defaltValue: string | number;
  }[];
};

export function MakeInputDataForUpdateProduct(
  data: Product,
  setProductInputs: Dispatch<SetStateAction<ProductInputs | null>>
) {
  const specipications = [];
  let item: any;
  for (item of data?.specifications) {
    let toStr = "";
    Object.entries(item).forEach(([key, value], index, arr) => {
      if (key !== "header") {
        toStr += `${key}: ${value}${arr.length !== index + 1 && " | "}`;
      }
    });
    specipications.push({
      label: item.header,
      type: "text",
      defaltValue: toStr,
    });
  }
  specipications.push({
    label: "description",
    type: "text",
    defaltValue: data.description,
  });
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

export function makeInputDataForAddProduct() {
  return [
    { label: "name", type: "text" },
    { label: "price", type: "number" },
    { label: "prevPrice", type: "number" },
    { label: "stock", type: "text" },
    { label: "category", type: "text" },
    { label: "productCode", type: "text" },
    { label: "brand", type: "text" },
    { label: "tags", type: "text" },
    { label: "keyFeatures", type: "text" },
  ];
}
