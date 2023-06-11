export function showPermissionName(role) {
  switch (role[0]) {
    case "admin":
      return "Quản trị";
    case "user":
      return "Người sử dụng";
    case "post":
      return "Viết bài";
    case "margin":
      return "Biên độ tỷ giá";
    case "postAndMargin":
      return "Đăng bài viết & Biên độ tỷ giá";
  }
}
