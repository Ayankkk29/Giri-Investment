/* src/utils/animations.js — GSAP + ScrollTrigger Motion System for Giri Investment */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Check if user prefers reduced motion
export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Clean up all ScrollTrigger instances without interrupting page wipe
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  const nonWipeElements = document.querySelectorAll('*:not(.page-wipe-overlay)');
  if (nonWipeElements.length > 0) {
    gsap.killTweensOf(nonWipeElements);
  }
}

// Helper: Count up numbers smoothly
export function animateCountUp(element, endVal, prefix = '', suffix = '', duration = 1.6) {
  if (!element || isReducedMotion()) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: endVal,
    duration: duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.innerHTML = `${prefix}${Math.floor(obj.val)}<sup>+</sup>${suffix}`;
    }
  });
}

/* ==========================================================================
   SECTION 1 — HERO: "Ledger Awakens"
   ========================================================================== */
export function animateHero() {
  if (isReducedMotion()) return;

  const heroSection = document.querySelector('.hero-section-wrapper');
  const header = document.querySelector('.main-header');
  const caption = document.querySelector('.hero-caption-tag');
  const titleLines = document.querySelectorAll('.hero-title-line');
  const subtext = document.querySelector('.hero-subtext-para');
  const btnGroup = document.querySelector('.hero-btn-group');
  const ledgerCard = document.querySelector('.ledger-sheet-tilted');
  const sparklinePath = document.querySelector('.sparkline-path');
  const verifiedStamp = document.querySelector('.verified-stamp');
  const bgPattern = document.querySelector('.hero-bg-parallax');

  // Entrance Sequence on Load
  const tl = gsap.timeline({ delay: 0.1 });

  if (header) {
    tl.fromTo(header, 
      { y: -20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
  }

  if (caption) {
    tl.fromTo(caption,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
  }

  if (titleLines && titleLines.length > 0) {
    tl.fromTo(titleLines,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
      '-=0.3'
    );
  }

  if (subtext) {
    tl.fromTo(subtext,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
  }

  if (btnGroup) {
    tl.fromTo(btnGroup.children,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );
  }

  if (ledgerCard) {
    tl.fromTo(ledgerCard,
      { x: 60, rotation: 3, scale: 0.96, opacity: 0 },
      { x: 0, rotation: 1.5, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.3)' },
      '-=0.5'
    );
  }

  if (sparklinePath) {
    const length = sparklinePath.getTotalLength ? sparklinePath.getTotalLength() : 300;
    gsap.set(sparklinePath, { strokeDasharray: length, strokeDashoffset: length });
    tl.to(sparklinePath, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, '-=0.4');
  }

  if (verifiedStamp) {
    tl.fromTo(verifiedStamp,
      { scale: 1.4, rotation: -25, opacity: 0 },
      { scale: 1, rotation: -10, opacity: 0.85, duration: 0.4, ease: 'bounce.out' },
      '-=0.3'
    );
  }

  // Scroll Out Scrub Effect
  if (heroSection && ledgerCard) {
    gsap.to(heroSection, {
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5
      },
      scale: 0.96,
      y: -30,
      opacity: 0.85,
      ease: 'none'
    });

    if (bgPattern) {
      gsap.to(bgPattern, {
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        },
        y: 40,
        ease: 'none'
      });
    }
  }
}

/* ==========================================================================
   SECTION 2 — EXECUTIVE SPLIT HERO: "Paper Unfold"
   ========================================================================== */
export function animateExecutiveHero() {
  if (isReducedMotion()) return;

  const section = document.querySelector('.luxury-hero-split');
  const leftContent = document.querySelector('.luxury-hero-content');
  const rightImg = document.querySelector('.luxury-hero-img');
  const circleBadge = document.querySelector('.luxury-circle-badge');

  if (!section) return;

  gsap.fromTo(section,
    { opacity: 0.7, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%'
      }
    }
  );

  if (leftContent) {
    gsap.fromTo(leftContent.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%'
        }
      }
    );
  }

  if (rightImg) {
    gsap.fromTo(rightImg,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        }
      }
    );
  }

  if (circleBadge) {
    gsap.fromTo(circleBadge,
      { rotation: -30, scale: 0.8, opacity: 0 },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );
  }
}

