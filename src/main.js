import './style.css';
import { initHeroCanvas } from './canvas.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeroCanvasIfPresent() {
  const canvas = document.getElementById('hero-canvas');
  if (canvas) initHeroCanvas(canvas);
}

function initNodeRail() {
  const rail = document.querySelector('.node-rail');
  if (!rail) return;

  const links = [...rail.querySelectorAll('a')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = rail.querySelector(`a[href="#${entry.target.id}"]`);
        if (!link) return;
        link.classList.toggle('is-active', entry.isIntersecting);
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initBrandMarkTheme() {
  const mark = document.querySelector('.brand-mark');
  const sections = document.querySelectorAll('.section');
  if (!mark || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mark.classList.toggle('light', entry.target.classList.contains('light'));
        }
      });
    },
    { rootMargin: '0px 0px -96% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');

  if (reduceMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

initHeroCanvasIfPresent();
initNodeRail();
initBrandMarkTheme();
initReveal();
