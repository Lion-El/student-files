class Results {
    constructor(results) {
        this.results = results
        this.resultsArray = [];
    }

    displayResults(results) {
        this.resultsArray = results.map(card => {
            return `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${card.picture.large}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${card.name.first} ${card.name.last}</h3>
                            <p class="card-text">${card.email}</p>
                            <p class="card-text cap">${card.location.city}, ${card.location.state}</p>
                        </div>
                    </div>`
        });
        return this.resultsArray;
    }
}