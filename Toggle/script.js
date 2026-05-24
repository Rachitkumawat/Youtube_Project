function toggleSwitch(el) {
  el.classList.toggle('on');
  el.classList.toggle('off');

  if (el.classList.contains('toggle-modern')) {
    const icon = el.querySelector('.thumb-icon');
    icon.textContent = el.classList.contains('on') ? '✓' : '×';
  }
}