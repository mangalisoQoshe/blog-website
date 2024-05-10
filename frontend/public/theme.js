(function initTheme() {
  var theme = localStorage.getItem("colorScheme") || "light";
 document.querySelector("html").setAttribute("color-scheme",theme);

})();
