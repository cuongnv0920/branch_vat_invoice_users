export function showPermissionName(role) {
  switch (role) {
    case "admin":
      return "Quản trị";
    case "user":
      return "Cán bộ khởi tạo";
    case "accountant":
      return "Kế toán";
    case "post":
      return "Viết bài";
    case "margin":
      return "Biên độ tỷ giá";
    case "postAndMargin":
      return "Đăng bài viết & Biên độ tỷ giá";
  }
}
