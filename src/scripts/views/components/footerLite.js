class FooterLite extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer id="footer-lite" class="footer-general">
        <p class="text-muted">Copyright &copy; 2022 Webeer</p>
        <a href="#/about" class="text-muted">&nbsp;• About Us</a>
      </footer>
    `;
  }
}
customElements.define('footer-lite', FooterLite);
