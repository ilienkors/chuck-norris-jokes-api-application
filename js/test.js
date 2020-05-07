(function () {
    'use strict';

    /**
     * test function
     * @param {string} desc
     * @param {function} fn
     */
    function it(desc, fn) {
        try {
            fn();
            console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
        } catch (error) {
            console.log('\n');
            console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
            console.error(error);
        }
    }

    function assert(isTrue) {
        if (!isTrue) {
            throw new Error();
        }
    }

    /* jokes.js */

    console.log('\x1b[34m\x1b[0m' + "jokes.js");
    it('should clear jokes', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<div id="main-jokes"><div class="main-aside_joke"></div></div>';

        clearJokes();

        assert(selector.innerHTML.toLowerCase()
            .includes('<div id="main-jokes"></div>'));

        selector.innerHTML = '';
    });

    it('should create a joke', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<div id="main-jokes"></div>';

        const resJoke = {
            id: "id",
            url: "url",
            value: "value",
            categories: ["category"],
            updated_at: "2020-01-05 13:42:29.296379"
        };
        createJoke('main-jokes', resJoke);

        assert(selector.innerHTML.toLowerCase()
            .includes('<div class="jokes__joke"><button class="jokes__button-like"><img class="heart-icon" id="main-jokesid" src="./icons/unliked.svg"></button><div class="jokes__joke-description"><img class="jokes__message-icon" src="./icons/message.svg"><div class="jokes__joke-content"><a class="jokes__joke-link" href="url">id: id</a><p class="jokes__joke-text">value</p><p class="jokes__last-update">last update: ' + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + ' hours ago</p><p class="jokes__joke-category">category</p></div></div></div>'));

        selector.innerHTML = '';
    });

    /* categories.js */

    console.log('\x1b[34m\x1b[0m' + "categories.js");
    it('should add category button', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<div id="categories"></div>';

        createCategory("category");

        assert(selector.innerHTML.toLowerCase()
            .includes('<button class="categories__category">category</button>'));

        selector.innerHTML = '';
    });

    it('should remove all active categories', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<button class="categories__category categories__category_active"></button>';

        removeAllActiveCategories();
        assert(selector.innerHTML.toLowerCase()
            .includes('<button class="categories__category"></button>'));

        selector.innerHTML = '';
    });

    it('should add click event on category button', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<button class="categories__category" id="category"></button>';

        clickCategory();

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        let category = document.getElementById("category");
        category.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
            .includes('<button class="categories__category categories__category_active" id="category"></button>'));

        selector.innerHTML = '';
    });

    /* favourite.js */

    console.log('\x1b[34m\x1b[0m' + "favourite.js");
    it('should refresh favourites !(clear localSorage)', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<div id="aside"><div class="aside_joke"></div></div>';

        localStorage.clear();
        const resJoke = {
            id: "id",
            url: "url",
            value: "value",
            categories: ["category"],
            updated_at: "2020-01-05 13:42:29.296379"
        };
        localStorage.setItem(resJoke.id, JSON.stringify(resJoke));

        refreshFavorite();

        assert(selector.innerHTML.toLowerCase()
            .includes('<div class="jokes__joke"><button class="jokes__button-like"><img class="heart-icon" id="asideid" src="./icons/liked.svg"></button><div class="jokes__joke-description"><img class="jokes__message-icon" src="./icons/message.svg"><div class="jokes__joke-content"><a class="jokes__joke-link" href="url">id: id</a><p class="jokes__joke-text">value</p><p class="jokes__last-update">last update: ' + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + ' hours ago</p><p class="jokes__joke-category">category</p></div></div></div>'));

        localStorage.clear();
        selector.innerHTML = '';
    });

    it('should add classes for view with right panel after click event', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<button id="toggle-menu">toggle</button><div id="body"></div><div id="toggle-menu"></div><div id="aside-backdrop"></div><div id="aside"></div>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        addFavButton();

        let button = document.getElementById('toggle-menu');
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
            .includes('<button id="toggle-menu" class="body__menu-toggle_aside">toggle</button><div id="body" class="body-aside"></div><div id="toggle-menu"></div><div id="aside-backdrop" class="body__aside-backdrop"></div><div id="aside" class="aside_show"></div>'));
        selector.innerHTML = '';
    });

    /* radios.js */

    console.log('\x1b[34m\x1b[0m' + "radios.js");
    it('should add random joke', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<input type="checkbox" id="random" checked><input type="checkbox" id="from-categories"><input type="checkbox" id="search"><div id="main-jokes"></div><button id="joke-button">button</button>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        const resJoke = {
            id: "id",
            url: "url",
            value: "value",
            categories: ["category"],
            updated_at: "2020-01-05 13:42:29.296379"
        };

        getJoke = (stub) => {
            createJoke("main-jokes", resJoke);
        };

        addJokeButton();

        let button = document.getElementById("joke-button");
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
        .includes('<div class="jokes__joke"><button class="jokes__button-like"><img class="heart-icon" id="main-jokesid" src="./icons/unliked.svg"></button><div class="jokes__joke-description"><img class="jokes__message-icon" src="./icons/message.svg"><div class="jokes__joke-content"><a class="jokes__joke-link" href="url">id: id</a><p class="jokes__joke-text">value</p><p class="jokes__last-update">last update: ' + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + ' hours ago</p><p class="jokes__joke-category">category</p></div></div></div>'));

        selector.innerHTML = '';
    });

    it('should add random category joke', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<input type="checkbox" id="random"><input type="checkbox" id="from-categories" checked><input type="checkbox" id="search"><div id="main-jokes"></div><button id="joke-button">button</button>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        const resJoke = {
            id: "id",
            url: "url",
            value: "value",
            categories: ["category"],
            updated_at: "2020-01-05 13:42:29.296379"
        };

        getJoke = (stub) => {
            createJoke("main-jokes", resJoke);
        };

        addJokeButton();

        let button = document.getElementById("joke-button");
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
        .includes('<div class="jokes__joke"><button class="jokes__button-like"><img class="heart-icon" id="main-jokesid" src="./icons/unliked.svg"></button><div class="jokes__joke-description"><img class="jokes__message-icon" src="./icons/message.svg"><div class="jokes__joke-content"><a class="jokes__joke-link" href="url">id: id</a><p class="jokes__joke-text">value</p><p class="jokes__last-update">last update: ' + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + ' hours ago</p><p class="jokes__joke-category">category</p></div></div></div>'));

        selector.innerHTML = '';
    });

    it('should add search jokes', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<input type="text" id="search-input" value="123"><input type="checkbox" id="random"><input type="checkbox" id="from-categories"><input type="checkbox" id="search" checked><div id="main-jokes"></div><button id="joke-button">button</button>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        const resJoke = {
            id: "id",
            url: "url",
            value: "value",
            categories: ["category"],
            updated_at: "2020-01-05 13:42:29.296379"
        };

        getJokes = (stub) => {
            createJoke("main-jokes", resJoke);
        };

        addJokeButton();

        let button = document.getElementById("joke-button");
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
        .includes('<div class="jokes__joke"><button class="jokes__button-like"><img class="heart-icon" id="main-jokesid" src="./icons/unliked.svg"></button><div class="jokes__joke-description"><img class="jokes__message-icon" src="./icons/message.svg"><div class="jokes__joke-content"><a class="jokes__joke-link" href="url">id: id</a><p class="jokes__joke-text">value</p><p class="jokes__last-update">last update: ' + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + ' hours ago</p><p class="jokes__joke-category">category</p></div></div></div>'));

        selector.innerHTML = '';
    });

    it('should hide categories and search input', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<input type="radio" id="random"><input type="radio" id="from-categories"><input type="radio" id="search"><div id="categories"></div><div id="search-input"></div><div id="main-jokes"></div>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        clearJokesWhileSwitch();
        
        let button = document.getElementById("random");
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
        .includes('<div id="categories" class="categories_hide"></div><div id="search-input" class="search-section__search_hide"></div>'));

        selector.innerHTML = '';
    });

    it('should hide search input', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<input type="radio" id="random"><input type="radio" id="from-categories"><input type="radio" id="search"><div id="categories"></div><div id="search-input"></div><div id="main-jokes"></div>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        clearJokesWhileSwitch();
        
        let button = document.getElementById("from-categories");
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
        .includes('<div id="categories"></div><div id="search-input" class="search-section__search_hide"></div>'));

        selector.innerHTML = '';
    });

    it('should hide categories', function () {
        let selector = document.getElementById("selector");
        selector.innerHTML = '<input type="radio" id="random"><input type="radio" id="from-categories"><input type="radio" id="search"><div id="categories"></div><div id="search-input"></div><div id="main-jokes"></div>';

        let ev = document.createEvent('HTMLEvents');
        ev.initEvent('click', true, true);

        clearJokesWhileSwitch();
        
        let button = document.getElementById("search");
        button.dispatchEvent(ev);

        assert(selector.innerHTML.toLowerCase()
        .includes('<div id="categories" class="categories_hide"></div><div id="search-input"></div>'));

        selector.innerHTML = '';
    });
})();
