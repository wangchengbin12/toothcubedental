(() => {
  const links = [...document.querySelectorAll('[data-gallery]')];
  const viewer = document.getElementById('gallery-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const photo = document.getElementById('gallery-full');
  let current = 0;
  let opener;
  const show = index => {
    current = (index + links.length) % links.length;
    const link = links[current];
    photo.src = link.href;
    photo.alt = link.querySelector('img').alt;
    document.getElementById('gallery-caption').textContent = link.closest('figure').querySelector('figcaption').textContent;
    document.getElementById('gallery-count').textContent = (current + 1) + ' / ' + links.length;
  };
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(index);
    viewer.showModal();
    document.body.classList.add('gallery-open');
  }));
  document.getElementById('gallery-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('gallery-next').addEventListener('click', () => show(current + 1));
  document.getElementById('gallery-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  viewer.addEventListener('click', event => { if(event.target === viewer) {
    const rect = viewer.getBoundingClientRect();
    if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  }});
  viewer.addEventListener('close', () => { document.body.classList.remove('gallery-open'); opener?.focus(); });
})();
