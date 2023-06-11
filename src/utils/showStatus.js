export function showStatus(status) {
  switch (status) {
    case true:
      return "Hoạt động";
    case false:
      return "Tạm ngừng";
  }
}
