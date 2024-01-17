const gallery = document.getElementById('gallery');
const card = document.querySelector('.card');
let userEmployees;

// MODAL OBJECT REPOSITORY
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
    if (e.target.closest('.card')) {
        return
    } else if (!closed) modal.classList.add('remove');
});

//========================
//  FETCH DATA & DISPLAY
//------------------------
async function returnJsonObj(url) {
    try {
        const employees = await fetch(url);
        return await employees.json();
    } catch (error) {
        throw error;
    }
}

async function displayEmployees() {
    const employees = await returnJsonObj('https://randomuser.me/api/?results=12');
    userEmployees = employees;
    console.log(employees);
    const employeeCards = employees.results.map(card => {
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
    console.log(employeeCards);
    gallery.insertAdjacentHTML('beforeend', employeeCards);
}

displayEmployees();