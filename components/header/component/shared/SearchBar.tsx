import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DebounceInput } from "react-debounce-input";
import { useEffect, useRef, useState } from "react";
import useStore from "../../../../contex/hooks/useStore";
import Image from "next/image";
import { useRouter } from "next/router";
type P = { showDiv: boolean; product: Product[] | null };

const SearchBar = () => {
  const [products, setProduct] = useState<P>({ showDiv: false, product: null });
  const result = useRef<HTMLDivElement>(null);
  const store = useStore();
  const router = useRouter();

  async function handleSearchText(text: string) {
    const res = await fetch(`/api/product?searchProduct=true`, {
      headers: {
        text,
        token: `${process.env.NEXT_PUBLIC_TOKEN_BEARRER}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setProduct({ showDiv: true, product: data });
    } else {
      store?.State.setAlert(data.message);
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const isContain = result.current?.contains(e.target as Node);
      if (!isContain) {
        setProduct({ showDiv: false, product: null });
      }
    });
  }, []);

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
      <div hidden={!products.showDiv} ref={result} className='result'>
        {products.product?.length ? (
          products.product.map((product) => (
            <div
              onClick={() => router.push(`/shop/${product._id}`)}
              className='matched'
              key={product._id}
            >
              <Image
                height={50}
                width={50}
                src={product.productImg.imgUrl}
                alt=''
              />
              <p>{product.name.slice(0, 30)}...</p>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>
            <p>No product matched</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
