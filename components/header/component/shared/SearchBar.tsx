import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import useStore from "../../../../contex/hooks/useStore";

const SearchBar = () => {
  const [products, setProduct] = useState<Product[] | null>(null);
  const store = useStore();
  async function handleSearchText(text: string) {
    const res = await fetch(`/api/product?searchProduct=true`, {
      headers: {
        text,
      },
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);

      setProduct(data);
    } else {
      store?.State.setAlert(data.message);
    }
  }

  return (
    <div className='search-bar-wrapper'>
      <div className='search-input-wrapper'>
        <DebounceInput
          type='text'
          className='input search-input'
          placeholder='Search Product...'
          minLength={3}
          debounceTimeout={500}
          onChange={(e) => handleSearchText(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
