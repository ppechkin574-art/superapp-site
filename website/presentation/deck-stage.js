/* Minimal <deck-stage> web component
   Renders a vertical stack of 1920x1080 slides, scaled uniformly to fit the viewport width. */
(function(){
  if (customElements.get('deck-stage')) return;

  class DeckStage extends HTMLElement {
    connectedCallback(){
      const W = parseInt(this.getAttribute('width')  || '1920', 10);
      const H = parseInt(this.getAttribute('height') || '1080', 10);
      Object.assign(this.style, {
        display: 'block',
        position: 'relative',
        width: '100%',
        background: '#000'
      });
      const slides = Array.from(this.querySelectorAll('.slide'));
      slides.forEach(s => {
        s.style.transformOrigin = 'top left';
        s.style.position = 'relative';
        s.style.flexShrink = '0';
      });
      const fit = () => {
        const vw = window.innerWidth;
        const k = vw / W;
        const sh = Math.round(H * k);
        slides.forEach(s => {
          s.style.transform = 'scale(' + k + ')';
          s.style.width  = W + 'px';
          s.style.height = H + 'px';
          s.style.marginBottom = (sh - H) + 'px';
        });
      };
      fit();
      window.addEventListener('resize', fit);
    }
  }
  customElements.define('deck-stage', DeckStage);
})();
