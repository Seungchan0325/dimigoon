class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
          <div class="footer-left">
            <div class="footer-logo">
              <img class="footer-logo-img" src="assets/img/logo.svg">
              DimigoOn
            </div>
            <p class="footer-description">생각의 흐름을 키우는 알고리즘 학습 플랫폼</p>
          </div>
          <div class="footer-center">
            <div class="footer-links">
              <h4>바로가기</h4>
              <ul>
                <li><a href="algorithms.html">알고리즘</a></li>
                <li><a href="solutions.html">문제 풀이</a></li>
                <li><a href="about.html">정보</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-right">
            <div class="contact-info">
              <h4>문의</h4>
              <p>imchan0325@gmail.com</p>
              <div class="social-links">
                <a href="https://github.com/Seungchan0325" aria-label="GitHub">
                  <img class="social-link-img" src="assets/img/github-mark.svg">
                </a>
                <a href="https://www.instagram.com/dimigo_on/" aria-label="Instragram">
                  <img class="social-link-img" src="assets/img/instagram-mark.svg">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 seungchan lee. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
