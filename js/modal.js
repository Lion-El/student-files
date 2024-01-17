class Modal {
    constructor(employee) {
        this.modal = employee;
        this.card = null;
    }

    openModalWindow() {
        this.card = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${this.modal.picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${this.modal.name.first} ${this.modal.name.last}</h3>
                        <p class="modal-text">${this.modal.email}</p>
                        <p class="modal-text cap">${this.modal.location.city}</p>
                        <hr>
                        <p class="modal-text">${this.modal.phone}</p>
                        <p class="modal-text">${this.modal.location.street.number} ${this.modal.location.street.name}, 
                                                ${this.modal.location.state}, ${this.modal.location.postcode}</p>
                        <p class="modal-text">Birthday: ${this.modal.dob.date}</p>
                    </div>
                </div>
            </div>
            `;
    }
}







