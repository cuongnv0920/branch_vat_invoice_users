export function showPermissionName(role) {
  switch (role) {
    case "admin":
      return "Quản trị";
    case "user":
      return "Cán bộ khởi tạo";
    case "accountant":
      return "Kế toán";
  }
}
