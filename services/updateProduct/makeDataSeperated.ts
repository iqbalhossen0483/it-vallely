type S = { label: any; type: string; defaltValue: string }[];

export function makeDataSeperated(
  peyload: Product,
  specifications: S,
) {
  const specification: any[] = [];
  if (specifications.length) {
    specifications.forEach((item, index) => {
      if (item.label !== "description") {
        let obj: any = { header: item.label };
        const itemArray: any = specifications[index].defaltValue
          .replaceAll(" | ", ": ")
          .split(": ");
        let i = 0;
        while (i < itemArray.length) {
          obj[itemArray[i]] = itemArray[i + 1];
          i += 2;
        }
        specification.push(obj);
        delete peyload[item.label];
      }
    });
  }
  return specification;
}
