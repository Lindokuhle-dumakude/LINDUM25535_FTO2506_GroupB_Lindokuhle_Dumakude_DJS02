/**
 * @module PodcastApp
 * @description Main wrapper component for PodGenius.
 * Handles rendering the header, filter section, podcast grid, and manages modal interactions.
 */

import { podcasts, genres, seasons } from "../data.js";
import "./pod-header.js";
import "./podcast-card.js";
import "./podcast-modal.js";

/**
 * @class PodcastApp
 * @extends HTMLElement
 * @description Main app component. Manages podcast listing and filters.
 */
class PodcastApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Called when the element is inserted into the DOM.
   * Initializes layout and displays podcasts.
   * @returns {void}
   */
  connectedCallback() {
    this.render();
    this.displayPodcasts();
  }

  /**
   * Render static layout of the app, including header, filters, main grid, and modal.
   * @returns {void}
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:'Poppins', sans-serif; }
        main { display:grid; gap:0.5rem; grid-template-columns:repeat(4, minmax(0,304px)); padding:20px; }
        .filterSection { padding-left:20px; margin-bottom:16px; }
      </style>

      <pod-header></pod-header>
      <section class="filterSection">
        <label for="genreFilter">Filter by:</label>
        <select id="genreFilter">
          <option value="all">All Genres</option>
          ${genres.map(g => `<option value="${g.id}">${g.title}</option>`).join("")}
        </select>

        <select id="updateFilter">
          <option value="recent">Recently Updated</option>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
        </select>
      </section>

      <main id="podcastGrid"></main>
      <podcast-modal></podcast-modal>
    `;

    this.genreFilter = this.shadowRoot.getElementById("genreFilter");
    this.updateFilter = this.shadowRoot.getElementById("updateFilter");
    this.podcastGrid = this.shadowRoot.getElementById("podcastGrid");
    this.modal = this.shadowRoot.querySelector("podcast-modal");

    this.genreFilter.addEventListener("change", () => this.displayPodcasts());
    this.updateFilter.addEventListener("change", () => this.displayPodcasts());
  }

  /**
   * Render podcast cards in the main grid.
   * Filters can be applied based on selected genre or sorting.
   * @returns {void}
   */
  displayPodcasts() {
    this.podcastGrid.innerHTML = "";
    let filtered = [...podcasts];

    // Filter by genre
    const genre = this.genreFilter.value;
    if (genre !== "all") {
      filtered = filtered.filter(p => p.genres.includes(Number(genre)));
    }

    // Render cards
    filtered.forEach(podcast => {
      const card = document.createElement("podcast-card");
      card.data = { podcast, genres, seasons };
      /**
       * @event open-modal
       * @type {CustomEvent<Object>}
       * @property {Object} detail - Podcast object to display in modal.
       */
      card.addEventListener("open-modal", e => this.modal.open(e.detail));
      this.podcastGrid.appendChild(card);
    });
  }
}

customElements.define("podcast-app", PodcastApp);
