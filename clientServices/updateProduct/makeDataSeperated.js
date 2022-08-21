export function makeDataSeperated(peyload, specifications) {
  const specification = [];
  if (specifications.length) {
    for (const item of specifications) {
      if (peyload[item.label]) {
        let obj = { header: item.label };
        const itemArray = peyload[item.label]
          .replaceAll(" | ", ": ")
          .split(": ")
          .map((item) => item.trim());
        let i = 0;
        while (i < itemArray.length) {
          obj[itemArray[i]] = itemArray[i + 1];
          i += 2;
        }
        specification.push(obj);
        delete peyload[item.label];
      }
    }
  }
  return specification;
}
