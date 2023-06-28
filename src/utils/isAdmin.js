function isAdmin(role) {
  if (role === "admin" || role === "accountant") {
    return true;
  } else {
    return false;
  }
}

export default isAdmin;
