export function logoutFunction() {
  localStorage.removeItem('token');
  localStorage.clear();
  return;
}
