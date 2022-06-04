import { ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import useStore from "../../contex/hooks/useStore";

const Categories = () => {
  const router = useRouter();
  const store = useStore();

  return (
    <div className='categories'>
      <h3>Popular Categories</h3>
      {store?.State.categories.map((category) => (
        <ListItem
          onClick={() => router.push(`/shop/category/${category}`)}
          key={category}
        >
          {category}
        </ListItem>
      ))}
    </div>
  );
};

export default Categories;
