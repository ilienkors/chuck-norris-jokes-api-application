import React, { useState, useContext } from 'react'
import liked from "./liked.svg"
import unliked from "./unliked.svg"
import message from "./message.svg"
import { Context } from './context'

export default function Joke({ joke }) {
    const { updateFavorites } = useContext(Context)
    const [isLiked, setIsLiked] = useState(localStorage.getItem(joke.id) ? true : false)

    const like = () => {
        if (localStorage.getItem(joke.id)) {
            setIsLiked(false)
            localStorage.removeItem(joke.id)
            document.getElementById(joke.url).src = unliked
        }
            
        else {
            setIsLiked(true)
            localStorage.setItem(joke.id, JSON.stringify(joke))
            document.getElementById(joke.url).src = liked
        }
        updateFavorites()
    }

    let categoryName = ''
    if (joke.categories[0])
        categoryName = <p className="jokes__joke-category">{joke.categories[0]}</p>
    return (
        <div className="jokes__joke">
            <button className="jokes__button-like" onClick={() => like()}>
                <img className="heart-icon" id={joke.url} alt="like icon" src={isLiked ? liked : unliked} />
            </button>
            <div className="jokes__joke-description">
                <img className="jokes__message-icon" alt="message icon" src={message} />
                <div className="jokes__joke-content">
                    <a className="jokes__joke-link" href={joke.url}>{"ID: " + joke.id}</a>
                    <p className="jokes__joke-text">{joke.value}</p>
                    <p className="jokes__last-update">
                        {'Last update: ' + Math.round(((new Date()).getTime() - new Date(joke.updated_at).getTime()) / 3600000) + ' hours ago'}
                    </p>
                    {categoryName}
                </div>
            </div>
        </div>
    )
}
