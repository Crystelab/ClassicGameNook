document.addEventListener("DOMContentLoaded", function () {
  function loadComponent(elementId, componentPath) {
    fetch(componentPath)
      .then((response) => response.text())
      .then((data) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = data;
          console.log(`Loaded content into #${elementId}`);
        } else {
          console.error(`Element with ID ${elementId} not found.`);
        }
      })
      .catch((error) =>
        console.error(`Failed to load component from ${componentPath}:`, error)
      );
  }

  //Tic-Tac-Toe assets
  document.querySelectorAll(".o-container").forEach((container) => {
    fetch("assets/tictactoe/o.html")
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading the SVG:", error);
      });
  });

  document.querySelectorAll(".x-container").forEach((container) => {
    fetch("assets/tictactoe/x.html")
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading the SVG:", error);
      });
  });

  document.querySelectorAll(".grid-container").forEach((container) => {
    fetch("assets/tictactoe/grid.html")
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading grid:", error);
      });
  });
  
  

  // Load components
  loadComponent("navbar", "html/components/navbar.html");
  loadComponent("separator", "html/components/separator.html");
  loadComponent("logo-container", "assets/logo.html");
});
