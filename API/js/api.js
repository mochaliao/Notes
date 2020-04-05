const lists = document.getElementById('lists');

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films');

request.onload = function () {
    // Begin accessing JSON data here
    let count = 0;
    const data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            count++;

            // 新增 card
            const cardWrap = document.createElement('div');
            cardWrap.setAttribute('class', 'col-md-4');
            const card = document.createElement('div');
            card.setAttribute('class', 'card mb-4 shadow-sm');

            // 新增 card-body
            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');

            // 新增 card-title
            const cardTitle = document.createElement('div');
            // 雙數
            if (count % 2 === 0) {
                // console.log('count:' + count);
                // cardTitle.setAttribute('class', 'bg-primary');
            } else {
                // cardTitle.setAttribute('class', 'bg-warning');
            }

            const movieTitle = document.createElement('p');
            movieTitle.setAttribute('class', 'card-title h4');
            movieTitle.textContent = movie.title;

            const movieDirector = document.createElement('p');
            movieDirector.setAttribute('class', 'text-muted mb-1');
            movieDirector.textContent = `Director: ${movie.director}`;

            const movieReleaseDate = document.createElement('p');
            movieReleaseDate.setAttribute('class', 'text-muted mb-2');
            movieReleaseDate.textContent = `Release: ${movie.release_date}`;

            const movieDescription = document.createElement('p');
            movieDescription.setAttribute('class', 'card-text');
            movie.description = movie.description.substring(0, 300);
            movieDescription.textContent = `${movie.description}...`;

            const movieFooter = document.createElement('div');
            movieFooter.setAttribute('class', 'd-flex justify-content-between align-items-center');

            const footerBtn = document.createElement('button');
            footerBtn.setAttribute('type', 'button');
            footerBtn.setAttribute('class', 'btn btn-sm btn-outline-secondary');
            footerBtn.textContent = 'More';

            const score = document.createElement('small');
            score.setAttribute('class', 'text-muted');
            score.textContent = movie.rt_score;
            if (movie.rt_score > 95) {
                score.setAttribute('class', 'text-primary');
            } else {
                score.setAttribute('class', 'text-muted');
            }

            lists.appendChild(cardWrap);
            cardWrap.appendChild(card);
            card.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardTitle.appendChild(movieTitle);
            cardBody.appendChild(movieDirector);
            cardBody.appendChild(movieReleaseDate);
            cardBody.appendChild(movieDescription);
            cardBody.appendChild(movieFooter);
            movieFooter.appendChild(footerBtn);
            movieFooter.appendChild(score);
        })
    } else {
        console.log('error')
    }
};

// Send request
request.send();

