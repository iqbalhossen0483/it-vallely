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
import React, { useEffect, useState } from "react";
import useStore from "../../../contex/hooks/useStore";
import { fetchAPI } from "../../../services/shared/sharedFunction";
interface Props {
  value: number;
  index: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
const ManageProduct = ({ value, index, setValue }: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filterValue, setFilterValue] = useState<string>("Images");
  const heads = [
    "Images",
    "Product Name",
    "Price",
    "Product Code",
    "Stock",
    "Order Pending",
  ];
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

  return (
    <div hidden={value !== index}>
      <Table>
        <TableHead>
          <TableRow>
            {heads.map((item, index) => (
              <TableCell key={index}>{item}</TableCell>
            ))}
            <TableCell>
              <TextField
                sx={{ width: "100%", textAlign: "center" }}
                id='standard-select-currency'
                helperText='filter order'
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                variant='standard'
                select
              >
                {heads.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product, index) => (
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
                    setValue(2);
                  }}
                  variant='outlined'
                >
                  Edit Product
                </Button>
                <Button variant='outlined'>Delete Product</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProduct;
