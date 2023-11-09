export function makeGallery(persons, refs) {
  const marcup = persons
    ?.map(
      ({ firstname, lastname, email, phone, birthday, gender, website }) =>
        `
          <div class="card">
            <div class="name">
              <div class="firstname">${firstname}</div>
              <div>${lastname}</div>
            </div>
            <div class="item"><svg class="icon" width="16" height="16">
              <use href="./icons.svg#email"></use>
            </svg>email ${email}</div>
            <div class="item"><svg class="icon" width="16" height="16">
              <use href="./icons.svg#phone"></use>
            </svg>phone ${phone}</div>
            <div class="item"><svg class="icon" width="16" height="16">
              <use href="./icons.svg#birthday"></use>
            </svg>birthday ${birthday}</div>
            <div class="item"><svg class="icon" width="16" height="16">
              <use href="./icons.svg#gender"></use>
            </svg>gender ${gender}</div>
            <div class="item"><svg class="icon" width="16" height="16">
              <use href="./icons.svg#website"></use>
            </svg>website ${website}</div>
          </div>
          `
    )
    .join("");
  renderGallery(marcup, refs);
}

export function renderGallery(markup, refs) {
  refs.gallery.insertAdjacentHTML("beforeend", markup);
}
