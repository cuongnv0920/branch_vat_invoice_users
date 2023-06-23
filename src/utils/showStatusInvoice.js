export function showStatusInvoice(status) {
  switch (status) {
    case true:
      return "Đã xử lý";
    case false:
      return "Chờ xử lý";
  }
}
