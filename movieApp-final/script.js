import movieModel from './movieModel.js';

const searchTerm = document.getElementById("search");

document.getElementById("searchButton")
    .addEventListener("touchend", () => {
        //Use the movie model to make our API call
        movieModel.getMovie(searchTerm.value)
        .then(
            (data) => {
                if (data.Response === "True"){
                    buildMovieDetails(data);
                } else {
                    console.log(data.Response);
                }
            }
        )
    });

document.getElementById("myRatings")
    .addEventListener("touchend", () => {
        for (let i = 0; i < localStorage.length; i++) {
            movieModel.getMovie(localStorage.key(i))
            .then((data) => {
                let movieDiv = document.createElement("div");
                let posterTag = document.createElement("img");
                posterTag.setAttribute("src", data.Poster);
                movieDiv.appendChild(posterTag);
                movieDiv.setAttribute("class", "movie-tile");
                movieDiv.addEventListener("touchend", () => {
                    buildMovieDetails(data);
                })
                document.querySelector(".movie-parent").appendChild(movieDiv);
            })
        }
        let clearButton = document.createElement("button");
        clearButton.innerHTML = "Clear";
        document.querySelector(".ratingsButton").appendChild(clearButton);
        clearButton.addEventListener("touchend", () => {
            const ratedMovies = document.getElementsByClassName("movie-tile");
            for (let i = 0; i < ratedMovies.length; i += 0) {
                ratedMovies[i].remove();
            }
            clearButton.remove();
        })
    })

function buildMovieDetails(data) {
        //If the user has already searched for a movie remove the results of the last search
        const movieDetails = document.querySelector(".movie-details");
        if (movieDetails) {
            movieDetails.remove();
        }

        let movieDetailsDiv = createDivWithClassName("movie-details");
        document.querySelector(".movie-parent").prepend(movieDetailsDiv);

        let topDetailsDiv = createDivWithClassName("top-detail");
        movieDetailsDiv.appendChild(topDetailsDiv);

        let moviePosterDiv = createDivWithClassName("movie-poster");
        topDetailsDiv.appendChild(moviePosterDiv);

        let moviePoster = document.createElement("img");
        moviePoster.src = data.Poster;
        moviePosterDiv.appendChild(moviePoster);

        let movieDetailInfoDiv = createDivWithClassName("movie-detail-info");
        topDetailsDiv.appendChild(movieDetailInfoDiv);

        let titleH2 = document.createElement("h2");
        titleH2.innerHTML = data.Title;
        movieDetailInfoDiv.appendChild(titleH2);

        let infoListsDiv = createDivWithClassName("info-lists");
        movieDetailInfoDiv.appendChild(infoListsDiv);

        let listOne = document.createElement("ul");
        infoListsDiv.appendChild(listOne);
        let li = document.createElement("li");
        li.innerHTML = "Rating: " + data.Rated;
        listOne.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Release Date: " + data.Released;
        listOne.appendChild(li);

        let listTwo = document.createElement("ul");
        infoListsDiv.appendChild(listTwo);
        li = document.createElement("li");
        li.innerHTML = "Director: " + data.Director;
        listTwo.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Stars: " + data.Actors;
        listTwo.appendChild(li);

        let descriptionParagraph = document.createElement("p");
        descriptionParagraph.className = "plot-info";
        descriptionParagraph.innerHTML = data.Plot;
        movieDetailsDiv.appendChild(descriptionParagraph);

        const ratingArea = createDivWithClassName("ratingArea");
        movieDetailsDiv.appendChild(ratingArea);
        let starDiv = [];
        for (let i = 0; i < 5; i++) {
            starDiv[i] = createDivWithClassName("star" + i);

            //Add touch event to color the stars and store the rating in local storage when selected
            starDiv[i].addEventListener("touchend", () => {
                colorStars(event.target.className.substring(4,5));
                storeRating(data.Title);
            })

            ratingArea.appendChild(starDiv[i]);
        }

        //Check to see if the movie has already been rated and color the stars accordingly
        const isRated = localStorage.getItem(data.Title);
        if(isRated) {
            colorStars(isRated - 1);
        }

    }

function colorStars(numberOfStars) {
    const stars = document.querySelectorAll('[class*="star"]');

    for (let i = 0; i < stars.length; i++) {
        if (i <= parseInt(numberOfStars)) {
            stars[i].classList.add("yellow");
        } else {
            stars[i].classList.remove("yellow");
        }
    }
}

function storeRating(title) {
    const currentRating = document.getElementsByClassName("yellow");
    localStorage.setItem(title, currentRating.length);
}

function createDivWithClassName(className) {
    let newDiv = document.createElement("div");
    newDiv.className = className;
    return newDiv;
}