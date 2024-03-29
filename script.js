const SelectShow = document.getElementById("show-options");
const selectEl = document.getElementById("episodeOptions");
const rootElem = document.getElementById("root");
const homeBtn = document.querySelector(".btn ");

let btns;
let allEpisodes;
let allShows;
let showId;

// let showTitle;
function setup() {
  fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .then((data) => {
      allShows = data;
      accessingAllshows(allShows);
    });
}

function accessingAllshows() {
  makePageForShows(allShows);
  selectShowsList(allShows);
  showTitle = document.querySelectorAll(".show-container");
  showTitle.forEach((show) => {
    show.addEventListener("click", (e) => getShowById(e));
  });
  btns = document.querySelectorAll(".read-more");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.style.display = "none";
      let nextSibling = btn.nextElementSibling;
      nextSibling.style.display = "inline";
    });
  });
}

// creating function to display all shows
function makePageForShows(showList) {
  // looping through each show and creating div
  rootElem.innerHTML = "";
  SelectShow.style.display = "block";
  showList.map((show) => {
    // creating div container
    const showContainer = document.createElement("div");
    showContainer.className = "show-container";
    rootElem.appendChild(showContainer);
    //  creating heading h3
    const showName = document.createElement("h3");
    showName.className = "show-name";
    showName.textContent = show.name;
    showName.id = show.id;
    showContainer.appendChild(showName);

    // creating image
    const showImage = document.createElement("img");
    showImage.className = "show-image";
    showImage.src = show.image.medium;
    showContainer.appendChild(showImage);

    // creating credits of the show
    const listElt = document.createElement("ul");
    listElt.className = "list-name";
    listElt.innerHTML = `      
    <li><b>Rated:</b> ${show.rating.average}</li>
    <li><b>Genres:</b> ${show.genres.join(" | ")}</li>
    <li><b>Status:</b> ${show.status}</li>
    <li><b>Runtime:</b> ${show.runtime}</li>`;
    showContainer.appendChild(listElt);

    // creating episodes summary
    const showSummary = document.createElement("p");
    const summaryText = show.summary.replace("<p>", "").replace("</p>", "");
    showSummary.className = "show-summary";
    showSummary.innerHTML = summaryText.substring(0, 80);
    showContainer.appendChild(showSummary);

    const spanSummary = document.createElement("span");
    spanSummary.className = "span-summary";
    spanSummary.innerHTML = summaryText.substring(80, summaryText.length);

    const buttons = document.createElement("button");
    buttons.className = "read-more";
    buttons.innerHTML = "Read more...";
    showSummary.append(buttons, spanSummary);
  });
}

// sorting selecting show section alphabetically
function selectShowsList(showsList) {
  showsList.sort((a, b) => {
    let aShow = a.name.toLowerCase();
    let bShow = b.name.toLowerCase();
    return aShow < bShow ? -1 : 1;
  });
  showsList.map((show) => {
    let option = document.createElement("option");
    option.innerText = show.name;
    option.value = show.id;
    SelectShow.appendChild(option);
  });
}
// search input area
const searchInputShow = document.getElementById("search-input");
searchInputShow.addEventListener("keyup", (e) => {
  const searchStringShow = e.target.value.toLowerCase();
  const filteredShow = allShows.filter((show) => {
    return show.name.toLowerCase().includes(searchStringShow);
 
  });
  while (rootElem.firstChild) {
    rootElem.removeChild(rootElem.firstChild);
  }
  //  counting shows
 const showCount = document.getElementById("episode-count");
  showCount.innerHTML = `Display ${filteredShow.length}/${allShows.length} shows`;
  showCount.classList.remove("hide");
  if (e.target.value === "") {
    showCount.classList.add("hide");
  }
  makePageForShows(filteredShow);
  show.addEventListener("click", (e) => getShowById(e));
});

// ........ episode creating section //

function getEpisodes() {
  makePageForEpisodes(allEpisodes);
  optionalEpisode(allEpisodes);

  btns = document.querySelectorAll(".read-more");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.style.display = "none";
      let nextSibling = btn.nextElementSibling;
      nextSibling.style.display = "inline";
    });
  });
}

