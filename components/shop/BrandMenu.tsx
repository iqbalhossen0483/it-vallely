import { Checkbox, FormControlLabel } from "@mui/material";

type Props = {
  filterBrandProducts(brands: string[]): void;
  brands: string[];
  filterBrand: string[];
  setFilterBrand: React.Dispatch<React.SetStateAction<string[]>>;
};

const BrandMenu = ({
  filterBrandProducts,
  brands,
  filterBrand,
  setFilterBrand,
}: Props) => {
  function handleBrand(brand: string) {
    if (filterBrand.includes(brand)) {
      const exist = filterBrand.filter((item) => item !== brand);
      filterBrandProducts(exist);
      setFilterBrand(exist);
    } else {
      filterBrandProducts([...filterBrand, brand]);
      setFilterBrand((prev) => [...prev, brand]);
    }
  }

  return (
    <div className='item'>
      <h3>Brand</h3>
      {brands.map((brand) => (
        <FormControlLabel
          onClick={() => {
            handleBrand(brand);
          }}
          style={{ display: "block" }}
          key={brand}
          control={<Checkbox />}
          label={brand}
        />
      ))}
    </div>
  );
};

export default BrandMenu;
