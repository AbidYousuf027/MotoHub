import { carBrands, carColors } from "./object.js";

let companyDropdown = document.getElementById("company");
let variantDropdown = document.getElementById("variant");
let searchBtn = document.getElementById("searchBtn");

companyDropdown.innerHTML = `<option value="">Select Company</option>`;
carBrands.forEach((brand) => {
  let option = document.createElement("option");
  option.value = brand.company;
  option.innerText = brand.company;
  companyDropdown.append(option);
});

companyDropdown.addEventListener("change", (evt) => {
  const selectedCompany = evt.target.value;

  variantDropdown.innerHTML = `<option value="">Select Variant</option>`;
  const brand = carBrands.find((brand) => brand.company === selectedCompany);
  console.log(brand);

  if (brand && brand.variants) {
    brand.variants.forEach((variant) => {
      let option = document.createElement("option");
      option.value = variant.modelName;
      option.innerText = variant.modelName;
      variantDropdown.append(option);
    });
  }
});

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearCarCards();

  const selectedCompany = companyDropdown.value;
  const selectedVariant = variantDropdown.value;

  if (!selectedCompany || !selectedVariant) {
    alert("Please select both a company and a variant!");
  } else {
    console.log(`Selected Company: ${selectedCompany}`);
    console.log(`Selected Variant: ${selectedVariant}`);

    const brand = carBrands.find((brand) => brand.company === selectedCompany);
    const variant = brand.variants.find((v) => v.modelName === selectedVariant);
    if (variant) {
      displayVariantDetails(variant, brand);
    } else {
      alert("Variant not found!");
    }
  }
});

function displayVariantDetails(variant, brand) {
  const detailsContainer = document.getElementById("variantDetails");

  if (!variant || !brand) {
    alert("Variant or brand not found!");
    return;
  }

  let colorBadges = variant.colors
    .map(
      (color) => `
  <span class= "me-1" style="
    width: 20px; 
    height: 20px; 
    border-radius: 50%; 
    background-color: ${carColors[color] || "#ccc"};
    border: 1px solid;
    display: inline-block;
   ">
  </span>
`
    )
    .join("");

  detailsContainer.innerHTML = `
    
    <h2>${brand.company}</h2>
    <h3>${variant.modelName} (${variant.year})</h3>
    <img src="${variant.image}" alt="${variant.modelName}"class="adjust-image" >
    <p><strong>Engine:</strong> ${variant.engine.min}-${variant.engine.max} ${variant.engine.unit}</p>
    <p><strong>Transmission:</strong> ${variant.transmission}</p>
    <p><strong>Fuel Type:</strong> ${variant.fuelType}</p>
    <p><strong>Available Colors:</strong><span>${colorBadges}</span></p>
    <p><strong>Price:</strong> ${variant.price.min}-${variant.price.max} ${variant.price.currency}</p>

  
    `;
}
function clearCarCards() {
  const allCarsContainer = document.getElementById("allbrand-Cards");
  if (allCarsContainer) allCarsContainer.innerHTML = "";
}

function clearDetailsContainer() {
  const detailsContainer = document.getElementById("variantDetails");
  if (detailsContainer) detailsContainer.innerHTML = "";
}

function displayCarCards(brandName = null) {
  clearDetailsContainer();
  clearCarCards();

  const allCarsContainer = document.getElementById("allbrand-Cards");
  if (!allCarsContainer) {
    console.error("Container element 'allbrand-Cards' not found!");
    return;
  }

  let brandToShow = brandName
    ? carBrands.filter((brand) => brand.company === brandName)
    : carBrands;

  if (brandToShow.length === 0) {
    allCarsContainer.innerHTML = `<p>No cars available for the selected brand.</p>`;
    return;
  }

  brandToShow.forEach((brand) => {
    brand.variants.forEach((car) => {
      const colorBadges = car.colors
        .map(
          (color) => `
    <div class="me-2" style="
      width: 20px; 
      height: 20px; 
      border-radius: 50%; 
      background-color: ${carColors[color] || "#ccc"};
      border: 1px solid;">
    </div>`
        )
        .join("");
      allCarsContainer.innerHTML += `
    <div class="col mb-4">
       <div class="card shadow-sm" style="width: 25rem";>
          <img src="${car.image}" class="card-img-top" style="width: 400px; height: 250px;"alt="${brandName}">
         <div class="card-body text-center">
           <h2 class="card-title fw-bold">${brand.company}</h2>
           <h4 class="card-subtitle text-muted">${car.modelName}</h4>
         </div>
         <ul class="list-group list-group-flush">
           <li class="list-group-item"><strong>Year:</strong> ${car.year}</li>
           <li class="list-group-item"><strong>Engine:</strong> ${car.engine.min}-${car.engine.max} ${car.engine.unit}</li>
           <li class="list-group-item"><strong>Transmission:</strong> ${car.transmission}</li>
           <li class="list-group-item"><strong>Fuel Type:</strong> ${car.fuelType}</li>
           <li class="list-group-item d-flex align-items-center">
             <strong>Colors:</strong> ${colorBadges}
           </li>
         </ul>
         <div class="card-body text-center">
           <h5 class="text-success fw-bold">Price: ${car.price.min}-${car.price.max} ${car.price.currency}</h5>
         </div>
       </div>
     </div>`;
    });
  });
}
displayCarCards();

function displayBrandLogos() {
  const logoContainer = document.getElementById("allbrand-logos");
  if (!logoContainer) {
    console.error("Container element 'allbrand-logos' not found!");
    return;
  }

  logoContainer.innerHTML = "";

  carBrands.forEach((brand) => {
    const logoElement = document.createElement("div");
    logoElement.classList.add("brand-logo", "me-3", "mb-3");
    logoElement.style.cursor = "pointer";

    logoElement.innerHTML = `
      <img src="${brand.logo}" alt="${brand.company} Logo" style="width: 100px; height: auto;">
      <p class="text-center mt-2">${brand.company}</p>
    `;

    logoElement.addEventListener("click", () => displayCarCards(brand.company));
    logoContainer.appendChild(logoElement);
  });
}

displayBrandLogos();
