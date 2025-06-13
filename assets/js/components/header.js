class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="/" class="header-logo">
          <img class="header-logo-img" src="assets/img/logo.svg">
          DimigoOn
        </a>
        <nav class="header-navs">
          <ul class="header-nav-list">
            <li><a href="#" class="header-nav">Algorithms</a></li>
            <li><a href="#" class="header-nav">Solutions</a></li>
            <li><a href="#" class="header-nav">About</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define('site-header', SiteHeader);
