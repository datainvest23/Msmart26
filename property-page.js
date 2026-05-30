(function () {
  const data = window.MARBELLA_PROPERTY_DATA || [];
  const mount = document.querySelector("[data-property-page]");
  const code = document.body.dataset.propertyCode;
  const property = data.find((item) => item.code === code);

  if (!mount || !property) return;

  const escapeHtml = (value) =>
    String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const renderFact = (label, value) => `
    <div class="property-fact">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value || "To be confirmed")}</strong>
    </div>
  `;

  const renderImage = (image, index) => {
    if (image.placeholder) {
      return `
        <figure class="detail-gallery-item detail-gallery-placeholder">
          <span>${escapeHtml(image.placeholder)}</span>
          <small>Replace with property photo ${index + 1}</small>
        </figure>
      `;
    }

    return `
      <figure class="detail-gallery-item">
        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || property.title)}" loading="${index === 0 ? "eager" : "lazy"}" />
      </figure>
    `;
  };

  const renderBookingSection = () => {
    if (!property.bookingUrl) {
      return `
        <section class="section booking-section booking-section-empty" id="booking-source" aria-label="Booking status">
          <div class="section-inner booking-empty">
            <p class="section-kicker">Booking source</p>
            <h2>No direct booking page yet.</h2>
            <p>This property came from the CSV without a direct booking URL, so the page is ready for copy, images and booking details when they are available.</p>
            <a class="button button-dark" href="https://wa.me/34638843644" target="_blank" rel="noreferrer">Ask About This Property</a>
          </div>
        </section>
      `;
    }

    return `
      <section class="section booking-section" id="direct-booking" aria-label="Live booking page">
        <div class="section-inner booking-layout">
          <div class="booking-copy">
            <p class="section-kicker">Direct booking</p>
            <h2>Live booking page</h2>
            <p>The provider page is embedded below where browser and booking-engine rules allow it. If it does not load, open the direct booking page in a new tab.</p>
            <a class="button button-dark" href="${escapeHtml(property.bookingUrl)}" target="_blank" rel="noreferrer">Open Direct Booking</a>
          </div>
          <div class="booking-frame" aria-label="Embedded booking page for ${escapeHtml(property.title)}">
            <iframe title="Direct booking page for ${escapeHtml(property.title)}" src="${escapeHtml(property.bookingUrl)}" loading="lazy"></iframe>
          </div>
        </div>
      </section>
    `;
  };

  const heroImage = property.images.find((image) => image.src);
  const facts = [
    ["Guests", property.guests],
    ["Bedrooms", property.bedrooms],
    ["Bathrooms", property.bathrooms],
    ["Beds", property.beds],
  ];

  mount.innerHTML = `
    <section class="detail-hero" aria-label="${escapeHtml(property.title)} overview">
      <div class="detail-hero-media ${heroImage ? "" : "is-placeholder"}">
        ${
          heroImage
            ? `<img src="${escapeHtml(heroImage.src)}" alt="${escapeHtml(heroImage.alt || property.title)}" />`
            : `<span>Image placeholder</span>`
        }
      </div>
      <div class="detail-hero-shade"></div>
      <div class="detail-hero-content">
        <a class="detail-back" href="../index.html#rentals">Back to rental portfolio</a>
        <p class="detail-code">${escapeHtml(property.code)} / ${escapeHtml(property.type)}</p>
        <h1>${escapeHtml(property.title)}</h1>
        <p>${escapeHtml(property.summary)}</p>
        <div class="detail-hero-actions">
          ${
            property.bookingUrl
              ? `<a class="button button-primary" href="${escapeHtml(property.bookingUrl)}" target="_blank" rel="noreferrer">Book Direct</a>`
              : `<a class="button button-primary" href="https://wa.me/34638843644" target="_blank" rel="noreferrer">Ask Availability</a>`
          }
          <a class="button button-secondary" href="../index.html#contact">Contact Marbella Smart</a>
        </div>
      </div>
    </section>

    <section class="section detail-overview" aria-label="${escapeHtml(property.title)} details">
      <div class="section-inner detail-overview-grid">
        <div class="detail-main-copy">
          <p class="section-kicker">Property details</p>
          <h2>${escapeHtml(property.bookingTitle || property.title)}</h2>
          ${property.description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </div>
        <aside class="detail-sidebar" aria-label="Property facts">
          <div class="detail-facts">
            ${facts.map(([label, value]) => renderFact(label, value)).join("")}
          </div>
          <div class="detail-source">
            <span>Source</span>
            <strong>${escapeHtml(property.source)}</strong>
          </div>
          ${
            property.rating
              ? `<div class="detail-source"><span>Guest rating</span><strong>${escapeHtml(property.rating)} / ${escapeHtml(property.reviews)}</strong></div>`
              : ""
          }
          <div class="detail-source">
            <span>Images</span>
            <strong>${escapeHtml(property.imageCount)}</strong>
          </div>
        </aside>
      </div>
    </section>

    <section class="section detail-gallery-section" aria-label="${escapeHtml(property.title)} image gallery">
      <div class="section-inner">
        <div class="detail-section-heading">
          <p class="section-kicker">Images</p>
          <h2>${property.bookingUrl ? "Booking-page photos" : "Photo placeholders"}</h2>
        </div>
        <div class="detail-gallery">
          ${property.images.map(renderImage).join("")}
        </div>
      </div>
    </section>

    <section class="section detail-feature-section" aria-label="${escapeHtml(property.title)} amenities and highlights">
      <div class="section-inner detail-feature-grid">
        <div>
          <p class="section-kicker">Highlights</p>
          <h2>At a glance</h2>
          <div class="detail-pill-list">
            ${property.highlights.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
        <div>
          <p class="section-kicker">Amenities</p>
          <h2>Included on page</h2>
          <div class="detail-pill-list">
            ${property.amenities.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      </div>
    </section>

    ${renderBookingSection()}
  `;
})();
