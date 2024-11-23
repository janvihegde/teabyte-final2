document.getElementById("Status1").onclick = function() {
    this.classList.toggle("clicked"); 
};
document.getElementById("Status2").onclick = function() {
    this.classList.toggle("clicked"); 
};

document.addEventListener('DOMContentLoaded', function () {
    const featuresMenu = document.getElementById('featuresMenu');
    const submenu = featuresMenu.querySelector('.submenu-content');

    // Show the submenu when hovering or focusing
    featuresMenu.addEventListener('mouseenter', () => {
        submenu.style.display = 'block';
    });

    // Hide the submenu when leaving the menu
    featuresMenu.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
    });

    // Ensure submenu stays visible when hovering over it
    submenu.addEventListener('mouseenter', () => {
        submenu.style.display = 'block';
    });

    submenu.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
    });
});
