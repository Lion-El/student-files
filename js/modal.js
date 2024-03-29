class Modal {
    constructor(employee) {
        this.modal = employee;
        this.card = null;
        this._birthday = null;
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
                        <p class="modal-text">Birthday: ${this.birthday(this.modal.dob.date)}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            `;
    }

    birthday(dateObj) {
        this._birthday = new Date(dateObj)
        .toLocaleDateString('en-US', {day: '2-digit', month: '2-digit'});
       return `${this._birthday}/${new Date().getFullYear()}`;
    }

}







