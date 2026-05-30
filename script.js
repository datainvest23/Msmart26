const properties = [
  {
    title: "Duplex Puerto Banus Penthouse",
    type: "Short Term Rental",
    meta: "5 guests / 2 bed / 2 bath",
    image:
      "https://bookingenginecdn.hostaway.com/listing/137459-350049-2E2SfOMvTYQ5jepxpP1TaXHhbZHvsOHcJjBL9mv--zdE-678645f58b08c?width=800&quality=70&format=webp&v=2",
    filters: ["penthouse", "sea"],
    tags: ["K1", "Penthouse", "Sea Views", "Terrace"],
    detailsPath: "properties/k1-duplex-puerto-banus-penthouse.html",
  },
  {
    title: "Modern 2 Bed Frontline Apt",
    type: "Short Term Rental",
    meta: "4 guests / 2 bed / 2 bath",
    image:
      "https://bookingenginecdn.hostaway.com/listing/137459-350050-75RkNA5gmqffPW5xa-dUIMyRyfK1Llq6adAWsazF--hY-678645ecd2ed7?width=800&quality=70&format=webp&v=2",
    filters: ["frontline", "sea"],
    tags: ["K2", "Frontline", "Marina Views", "Terrace"],
    detailsPath: "properties/k2-modern-2-bed-frontline-apt.html",
  },
  {
    title: "Modern Puerto Banus Frontline Apt",
    type: "Short Term Rental",
    meta: "4 guests / 2 bed / 1 bath",
    image:
      "https://bookingenginecdn.hostaway.com/listing/137459-350051-rXbIvse7Ktx51dQs5JrJIETSg1ROQ5kHhmnq4ioVkbY-67863660df438?width=800&quality=70&format=webp&v=2",
    filters: ["frontline", "sea"],
    tags: ["M2", "Frontline", "Sea Views", "Terrace"],
    detailsPath: "properties/m2-modern-puerto-banus-frontline-apt.html",
  },
  {
    title: "New - Frontline - Sea View",
    type: "Short Term Rental",
    meta: "Beds / baths to confirm",
    image: "assets/background/background4.jpg",
    filters: ["frontline", "sea"],
    tags: ["Alvaro", "Frontline", "Sea View", "Placeholder"],
    detailsPath: "properties/alvaro-new-frontline-sea-view.html",
  },
  {
    title: "First-Line w/ Amazing Sea View",
    type: "Short Term Rental",
    meta: "Beds / baths to confirm",
    image: "assets/background/background2.jpg",
    filters: ["frontline", "sea"],
    tags: ["Yahya", "First-Line", "Sea View", "Placeholder"],
    detailsPath: "properties/yahya-first-line-amazing-sea-view.html",
  },
  {
    title: "Edificio Myramar Apartment",
    type: "Short Term Rental",
    meta: "Beds / baths to confirm",
    image: "assets/background/background1.jpg",
    filters: ["frontline"],
    tags: ["Myramar", "Apartment", "Placeholder"],
    detailsPath: "properties/myramar-edificio-myramar-apartment.html",
  },
  {
    title: "Puerto Banus Apartment",
    type: "Short Term Rental",
    meta: "8 guests / 5 bed / 3 bath",
    image:
      "https://bookingenginecdn.hostaway.com/listing/137459-350053-pIVr--62VuXEdkNif6dYjCfXpp4--0V7gGFB3kvjP0CL8-6786360b83df2?width=800&quality=70&format=webp&v=2",
    filters: ["frontline", "sea"],
    tags: ["Benabola", "5 Bedrooms", "Frontline", "Parking"],
    detailsPath: "properties/benabola-puerto-banus-apartment.html",
  },
];