/* ==========================================================================
   SECTION 3 — FINANCIAL PLANNING TOOLS: "Calculator Assembly"
   ========================================================================== */
export function animateCalculators() {
  if (isReducedMotion()) return;

  const section = document.querySelector('#calc-panel-header');
  const lineDraw = document.querySelector('.calc-assembly-line');
  const calcCard = document.querySelector('.calculator-card.desktop-inline-calc-card') || document.querySelector('.mobile-calc-cta-card');
  const calcTabs = document.querySelectorAll('.calc-tab-btn');
  const calcInputs = document.querySelectorAll('.calc-input-group');
  const chartPath = document.querySelector('.calc-chart-path-line');

  if (!section) return;

  if (lineDraw) {
    gsap.fromTo(lineDraw, 
      { scaleX: 0, transformOrigin: 'center center' },
      {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        }
      }
    );
  }

  if (calcCard) {
    gsap.fromTo(calcCard,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%'
        }
      }
    );
  }

  if (calcTabs && calcTabs.length > 0) {
    gsap.fromTo(calcTabs,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );
  }

  if (calcInputs && calcInputs.length > 0) {
    gsap.fromTo(calcInputs,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%'
        }
      }
    );
  }

  if (chartPath) {
    const length = chartPath.getTotalLength ? chartPath.getTotalLength() : 400;
    gsap.set(chartPath, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(chartPath, {
      strokeDashoffset: 0,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top 65%'
      }
    });
  }
}

/* ==========================================================================
   SECTION 4 — TRUSTED NETWORK: "Ledger Entries"
   ========================================================================== */
export function animateTrustedNetwork() {
  if (isReducedMotion()) return;

  const section = document.querySelector('.trusted-network-section');
  const statCols = document.querySelectorAll('.trusted-stat-col');
  const ledgerRows = document.querySelectorAll('.partner-ledger-row');

  if (!section) return;

  // Animate Stat Numbers Count Up
  if (statCols && statCols.length > 0) {
    statCols.forEach((col, idx) => {
      const numElem = col.querySelector('.stat-num-gold');
      const targetVal = idx === 0 ? 30 : idx === 1 ? 15 : 25;
      
      ScrollTrigger.create({
        trigger: col,
        start: 'top 85%',
        onEnter: () => animateCountUp(numElem, targetVal, '', '', 1.4)
      });
    });
  }

  // Animate Partner Ledger Rows Entry Sequentially
  if (ledgerRows && ledgerRows.length > 0) {
    gsap.fromTo(ledgerRows,
      { x: 45, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.partner-ledger-table',
          start: 'top 85%'
        }
      }
    );
  }
}

/* ==========================================================================
   SECTION 5 — ABOUT US / LEGACY TIMELINE: "Time Travel"
   ========================================================================== */
export function animateLegacyTimeline() {
  if (isReducedMotion()) return;

  const nodes = document.querySelectorAll('.about-history-node');
  if (!nodes || nodes.length === 0) return;

  nodes.forEach((node, i) => {
    gsap.fromTo(node,
      { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%'
        }
      }
    );
  });
}

/* ==========================================================================
   SECTION 6 — LEADERSHIP: "Portrait Reveal"
   ========================================================================== */
export function animateLeadership() {
  if (isReducedMotion()) return;

  const teamCards = document.querySelectorAll('.team-card-with-photo');
  if (!teamCards || teamCards.length === 0) return;

  teamCards.forEach((card, idx) => {
    gsap.fromTo(card,
      { x: idx === 0 ? -50 : 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%'
        }
      }
    );
  });
}

/* ==========================================================================
   SECTION 7 — EXECUTIVE ADVISORY STUDIO: "Camera Push"
   ========================================================================== */
export function animateStudio() {
  if (isReducedMotion()) return;

  const studioImg = document.querySelector('.studio-space-img');
  if (!studioImg) return;

  gsap.fromTo(studioImg,
    { scale: 1.12 },
    {
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: studioImg,
        start: 'top 85%'
      }
    }
  );
}

/* ==========================================================================
   SECTION 8 — MUTUAL FUNDS LANDING: "Cards Emerge From Depth"
   ========================================================================== */