// creating pages for episodes
function makePageForEpisodes(episodeList) {
  // looping through each episode and creating div
  rootElem.innerHTML = "";
  SelectShow.style.display = "none";
  episodeList.map((episode) => {
    // creating div container
    const episodeContainer = document.createElement("div");
    episodeContainer.className = "episode-container";
    rootElem.appendChild(episodeContainer);
    //  creating heading h3
    const episodeName = document.createElement("h3");
    episodeName.className = "episode-name";
    episodeName.innerText = `${episode.name} - ${episodeCodeFormatter(
      episode.season,
      episode.number
    )}`;
    episodeContainer.appendChild(episodeName);
    // creating image
    const episodeImage = document.createElement("img");
    episodeImage.className = "episode-image";
    episodeImage.src = episode.image.medium;
    episodeContainer.appendChild(episodeImage);
    // creating episodes summary
    const episodeSummary = document.createElement("p");
    const summaryText = episode.summary.replace("<p>", "").replace("</p>", "");
    episodeSummary.className = "episode-summary";
    episodeSummary.innerHTML = summaryText.substring(0, 80);
    episodeContainer.appendChild(episodeSummary);

    const spanSummary = document.createElement("span");
    spanSummary.className = "span-summary";
    spanSummary.innerHTML = summaryText.substring(80, summaryText.length);

    const buttons = document.createElement("button");
    buttons.className = "read-more";
    buttons.innerHTML = "Read more...";
    episodeSummary.append(buttons, spanSummary);
  });
}

//  search input for episode
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toUpperCase();
  const filteredEpi = allEpisodes.filter((episode) => {
    return (
      episode.name.toUpperCase().includes(searchString) ||
      episode.summary.toUpperCase().includes(searchString)
    );
  });
  while (rootElem.firstChild) {
    rootElem.removeChild(rootElem.firstChild);
  }
  //  counting episodes
  const episodeCount = document.getElementById("episode-count");
  episodeCount.innerHTML = `Display ${filteredEpi.length}/${allEpisodes.length} episodes`;
  episodeCount.classList.remove("hide");
  if (e.target.value === "") {
    episodeCount.classList.add("hide");
  }

  makePageForEpisodes(filteredEpi);
});

//  select option dropdown

function optionalEpisode(episodeList) {
  episodeList.map((episode) => {
    const optionEl = document.createElement("option");
    optionEl.classList.add("optionElement");
    optionEl.innerText = ` ${episodeCodeFormatter(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    optionEl.value = ` ${episodeCodeFormatter(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    selectEl.appendChild(optionEl);
  });
}
//  event listener for select
function showEpisode(e, episodeList) {
  let selectedEpisode = e.target.value;
  if (selectedEpisode === "epi") {
    makePageForEpisodes(episodeList);
  } else {
    let matchedEpisode = episodeList.find((episode) => {
      let episodeName = ` ${episodeCodeFormatter(
        episode.season,
        episode.number
      )} - ${episode.name}`;
      return episodeName == selectedEpisode;
    });
    makePageForEpisodes([matchedEpisode]);
  }
  btns = document.querySelectorAll(".read-more");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.style.display = "none";
      let nextSibling = btn.nextElementSibling;
      nextSibling.style.display = "inline";
    });
  });
}
function getShowById(e) {
  if (e.target.value) {
    showId = e.target.value;
  } else {
    showId = e.target.id;
  }

  fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) => response.json())
    .then((data) => (allEpisodes = data))
    .then(() => getEpisodes());
}

//  ...... event listeners....... //
selectEl.addEventListener("change", (e) => showEpisode(e, allEpisodes));
SelectShow.addEventListener("change", (e) => {
  getShowById(e);
});

homeBtn.addEventListener("click", () => {
  SelectShow.value = -1;
  setup();
});
// function to format the episodes and shows //
function episodeCodeFormatter(season, episode) {
  season = season < 10 ? "0" + season : season;
  episode = episode < 10 ? "0" + episode : episode;
  return `S${season}E${episode}`;
}

window.onload = setup;
