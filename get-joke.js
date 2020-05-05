let jokeButton = document.getElementById('joke-button');
jokeButton.addEventListener('click', function (event) {
    if (document.getElementById('random').checked) {
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => {
                document.getElementById('joke').classList.remove("jokes__joke_hide");
                return response.json();
            })
            .then((data) => {
                document.getElementById('joke-link').href = data.url;
                document.getElementById('id').innerText = data.id;
                document.getElementById('joke-text').innerText = data.value;
                document.getElementById('last-update').innerText = (new Date).getHours() - new Date(data.updated_at).getHours();
                if (data.categories[0])
                    document.getElementById('joke-category').innerText = data.categories[0];
                console.log(data);
            });
    };
    if (document.getElementById('from-categories').checked) {
        console.log("from-categories");
    };
    if (document.getElementById('search').checked) {
        console.log("search");
    };
});

let random = document.getElementById('random');
random.addEventListener('click', function (event) {
    document.getElementById('categories').classList.add("categories_hide");
    document.getElementById('search-input').classList.add("search-section__search_hide");
});

let fromCategories = document.getElementById('from-categories');
fromCategories.addEventListener('click', function (event) {
    document.getElementById('categories').classList.remove("categories_hide");
    document.getElementById('search-input').classList.add("search-section__search_hide");
});

let search = document.getElementById('search');
search.addEventListener('click', function (event) {
    document.getElementById('categories').classList.add("categories_hide");
    document.getElementById('search-input').classList.remove("search-section__search_hide");
});
