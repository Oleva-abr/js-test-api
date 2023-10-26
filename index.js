const refs = {
  form: document.getElementById("search-form"),
  gallery: document.querySelector(".gallery"),
};

refs.form.addEventListener("submit", formGetInput);

function formGetInput(e) {
  e.preventDefault();

  refs.gallery.innerHTML = "";

  const formData = {};
  for (const input of refs.form.elements) {
    if (input.id) {
      formData[input.id] = input.value;
    }
  }

  const { startDate, endDate } = formData;
  if (startDate > endDate) {
    getInputApi(endDate, startDate);
    return;
  }
  getInputApi(startDate, endDate);
}

async function getInputApi(startDate, endDate) {
  try {
    const { data } = await fetchPersons(startDate, endDate);
    makeGallery(data);
  } catch (error) {
    console.error("error", error);
  }
}

function makeGallery(persons) {
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
    </svg>website ${website}</div></div>
        `
    )
    .join("");
  renderGallery(marcup);
}

function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML("beforeend", markup);
}

async function fetchPersons(
  birthdayStart = "1998-07-29",
  birthdayEnd = "2023-06-09"
) {
  const params = new URLSearchParams({
    _birthday_start: birthdayStart,
    _birthday_end: birthdayEnd,
  });
  try {
    const response = await fetch(
      `https://fakerapi.it/api/v1/persons?${params}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
