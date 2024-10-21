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

  // Load components

});
