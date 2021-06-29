export const toUSD = (num: number) => {
  return num.toLocaleString("en-US", {style: "currency",currency: "USD"})
}

export const containsStr = (str1: string, str2: string) => {
  if (str1 === "") return false;
  if (str2 === "") return true;
  for (let i = 0; i + str2.length <= str1.length; i++) {
    let str2Pos = 0;
    while (str2Pos < str2.length) {
      if (str1[i + str2Pos] !== str2[str2Pos]) break;
      str2Pos++;
    }

    if (str2Pos === str2.length) return true;
  }
  return false;
};