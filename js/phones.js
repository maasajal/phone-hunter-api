const loadPhone = async (searchText = "iphone", isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-phone");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

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
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    phonesContainer.appendChild(phoneCard);
  });
  loadingData(false);
};

const searchPhone = (isShowAll) => {
  loadingData(true);
  const searchPhone = document.getElementById("search");
  const searchPhoneValue = searchPhone.value;
  loadPhone(searchPhoneValue, isShowAll);
  // searchPhone.value = "";
};

const loadingData = (isLoading) => {
  const searchLoading = document.getElementById("loading");
  if (isLoading) {
    searchLoading.classList.remove("hidden");
  } else {
    searchLoading.classList.add("hidden");
  }
};

const handleShowAll = () => {
  searchPhone(true);
};

const handleShowDetails = async (id) => {
  console.log("clicked", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;
  // console.log(phoneDetails);
  showPhoneDetails(phoneDetails);
};
const showPhoneDetails = (phone) => {
  loadingData(true);
  show_details_modal.showModal();
  const phoneName = document.getElementById("show-detail-phone-name");
  const phoneImg = document.getElementById("show-detail-image");
  phoneImg.innerHTML = `
    <figure class="p-10">
      <img
        class="mx-auto"
        src="${phone.image}"
        alt="${phone?.name}"
        class="rounded-xl"
      />
    </figure>
  `;
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-details-container");
  showDetailContainer.innerHTML = `
<p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  `;
};

loadPhone();
