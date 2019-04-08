class Movie {
    constructor(title, rating, releaseDate, director, stars, summary, posterURL) {
        this.title = title;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.director = director;
        this.stars = stars;
        this.summary = summary;
        this.posterURL = posterURL;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const movies = [];
    movies[0] = new Movie("The Secret Life of Walter Mitty",
        "PG",
        "December 25, 2013",
        "Ben Stiller",
        [
            "Ben Stiller",
            " Kristen Wiig",
            " Adam Scott"
        ],
        "When his job along with that of his co-worker are threatened, Walter takes action in the real world" +
        "embarking on a global journey that turns into an adventure more extraordinary than anything he could have ever imagined.",
        "https://images-na.ssl-images-amazon.com/images/I/517OUmN6TbL.jpg");


    movies[1] = new Movie("The Lion King",
        "G",
        "June 24, 1994",
        "Roger Allers and Rob Minkoff",
        [
            "Matthew Broderick",
            " Jeremy Irons",
            " James Earl Jones"
        ],
        "A Lion cub crown prince is tricked by a treacherous uncle into thinking he caused his father's " +
        "death and flees into exile in despair, only to learn in adulthood his identity and his responsibilities.",
        "https://img.auctiva.com/imgdata/7/9/9/4/6/1/webimg/918301242_o.jpg");


    movies[2] = new Movie("Drive",
        "R",
        "September 16, 2011",
        "Nicolas Winding Refn",
        [
            "Ryan Gosling",
            " Carey Mulligan",
            " Oscar Isaacs"
        ],
        "A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself in " +
        "trouble when he helps out his neighbor.",
        "https://m.media-amazon.com/images/M/MV5BZjY5ZjQyMjMtMmEwOC00Nzc2LTllYTItMmU2MzJjNTg1NjY0XkEyXkFqcGdeQXVyNjQ1MTMzMDQ@._V1_UX182_CR0,0,182,268_AL_.jpg");


    movies[3] = new Movie("Mary Poppins Returns",
        "PG",
        "December 19, 2018",
        "Rob Marshall",
        [
            "Emily Blunt",
            " Lin-Manuel Miranda",
            " Ben Whishaw",
        ],
        "Decades after her original visit, the magical nanny returns to help the Banks siblings and " +
        "Michael's children through a difficult time in their lives.",
        "https://m.media-amazon.com/images/M/MV5BMTk0NDIzMTA1MF5BMl5BanBnXkFtZTgwMzM0MTUzNjM@._V1_UX182_CR0,0,182,268_AL_.jpg");


    movies[4] = new Movie("Castle In The Sky",
        "PG",
        "July 19, 1991",
        "Hayao Miyazaki",
        [
            "James Van Der Beek",
            " Anna Paquin",
            " Mark Hamill",
        ],
        "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a " +
        "search for a legendary floating castle.",
        "https://m.media-amazon.com/images/M/MV5BNTg0NmI1ZGQtZTUxNC00NTgxLThjMDUtZmRlYmEzM2MwOWYwXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_UY268_CR2,0,182,268_AL_.jpg");


    movies[5] = new Movie("Up",
        "PG",
        "May 29, 2009",
        "Pete Docter",
        [
            "Ed Asner",
            " Christopher Plummer",
            " Jordan Nagai",
        ],
        "Seventy-eight year old Carl Fredricksen travels to Paradise Falls in his home equipped with " +
        "balloons, inadvertently taking a young stowaway.",
        "https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_UX182_CR0,0,182,268_AL_.jpg");
        

    movies.forEach(movie => {
        let movieDiv = document.createElement("div");
        let posterTag = document.createElement("img");
        posterTag.setAttribute("src", movie.posterURL);
        movieDiv.appendChild(posterTag);
        movieDiv.setAttribute("class", "movie-tile");
        document.querySelector(".movie-parent").appendChild(movieDiv);
    });

    document.querySelectorAll(".movie-tile").forEach((movieTile) => movieTile.addEventListener("touchend", event => {
        if (document.querySelector(".movie-details") !== null) {
            let alreadyCreated = document.querySelector("main");
            alreadyCreated.removeChild(alreadyCreated.childNodes[0]);
        }

        //Building out html step by step
        let movieDetailsDiv = createDivWithClassName("movie-details");
        document.querySelector("main").prepend(movieDetailsDiv);

        let topDetailsDiv = createDivWithClassName("top-detail");
        movieDetailsDiv.appendChild(topDetailsDiv);

        let moviePosterDiv = createDivWithClassName("movie-poster");
        topDetailsDiv.appendChild(moviePosterDiv);

        let moviePoster = document.createElement("img");
        let touchTarget = event.target.currentSrc;
        let touchSrc = touchTarget.currentSrc;
        let targetMovie = movies.find(movie => movie.posterURL === touchSrc);
        moviePoster.src = targetMovie.posterURL;
        moviePosterDiv.appendChild(moviePoster);

        let movieDetailInfoDiv = createDivWithClassName("movie-detail-info");
        topDetailsDiv.appendChild(movieDetailInfoDiv);

        let titleH2 = document.createElement("h2");
        titleH2.innerHTML = targetMovie.title;
        movieDetailInfoDiv.appendChild(titleH2);

        let infoListsDiv = createDivWithClassName("info-lists");
        movieDetailInfoDiv.appendChild(infoListsDiv);

        let listOne = document.createElement("ul");
        infoListsDiv.appendChild(listOne);
        let li = document.createElement("li");
        li.innerHTML = "Rating: " + targetMovie.rating;
        listOne.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Release Date: " + targetMovie.releaseDate;
        listOne.appendChild(li);

        let listTwo = document.createElement("ul");
        infoListsDiv.appendChild(listTwo);
        li = document.createElement("li");
        li.innerHTML = "Director: " + targetMovie.director;
        listTwo.appendChild(li);
        li = document.createElement("li");
        li.innerHTML = "Stars: " + targetMovie.stars;
        listTwo.appendChild(li);

        let descriptionParagraph = document.createElement("p");
        descriptionParagraph.className = "plot-info";
        descriptionParagraph.innerHTML = targetMovie.summary;

        movieDetailsDiv.appendChild(descriptionParagraph);
    }));

    document.querySelector("#filter").addEventListener("change", event => {
        let secondSelectOptions = document.querySelector("#rating");
        while (secondSelectOptions.firstChild) {
            secondSelectOptions.removeChild(secondSelectOptions.firstChild);
        }

        if (event.target.value === "rating") {
            let rating = [];
            rating[0] = createOptionWithValue("g", "G");

            rating[1] = createOptionWithValue("pg", "PG");

            rating[2] = createOptionWithValue("pg13", "PG-13");

            rating[3] = createOptionWithValue("r", "R");

            rating.forEach((ratingOpt) => {
                secondSelectOptions.appendChild(ratingOpt);
            })
        }
        else if (event.target.value === "releaseDate") {
            let releaseDate = [];
            releaseDate[1] = createOptionWithValue("filler", "Filler text");

            releaseDate.forEach((ratingOpt) => {
                secondSelectOptions.appendChild(ratingOpt);
            })
        }
    })
});

function createOptionWithValue(value, text) {
    let newOption = document.createElement("option");
    newOption.value = value;
    newOption.innerHTML = text;
    return newOption;
}

function createDivWithClassName(className) {
    let newDiv = document.createElement("div");
    newDiv.className = className;
    return newDiv;
}
