export function showInputStatus(status) {
  switch (status) {
    case true:
      return "Thủ công";
    case false:
      return "Tự động";
  }
}
