const extractLabelFromKey = (key: string) => {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
};

export default extractLabelFromKey;
