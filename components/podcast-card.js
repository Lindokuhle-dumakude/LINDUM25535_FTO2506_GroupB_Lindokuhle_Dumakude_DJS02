/**
 * @module PodcastCard
 * @description Web component representing a single podcast card.
 * Displays image, title, number of seasons, and genres.
 * Emits "open-modal" event when clicked.
 */

class PodcastCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Set the podcast data and render the card.
   * @param {Object} data - Contains podcast, genres, and seasons.
   * @returns {void}
   */
  set data({ podcast, genres, seasons }) {
    this.podcast = podcast;
    this.genres = genres;
    this.seasons = seasons;
    this.render();
  }

  /**
   * Render podcast card layout.
   * @returns {void}
   */
  render() {
    const genreNames = this.podcast.genres
      .map((id) => this.genres.find((g) => g.id === id)?.title || `Genre ${id}`)
      .join(", ");

    this.shadowRoot.innerHTML = `
      <style>
        .card { background:white; border-radius:8px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.07); cursor:pointer; display:flex; flex-direction:column; justify-content:space-between; height:400px; transition: transform 0.2s; }
        .card:hover { transform:translateY(-5px); box-shadow:0 6px 20px rgba(0,0,0,0.15); }
        .podcastCover { width:100%; height:180px; border-radius:8px; }
        .cardDetails { margin-top:12px; display:flex; flex-direction:column; flex-grow:1; }
        .podcastTitleCard { margin-bottom:8px; font-weight:700; font-size:1.1rem; }
        .seasonNumber { color:#726e6e; font-size:0.9rem; margin-bottom:4px; }
        .genreNames { display:inline-block; background-color:#e0f2ff; color:#0077b6; padding:4px 8px; border-radius:6px; font-size:0.8rem; }
        .dateUpdated { font-size:0.8rem; color:#726e6e; }
      </style>

      <div class="card">
        <img src="${this.podcast.image}" alt="${
      this.podcast.title
    }" class="podcastCover"/>
        <div class="cardDetails">
          <h3 class="podcastTitleCard">${this.podcast.title}</h3>
          <p class="seasonNumber">${this.podcast.seasons} Seasons</p>
          <span class="genreNames">${genreNames}</span>
          <p class="dateUpdated">Updated: ${new Date(
            this.podcast.updated
          ).toLocaleDateString()}</p>
        </div>
      </div>
    `;

    // Emit "open-modal" event when clicked
    this.shadowRoot.querySelector(".card").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("open-modal", {
          detail: this.podcast,
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("podcast-card", PodcastCard);
