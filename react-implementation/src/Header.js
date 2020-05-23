import React from 'react'

export default function Header() {
    const openAside = () => {
        let bodyAside = document.getElementById('body');
        bodyAside.classList.toggle('body-aside');
        let menuToggle = document.getElementById('toggle-menu');
        menuToggle.classList.toggle('body__menu-toggle_aside');
        let asideBackdrop = document.getElementById('aside-backdrop');
        asideBackdrop.classList.toggle('body__aside-backdrop');
        let aside = document.getElementById('aside');
        aside.classList.toggle('aside_show');
    }

    return (
        <header className="header" id="header">
            <h1 className="header__logo-text" id="logo-text">msi 2020</h1>
            <button className="body__menu-toggle" id="toggle-menu" onClick={() => openAside()}>toggle menu</button>
            <p className="body__favourite">Favourite</p>
        </header>
    )
}
