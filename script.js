function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.className = savedTheme;
  } else {
    document.body.className = "theme-light"; 
  }
}

function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("theme-light")) {
    body.className = "theme-dark";
    localStorage.setItem("theme", "theme-dark");
  } else {
    body.className = "theme-light";
    localStorage.setItem("theme", "theme-light");
  }
}

applySavedTheme();

document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = document.getElementById("themeSwitcher");
  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", toggleTheme);
  }
});
