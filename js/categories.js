const createCategory = (name) => {
    let categories = document.getElementById("categories");

    let button = document.createElement("button");
    button.classList.add("categories__category");
    button.innerText = name;

    categories.appendChild(button);
};

const setCategories = () => {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then((response) => {
            return response.json();
        })
        .then((categories) => {
            categories.forEach(category => {
                createCategory(category);
            });
            clickCategory();
        });
}

const removeAllActiveCategories = () => {
    let categories = document.getElementsByClassName("categories__category");
    Array.from(categories).forEach(category => {
        category.classList.remove("categories__category_active");
    });
}

const clickCategory = () => {
    let categories = document.getElementsByClassName("categories__category");
    Array.from(categories).forEach(category => {
        category.addEventListener('click', () => {
            removeAllActiveCategories();
            currentCategory = category.innerHTML;
            category.classList.add("categories__category_active");
        });
    })
}
