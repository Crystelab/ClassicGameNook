var btnTitle = "Theme";

function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
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
        const arrow = document.querySelector(".dropbtn .arrow");
        arrow.classList.remove("up");
        arrow.classList.add("down");
    }
};