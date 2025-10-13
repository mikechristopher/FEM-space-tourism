// --- Fetch shared data once ---
fetch("./assets/data.json")
  .then((res) => res.json())
  .then(({ destinations, crew, technology }) => {
    const pageType = document.body.classList[0]; // "destination", "crew", or "technology"

    if (pageType === "destination") {
      initDestination(destinations);
    } else if (pageType === "crew") {
      initCrew(crew);
    } else if (pageType === "technology") {
      initTechnology(technology);
    }
  })
  .catch((err) => console.error("Error loading data:", err));

// --- Destination page logic ---
function initDestination(destinations) {
  const img = document.querySelector(".destination-img");
  const nameEl = document.querySelector(".dest-place");
  const descEl = document.querySelector(".dest-detail p");
  const distanceEl = document.querySelector(".stats .stat-detail:nth-of-type(1)");
  const travelEl = document.querySelector(".stats .stat-detail:nth-of-type(2)");
  const links = document.querySelectorAll(".destination-links a");

  function showDestination(destinationName) {
    const dest = destinations.find((d) => d.name.toLowerCase() === destinationName.toLowerCase());
    if (!dest) return;

    img.src = dest.images.png;
    img.alt = dest.name;
    nameEl.textContent = dest.name;
    descEl.textContent = dest.description;
    distanceEl.textContent = dest.distance;
    travelEl.textContent = dest.travel;

    links.forEach((link) => {
      link.classList.toggle(
        "current",
        link.textContent.trim().toLowerCase() === destinationName.toLowerCase()
      );
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      showDestination(link.textContent.trim());
    });
  });

  showDestination("Moon"); // Default
}

// --- Crew page logic ---
function initCrew(crew) {
  const img = document.querySelector(".crew-img");
  const nameEl = document.querySelector(".crew-name");
  const roleEl = document.querySelector(".crew-role");
  const bioEl = document.querySelector(".crew-bio");
  const dots = document.querySelectorAll(".crew-selector button");

  function showCrew(index) {
    const member = crew[index];
    img.src = member.images.png;
    img.alt = member.name;
    nameEl.textContent = member.name;
    roleEl.textContent = member.role;
    bioEl.textContent = member.bio;

    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showCrew(index));
  });

  showCrew(0); // Default to first crew member
}

// --- Technology page logic ---
function initTechnology(technology) {
  const img = document.querySelector(".tech-img");
  const nameEl = document.querySelector(".tech-name");
  const descEl = document.querySelector(".tech-desc");
  const buttons = document.querySelectorAll(".tech-selector button");

  function showTech(index) {
    const tech = technology[index];
    img.src = tech.images.portrait;
    img.alt = tech.name;
    nameEl.textContent = tech.name;
    descEl.textContent = tech.description;

    buttons.forEach((btn, i) => btn.classList.toggle("active", i === index));
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => showTech(index));
  });

  showTech(0); // Default to first technology
}
