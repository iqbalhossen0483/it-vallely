import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../contex/hooks/useStore";
import { fetchAPI } from "../../../clientServices/shared/sharedFunction";
import Input from "../../shared/utilitize/Input";
interface Props {
  value: number;
  index: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
const ManageProduct = ({ value, index, setValue }: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filterValue, setFilterValue] = useState<string>("All");
  const [inputValue, setInputValue] = useState("");
  const heads = [
    "Images",
    "Product Name",
    "Price",
    "Product Code",
    "Stock",
    "Order Pending",
  ];
  const filters = ["All", "Price", "Product Code", "Order pending", "Stock"];
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetchAPI<Product[]>("/api/product");
      if (res.data) {
        setProducts(res.data);
      } else if (res.error) {
        store?.State.setAlert(res.error);
      } else if (res.netProblem) {
        store?.State.setError(res.netProblem);
      }
    })();
  }, [store?.State]);

  async function doSearch(key: string, value: string) {
    const res = await fetchAPI<Product[]>(
      `/api/product?key=${key}&value=${value}&filterProduct=true`
    );
    if (res.data && res.data.length) {
      setInputValue("");
      setProducts(res.data);
    } else if (res.data && !res.data.length) {
      store?.State.setAlert("No result matched");
    }
  }
  function getFilterProduct(key: string, action: "input" | "select") {
    if (action === "input") {
      if (key === "Enter") {
        if (inputValue) {
          const value =
            filterValue !== "Product Code"
              ? parseInt(inputValue) + 1
              : inputValue;
          doSearch(filterValue, value.toString());
        }
      }
    } else {
      if (key === "All") {
        doSearch(key, inputValue);
      }
    }
  }

  type IMG = { imgId: string; imgUrl: string };
  type Params = { id: string; productImg: IMG; galleryImg: IMG[] };
  async function deleteProduct({ id, productImg, galleryImg }: Params) {
    const confirm = window.confirm("Are you sure to delete this product");
    if (confirm) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("productImg", JSON.stringify(productImg));
      formData.append("galleryImg", JSON.stringify(galleryImg));

      const res = await fetch("/api/product", {
        method: "DELETE",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        store?.State.setAlert("Deleted successfull");
        const exist = products?.filter((item) => item._id !== id);
        setProducts(exist!);
      } else {
        store?.State.setAlert(data.message);
      }
    }
  }

  return (
    <div hidden={value !== index}>
      <Table>
        <TableHead>
          <TableRow>
            {heads.map((item, index) => (
              <TableCell key={index}>{item}</TableCell>
            ))}
            <TableCell>
              <div className='filter-wrapper-manage-product'>
                <TextField
                  sx={{ width: "100%", textAlign: "center" }}
                  id='standard-select-currency'
                  helperText='filter order'
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    getFilterProduct(e.target.value, "select");
                  }}
                  variant='standard'
                  select
                >
                  {filters.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
                {filterValue !== "All" && (
                  <Input
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUpCapture={(e) => getFilterProduct(e.key, "input")}
                    disabled={filterValue === "All"}
                    value={inputValue}
                    type='number'
                    label='Amount'
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products?.map((product) => (
              <TableRow
                onClick={() => router.push(`/shop/${product._id}`)}
                sx={{ cursor: "pointer" }}
                key={product._id}
                hover
              >
                <TableCell width={30}>
                  <Image
                    width={100}
                    height={100}
                    src={product.productImg.imgUrl}
                    alt=''
                  />
                </TableCell>
                <TableCell width={250}>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.productCode}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.orderPending || 0}</TableCell>
                <TableCell width={200}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/deshboard?id=${product._id}`);
                      setValue(6);
                    }}
                    variant='outlined'
                  >
                    Edit Product
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProduct({
                        id: product._id,
                        productImg: product.productImg,
                        galleryImg: product.productImgGallery,
                      });
                    }}
                    variant='outlined'
                  >
                    Delete Product
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProduct;
