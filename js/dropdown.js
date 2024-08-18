var btnTitle = "Theme";

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    const arrow = document.querySelector(".dropbtn .arrow");
    dropdown.classList.toggle("show");
    if (dropdown.classList.contains("show")) {
        arrow.classList.remove("down");
        arrow.classList.add("up");
    } else {
        arrow.classList.remove("up");
        arrow.classList.add("down");
    }
}

/*document.addEventListener("DOMContentLoaded", function() {
    // Set the button's text content to the value of btnTitle
    var dropdownButton = document.querySelector('.dropbtn');
    if (dropdownButton) {
        dropdownButton.textContent = btnTitle;
    }
});
*/
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
