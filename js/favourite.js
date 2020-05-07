const refreshFavorite = () => {
    let aside = document.getElementById("aside");
    while (aside.firstChild)
        aside.removeChild(aside.firstChild)
    Object.keys(localStorage).forEach(jokeId => {
        createJoke("aside", JSON.parse(localStorage.getItem(jokeId)));
    });
};

let button = document.getElementById('toggle-menu');
button.addEventListener('click', function (event) {
    event.preventDefault();

    let bodyAside = document.getElementById('body');
    bodyAside.classList.toggle('body-aside');

    let menuToggle = document.getElementById('toggle-menu');
    menuToggle.classList.toggle('body__menu-toggle_aside');

    let asideBackdrop = document.getElementById('aside-backdrop');
    asideBackdrop.classList.toggle('body__aside-backdrop');

    let aside = document.getElementById('aside');
    aside.classList.toggle('aside_show');
});
