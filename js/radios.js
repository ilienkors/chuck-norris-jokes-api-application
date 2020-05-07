let getJoke = (url) => {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJoke) => {
            createJoke("main-jokes", resJoke);
        });
};

let getJokes = (url) => {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((resJokes) => {
            resJokes.result.forEach(resJoke => {
                createJoke("main-jokes", resJoke);
            });
        });
}

const addJokeButton = () => {
    let jokeButton = document.getElementById('joke-button');
    jokeButton.addEventListener('click', function (event) {
        if (document.getElementById('random').checked) {
            getJoke('https://api.chucknorris.io/jokes/random');
        };
        if (document.getElementById('from-categories').checked) {
            getJoke('https://api.chucknorris.io/jokes/random?category=' + currentCategory);
        };
        if (document.getElementById('search').checked) {
            clearJokes();
            let text = document.getElementById("search-input").value;
            if (text.length < 3 || text.length > 120)
                alert("Size must be between 3 and 120")
            else {
                getJokes('https://api.chucknorris.io/jokes/search?query=' + text);
            }
        };
    });
};

const clearJokesWhileSwitch = () => {
    let random = document.getElementById('random');
    random.addEventListener('click', function (event) {
        clearJokes();
        document.getElementById('categories').classList.add("categories_hide");
        document.getElementById('search-input').classList.add("search-section__search_hide");
    });

    let fromCategories = document.getElementById('from-categories');
    fromCategories.addEventListener('click', function (event) {
        clearJokes();
        document.getElementById('categories').classList.remove("categories_hide");
        document.getElementById('search-input').classList.add("search-section__search_hide");
    });

    let search = document.getElementById('search');
    search.addEventListener('click', function (event) {
        clearJokes();
        document.getElementById('categories').classList.add("categories_hide");
        document.getElementById('search-input').classList.remove("search-section__search_hide");
    });
};
