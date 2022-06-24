export function filterProduct(
  key: string,
  action: "input" | "select",
  inputValue: string,
  filterValue: string,
  doSearch:(key: string, value: string)=> Promise<void>
) {
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
