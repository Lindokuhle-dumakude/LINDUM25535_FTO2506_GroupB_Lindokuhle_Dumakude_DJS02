/**
 * @module PodcastModal
 * @description Web component for displaying podcast details in a modal.
 * Handles genre tags, seasons, description with Read More toggle, and closing logic.
 */

import { genres, seasons } from "../data.js";

class PodcastModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  /**
   * Render modal skeleton.
   * @returns {void}
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .modal { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:1000; }
        .hidden { display:none; }
        .modal-content { background:white; padding:24px; border-radius:12px; max-width:700px; width:90%; max-height:90vh; overflow-y:auto; position:relative; }
        .close { position:absolute; top:15px; right:15px; font-size:1.8rem; color:red; cursor:pointer; font-weight:bold; }
        .modal-body { display:flex; gap:20px; }
        .modal-cover { width:180px; height:180px; object-fit:cover; border-radius:8px; }
        .genre-tag { display:inline-block; background:#e0f2ff; color:#0077b6; padding:4px 8px; border-radius:8px; font-size:0.8rem; margin:3px; }
        .read-more { background:none; border:none; color:#0077b6; cursor:pointer; font-weight:600; }
      </style>

      <div class="modal hidden">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2 id="modalTitle"></h2>
          <div class="modal-body">
            <img id="modalImage" class="modal-cover"/>
            <div>
              <p id="modalDescription"></p>
              <div id="modalGenres"></div>
              <p id="modalUpdated"></p>
              <div id="modalSeasonsList"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.modalEl = this.shadowRoot.querySelector(".modal");
    this.shadowRoot
      .querySelector(".close")
      .addEventListener("click", () => this.close());
    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  /**
   * Open modal and populate podcast details.
   * @param {Object} podcast - Podcast object with title, image, description, genres, updated, and id.
   * @returns {void}
   */
  open(podcast) {
    // title and image
    this.shadowRoot.getElementById("modalTitle").textContent = podcast.title;
    this.shadowRoot.getElementById("modalImage").src = podcast.image;

    // description with read more
    const descContainer = this.shadowRoot.getElementById("modalDescription");
    const maxLength = 180;
    if (podcast.description.length > maxLength) {
      const shortDesc = podcast.description.slice(0, maxLength) + "...";
      descContainer.innerHTML = `
        <span id="shortDesc">${shortDesc}</span>
        <span id="fullDesc" class="hidden">${podcast.description}</span>
        <button id="readMoreBtn" class="read-more">Read more</button>
      `;
      this.shadowRoot
        .getElementById("readMoreBtn")
        .addEventListener("click", () => {
          this.shadowRoot
            .getElementById("shortDesc")
            .classList.toggle("hidden");
          this.shadowRoot.getElementById("fullDesc").classList.toggle("hidden");
          const btn = this.shadowRoot.getElementById("readMoreBtn");
          btn.textContent =
            btn.textContent === "Read more" ? "Show less" : "Read more";
        });
    } else descContainer.textContent = podcast.description;

    // genres
    const genresContainer = this.shadowRoot.getElementById("modalGenres");
    genresContainer.innerHTML = "";
    podcast.genres.forEach((id) => {
      const genreObj = genres.find((g) => g.id === id);
      const span = document.createElement("span");
      span.classList.add("genre-tag");
      span.textContent = genreObj ? genreObj.title : `Genre ${id}`;
      genresContainer.appendChild(span);
    });
    genresContainer.style.display = "flex";
    genresContainer.style.gap = "10px";
    genresContainer.style.flexWrap = "wrap";

    // seasons
    const seasonsContainer = this.shadowRoot.getElementById("modalSeasonsList");
    seasonsContainer.innerHTML = "";
    const seasonData = seasons.find((s) => s.id === podcast.id);
    if (seasonData) {
      seasonData.seasonDetails.forEach((season) => {
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.padding = "8px";
        div.style.marginTop = "6px";
        div.style.backgroundColor = "#f5f5f5";
        div.style.borderRadius = "6px";
        div.textContent = season.title;
        const episodeSpan = document.createElement("span");
        episodeSpan.textContent = `${season.episodes} episodes`;
        div.appendChild(episodeSpan);
        seasonsContainer.appendChild(div);
      });
    }

    // updated
    this.shadowRoot.getElementById(
      "modalUpdated"
    ).textContent = `Last updated: ${new Date(
      podcast.updated
    ).toLocaleDateString()}`;

    this.modalEl.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  /**
   * Close modal and restore scrolling.
   * @returns {void}
   */
  close() {
    this.modalEl.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

customElements.define("podcast-modal", PodcastModal);
