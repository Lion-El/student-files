const gallery = document.getElementById('gallery');
const card = document.querySelector('.card');
const div = document.querySelector('.search-container');
let employees;

// gallery cards repository
const resultsRepository  = {
    resultCards: null,

    set newCards(results) {
        this.resultCards = results; 
    },

    get newCards() {
        return this.resultCards;
    }
}

// modal/employee card repository
const modalRepository  = {
    modalCard: null,

    set newModal(modal) {
        this.modalCard = modal; 
    },

    get newModal() {
        return this.modalCard;
    }
}

// render modal/employee card to display
gallery.addEventListener('click', (e) => {
    const employeeCard = e.target.closest('.card');
    const isOutside = !e.target.closest('.card');
    if (isOutside) {
        return;
    } else {
        employeeCard.classList.remove('remove');
    }

    const user = employees.results.find(employee => {
        return employee.email === employeeCard.querySelector('.card-text').innerText;
    });
    
    const modal = new Modal(user);
    modalRepository.newModal = modal;
    modal.openModalWindow();
    gallery.insertAdjacentHTML('afterend', modal.card);
});

// remove modal/employee card from display
document.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal-container');
    const closed = e.target.closest('.modal-info-container');
    
    if (!e.target.closest('.modal')) {
        return
    } else if (!closed) modal.classList.add('remove');
});

// toggle modal/employee cards
function toggleCard(index) {
    const modalDisplay = document.querySelector('.modal-container');
    const results = resultsRepository.newCards;
    const nextCard = results.results.find((card, count) => {
        return count === index;
    });
    const modal = new Modal(nextCard);
    modalRepository.newModal = modal;
    modal.openModalWindow();
    modalDisplay.innerHTML = modal.card;
}

// call to toggle between next or previous modal/employee card
document.addEventListener('click', (e) => {
    const modalObj = modalRepository.newModal;
    const results = resultsRepository.newCards;
    let index;

    if (e.target.classList.contains('modal-next')) {
        index = results.results.indexOf(modalObj.modal)+1;
        if (index === results.results.length) return;
        toggleCard(index);
    } else if (e.target.classList.contains('modal-prev')) {
        index = results.results.indexOf(modalObj.modal)-1;
        if (index < 0) return;
        toggleCard(index);
    } else {
        return;
    }
});

// filter gallery employee cards
div.addEventListener('keyup', (e) => {
    const filterdList = employees.results.filter(obj => {
        let fullName = `${obj.name.first.toLowerCase()} ${obj.name.last.toLowerCase()}`;
        return fullName.includes(e.target.value);
    });

    if (filterdList.length > 0) {
        const results = new Results(filterdList);
        resultsRepository.newCards = results;
        results.displayResults(filterdList);
        gallery.innerHTML = '';
        gallery.insertAdjacentHTML('afterbegin', results.resultsArray);
    } else {
        gallery.innerHTML = `<h2>No results found</h2>`;
    }
});

//display search form
function addSearchToDisplay() {
    const search = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
        `;
    div.insertAdjacentHTML('afterbegin', search);
}

//========================
//  FETCH DATA & DISPLAY
//------------------------
async function returnPromise() {
    try {
        const promise = await fetch('https://randomuser.me/api/?results=12&nat=gb');
        return promise;
    } catch (error) {
        throw error;
    }
}

async function displayEmployees() {
    const promise = await returnPromise();
    employees = await promise.json();
    const fullList = employees.results.filter(obj => obj.nat);
    const results = new Results(fullList);
    resultsRepository.newCards = results;
    results.displayResults(employees.results);
    gallery.insertAdjacentHTML('beforeend', results.resultsArray);
}

displayEmployees();
addSearchToDisplay();