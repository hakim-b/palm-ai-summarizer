export const wordCount = (strIn: string) => {
  const trimStr = strIn?.trim();

  if (trimStr === "") {
    return 0;
  }

  const wordArr = trimStr?.split(/\s+/);
  return wordArr?.length;
};
