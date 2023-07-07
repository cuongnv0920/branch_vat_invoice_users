function isAdmin(role) {
  if (role === "accountant") {
    return true;
  } else {
    return false;
  }
}

export default isAdmin;
