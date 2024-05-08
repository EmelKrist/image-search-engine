import { clientId } from "./properties.js";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

/**
 * Method to search images on request.
 */
async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=
  ${page}&query=${keyword}&client_id=${clientId}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();
  // clear the images from last request
  if (page == 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;
  // add responsed images with links to search result area
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = "block";
}

/**
 * Listener for search button
 */
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

/**
 * Listener for show more button
 */
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
