/**
 * @module PodHeader
 * @description Web component for the app header with logo, title, search, and profile icons.
 */

class PodHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Called when the element is added to the DOM.
   * @returns {void}
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Render the header layout.
   * @returns {void}
   */
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .header { display:flex; background:white; padding:16px 20px; align-items:center; box-shadow:0 2px 8px rgba(0,0,0,0.07); }
        .podcastLogoAndTitle { display:flex; align-items:center; gap:12px; }
        .podcastAppLogo { width:40px; height:40px; }
        .podcastTitle { font-size:24px; font-weight:700; }
        .podcastSearchAndProfile { margin-left:auto; display:flex; gap:16px; align-items:center; }
        .searchIcon, .profileIcon { cursor:pointer; width:30px; height:30px; }
      </style>

      <div class="header">
        <div class="podcastLogoAndTitle">
          <img src="assets/icons8-microphone-50.png" alt="PodcastApp Logo" class="podcastAppLogo" />
          <h1 class="podcastTitle">PodGenius</h1>
        </div>
        <div class="podcastSearchAndProfile">
          <img src="assets/icons8-search-30.png" alt="search icon" class="searchIcon" />
          <img src="assets/icons8-profile-picture-50.png" alt="profile icon" class="profileIcon" />
        </div>
      </div>
    `;
  }
}

customElements.define("pod-header", PodHeader);
