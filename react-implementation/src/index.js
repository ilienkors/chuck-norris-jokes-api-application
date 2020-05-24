import React from 'react'
import ReactDOM from 'react-dom'
import { Context } from './context'
import Header from './Header'
import Main from './Main'
import Aside from './Aside'
import './normalize.css'
import './main.css'
import liked from "./liked.svg"
import unliked from "./unliked.svg"
import message from "./message.svg"

function App() {

    const refreshFavorite = () => {
        let aside = document.getElementById("aside");
        while (aside.firstChild)
            aside.removeChild(aside.firstChild)
        Object.keys(localStorage).forEach(jokeId => {
            createJoke("aside", JSON.parse(localStorage.getItem(jokeId)));
        });
    };

    const createJoke = (place, resJoke) => {
        let jokePlace = document.getElementById(place);

        /* start of joke block */
        let joke = document.createElement("div");
        joke.classList.add("jokes__joke");

        /* start of button */
        let buttonLike = document.createElement("button");
        buttonLike.classList.add("jokes__button-like")

        let heartIcon = document.createElement("img");
        heartIcon.classList.add("heart-icon");
        heartIcon.id = place + resJoke.id;
        if (localStorage.getItem(resJoke.id))
            heartIcon.src = liked;
        else
            heartIcon.src = unliked;
        buttonLike.appendChild(heartIcon);

        buttonLike.addEventListener('click', () => {
            let url = window.location.origin + "/icons/";
            if (heartIcon.src === url + "unliked.svg") {
                if (document.getElementById("aside" + resJoke.id))
                    document.getElementById("aside" + resJoke.id).src = liked;
                if (document.getElementById("main-jokes" + resJoke.id))
                    document.getElementById("main-jokes" + resJoke.id).src = liked;
                localStorage.setItem(resJoke.id, JSON.stringify(resJoke));
            }
            else {
                if (document.getElementById("aside" + resJoke.id))
                    document.getElementById("aside" + resJoke.id).src = unliked;
                if (document.getElementById("main-jokes" + resJoke.id))
                    document.getElementById("main-jokes" + resJoke.id).src = unliked;
                localStorage.removeItem(resJoke.id)
            }
            refreshFavorite();
        });
        /* end of button */

        /* start of joke description */
        let jokeDescription = document.createElement("div");
        jokeDescription.classList.add("jokes__joke-description");

        let messageIcon = document.createElement("img");
        messageIcon.classList.add("jokes__message-icon")
        messageIcon.src = message;

        /* start of joke content */
        let jokeContent = document.createElement("div");
        jokeContent.classList.add("jokes__joke-content");

        let jokeLink = document.createElement("a");
        jokeLink.classList.add("jokes__joke-link");
        jokeLink.href = resJoke.url;
        jokeLink.innerText = "ID: " + resJoke.id;

        let jokeText = document.createElement("p");
        jokeText.classList.add("jokes__joke-text");
        jokeText.innerText = resJoke.value;

        let lastUpdate = document.createElement("p");
        lastUpdate.classList.add("jokes__last-update");
        // eslint-disable-next-line
        lastUpdate.innerText = "Last update: " + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + " hours ago";

        jokeContent.appendChild(jokeLink);
        jokeContent.appendChild(jokeText);
        jokeContent.appendChild(lastUpdate);

        if (resJoke.categories[0]) {
            let jokeCategory = document.createElement("p");
            jokeCategory.classList.add("jokes__joke-category");
            jokeCategory.innerText = resJoke.categories[0];
            jokeContent.appendChild(jokeCategory);
        }
        /* end of joke content */

        jokeDescription.appendChild(messageIcon);
        jokeDescription.appendChild(jokeContent);
        /* end of joke description */

        joke.appendChild(buttonLike);
        joke.appendChild(jokeDescription);
        /* end of joke block */

        jokePlace.appendChild(joke);
    };

    return (
        <Context.Provider value={{
            createJoke
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