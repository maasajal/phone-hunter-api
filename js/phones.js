const loadPhone = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl";

    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
        <img
        src="${phone.image}"
        alt="${phone?.phone_name}"
        class="rounded-xl"
        />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <div class="card-actions">
        <button class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    phonesContainer.appendChild(phoneCard);
  });
};

const searchPhone = () => {
  const searchPhone = document.getElementById("search");
  const searchPhoneValue = searchPhone.value;
  loadPhone(searchPhoneValue);
  searchPhone.value = "";
};
