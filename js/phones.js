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
  const showAllContainer = document.getElementById("show-all-phone");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl m-4";

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
  loadingData(false);
};

const searchPhone = () => {
  loadingData(true);
  const searchPhone = document.getElementById("search");
  const searchPhoneValue = searchPhone.value;
  loadPhone(searchPhoneValue);
  searchPhone.value = "";
};

const loadingData = (isLoading) => {
  const searchLoading = document.getElementById("loading");
  if (isLoading) {
    searchLoading.classList.remove("hidden");
  } else {
    searchLoading.classList.add("hidden");
  }
};
