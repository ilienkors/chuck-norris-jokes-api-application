import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Context } from './context'
import Header from './Header'
import Main from './Main'
import Aside from './Aside'
import Joke from './Joke'
import './normalize.css'
import './main.css'

function App() {
    const [favorites, setFavorites] = useState([])

    const updateFavorites = () => {
        let tempFavorites = []
        Object.keys(localStorage).forEach(jokeId => {
            let singleJoke = JSON.parse(localStorage.getItem(jokeId))
            tempFavorites.push(<Joke joke={singleJoke} key={singleJoke.id} />)
        });
        setFavorites(tempFavorites)
    }

    useEffect(() => {
        updateFavorites()
    }, [])

    return (
        <Context.Provider value={{
            favorites, setFavorites, updateFavorites
        }}>
            <div className="body" id="body">
                <Header />
                <Main />
                <div id="aside-backdrop" className="aside-backdrop"></div>
                <Aside />
            </div>
        </Context.Provider>
    )

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)