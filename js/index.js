import { makeGallery, renderGallery } from "./gallery.js";

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
      formData[input.id] = input.value || undefined;
    }
  }

  const { startDate, endDate } = formData;
  if (startDate > endDate) {
    getInputApi(endDate, startDate, refs);
    return;
  }
  getInputApi(startDate, endDate, refs);
}

async function getInputApi(startDate, endDate) {
  try {
    const { data } = await fetchPersons(startDate, endDate);
    makeGallery(data, refs);
  } catch (error) {
    console.error("error", error);
  }
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