const campaigns = [
  {
    index: "01",
    label: "Reserve your front row sea",
    title: "Secure your position by the marina.",
    body:
      "Stay close to the water, restaurants and beach clubs with a personally managed selection of front-line Puerto Banus residences.",
    image: "assets/campaigns/campaign1.png",
    alt: "Reserve your front row sea view in Puerto Banus",
    filter: "frontline",
  },
  {
    index: "02",
    label: "Your private gateway",
    title: "Arrive to a residence prepared around you.",
    body:
      "From first message to key handover, enjoy direct local support, clear arrival details and access to trophy properties for the season ahead.",
    image: "assets/campaigns/campaign2.png",
    alt: "Your private gateway to a Marbella Smart residence",
    filter: "all",
  },
  {
    index: "03",
    label: "Penthouse perfection",
    title: "Make the terrace the reason you book.",
    body:
      "Choose elevated outdoor living, sea horizons and a private sanctuary above Puerto Banus for the kind of Marbella stay people remember.",
    image: "assets/campaigns/campaign3.png",
    alt: "Penthouse perfection with coastal views in Puerto Banus",
    filter: "penthouse",
  },
];

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const track = document.querySelector("[data-property-track]");
const propertyStage = document.querySelector(".property-stage");
const prevButton = document.querySelector("[data-prev]");
const nextButton = document.querySelector("[data-next]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const rows = Array.from(document.querySelectorAll(".area-row"));
const video = document.querySelector(".hero-video");
const campaignTabs = Array.from(document.querySelectorAll("[data-campaign]"));
const campaignIndex = document.querySelector("[data-campaign-index]");
const campaignLabel = document.querySelector("[data-campaign-label]");
const campaignTitle = document.querySelector("[data-campaign-title]");
const campaignBody = document.querySelector("[data-campaign-body]");
const campaignImage = document.querySelector("[data-campaign-image]");
const campaignMatch = document.querySelector("[data-campaign-match]");
const campaignPhone = document.querySelector("[data-campaign-phone]");
const propertySelect = document.querySelector("[data-property-select]");
const enquirySubmit = document.querySelector("[data-enquiry-submit]");
const enquiryForm = document.querySelector(".enquiry-form");
let activeCampaign = 0;

function renderProperties(activeFilter = "all") {
  if (!track || !propertyStage) return;

  track.innerHTML = "";
  const visibleCount = properties.filter(
    (property) => activeFilter === "all" || property.filters.includes(activeFilter)
  ).length;
  track.dataset.count = String(visibleCount);
  propertyStage.classList.toggle("is-single", visibleCount <= 1);

  properties.forEach((property) => {
    const visible = activeFilter === "all" || property.filters.includes(activeFilter);
    const card = document.createElement("article");
    card.className = `property-card${visible ? "" : " is-hidden"}`;
    card.style.setProperty("--image", `url("${property.image}")`);
    card.innerHTML = `
      <div class="property-body">
        <span class="property-type">${property.type}</span>
        <h3>${property.title}</h3>
        <div class="property-meta">${property.meta}</div>
        <div class="property-tags">
          ${property.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <div class="property-card-actions">
          <a class="property-cta" href="${property.detailsPath}">View property page</a>
          <a class="property-cta property-cta-secondary" href="#contact" data-property-enquiry="${property.title}">Enquire</a>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function scrollCards(direction) {
  if (!track) return;
  const card = track.querySelector(".property-card:not(.is-hidden)");
  const amount = card ? card.getBoundingClientRect().width + 18 : 378;
  track.scrollBy({ left: amount * direction, behavior: "smooth" });
}

function setPropertyFilter(filter) {
  if (!track) return;
  filterButtons.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.filter === filter);
    item.setAttribute("aria-pressed", String(item.dataset.filter === filter));
  });
  renderProperties(filter);
  track.scrollTo({ left: 0, behavior: "smooth" });
}

function setCampaign(index) {
  if (!campaignIndex || !campaignLabel || !campaignTitle || !campaignBody || !campaignImage || !campaignPhone) return;
  activeCampaign = index;
  const campaign = campaigns[index];
  campaignTabs.forEach((tab) => {
    const isActive = Number(tab.dataset.campaign) === index;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  campaignIndex.textContent = campaign.index;
  campaignLabel.textContent = campaign.label;
  campaignTitle.textContent = campaign.title;
  campaignBody.textContent = campaign.body;
  campaignPhone.classList.add("is-changing");
  window.setTimeout(() => {
    campaignImage.src = campaign.image;
    campaignImage.alt = campaign.alt;
    campaignPhone.classList.remove("is-changing");
  }, 120);
}

function setPreferredProperty(propertyName) {
  if (!propertySelect) return;
  const option = Array.from(propertySelect.options).find((item) => item.value === propertyName);
  propertySelect.value = option ? propertyName : "Not sure yet";
}

function prepareEnquiry() {
  if (!enquiryForm) return;
  const data = new FormData(enquiryForm);
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const type = data.get("type") || "General";
  const property = data.get("property") || "Not sure yet";
  const message = data.get("message") || "";
  const subject = `Marbella Smart enquiry - ${type}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Enquiry type: ${type}`,
    `Preferred property: ${property}`,
    "",
    message || "Please contact me about availability and next steps.",
  ].join("\n");
  window.location.href = `mailto:info@marbellasmart.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function closeNav() {
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

renderProperties();
setHeaderState();

window.addEventListener("scroll", setHeaderState, { passive: true });

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

if (nav) {
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNav();
  });
}

if (prevButton) prevButton.addEventListener("click", () => scrollCards(-1));
if (nextButton) nextButton.addEventListener("click", () => scrollCards(1));

if (track) {
  track.addEventListener("click", (event) => {
    const link = event.target.closest("[data-property-enquiry]");
    if (!link) return;
    setPreferredProperty(link.dataset.propertyEnquiry);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPropertyFilter(button.dataset.filter);
  });
});

campaignTabs.forEach((button) => {
  button.addEventListener("click", () => setCampaign(Number(button.dataset.campaign)));
});

if (campaignMatch) {
  campaignMatch.addEventListener("click", () => {
    const filter = campaigns[activeCampaign].filter;
    setPropertyFilter(filter);
    document.querySelector("#rentals").scrollIntoView({ behavior: "smooth" });
  });
}

if (enquirySubmit) {
  enquirySubmit.addEventListener("click", prepareEnquiry);
}

rows.forEach((row) => {
  row.addEventListener("click", () => {
    rows.forEach((item) => item.classList.remove("is-open"));
    row.classList.add("is-open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

function revealVisibleItems() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.96 && rect.bottom > 0;
    if (isVisible) {
      item.classList.add("is-visible");
      observer.unobserve(item);
    }
  });
}

window.addEventListener("load", revealVisibleItems);
window.addEventListener("hashchange", () => window.setTimeout(revealVisibleItems, 80));
window.setTimeout(revealVisibleItems, 120);

if (video) {
  video.addEventListener("error", () => {
    video.style.display = "none";
  });
}
