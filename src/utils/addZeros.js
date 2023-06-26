export function addZeros(data) {
  if (data && data.length < 8) {
    const zerosToAdd = 8 - data.length;
    const paddedData = "0".repeat(zerosToAdd) + data;
    return paddedData;
  }

  return data;
}
