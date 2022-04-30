import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { DebounceInput } from "react-debounce-input";

const SearchBar = () => {
  function handleSearchText(text: string) {
    console.log(text);
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
