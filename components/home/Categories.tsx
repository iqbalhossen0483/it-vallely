import { ListItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const Categories = ({ categories }: { categories: string[] }) => {
  const router = useRouter();

  return (
    <div className='categories'>
      <h3>Popular Categories</h3>
      {categories.map((category) => (
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
