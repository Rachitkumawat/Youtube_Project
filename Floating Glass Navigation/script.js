const navTrack = document.getElementById('navTrack');
const bead = document.getElementById('activeBead');
const dock = document.querySelector('.dock');
const items = [...document.querySelectorAll('.nav-item')];
const title = document.getElementById('pageTitle');
const subline = document.getElementById('subline');
const preview = document.getElementById('preview');
const previewLabel = document.getElementById('previewLabel');
const previewTitle = document.getElementById('previewTitle');
const previewText = document.getElementById('previewText');
const previewNumber = document.getElementById('previewNumber');
const themeToggle = document.getElementById('themeToggle');

document.getElementById('year').textContent = new Date().getFullYear();

const sections = {

  Explore: {
    subline: 'Explore code, tools, and ideas.',
    label: 'EXPLORE / 01',
    title: 'Build. Break. Learn. Repeat.',
    text: 'Explore frontend ideas, new technologies, and small experiments that turn concepts into interfaces.',
    number: '01'
  },

  Work: {
    subline: 'Selected work and creative coding.',
    label: 'WORK / 02',
    title: 'Code that feels alive.',
    text: 'A selection of projects focused on clean interfaces, smooth interactions, and memorable user experiences.',
    number: '02'
  },

  Projects: {
    subline: 'Web projects, prototypes, and experiments.',
    label: 'PROJECT / 03',
    title: 'Ideas turned into interfaces.',
    text: 'From portfolio experiments to interactive websites, each project is a chance to try something new.',
    number: '03'
  },

  Connect: {
    subline: 'Let’s build something together.',
    label: 'CONNECT / 04',
    title: 'Let’s build something.',
    text: 'Open to interesting collaborations, creative projects, and conversations about web development.',
    number: '04'
  }

};

let current = Math.max(0, items.findIndex(item => item.classList.contains('active')));
let resizeFrame;

function positionBead(animate = true) {
  const active = items[current];
  if (!active) return;
  const trackRect = navTrack.getBoundingClientRect();
  const itemRect = active.getBoundingClientRect();
  const left = itemRect.left - trackRect.left;
  bead.style.transitionDuration = animate ? '' : '0ms';
  bead.style.left = `${left}px`;
  bead.style.width = `${itemRect.width}px`;
  dock.style.setProperty('--glow-left', `${left + itemRect.width / 2}px`);
}

function animateTitle(nextTitle) {
  title.style.opacity = '0';
  title.style.transform = 'translateY(7px) skewX(-2deg)';
  window.setTimeout(() => {
    title.textContent = nextTitle;
    title.style.opacity = '1';
    title.style.transform = 'translateY(0) skewX(0)';
  }, 125);
}

function selectSection(index, animate = true) {
  current = (index + items.length) % items.length;
  const item = items[current];
  const page = item.dataset.page;
  const data = sections[page];

  items.forEach((el, i) => {
    const active = i === current;
    el.classList.toggle('active', active);
    el.setAttribute('aria-current', active ? 'page' : 'false');
  });

  positionBead(animate);
  animateTitle(page);

  subline.style.opacity = '0';
  window.setTimeout(() => {
    subline.textContent = data.subline;
    subline.style.opacity = '1';
  }, 100);

  preview.classList.remove('visible');
  window.setTimeout(() => {
    previewLabel.textContent = data.label;
    previewTitle.textContent = data.title;
    previewText.textContent = data.text;
    previewNumber.textContent = data.number;
    preview.classList.add('visible');
  }, 150);
}

items.forEach((item, index) => {
  item.addEventListener('click', () => selectSection(index));
});

document.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  if (event.target.matches('input, textarea, select')) return;
  event.preventDefault();
  selectSection(current + (event.key === 'ArrowRight' ? 1 : -1));
});

themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('devspace-theme', dark ? 'dark' : 'light');
});

if (localStorage.getItem('devspace-theme') === 'dark') {
  document.body.classList.add('dark');
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => positionBead(false));
});

window.addEventListener('load', () => {
  positionBead(false);
  selectSection(current, false);
});
