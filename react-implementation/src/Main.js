import React, { useState, useEffect, useContext } from 'react'
import { Context } from './context'

export default function Main() {
    const { createJoke } = useContext(Context)

    const [choosenRadio, setChoosenRadio] = useState('random')

    useEffect(() => {
        clearJokes()
        if (choosenRadio === 'from-categories') 
            addCategories()
    }, [choosenRadio])

    const createCategory = (name) => {
        let categories = document.getElementById("categories");

        let button = document.createElement("button");
        button.classList.add("categories__category");
        button.innerText = name;

        categories.appendChild(button);
    };

    const addCategories = () => {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then((response) => {
                return response.json();
            })
            .then((categories) => {
                categories.forEach(category => {
                    createCategory(category);
                });
                //clickCategory();
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
                let currentCategory = category.innerHTML;
                category.classList.add("categories__category_active");
            });
        })
    }

    const clearJokes = () => {
        let mainJokes = document.getElementById("main-jokes");
        while (mainJokes.firstChild)
            mainJokes.removeChild(mainJokes.firstChild)
    }

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

    const takeJoke = () => {
        if (choosenRadio === 'random') {
            getJoke('https://api.chucknorris.io/jokes/random');
        };
        /* if (choosenRadio == 'from-categories') {
             getJoke('https://api.chucknorris.io/jokes/random?category=' + currentCategory);
         };*/
        /* if (document.getElementById('search').checked) {
             let text = document.getElementById("search-input").value;
             if (text.length < 3 || text.length > 120)
                 alert("Size must be between 3 and 120")
             else {
                 getJokes('https://api.chucknorris.io/jokes/search?query=' + text);
             }
         };*/
    };

    return (
        <main className="main" id="main">
            <h2 className="main__hey">Hey!</h2>
            <h3 className="main__lets">Let's try to find a joke for you:</h3>

            <div className="radio-section" onChange={event => setChoosenRadio(event.target.id)}>
                <label className="radio-secton__choose-block">
                    <input className="radio-section__choose" type="radio" name="light" id="random" defaultChecked />
                    <span className="radio-section__design"></span>
                    <span className="radio-section__text">Random</span>
                </label>
                <label className="radio-secton__choose-block">
                    <input className="radio-section__choose" type="radio" name="light" id="from-categories" />
                    <span className="radio-section__design"></span>
                    <span className="radio-section__text">From categories</span>
                </label>
                <label className="radio-secton__choose-block">
                    <input className="radio-section__choose" type="radio" name="light" id="search" />
                    <span className="radio-section__design"></span>
                    <span className="radio-section__text">Search</span>
                </label>
            </div>
            <div className="categories categories_hide" id="categories"></div>
            <div className="search-section">
                <input type="search" className="search-section__search search-section__search_hide" id="search-input"
                    placeholder="Free text search..." />
            </div>

            <button className="main__joke-button" id="joke-button" onClick={() => takeJoke()}>Get a joke</button>

            <div className="jokes" id="main-jokes"></div>
        </main>
    )
}
