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
    heartIcon.src = "./icons/like.svg";
    buttonLike.appendChild(heartIcon);
    /* end of button */

    /* start of joke description */
    let jokeDescription = document.createElement("div");
    jokeDescription.classList.add("jokes__joke-description");

    let messageIcon = document.createElement("img");
    messageIcon.classList.add("jokes__message-icon")
    messageIcon.src = "./icons/message.svg";

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
    lastUpdate.innerText = "Last update: " + Math.round(((new Date).getTime() - new Date(resJoke.updated_at).getTime()) / 3600000) + " hours ago";

    if (resJoke.categories[0]) {
        let jokeCategory = document.createElement("p");
        jokeCategory.classList.add("jokes__joke-category");
        jokeCategory.innerText = resJoke.categories[0];
        jokeContent.appendChild(jokeCategory);
    }

    jokeContent.appendChild(jokeLink);
    jokeContent.appendChild(jokeText);
    jokeContent.appendChild(lastUpdate);
    /* end of joke content */

    jokeDescription.appendChild(messageIcon);
    jokeDescription.appendChild(jokeContent);
    /* end of joke description */

    joke.appendChild(buttonLike);
    joke.appendChild(jokeDescription);
    /* end of joke block */

    jokePlace.appendChild(joke);
};
