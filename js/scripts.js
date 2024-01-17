const gallery = document.getElementById('gallery');
const card = document.querySelector('.card');
const div = document.querySelector('.search-container');
let userEmployees;

// modal repository
const modalRepository  = {
    modalCard: null,

    set newModal(modal) {
        this.modalCard = modal; 
    },

    get newModal() {
        return this.modalCard;
    }
}

//render modal/employee card to display
gallery.addEventListener('click', (e) => {
    const employeeCard = e.target.closest('.card');
    const isOutside = !e.target.closest('.card');
    if (isOutside) {
        return;
    } else {
        employeeCard.classList.remove('remove');
    }

    const user = userEmployees.results.find(employee => {
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
    if (e.target.closest('.card')
     || e.target.closest('form')
     || e.target.closest('.gallery')) {
        return
    } else if (!closed) modal.classList.add('remove');
});


div.addEventListener('keyup', (e) => {
    const input = e.target.value;
    console.log(userEmployees);
    const filter = userEmployees.results.filter(obj => {
        let fullName = `${obj.name.first.toLowerCase()} ${obj.name.last.toLowerCase()}`;
        return fullName.includes(e.target.value);
    });

    console.log(filter);
    const results = new Results(filter);
    const resultCards = results.displayResults(filter);
    gallery.innerHTML = '';
    gallery.insertAdjacentHTML('afterbegin', resultCards);
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
    const employees = await promise.json();
    userEmployees = employees;
    const results = new Results(employees);
    const employeeCards = results.displayResults(employees.results);
    gallery.insertAdjacentHTML('beforeend', employeeCards);
}

displayEmployees();
addSearchToDisplay();