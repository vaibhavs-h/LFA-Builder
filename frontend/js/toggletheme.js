const THEME_KEY = "lfa-theme";
// Apply saved theme on load
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}