export function animateMFLanding() {
  if (isReducedMotion()) return;

  const cards = document.querySelectorAll('.mf-landing-grid .mf-landing-card');
  if (!cards || cards.length === 0) return;

  gsap.fromTo(cards,
    { scale: 0.9, y: 35, opacity: 0 },
    {
      scale: 1,
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.mf-landing-grid',
        start: 'top 85%'
      }
    }
  );
}

/* ==========================================================================
   SECTION 9 — FUND SELECTOR: "Financial Data Stream"
   ========================================================================== */
export function animateFundSelector() {
  if (isReducedMotion()) return;

  const rows = document.querySelectorAll('.fd-table tbody tr');
  if (!rows || rows.length === 0) return;

  gsap.fromTo(rows,
    { y: 15, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.45,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.fd-table-container',
        start: 'top 85%'
      }
    }
  );
}

/* ==========================================================================
   SECTION 10 — INVESTMENT BASKETS: "Portfolio Construction"
   ========================================================================== */
export function animateBaskets() {
  if (isReducedMotion()) return;

  const basketCards = document.querySelectorAll('.basket-card');
  if (!basketCards || basketCards.length === 0) return;

  gsap.fromTo(basketCards,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.basket-grid',
        start: 'top 85%'
      }
    }
  );
}

/* ==========================================================================
   SECTION 11 — INSURANCE LANDING: "Shield Formation"
   ========================================================================== */
export function animateInsuranceLanding() {
  if (isReducedMotion()) return;

  const cards = document.querySelectorAll('#insurance-landing-grid .mf-landing-card');
  if (!cards || cards.length === 0) return;

  gsap.fromTo(cards,
    { scale: 0.9, opacity: 0, y: 30 },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#insurance-landing-grid',
        start: 'top 85%'
      }
    }
  );
}

/* ==========================================================================
   SECTION 13 — DOWNLOADS: "Document Stack"
   ========================================================================== */
export function animateDownloads() {
  if (isReducedMotion()) return;

  const docCards = document.querySelectorAll('.download-item-card');
  if (!docCards || docCards.length === 0) return;

  docCards.forEach((card) => {
    gsap.fromTo(card,
      { y: 45, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        }
      }
    );
  });
}

/* ==========================================================================
   SECTION 14 — CONTACT: "Ledger Receipt"
   ========================================================================== */
export function animateContact() {
  if (isReducedMotion()) return;

  const formCard = document.querySelector('.contact-form-card');
  if (!formCard) return;

  gsap.fromTo(formCard,
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formCard,
        start: 'top 85%'
      }
    }
  );
}

/* ==========================================================================
   SECTION 15 — FINAL CTA: "Peak of Trust Mountain"
   ========================================================================== */
export function animateFinalCTA() {
  if (isReducedMotion()) return;

  const footer = document.querySelector('.footer-luxury');
  const mountainPath = document.querySelector('.footer-mountain-path');

  if (!footer) return;

  if (mountainPath) {
    const length = mountainPath.getTotalLength ? mountainPath.getTotalLength() : 500;
    gsap.set(mountainPath, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(mountainPath, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%'
      }
    });
  }
}

/* ==========================================================================
   PAGE WIPE TRANSITION (PREMIUM ROUTE TRANSITION ENGINE)
   ========================================================================== */
export function executePageWipe(onMiddle) {
  if (isReducedMotion()) {
    if (onMiddle) onMiddle();
    return;
  }

  const wipeElem = document.querySelector('.page-wipe-overlay');
  if (!wipeElem) {
    if (onMiddle) onMiddle();
    return;
  }

  gsap.killTweensOf(wipeElem);
  gsap.set(wipeElem, { display: 'block', scaleX: 0, transformOrigin: 'left center' });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(wipeElem, { display: 'none', scaleX: 0 });
    },
    onInterrupt: () => {
      gsap.set(wipeElem, { display: 'none', scaleX: 0 });
    }
  });

  tl.to(wipeElem, {
    scaleX: 1,
    duration: 0.28,
    ease: 'power3.in'
  })
  .add(() => {
    if (onMiddle) onMiddle();
    window.scrollTo(0, 0);
  })
  .to(wipeElem, {
    scaleX: 0,
    transformOrigin: 'right center',
    duration: 0.28,
    ease: 'power3.out'
  });
}
