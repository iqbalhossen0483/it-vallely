import useStore from "../../../contex/hooks/useStore";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "../../shared/utilitize/Input";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Button,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  fetchAPI,
  handleError,
} from "../../../clientServices/shared/sharedFunction";
import {
  deleteProduct,
  Params,
} from "../../../clientServices/manageProduct/deleteProduct";
import { filterProduct } from "../../../clientServices/manageProduct/filterProduct";
import { initialFn } from "../../../clientServices/manageProduct/initialFn";
import { count } from "console";

interface Props {
  value: number;
  index: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export type ProductAPI = { count: number | null; data: Product[] | null };

const ManageProduct = ({ value, index, setValue }: Props) => {
  const filters = ["All", "Price", "Product Code", "Order pending", "Stock"],
    [products, setProducts] = useState<ProductAPI>({ count: null, data: null }),
    [filterValue, setFilterValue] = useState<string>("All"),
    [categories, setCategories] = useState<string[]>([]),
    [category, setCategory] = useState("All"),
    [inputValue, setInputValue] = useState(""),
    [searchProduct, setSearchProduct] = useState<{
      key: string;
      value: string;
    } | null>(null),
    store = useStore(),
    router = useRouter(),
    heads = [
      "Images",
      "Product Name",
      "Price",
      "Product Code",
      "Stock",
      "Order Pending",
    ];

  //fetch data;
  useEffect(() => {
    initialFn(setProducts, setCategories, store?.State!, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.State.update]);

  //filter product and manage start;
  async function doSearch(key: string, value: string, page?: number) {
    if (key !== "All") {
      setSearchProduct({ key, value });
    } else setSearchProduct(null);

    const res = await fetchAPI<{ count: number; data: Product[] }>(
      `/api/product?key=${key}&value=${value}&page=${
        page || 0
      }&filterProduct=true`,
      {
        headers: {
          token: `${process.env.NEXT_PUBLIC_APP_TOKEN}`,
        },
      }
    );
    if (res.data && res.data.data.length) {
      setInputValue("");
      setProducts({ count: res.data?.count, data: res.data?.data! });
    } else if (res.data && !res.data.data.length) {
      store?.State.setAlert({ msg: "No result matched", type: "info" });
    }
  }
  function handleFilterProduct(key: string, action: "input" | "select") {
    filterProduct(key, action, inputValue, filterValue, doSearch);
  } //filter product and manage end;;

  //delete product
  function handledeleteProduct(peyload: Params) {
    deleteProduct(peyload, store, products, setProducts);
  } //till;

  function handlePagination(number: number) {
    if (searchProduct) {
      doSearch(searchProduct.key, searchProduct.value, number);
    } else {
      initialFn(setProducts, setCategories, store?.State!, number);
    }
  }

  if (value !== index) return null;
  return (
    <div>
      <div className='flex justify-center'>
        <TextField
          sx={{ width: "150px", textAlign: "center" }}
          id='standard-select-currency'
          helperText='filter order'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (e.target.value !== "All") {
              doSearch("category", e.target.value);
            } else doSearch("All", e.target.value);
          }}
          variant='standard'
          select
        >
          {categories.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </div>
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
                    handleFilterProduct(e.target.value, "select");
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
                    onKeyUpCapture={(e) => handleFilterProduct(e.key, "input")}
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
            products.data?.map((product) => (
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
                <TableCell align='center'>{product.productCode}</TableCell>
                <TableCell align='center'>{product.stock}</TableCell>
                <TableCell align='center'>
                  {product.orderPending || 0}
                </TableCell>
                <TableCell width={200}>
                  <Button
                    style={{ width: "49%", marginRight: "2%" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/deshboard?id=${product._id}`);
                      setValue(6);
                    }}
                    variant='outlined'
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    style={{ width: "49%" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handledeleteProduct({
                        id: product._id,
                        productImg: product.productImg,
                        galleryImg: product.productImgGallery,
                      });
                    }}
                    variant='outlined'
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className=' mt-5 flex justify-center'>
        <Pagination
          onChange={(e, page) => handlePagination(page - 1)}
          count={Math.ceil(products.count ? products.count / 10 : 1)}
          color='primary'
        />
      </div>
    </div>
  );
};

export default ManageProduct;
