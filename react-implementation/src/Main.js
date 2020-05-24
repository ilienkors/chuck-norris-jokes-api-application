import React, { useState, useEffect, useContext } from 'react'
import { Context } from './context'
import CategoryButton from './CategoryButton'
import Joke from './Joke'

export default function Main() {
    const { favorites, setFavorites, updateFavorites } = useContext(Context)

    const [choosenRadio, setChoosenRadio] = useState('random')
    const [categoriesState, setCategoriesState] = useState({})
    const [categoriesButtons, setCategoriesButtons] = useState([])
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        let tempButtons = []
        for (let category in categoriesState) {
            tempButtons.push(<CategoryButton categoryName={category} isActive={categoriesState[category]} key={category} />)
        }
        setCategoriesButtons(tempButtons)
    }, [categoriesState])

    useEffect(() => {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then((response) => {
                return response.json();
            })
            .then((categories) => {
                let tempCategoriesState = {}
                for (let i = 0; i < categories.length; i++) {
                    tempCategoriesState[categories[i]] = false
                }
                setCategoriesState(tempCategoriesState)
            });
    }, [])

    useEffect(() => {
        setJokes([])
        if (choosenRadio === 'random') {
            document.getElementById('categories').classList.add("categories_hide")
            document.getElementById('search-input').classList.add("search-section__search_hide")
        }
        if (choosenRadio === 'from-categories') {
            document.getElementById('categories').classList.remove("categories_hide")
            document.getElementById('search-input').classList.add("search-section__search_hide")
        }
        if (choosenRadio === 'search') {
            document.getElementById('categories').classList.add("categories_hide")
            document.getElementById('search-input').classList.remove("search-section__search_hide")
        }

    }, [choosenRadio])

    const getCurrentCategory = () => {
        for (let category in categoriesState) {
            if (categoriesState[category] === true)
                return category
        }
    }

    let getJoke = (url) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((resJoke) => {
                if (resJoke.result) {
                    let tempJokes = []
                    resJoke.result.forEach(singleJoke => {
                        tempJokes.push(<Joke joke={singleJoke} key={singleJoke.id} />)
                    });
                    setJokes(tempJokes)
                } else {
                    setJokes([].concat(jokes, [<Joke joke={resJoke} key={resJoke.id} />]))
                }

            });
    };

    const takeJokes = () => {
        if (choosenRadio === 'random') {
            getJoke('https://api.chucknorris.io/jokes/random');
        };
        if (choosenRadio === 'from-categories') {
            getJoke('https://api.chucknorris.io/jokes/random?category=' + getCurrentCategory());
        };
        if (choosenRadio === 'search') {
            let text = document.getElementById("search-input").value;
            if (text.length < 3 || text.length > 120)
                alert("Size must be between 3 and 120")
            else {
                getJoke('https://api.chucknorris.io/jokes/search?query=' + text);
            }
        };
    };

    return (
        <Context.Provider value={{
            categoriesState, setCategoriesState, favorites, setFavorites, updateFavorites
        }}>
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
                <div className="categories categories_hide" id="categories">{categoriesButtons}</div>
                <div className="search-section">
                    <input type="search" className="search-section__search search-section__search_hide" id="search-input"
                        placeholder="Free text search..." />
                </div>

                <button className="main__joke-button" id="joke-button" onClick={() => takeJokes()}>Get a joke</button>

                <div className="jokes" id="main-jokes">{jokes}</div>
            </main>
        </Context.Provider>
    )
}
