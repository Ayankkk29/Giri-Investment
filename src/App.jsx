import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  Calculator,
  X, 
  Check, 
  Activity, 
  ArrowDownToLine,
  Menu,
  Search,
  FileText,
  ExternalLink,
  ShieldCheck,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';
import './App.css';
import { 
  animateHero, 
  animateExecutiveHero, 
  animateCalculators, 
  animateTrustedNetwork, 
  animateLegacyTimeline, 
  animateLeadership, 
  animateStudio, 
  animateMFLanding, 
  animateFundSelector, 
  animateBaskets, 
  animateInsuranceLanding, 
  animateDownloads, 
  animateContact, 
  animateFinalCTA, 
  executePageWipe, 
  cleanupScrollTriggers 
} from './utils/animations';

// ----------------------------------------------------
// Formatting Helper Functions (Indian Numbering System)
// ----------------------------------------------------
function formatCurrency(num) {
  if (num === undefined || num === null) return '₹0';
  const val = Math.round(num);
  
  if (val >= 10000000) {
    return '₹' + (val / 10000000).toFixed(2) + ' Cr';
  } else if (val >= 100000) {
    return '₹' + (val / 100000).toFixed(2) + ' Lakhs';
  } else {
    return '₹' + val.toLocaleString('en-IN');
  }
}

// Download / Client Resource Documents Dataset
const downloadFiles = [
  // --- GIRI INVESTMENT CLIENT FORMS & INSURANCE ---
  { 
    id: 'lic_surrender', 
    title: 'LIC Policy Surrender Form (Form No. 5074)', 
    desc: 'Official LIC Form No. 5074 receipt of surrender value / discounted claim for policy discharge procedures (Jamshedpur Division).', 
    size: '240 KB', 
    format: 'DOC / JPG',
    updated: 'Aug 2026',
    category: 'Insurance',
    sectionGroup: 'Giri Investment Forms',
    previewUrl: '/lic_surrender_form.jpg',
    downloadUrl: '/lic_surrender_form.jpg',
    filename: 'LIC_Policy_Surrender_Form_5074.jpg',
    iconType: 'pdf'
  },
  { 
    id: 'lic_revival', 
    title: 'LIC Policy Revival Form (Form No. 680)', 
    desc: 'Official LIC Form No. 680 personal statement of health and application for revival of lapsed policy.', 
    size: '360 KB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'Insurance',
    sectionGroup: 'Giri Investment Forms',
    previewUrl: '/Revival_Form_680.pdf',
    downloadUrl: '/Revival_Form_680.pdf',
    filename: 'LIC_Policy_Revival_Form_680.pdf',
    iconType: 'pdf'
  },
  { 
    id: 'lic_revival_700', 
    title: 'LIC Policy Revival Form (Form No. 700)', 
    desc: 'Official LIC Form No. 700 personal statement of health for revival of policy on female lives & minors.', 
    size: '3.4 MB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'Insurance',
    sectionGroup: 'Giri Investment Forms',
    previewUrl: '/Revival_Form_700.pdf',
    downloadUrl: '/Revival_Form_700.pdf',
    filename: 'LIC_Policy_Revival_Form_700.pdf',
    iconType: 'pdf'
  },
  { 
    id: 'lic_revival_720', 
    title: 'LIC Policy Revival Form (Form No. 720)', 
    desc: 'Official LIC Form No. 720 medical report & statement of health for revival of high sum assured policies.', 
    size: '2.6 MB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'Insurance',
    sectionGroup: 'Giri Investment Forms',
    previewUrl: '/Revival_Form_720.pdf',
    downloadUrl: '/Revival_Form_720.pdf',
    filename: 'LIC_Policy_Revival_Form_720.pdf',
    iconType: 'pdf'
  },
  { 
    id: 'lic_loan', 
    title: 'LIC Policy Loan Form (Forms 5196 / 5205 / 5200)', 
    desc: 'Official LIC application, bond assignment & endorsement forms for loan against eligible LIC life policies.', 
    size: '96 KB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'Insurance',
    sectionGroup: 'Giri Investment Forms',
    previewUrl: '/LIC_Policy_Loan_Form_5196.pdf',
    downloadUrl: '/LIC_Policy_Loan_Form_5196.pdf',
    filename: 'LIC_Policy_Loan_Form_5196.pdf',
    iconType: 'pdf'
  },
  { 
    id: 'bank_mandate', 
    title: 'NEFT / Bank Mandate Registration Form', 
    desc: 'Official LIC NEFT mandate form for registering or updating bank account details for direct credit of claim/maturity proceeds.', 
    size: '1.3 MB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'Client Forms',
    sectionGroup: 'Giri Investment Forms',
    previewUrl: '/NEFT_MANDATE_FORM.pdf',
    downloadUrl: '/NEFT_MANDATE_FORM.pdf',
    filename: 'NEFT_MANDATE_FORM.pdf',
    iconType: 'pdf'
  },

  // --- KYC & INVESTMENT FORMS ---
  { 
    id: 'ckyc_kra', 
    title: 'CKYC / KRA KYC Application Form', 
    desc: 'KYC application form used for investor onboarding and KYC-related requirements.', 
    size: '470 KB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'KYC',
    sectionGroup: 'KYC & Investment Forms',
    previewUrl: '/CKYC-KRA-KYC-FormforIndividuals.pdf',
    downloadUrl: '/CKYC-KRA-KYC-FormforIndividuals.pdf',
    filename: 'CKYC-KRA-KYC-FormforIndividuals.pdf',
    iconType: 'pdf'
  },
  { 
    id: 'mf_redemption', 
    title: 'Common MF Redemption & Transaction Slip (CTF)', 
    desc: 'Standard physical redemption, switch order, and transaction slip for mutual fund folios across AMCs.', 
    size: '2.2 MB', 
    format: 'PDF',
    updated: 'Aug 2026',
    category: 'Investment',
    sectionGroup: 'KYC & Investment Forms',
    previewUrl: '/CTF-Redemption.pdf',
    downloadUrl: '/CTF-Redemption.pdf',
    filename: 'CTF-Redemption.pdf',
  },

  // --- OFFICIAL EXTERNAL PORTALS ---
  { 
    id: 'lic_forms', 
    title: 'LIC Official Portal', 
    desc: 'LIC forms and resources for eligible policy servicing requests, online payment & policy portal.', 
    size: 'LIC PORTAL', 
    format: 'EXTERNAL PORTAL',
    updated: 'Aug 2026',
    category: 'External Portals',
    sectionGroup: 'Official Resources',
    externalUrl: 'https://licindia.in/download-forms',
    iconType: 'globe'
  },
  { 
    id: 'amfi_forms', 
    title: 'AMFI Official Portal', 
    desc: 'Official Association of Mutual Funds in India (AMFI) portal for investor forms, ARN registration & accreditation.', 
    size: 'AMFI PORTAL', 
    format: 'EXTERNAL PORTAL',
    updated: 'Aug 2026',
    category: 'External Portals',
    sectionGroup: 'Official Resources',
    externalUrl: 'https://www.amfiindia.com/investor/become-mf-distributor?zoneName=downloadVariousForms',
    iconType: 'globe'
  }
];

// ----------------------------------------------------
// Custom Dual-Layer Lagged Gold Cursor Component
// ----------------------------------------------------
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target;
      if (target) {
        const interactiveEl = target.closest('a, button, input, select, textarea, .nav-link, .calculator-card, .dash-card, .dash-banner-card, .mf-landing-card, .basket-card, .team-card, .download-item-card, .partner-badge-card');
        setIsHovered(!!interactiveEl);
      }
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="custom-cursor-wrapper">
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={`custom-cursor-ring ${isHovered ? 'hover' : ''}`} />
    </div>
  );
}

// ----------------------------------------------------
// Floating Social Quick-Connect Dock Component
// ----------------------------------------------------
function FloatingSocialDock() {
  return (
    <div className="floating-social-dock">
      {/* Facebook */}
      <a 
        href="https://www.facebook.com/giri.investments/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-dock-btn facebook"
        title="Follow us on Facebook"
        aria-label="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a 
        href="https://www.linkedin.com/company/giri-investment/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-dock-btn linkedin"
        title="Follow Giri Investment on LinkedIn"
        aria-label="LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>

      {/* Instagram */}
      <a 
        href="https://www.instagram.com/giri_investment_/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-dock-btn instagram"
        title="Follow us on Instagram"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </div>
  );
}

// ----------------------------------------------------
// Live NSE / BSE Market Ticker Tape Component
// ----------------------------------------------------
function MarketTickerTape() {
  const tickerItems = [
    { name: 'Nifty 50', val: '₹24,318.50', change: '+0.71%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'Sensex', val: '79,842.10', change: '+0.65%', up: true, link: 'https://www.bseindia.com/' },
    { name: 'Nifty Bank', val: '₹52,140.20', change: '+0.45%', up: true, link: 'https://www.nseindia.com/market-data/live-equity-market' },
    { name: 'Nifty Midcap 100', val: '₹58,420.15', change: '+0.82%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'SBI Small Cap NAV', val: '₹168.42', change: '+1.12%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'Nippon Small Cap NAV', val: '₹154.20', change: '+1.35%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'ICICI Balanced NAV', val: '₹62.19', change: '+0.31%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'Kaveri Corp Bond NAV', val: '₹27.85', change: '-0.04%', up: false, link: 'https://www.nseindia.com/' },
    { name: 'Sundaram Eq Savings NAV', val: '₹58.03', change: '+0.62%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'HDFC Top 100 NAV', val: '₹988.50', change: '+0.55%', up: true, link: 'https://www.nseindia.com/' },
    { name: 'Gold 24K (10g)', val: '₹74,250', change: '+0.25%', up: true, link: 'https://www.bseindia.com/' },
  ];

  return (
    <div className="market-ticker-wrapper">
      <div className="market-ticker-live-badge">
        <span className="ticker-pulse-dot"></span>
        NSE / BSE LIVE
      </div>
      <div className="market-ticker-scroll-track">
        <div className="market-ticker-content">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <a 
              key={idx} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="market-ticker-item"
              title={`View ${item.name} live on ${item.link.includes('bseindia') ? 'BSE' : 'NSE'}`}
            >
              <span className="ticker-item-name">{item.name}</span>
              <span className="ticker-item-val">{item.val}</span>
              <span className={`ticker-item-change ${item.up ? 'up' : 'down'}`}>
                {item.change}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  // Navigation & Menu States
  const [currentPage, setCurrentPage] = useState('home'); // home | about | mutual_funds | corporate_fd | insurance | taxation | downloads
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mfSubPage, setMfSubPage] = useState('landing'); // 'landing', 'selector', 'baskets'
  const [insuranceSubPage, setInsuranceSubPage] = useState('landing'); // 'landing', 'life', 'health', 'general'

  // Page Wipe & Smooth Route Navigation Handler
  const navigatePage = (targetPage, targetSubPage = 'landing') => {
    if (targetPage === currentPage && targetSubPage === (targetPage === 'mutual_funds' ? mfSubPage : insuranceSubPage)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    executePageWipe(() => {
      setCurrentPage(targetPage);
      if (targetPage === 'mutual_funds') setMfSubPage(targetSubPage);
      if (targetPage === 'insurance') setInsuranceSubPage(targetSubPage);
      setMobileMenuOpen(false);
    });
  };

  // Section GSAP + ScrollTrigger Motion Engine Trigger
  useEffect(() => {
    cleanupScrollTriggers();

    const timer = setTimeout(() => {
      if (currentPage === 'home') {
        animateHero();
        animateExecutiveHero();
        animateCalculators();
        animateTrustedNetwork();
        animateFinalCTA();
      } else if (currentPage === 'about') {
        animateLegacyTimeline();
        animateLeadership();
        animateStudio();
        animateFinalCTA();
      } else if (currentPage === 'mutual_funds') {
        if (mfSubPage === 'landing') animateMFLanding();
        else if (mfSubPage === 'selector') animateFundSelector();
        else if (mfSubPage === 'baskets') animateBaskets();
        animateFinalCTA();
      } else if (currentPage === 'insurance') {
        if (insuranceSubPage === 'landing') animateInsuranceLanding();
        animateFinalCTA();
      } else if (currentPage === 'downloads') {
        animateDownloads();
        animateFinalCTA();
      } else if (currentPage === 'contact') {
        animateContact();
        animateFinalCTA();
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      cleanupScrollTriggers();
    };
  }, [currentPage, mfSubPage, insuranceSubPage]);

  // Modal states
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [activeTab, setActiveTab] = useState('sip'); // sip | retirement | insurance | tax

  // 1. SIP Calculator State
  const [sipAmount, setSipAmount] = useState(10000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(20);
  const [sipTarget, setSipTarget] = useState(10000000); // Default target 1 Cr

  // 2. Retirement Planner State
  const [retAge, setRetAge] = useState(30);
  const [retTargetAge, setRetTargetAge] = useState(60);
  const [retExpenses, setRetExpenses] = useState(50000);
  const [retInflation, setRetInflation] = useState(6);
  const [retPostReturn, setRetPostReturn] = useState(8);

  // 3. Insurance States
  const [insIncome, setInsIncome] = useState(1200000);
  const [insLiabilities, setInsLiabilities] = useState(1500000);
  const [insDependents, setInsDependents] = useState(3);
  const [insLiquidAssets, setInsLiquidAssets] = useState(500000);
  const [insWorkingYears, setInsWorkingYears] = useState(25);
  const [healthAge, setHealthAge] = useState(35);
  const [healthCoverAmount, setHealthCoverAmount] = useState(1000000);
  const [healthMembers, setHealthMembers] = useState('family'); // 'self', 'couple', 'family', 'parents'
  const [vehicleValue, setVehicleValue] = useState(800000);
  const [vehicleAge, setVehicleAge] = useState(3);
  const [amcSearch, setAmcSearch] = useState('');
  const [amcRatingFilter, setAmcRatingFilter] = useState('All');

  // 4. Contact Us State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  // Life Insurance Help Form State
  const [lifeHelpName, setLifeHelpName] = useState('');
  const [lifeHelpEmail, setLifeHelpEmail] = useState('');
  const [lifeHelpPhone, setLifeHelpPhone] = useState('');
  const [lifeHelpMessage, setLifeHelpMessage] = useState('');
  const [lifeHelpSuccess, setLifeHelpSuccess] = useState(false);

  // General Insurance Help Form State
  const [genHelpName, setGenHelpName] = useState('');
  const [genHelpEmail, setGenHelpEmail] = useState('');
  const [genHelpPhone, setGenHelpPhone] = useState('');
  const [genHelpMessage, setGenHelpMessage] = useState('');
  const [genHelpSuccess, setGenHelpSuccess] = useState(false);

  // Health Insurance Help Form State
  const [healthHelpName, setHealthHelpName] = useState('');
  const [healthHelpEmail, setHealthHelpEmail] = useState('');
  const [healthHelpPhone, setHealthHelpPhone] = useState('');
  const [healthHelpMessage, setHealthHelpMessage] = useState('');
  const [healthHelpSuccess, setHealthHelpSuccess] = useState(false);
  // Scheduler Modal Form State
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [schedulePhone, setSchedulePhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-07-23');
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [showMobileCalcModal, setShowMobileCalcModal] = useState(false);

  // Invest Modal Form State
  const [investName, setInvestName] = useState('');
  const [investEmail, setInvestEmail] = useState('');
  const [investAmount, setInvestAmount] = useState(5000);
  const [investType, setInvestType] = useState('SIP');
  const [investPartner, setInvestPartner] = useState('SBI MF');
  const [investSuccess, setInvestSuccess] = useState(false);
  const [reconciledFolio, setReconciledFolio] = useState('');

  // Selected partner info popup state
  const [selectedPartnerInfo, setSelectedPartnerInfo] = useState(null);
  const [showAllPartners, setShowAllPartners] = useState(false);

  // Client Resources Search and Filter States
  const [isResourcesUnlocked, setIsResourcesUnlocked] = useState(() => {
    return localStorage.getItem('giri_resources_unlocked') === 'true';
  });
  const [gateName, setGateName] = useState('');
  const [gatePhone, setGatePhone] = useState('');
  const [gateAddress, setGateAddress] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);

  const [downloadingFileId, setDownloadingFileId] = useState(null);
  const [downloadCompletedId, setDownloadCompletedId] = useState(null);
  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceCategory, setResourceCategory] = useState('All');

  // Partners data
  const partners = [
    { code: 'SBI', name: 'SBI Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1987', aum: '₹9.1L Cr', rating: '5★', avgReturn: '15.4%' },
    { code: 'IP', name: 'ICICI Prudential MF', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1993', aum: '₹7.5L Cr', rating: '5★', avgReturn: '14.8%' },
    { code: 'NI', name: 'Nippon India Small Cap Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1995', aum: '₹4.3L Cr', rating: '5★', avgReturn: '24.8%' },
    { code: 'TA', name: 'Tata Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1994', aum: '₹1.5L Cr', rating: '4★', avgReturn: '13.9%' },
    { code: 'AX', name: 'Axis Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '2009', aum: '₹2.6L Cr', rating: '4★', avgReturn: '14.1%' },
    { code: 'DSP', name: 'DSP Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1996', aum: '₹1.4L Cr', rating: '4★', avgReturn: '13.8%' },
    { code: 'HD', name: 'HDFC Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1999', aum: '₹6.2L Cr', rating: '5★', avgReturn: '15.1%' },
    { code: 'MO', name: 'Motilal Oswal MF', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '2008', aum: '₹0.5L Cr', rating: '4★', avgReturn: '16.2%' },
    { code: 'SU', name: 'Sundaram Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1996', aum: '₹0.6L Cr', rating: '4★', avgReturn: '13.5%' },
    { code: 'LIC', name: 'LIC Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1989', aum: '₹0.3L Cr', rating: '3★', avgReturn: '12.8%' },
    { code: 'KO', name: 'Kotak Mutual Fund', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1998', aum: '₹3.8L Cr', rating: '4★', avgReturn: '14.5%' },
    { code: 'FR', name: 'Franklin Templeton', type: 'AMC', categoryTag: 'MUTUAL FUND', est: '1995', aum: '₹0.8L Cr', rating: '4★', avgReturn: '13.7%' },
    
    { code: 'LIC', name: 'LIC of India', type: 'Insurance', categoryTag: 'LIFE COVER', est: '1956', solvency: '1.85', rating: '5★', claimRatio: '98.6%' },
    { code: 'ML', name: 'Max Life Insurance', type: 'Insurance', categoryTag: 'LIFE COVER', est: '2000', solvency: '1.92', rating: '5★', claimRatio: '99.4%' },
    { code: 'HD', name: 'HDFC Life', type: 'Insurance', categoryTag: 'LIFE COVER', est: '2000', solvency: '1.90', rating: '5★', claimRatio: '99.1%' },
    { code: 'SB', name: 'SBI Life', type: 'Insurance', categoryTag: 'TERM COVER', est: '2001', solvency: '2.15', rating: '5★', claimRatio: '98.8%' },
    { code: 'IP', name: 'ICICI Prudential Life', type: 'Insurance', categoryTag: 'TERM COVER', est: '2001', solvency: '2.02', rating: '5★', claimRatio: '98.2%' },
    { code: 'TA', name: 'Tata AIA Life', type: 'Insurance', categoryTag: 'TERM COVER', est: '2001', solvency: '1.88', rating: '5★', claimRatio: '99.0%' },
    { code: 'SH', name: 'Star Health Insurance', type: 'Insurance', categoryTag: 'HEALTH MEDICLAIM', est: '2006', solvency: '1.70', rating: '4★', claimRatio: '99.0%' },
    { code: 'CH', name: 'Care Health Insurance', type: 'Insurance', categoryTag: 'HEALTH MEDICLAIM', est: '2012', solvency: '1.80', rating: '5★', claimRatio: '95.2%' },
    { code: 'TAIG', name: 'Tata AIG General Insurance', type: 'Insurance', categoryTag: 'MOTOR & ASSET', est: '2001', solvency: '1.95', rating: '5★', claimRatio: '98.5%' },
    { code: 'HE', name: 'HDFC ERGO General', type: 'Insurance', categoryTag: 'MOTOR & ASSET', est: '2002', solvency: '1.82', rating: '5★', claimRatio: '97.8%' },
    { code: 'IL', name: 'ICICI Lombard General', type: 'Insurance', categoryTag: 'MOTOR & ASSET', est: '2001', solvency: '2.10', rating: '5★', claimRatio: '98.2%' },
    { code: 'BA', name: 'Bajaj Allianz General', type: 'Insurance', categoryTag: 'MOTOR & ASSET', est: '2001', solvency: '2.20', rating: '5★', claimRatio: '98.0%' }
  ];

  // Filtered Client Resources computed list
  const filteredResources = useMemo(() => {
    return downloadFiles.filter((file) => {
      const matchesSearch = 
        file.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        file.desc.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        (file.category && file.category.toLowerCase().includes(resourceSearch.toLowerCase()));

      let matchesCat = true;
      if (resourceCategory === 'Investment') matchesCat = file.category === 'Investment' || file.sectionGroup === 'KYC & Investment Forms';
      else if (resourceCategory === 'Insurance') matchesCat = file.category === 'Insurance';
      else if (resourceCategory === 'KYC') matchesCat = file.category === 'KYC';
      else if (resourceCategory === 'External Portals') matchesCat = file.sectionGroup === 'Official Resources';

      return matchesSearch && matchesCat;
    });
  }, [resourceSearch, resourceCategory]);


  // ----------------------------------------------------
  // CALCULATIONS (MEMOIZED)
  // ----------------------------------------------------

  // 1. SIP Calculator
  const sipResults = useMemo(() => {
    const monthlyRate = sipRate / 12 / 100;
    const totalMonths = sipYears * 12;
    let futureValue = 0;
    if (monthlyRate > 0) {
      futureValue = sipAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      futureValue = sipAmount * totalMonths;
    }
    const totalInvested = sipAmount * totalMonths;
    const estReturns = futureValue - totalInvested;
    const progressPercent = Math.min(Math.round((futureValue / sipTarget) * 100), 100);

    const chartPoints = [];
    const step = Math.max(1, Math.floor(sipYears / 10));
    for (let y = 0; y <= sipYears; y += step) {
      const months = y * 12;
      let fv = 0;
      if (monthlyRate > 0) {
        fv = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      } else {
        fv = sipAmount * months;
      }
      chartPoints.push({ year: y, invested: sipAmount * months, corpus: fv });
    }
    if (chartPoints[chartPoints.length - 1].year !== sipYears) {
      chartPoints.push({ year: sipYears, invested: totalInvested, corpus: futureValue });
    }

    return { totalInvested, futureValue, estReturns, progressPercent, chartPoints };
  }, [sipAmount, sipRate, sipYears, sipTarget]);

  // 2. Retirement Calculator
  const retirementResults = useMemo(() => {
    const yearsToRetire = Math.max(0, retTargetAge - retAge);
    const inflationRate = retInflation / 100;
    const postReturnRate = retPostReturn / 100;

    const inflationAdjustedExpenses = retExpenses * Math.pow(1 + inflationRate, yearsToRetire);
    const annualExpensesRetirement = inflationAdjustedExpenses * 12;
    const realReturnRate = (1 + postReturnRate) / (1 + inflationRate) - 1;
    
    let corpusNeeded = 0;
    const postRetYears = 25;
    if (realReturnRate > 0) {
      corpusNeeded = annualExpensesRetirement * ((1 - Math.pow(1 + realReturnRate, -postRetYears)) / realReturnRate) * (1 + realReturnRate);
    } else {
      corpusNeeded = annualExpensesRetirement * postRetYears;
    }

    const preRetReturnMonthly = 0.12 / 12;
    const months = yearsToRetire * 12;
    let monthlySavingsRequired = 0;
    if (months > 0) {
      monthlySavingsRequired = corpusNeeded * (preRetReturnMonthly / (Math.pow(1 + preRetReturnMonthly, months) - 1));
    }

    return { inflationAdjustedExpenses, corpusNeeded, monthlySavingsRequired, yearsToRetire };
  }, [retAge, retTargetAge, retExpenses, retInflation, retPostReturn]);

  // 3. Insurance Calculator
  const insuranceResults = useMemo(() => {
    // HLV = (Annual Earnings × Working Years Left × 0.7) + Liabilities - Liquid Assets
    const hlvNeeded = (insIncome * insWorkingYears * 0.7) + insLiabilities - insLiquidAssets;
    
    // Health estimation
    let healthMultiplier = 1.0;
    if (healthMembers === 'couple') healthMultiplier = 1.6;
    if (healthMembers === 'family') healthMultiplier = 2.1;
    if (healthMembers === 'parents') healthMultiplier = 2.4;
    
    const healthBasePremium = (healthCoverAmount * 0.01) * (1 + (healthAge - 18) / 50) * healthMultiplier;
    
    // General vehicle IDV and premium estimation
    const depreciationRate = Math.min(0.5, vehicleAge * 0.1);
    const estimatedIdv = vehicleValue * (1 - depreciationRate);
    const motorPremium = (estimatedIdv * 0.025) + 3200;

    return { 
      hlvNeeded: Math.max(0, hlvNeeded), 
      estimatedHealthPremium: Math.round(healthBasePremium),
      estimatedIdv: Math.round(estimatedIdv),
      motorPremium: Math.round(motorPremium)
    };
  }, [insIncome, insWorkingYears, insLiabilities, insLiquidAssets, healthAge, healthCoverAmount, healthMembers, vehicleValue, vehicleAge]);

  // 4. Tax Calculator



  // ----------------------------------------------------
  // ACTION HANDLERS
  // ----------------------------------------------------
  
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!scheduleName || !scheduleEmail || !schedulePhone || !selectedSlot) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', scheduleName);
      formData.append('email', scheduleEmail);
      formData.append('subject', `[Consultation Booking] Portfolio Review with ${scheduleName}`);
      formData.append('message', `Phone: ${schedulePhone}\nScheduled Date: ${selectedDate}\nTime Slot: ${selectedSlot}`);
      formData.append('from_name', 'Giri Investment Web Portal');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
    } catch (err) {
      console.error('Web3Forms consultation submit error:', err);
    }

    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setShowScheduleModal(false);
      setScheduleName('');
      setScheduleEmail('');
      setSchedulePhone('');
      setSelectedSlot('');
    }, 4500);
  };

  const handleInvestSubmit = async (e) => {
    e.preventDefault();
    if (!investName || !investEmail || !investAmount) return;
    const suffix = Math.floor(1000 + Math.random() * 9000);
    const folioNo = `SSG-001-${suffix}`;
    setReconciledFolio(folioNo);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', investName);
      formData.append('email', investEmail);
      formData.append('subject', `[New Investment Request] ${investPartner || 'Folio Creation'} - ${investName}`);
      formData.append('message', `Partner/Fund: ${investPartner}\nInvestment Type: ${investType}\nMonthly Amount: ₹${investAmount}\nReconciled Folio ID: ${folioNo}`);
      formData.append('from_name', 'Giri Investment Web Portal');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
    } catch (err) {
      console.error('Web3Forms investment submit error:', err);
    }

    setInvestSuccess(true);
    setTimeout(() => {
      setInvestSuccess(false);
      setShowInvestModal(false);
      setInvestName('');
      setInvestEmail('');
      setInvestAmount(5000);
    }, 5000);
  };

  const triggerPartnerInvest = (partnerName) => {
    setInvestPartner(partnerName);
    setSelectedPartnerInfo(null);
    setShowInvestModal(true);
  };




  const handleResourceGateSubmit = async (e) => {
    e.preventDefault();
    if (!gateName || !gatePhone || !gateAddress || !gateEmail) return;

    setGateSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', gateName);
      formData.append('email', gateEmail);
      formData.append('subject', `[Client Resource Unlock Lead] ${gateName} - ${gatePhone}`);
      formData.append('message', `New Verified Client Access Request:\n\nClient Name: ${gateName}\nPhone/WhatsApp: ${gatePhone}\nGmail/Email: ${gateEmail}\nAddress: ${gateAddress}\nRequested At: ${new Date().toLocaleString()}`);
      formData.append('from_name', 'Giri Investment Client Portal');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
    } catch (err) {
      console.warn('Web3Forms direct dispatch warning:', err);
    } finally {
      // Instantly unlock Client Resources page and persist verification status
      localStorage.setItem('giri_resources_unlocked', 'true');
      setIsResourcesUnlocked(true);
      setGateSubmitting(false);
    }
  };

  const handleDownloadTrigger = (fileId) => {
    const targetFile = downloadFiles.find(f => f.id === fileId);
    if (targetFile && targetFile.externalUrl) {
      window.open(targetFile.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setDownloadingFileId(fileId);
    setDownloadCompletedId(null);
    
    setTimeout(() => {
      setDownloadingFileId(null);
      setDownloadCompletedId(fileId);

      if (targetFile && targetFile.downloadUrl) {
        const link = document.createElement('a');
        link.href = targetFile.downloadUrl;
        link.download = targetFile.filename || targetFile.downloadUrl.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        setDownloadCompletedId(null);
      }, 5000);
    }, 1800);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) return;
    
    setContactSending(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', contactName);
      formData.append('email', contactEmail);
      formData.append('subject', `[Giri Investment Contact] ${contactSubject}`);
      formData.append('message', contactMessage);
      formData.append('from_name', 'Giri Investment Web Portal');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setContactSuccess(true);
      } else {
        const subjectLine = encodeURIComponent(`[Giri Folio Inquiry] ${contactSubject}`);
        const bodyText = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`);
        window.location.href = `mailto:giriinvestments@gmail.com?subject=${subjectLine}&body=${bodyText}`;
        setContactSuccess(true);
      }
    } catch (err) {
      console.error('Web3Forms dispatch error:', err);
      const subjectLine = encodeURIComponent(`[Giri Folio Inquiry] ${contactSubject}`);
      const bodyText = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`);
      window.location.href = `mailto:giriinvestments@gmail.com?subject=${subjectLine}&body=${bodyText}`;
      setContactSuccess(true);
    } finally {
      setContactSending(false);
    }

    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 6000);
  };

  const handleLifeHelpSubmit = async (e) => {
    e.preventDefault();
    if (!lifeHelpName || !lifeHelpEmail || !lifeHelpPhone) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', lifeHelpName);
      formData.append('email', lifeHelpEmail);
      formData.append('subject', `[Life Insurance Guidance Inquiry] from ${lifeHelpName}`);
      formData.append('message', `Mobile: ${lifeHelpPhone}\n\nMessage:\n${lifeHelpMessage}`);
      formData.append('from_name', 'Giri Investment Web Portal');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      const subjectLine = encodeURIComponent(`[Life Insurance Guidance Inquiry] from ${lifeHelpName}`);
      const bodyText = encodeURIComponent(`Name: ${lifeHelpName}\nEmail: ${lifeHelpEmail}\nMobile: ${lifeHelpPhone}\n\nMessage:\n${lifeHelpMessage}`);
      window.location.href = `mailto:giriinvestments@gmail.com?subject=${subjectLine}&body=${bodyText}`;
    }

    setLifeHelpSuccess(true);

    setTimeout(() => {
      setLifeHelpSuccess(false);
      setLifeHelpName('');
      setLifeHelpEmail('');
      setLifeHelpPhone('');
      setLifeHelpMessage('');
    }, 5000);
  };

  const handleGenHelpSubmit = async (e) => {
    e.preventDefault();
    if (!genHelpName || !genHelpEmail || !genHelpPhone) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', genHelpName);
      formData.append('email', genHelpEmail);
      formData.append('subject', `[General/Vehicle Insurance Inquiry] from ${genHelpName}`);
      formData.append('message', `Mobile: ${genHelpPhone}\n\nMessage:\n${genHelpMessage}`);
      formData.append('from_name', 'Giri Investment Web Portal');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      const subjectLine = encodeURIComponent(`[General/Vehicle Insurance Inquiry] from ${genHelpName}`);
      const bodyText = encodeURIComponent(`Name: ${genHelpName}\nEmail: ${genHelpEmail}\nMobile: ${genHelpPhone}\n\nMessage:\n${genHelpMessage}`);
      window.location.href = `mailto:giriinvestments@gmail.com?subject=${subjectLine}&body=${bodyText}`;
    }

    setGenHelpSuccess(true);

    setTimeout(() => {
      setGenHelpSuccess(false);
      setGenHelpName('');
      setGenHelpEmail('');
      setGenHelpPhone('');
      setGenHelpMessage('');
    }, 5000);
  };

  const handleHealthHelpSubmit = async (e) => {
    e.preventDefault();
    if (!healthHelpName || !healthHelpEmail || !healthHelpPhone) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '96fe992e-4c75-41e7-8643-c33dddf5c938';

    try {
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('name', healthHelpName);
      formData.append('email', healthHelpEmail);
      formData.append('subject', `[Health/Mediclaim Insurance Inquiry] from ${healthHelpName}`);
      formData.append('message', `Mobile: ${healthHelpPhone}\n\nMessage:\n${healthHelpMessage}`);
      formData.append('from_name', 'Giri Investment Web Portal');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      const subjectLine = encodeURIComponent(`[Health/Mediclaim Insurance Inquiry] from ${healthHelpName}`);
      const bodyText = encodeURIComponent(`Name: ${healthHelpName}\nEmail: ${healthHelpEmail}\nMobile: ${healthHelpPhone}\n\nMessage:\n${healthHelpMessage}`);
      window.location.href = `mailto:giriinvestments@gmail.com?subject=${subjectLine}&body=${bodyText}`;
    }

    setHealthHelpSuccess(true);

    setTimeout(() => {
      setHealthHelpSuccess(false);
      setHealthHelpName('');
      setHealthHelpEmail('');
      setHealthHelpPhone('');
      setHealthHelpMessage('');
    }, 5000);
  };

// ----------------------------------------------------
// Cinematic Luxury Preloader Component (Plays ONLY on initial website load)
// ----------------------------------------------------
function LuxuryPreloader() {
  const [hasSeen] = useState(() => {
    try {
      return !!sessionStorage.getItem('giri_has_seen_preloader');
    } catch {
      return false;
    }
  });

  const [loadingState, setLoadingState] = useState(() => hasSeen ? 'hidden' : 'active'); // 'active' -> 'fading' -> 'hidden'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasSeen) return;

    try {
      sessionStorage.setItem('giri_has_seen_preloader', 'true');
    } catch (e) {
      console.error(e);
    }

    // Counter animation 0% -> 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    // Phase 1: At 2.2s start fade out & scale
    const fadeTimer = setTimeout(() => {
      setLoadingState('fading');
    }, 2200);

    // Phase 2: At 2.8s hide component from DOM
    const hideTimer = setTimeout(() => {
      setLoadingState('hidden');
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [hasSeen]);

  if (hasSeen || loadingState === 'hidden') return null;

  return (
    <div className={`luxury-preloader-overlay ${loadingState === 'fading' ? 'preloader-fade-out' : ''}`}>
      <div className="preloader-content">
        {/* Royal Sapphire Blue Logo SVG Stroke Animation */}
        <div className="preloader-logo-wrapper">
          <svg className="preloader-svg-logo" viewBox="0 0 120 120" width="120" height="120">
            <circle className="stroke-circle-outer" cx="60" cy="60" r="56" />
            <circle className="stroke-circle-inner" cx="60" cy="60" r="48" />
            <circle className="stroke-circle-dash" cx="60" cy="60" r="44" />
            <text className="logo-text-est" x="60" y="45" textAnchor="middle">EST .</text>
            <text className="logo-text-year" x="60" y="77" textAnchor="middle">1996</text>
          </svg>
        </div>

        {/* Brand Text */}
        <div className="preloader-text-group">
          <h1 className="preloader-brand-title">GIRI INVESTMENT</h1>
          <p className="preloader-brand-sub">PEAKS OF TRUST, SINCE 1996</p>
        </div>

        {/* Sapphire Loading Line & Percentage Counter */}
        <div className="preloader-progress-box">
          <div className="preloader-line-track">
            <div className="preloader-line-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="preloader-counter">{progress}%</div>
        </div>
      </div>
    </div>
  );
}

  const handleLogoClick = () => {
    navigatePage('home');
  };

  return (
    <>
      <LuxuryPreloader />
      <CustomCursor />
      <MarketTickerTape />
      <FloatingSocialDock />
      <div className="page-wipe-overlay"></div>
      {/* ----------------------------------------------------
          NAVBAR & HEADER
         ---------------------------------------------------- */}
      <header className="main-header">
        <div className={`header-inner ${mobileMenuOpen ? 'menu-is-open' : ''}`}>
          <div className="header-top-row">
            <div className="brand-seal-container" onClick={handleLogoClick}>
              <div className="brand-seal">
                <div className="brand-seal-inner">
                  <span className="brand-seal-est">Est.</span>
                  <span className="brand-seal-year">1996</span>
                </div>
              </div>
              <div className="brand-text-block">
                <h1 className="brand-title" style={{ margin: 0, lineHeight: 1.15 }}>GIRI INVESTMENT</h1>
                <span className="brand-tagline">Peaks of trust, since 1996</span>
              </div>
            </div>

            <button 
              className="menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <span 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigatePage('home')}
              >
                Home
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => navigatePage('about')}
              >
                About Us
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${currentPage === 'mutual_funds' ? 'active' : ''}`}
                onClick={() => navigatePage('mutual_funds')}
              >
                Mutual Funds
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${currentPage === 'insurance' ? 'active' : ''}`}
                onClick={() => navigatePage('insurance', 'landing')}
              >
                Insurance
              </span>
            </li>
            <li>
              <span 
                className={`nav-link ${currentPage === 'downloads' ? 'active' : ''}`}
                onClick={() => navigatePage('downloads')}
              >
                Client Resources
              </span>
            </li>
            <li className="mobile-only-action">
              <button 
                className="nav-start-investing-btn" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                onClick={() => { setShowInvestModal(true); setMobileMenuOpen(false); }}
              >
                Start investing
              </button>
            </li>
          </ul>

          <div className="header-actions">
            <button 
              className="nav-start-investing-btn" 
              onClick={() => setShowInvestModal(true)}
            >
              Start investing
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------
          PAGE ROUTE SELECTOR
         ---------------------------------------------------- */}
      <main style={{ flexGrow: 1 }} key={currentPage}>
        
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <>
            <section className="section hero-section-wrapper">
              <div className="container grid-2">
                <div>
                  <div className="section-tag hero-caption-tag">A second-generation ledger, still being written</div>
                  <h2 className="title-serif-large">
                    <span className="hero-title-line">Smart investments,</span><br />
                    <span className="hero-title-line"><span className="italic-gold">secure</span> futures.</span>
                  </h2>
                  <p className="subtext hero-subtext-para">
                    Every rupee you invest is entered, tracked and reconciled — the way it's been done here since 1996. No jargon, no guesswork, just a plan you can read like a passbook.
                  </p>
                  <div className="btn-group hero-btn-group">
                    <button className="btn btn-primary" onClick={() => setShowInvestModal(true)}>
                      Start Investing <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-outline" onClick={() => setShowScheduleModal(true)}>
                      Book a Consultation
                    </button>
                  </div>
                </div>

                <div>
                  <div className="ledger-sheet ledger-sheet-tilted founder-testimonial-card">
                    
                    {/* Top Header Row with Verified Stamp */}
                    <div className="founder-card-top-row">
                      <div className="founder-profile-header">
                        <img 
                          src="/shambhu_giri.jpg" 
                          alt="Shambhu Sharan Giri" 
                          className="founder-avatar"
                        />
                        <div className="founder-title-info">
                          <span className="caption-label dark founder-role-badge">FOUNDER & CHIEF ADVISOR</span>
                          <h3 className="founder-card-name">Shambhu Sharan Giri</h3>
                          <div className="founder-card-arn">AMFI ARN-7519 • EST. 1996</div>
                        </div>
                      </div>

                      <div className="verified-stamp founder-verified-stamp">
                        <div style={{ fontSize: '7px', letterSpacing: '1px' }}>EST. 1996</div>
                        VERIFIED
                        <div style={{ fontSize: '6px', letterSpacing: '0.5px' }}>SSG ADVISORY GUARANTEE</div>
                      </div>
                    </div>

                    <div className="portfolio-divider"></div>

                    {/* Founder Quote */}
                    <div className="founder-quote-box">
                      <span className="founder-quote-mark">“</span>
                      <p className="founder-quote-text">
                        "Wealth is not built by chasing market noise, but through patient, disciplined planning and unshakeable trust built over three decades."
                      </p>
                    </div>

                    <div className="portfolio-divider"></div>

                    {/* Executive Stats Row */}
                    <div className="portfolio-details founder-stats-details">
                      <div className="portfolio-row">
                        <span className="portfolio-row-label">Family Portfolios</span>
                        <span className="portfolio-row-val accent-val">1,200+ Families</span>
                      </div>
                      <div className="portfolio-row">
                        <span className="portfolio-row-label">Track Record</span>
                        <span className="portfolio-row-val trend-up">▲ 30+ Years Trust</span>
                      </div>
                      <div className="portfolio-row">
                        <span className="portfolio-row-label">Advisory Guarantee</span>
                        <span className="portfolio-row-val success-val">100% Reconciled</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* NEW LUXURY HERO SPLIT SECTION (REPLACING FOLIO SUMMARY & CLIENT PORTFOLIO OVERVIEW) */}
            <section className="section luxury-hero-split">
              <div className="container grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
                
                {/* Left Column: Big Luxury Serif Headline & Description */}
                <div className="luxury-hero-content">
                  <h2 className="luxury-hero-title">
                    Your<br />
                    <span className="italic-gold">trusted</span><br />
                    partner in<br />
                    wealth creation.
                  </h2>
                  
                  <p className="luxury-hero-subtext">
                    Three decades of personalized financial guidance, helping investors achieve lasting prosperity through disciplined investing and expert advice.
                  </p>

                  <div className="btn-group" style={{ marginTop: '2.5rem' }}>
                    <button className="btn btn-primary" onClick={() => setShowScheduleModal(true)}>
                      CONSULTATION
                    </button>
                    <button className="btn btn-outline" onClick={() => { setCurrentPage('about'); window.scrollTo(0,0); }}>
                      OUR LEGACY
                    </button>
                  </div>
                </div>

                {/* Right Column: Rounded Hero Feature Image & Overlapping Circular Badge */}
                <div className="luxury-hero-image-wrapper">
                  <div className="luxury-hero-image-card">
                    <img 
                      src="/giri_office.jpg" 
                      alt="Giri Investment Executive Advisory Office Studio" 
                      className="luxury-hero-img"
                    />
                    
                    {/* Overlapping Dark Circular Badge */}
                    <div className="luxury-circle-badge">
                      <div className="badge-val">30<sup>+</sup></div>
                      <div className="badge-label">Years Trust</div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            <section id="calc-panel-header" className="section">
              <div className="container">
                <div className="calc-assembly-line"></div>
                <div className="grid-2 calc-section-grid">
                <div>
                  <div className="section-tag">Financial Planning Tools</div>
                  <h2 className="title-serif-large">
                    Plan today.<br />Prosper tomorrow.
                  </h2>
                  <p className="subtext">
                    Use our calculators to estimate SIP growth, retirement corpus, insurance coverage and tax savings — entered live, the same way a folio gets updated at the counter.
                  </p>
                </div>

                {/* Mobile / Tablet Button Card (iPhone, Pixel, Galaxy, iPad Mini) */}
                <div className="mobile-calc-cta-card">
                  <div className="calc-header">
                    <div>
                      <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>Financial Calculator</span>
                      <h3 className="calc-title" style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>SIP & Wealth Planner</h3>
                    </div>
                    <div className="live-badge">
                      <span className="live-badge-dot"></span>
                      LIVE
                    </div>
                  </div>
                  <p className="subtext" style={{ fontSize: '0.88rem', margin: '0.75rem 0 1.25rem 0' }}>
                    Calculate your SIP Growth, Retirement Corpus & Insurance Need in our dedicated full-screen calculator tool.
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowMobileCalcModal(true)}>
                    <Calculator size={18} /> Open Financial Calculator <ArrowRight size={16} />
                  </button>
                </div>

                <div className="calculator-card desktop-inline-calc-card">
                  <div className="calc-header">
                    <div>
                      <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>Financial Calculator</span>
                      <h3 className="calc-title">
                        {activeTab === 'sip' && 'SIP Growth Planner'}
                        {activeTab === 'retirement' && 'Retirement Corpus Planner'}
                        {activeTab === 'insurance' && 'Insurance Cover Planner'}
                      </h3>
                    </div>
                    <div className="live-badge">
                      <span className="live-badge-dot"></span>
                      LIVE CALCULATION
                    </div>
                  </div>

                  <div className="calc-tabs">
                    <button className={`calc-tab ${activeTab === 'sip' ? 'active' : ''}`} onClick={() => setActiveTab('sip')}>SIP Calculator</button>
                    <button className={`calc-tab ${activeTab === 'retirement' ? 'active' : ''}`} onClick={() => setActiveTab('retirement')}>Retirement Planner</button>
                    <button className={`calc-tab ${activeTab === 'insurance' ? 'active' : ''}`} onClick={() => setActiveTab('insurance')}>Insurance Need</button>
                  </div>

                  {activeTab === 'sip' && (
                    <div>
                      <div className="calc-grid">
                        <div className="calc-input-group">
                          <span className="caption-label dark">Monthly SIP</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="1000" max="100000" step="1000" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Expected Return</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-symbol">%</span>
                          </div>
                          <input type="range" min="5" max="25" step="0.5" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Investment Period</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-unit">Yrs</span>
                          </div>
                          <input type="range" min="1" max="40" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Goal Target</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={sipTarget} onChange={(e) => setSipTarget(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="1000000" max="500000000" step="1000000" value={sipTarget} onChange={(e) => setSipTarget(Number(e.target.value))} className="calc-slider" />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', backgroundColor: 'rgba(30, 37, 34, 0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                          <span>Goal Progress (vs {formatCurrency(sipTarget)})</span>
                          <span style={{ fontWeight: '700' }}>{sipResults.progressPercent}%</span>
                        </div>
                        <div className="card-progress-bar-container" style={{ background: '#e2ded6', height: '6px', marginTop: 0 }}>
                          <div className="card-progress-bar-fill" style={{ width: `${sipResults.progressPercent}%` }}></div>
                        </div>
                      </div>

                      <div className="calc-results">
                        <span className="calc-result-title">Projected Corpus</span>
                        <div className="calc-result-value">{formatCurrency(sipResults.futureValue)}</div>
                        <div className="calc-chart-container">
                          <svg className="calc-chart-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path className="calc-chart-path-invested" d={`M 0 110 L 400 ${110 - (sipResults.totalInvested / sipResults.futureValue) * 90}`} />
                            <path className="calc-chart-path-fill" d={`M 0 110 ${sipResults.chartPoints.map((pt, i) => {
                              const x = (i / (sipResults.chartPoints.length - 1)) * 400;
                              const y = 110 - (pt.corpus / sipResults.futureValue) * 90;
                              return `L ${x} ${y}`;
                            }).join(' ')} L 400 110 Z`} />
                            <path className="calc-chart-path-line" d={`M 0 110 ${sipResults.chartPoints.map((pt, i) => {
                              const x = (i / (sipResults.chartPoints.length - 1)) * 400;
                              const y = 110 - (pt.corpus / sipResults.futureValue) * 90;
                              return `L ${x} ${y}`;
                            }).join(' ')}`} />
                          </svg>
                        </div>

                        <div className="calc-chart-footer">
                          <div>Total Invested: <span className="calc-chart-footer-val">{formatCurrency(sipResults.totalInvested)}</span></div>
                          <div>Gain: <span className="calc-chart-footer-val" style={{ color: 'var(--color-success)' }}>+{formatCurrency(sipResults.estReturns)}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'retirement' && (
                    <div>
                      <div className="calc-grid">
                        <div className="calc-input-group">
                          <span className="caption-label dark">Current Age</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={retAge} onChange={(e) => setRetAge(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-unit">Yrs</span>
                          </div>
                          <input type="range" min="18" max="60" value={retAge} onChange={(e) => setRetAge(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Retirement Age</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={retTargetAge} onChange={(e) => setRetTargetAge(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-unit">Yrs</span>
                          </div>
                          <input type="range" min={retAge + 1} max="80" value={retTargetAge} onChange={(e) => setRetTargetAge(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Monthly Expense</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={retExpenses} onChange={(e) => setRetExpenses(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="10000" max="200000" step="5000" value={retExpenses} onChange={(e) => setRetExpenses(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Expected Inflation</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={retInflation} onChange={(e) => setRetInflation(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-symbol">%</span>
                          </div>
                          <input type="range" min="4" max="10" step="0.5" value={retInflation} onChange={(e) => setRetInflation(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Post-Retirement Return</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={retPostReturn} onChange={(e) => setRetPostReturn(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-symbol">%</span>
                          </div>
                          <input type="range" min="4" max="15" step="0.5" value={retPostReturn} onChange={(e) => setRetPostReturn(Number(e.target.value))} className="calc-slider" />
                        </div>
                      </div>

                      <div className="calc-results">
                        <span className="calc-result-title">Required Retirement Corpus</span>
                        <div className="calc-result-value">{formatCurrency(retirementResults.corpusNeeded)}</div>
                        <div className="ledger-receipt">
                          <div className="receipt-line"><span>Years to Retirement</span><span>{retirementResults.yearsToRetire} Years</span></div>
                          <div className="receipt-line"><span>Inflation Adjusted Expense</span><span>{formatCurrency(retirementResults.inflationAdjustedExpenses)}/mo</span></div>
                          <div className="receipt-line"><span>Monthly Saving Needed (at 12%)</span><span style={{ color: 'var(--color-success)', fontWeight: 7 }}>{formatCurrency(retirementResults.monthlySavingsRequired)}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'insurance' && (
                    <div>
                      <div className="calc-grid">
                        <div className="calc-input-group">
                          <span className="caption-label dark">Annual Income</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={insIncome} onChange={(e) => setInsIncome(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="300000" max="5000000" step="50000" value={insIncome} onChange={(e) => setInsIncome(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Total Liabilities/Loans</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={insLiabilities} onChange={(e) => setInsLiabilities(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="0" max="10000000" step="100000" value={insLiabilities} onChange={(e) => setInsLiabilities(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">No. of Dependents</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={insDependents} onChange={(e) => setInsDependents(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="0" max="8" value={insDependents} onChange={(e) => setInsDependents(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Liquid Assets Deductions</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={insLiquidAssets} onChange={(e) => setInsLiquidAssets(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="0" max="5000000" step="50000" value={insLiquidAssets} onChange={(e) => setInsLiquidAssets(Number(e.target.value))} className="calc-slider" />
                        </div>
                      </div>

                      <div className="calc-results">
                        <span className="calc-result-title">Recommended Term Insurance Cover</span>
                        <div className="calc-result-value">{formatCurrency(insuranceResults.recommendedCover)}</div>
                        <div className="ledger-receipt">
                          <div className="receipt-line"><span>Income Replacement (10x)</span><span>{formatCurrency(insuranceResults.incomeMultiple)}</span></div>
                          <div className="receipt-line"><span>Outstanding Loans added</span><span>+{formatCurrency(insLiabilities)}</span></div>
                          <div className="receipt-line"><span>Assets deducted</span><span>-{formatCurrency(insLiquidAssets)}</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </section>

            <section className="section trusted-network-section">
              <div className="container" style={{ textAlign: 'center' }}>
                <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1rem' }}>— TRUSTED NETWORK —</div>
                <h2 className="title-serif-large" style={{ fontSize: '2.8rem', margin: '0.75rem 0' }}>
                  Backed by India's<br />
                  <span className="italic-gold">most trusted</span> financial brands
                </h2>
                <p className="subtext" style={{ margin: '0 auto 2.5rem auto', textAlign: 'center', maxWidth: '650px' }}>
                  Access top-rated mutual funds and insurance solutions from leading institutions, entered through one advisory folio.
                </p>

                {/* Unified Stats Card */}
                <div className="trusted-network-stats-card">
                  <div className="trusted-stat-col">
                    <div className="stat-num-gold">30<sup>+</sup></div>
                    <div className="stat-sub-label">Years of Trust</div>
                  </div>
                  <div className="trusted-stat-col">
                    <div className="stat-num-gold">15<sup>+</sup></div>
                    <div className="stat-sub-label">Insurance Partners</div>
                  </div>
                  <div className="trusted-stat-col">
                    <div className="stat-num-gold">25<sup>+</sup></div>
                    <div className="stat-sub-label">AMC Partners</div>
                  </div>
                </div>

                {/* Numbered Partner Ledger List (Matching User Reference) */}
                <div className="partner-ledger-table">
                  {(showAllPartners ? partners : partners.slice(0, 4)).map((partner, idx) => (
                    <div key={idx} className="partner-ledger-row" onClick={() => setSelectedPartnerInfo(partner)}>
                      <span className="partner-ledger-num">{String(idx + 1).padStart(2, '0')}</span>
                      <h3 className="partner-ledger-name">{partner.name}</h3>
                    </div>
                  ))}
                </div>

                {!showAllPartners ? (
                  <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setShowAllPartners(true)}
                      style={{ padding: '0.8rem 2.2rem', fontSize: '0.8rem', borderRadius: '30px', letterSpacing: '1px' }}
                    >
                      MORE PARTNERS (+{partners.length - 4} MORE)
                    </button>
                  </div>
                ) : (
                  <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => setShowAllPartners(false)}
                      style={{ padding: '0.6rem 1.8rem', fontSize: '0.75rem', borderRadius: '30px', letterSpacing: '1px' }}
                    >
                      SHOW LESS
                    </button>
                  </div>
                )}

                {/* Footer Mandate Notice */}
                <div className="partner-footer-notice">
                  ALL PARTNER MANDATES ACTIVE &nbsp;·&nbsp; VERIFIED JULY 2026
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW 2: ABOUT US PAGE */}
        {currentPage === 'about' && (
          <section className="section">
            <div className="container grid-2" style={{ alignItems: 'flex-start' }}>
              <div>
                <div className="section-tag">Our History & Legacy</div>
                <h2 className="title-serif-large">A legacy of<br /><span className="italic-gold">trust</span> since 1996.</h2>
                <p className="subtext" style={{ marginBottom: '2rem' }}>
                  Established as a physical ledger accounting house, Giri Investment has evolved over nearly three decades to navigate modern capital markets. We maintain standard transparency and personal custody of our clients' trust.
                </p>
                <div className="btn-group">
                  <button className="btn btn-primary" onClick={() => setShowScheduleModal(true)}>Book Folio Review</button>
                </div>
              </div>

              <div>
                <div className="about-history-container">
                  <div className="about-history-node">
                    <span className="about-history-year">1996</span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#fff', marginTop: '0.25rem' }}>Ledger Founding</h4>
                    <p className="about-history-text">Founded by Shri Shambhu Sharan Giri as a localized ledger keeping firm to record family wealth balances.</p>
                  </div>
                  <div className="about-history-node">
                    <span className="about-history-year">2004</span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#fff', marginTop: '0.25rem' }}>MF Distribution Launch</h4>
                    <p className="about-history-text">Obtained ARN-7519 accreditation from AMFI to provide mutual fund structures to our client family.</p>
                  </div>
                  <div className="about-history-node">
                    <span className="about-history-year">2015</span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#fff', marginTop: '0.25rem' }}>Digital Consolidation</h4>
                    <p className="about-history-text">Integrated computerized portfolio tracking systems while keeping our face-to-face service motto intact.</p>
                  </div>
                  <div className="about-history-node">
                    <span className="about-history-year">Present</span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#fff', marginTop: '0.25rem' }}>₹150+ Cr Assets Managed</h4>
                    <p className="about-history-text">Advising over 1,200 family portfolios with zero legacy disputes and 100% verified entries.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership & Founders */}
            <div className="container" style={{ marginTop: '5rem' }}>
              <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Leadership & Founders</div>
              <div className="team-grid">
                <div className="team-card-with-photo">
                  <img src="/shambhu_giri.jpg" alt="Shambhu Sharan Giri" className="team-photo" />
                  <div className="team-details">
                    <h3 className="team-name">Shambhu Sharan Giri</h3>
                    <div className="team-role">Founder & Chief Advisor</div>
                    <p className="about-history-text" style={{ fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                      Giri Investment was founded by Shambhu Sharan Giri, whose vision was to make quality financial planning and investment advisory services accessible to every investor. With years of experience in wealth management and financial consulting, he has helped numerous families and individuals build disciplined investment portfolios focused on long-term financial security. His commitment to ethical practices, transparency, and client-first service continues to shape the foundation of Giri Investment.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/shambhu-sharan-giri-82946044/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="linkedin-link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      Shambhu Sharan Giri on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="team-card-with-photo">
                  <img src="/ankit_giri.jpg" alt="Ankit Kumar Giri" className="team-photo" />
                  <div className="team-details">
                    <h3 className="team-name">Ankit Kumar Giri</h3>
                    <div className="team-role">Successor & Operations Lead</div>
                    <p className="about-history-text" style={{ fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                      Ankit Kumar Giri represents the next generation of leadership at Giri Investment. Focused on combining technology with finance, he is driving the firm's digital transformation by integrating AI-powered investment insights, modern portfolio analytics, and seamless digital experiences. His vision is to build Giri Investment into a next-generation wealth management platform that makes investing smarter, simpler, and more accessible for investors across India.
                    </p>
                    <a 
                      href="https://www.linkedin.com/in/ankit-giri-3a7260198/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="linkedin-link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      Ankit Kumar Giri on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 3: MUTUAL FUNDS PAGE */}
        {currentPage === 'mutual_funds' && (
          <section className="section" id="mf-panel-header">
            {/* SUB-PAGE 1: LANDING GRID */}
            {mfSubPage === 'landing' && (
              <div className="container" style={{ textAlign: 'center' }}>
                <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Asset Allocation</div>
                <h2 className="title-serif-large" style={{ margin: '1rem 0' }}>Mutual Funds</h2>
                <p className="subtext" style={{ margin: '0 auto 3rem auto', maxWidth: '650px' }}>
                  Investing in Mutual Funds can be rewarding, if you choose the Right Product & Right Method.
                </p>

                <div className="mf-landing-grid">
                  <div className="mf-landing-card" onClick={() => setMfSubPage('selector')}>
                    <div className="mf-landing-card-bg" style={{ backgroundImage: 'url("/fund_selector_bg.jpg")' }}></div>
                    <div className="mf-landing-card-overlay">
                      <h3 className="mf-landing-title">Fund Selector Tools</h3>
                      <span className="mf-landing-subtitle">Filter & Compare AMCs</span>
                    </div>
                  </div>

                  <div className="mf-landing-card" onClick={() => {
                    setCurrentPage('home');
                    setTimeout(() => {
                      const element = document.getElementById('calc-panel-header');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>
                    <div className="mf-landing-card-bg" style={{ backgroundImage: 'url("/india_mutual_funds.jpg")' }}></div>
                    <div className="mf-landing-card-overlay">
                      <h3 className="mf-landing-title">Financial Planning</h3>
                      <span className="mf-landing-subtitle">Growth & Pension Planners</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-PAGE 2: FUND SELECTOR TOOLS */}
            {mfSubPage === 'selector' && (
              <div className="container">
                <div className="back-btn-container">
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }} onClick={() => setMfSubPage('landing')}>
                    ← Back to Mutual Fund Options
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <div className="section-tag" style={{ justifyContent: 'center' }}>Institutional AMCs</div>
                  <h2 className="title-serif-large" style={{ fontSize: '2.8rem', margin: '0.5rem 0' }}>Fund Selector Tool</h2>
                  <p className="subtext" style={{ margin: '0 auto' }}>
                    Compare historical yields, assets under management (AUM), and compliance star ratings across all registered partner AMCs.
                  </p>
                </div>

                {/* Filter and Search Bar */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  alignItems: 'center',
                  flexWrap: 'wrap', 
                  padding: '0.85rem 1.25rem', 
                  background: 'var(--color-card-dark)', 
                  border: '1px solid var(--color-border-dark)', 
                  borderRadius: '4px',
                  maxWidth: '720px',
                  margin: '0 auto 2rem auto'
                }}>
                  <div style={{ flex: '1', minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="caption-label" style={{ fontSize: '0.6rem' }}>Search AMC Name</span>
                    <input 
                      type="text" 
                      placeholder="e.g. SBI, HDFC, TATA..." 
                      className="form-input" 
                      style={{ 
                        color: '#fff', 
                        border: '1px solid var(--color-border-dark)', 
                        background: 'transparent',
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.85rem'
                      }}
                      value={amcSearch}
                      onChange={(e) => setAmcSearch(e.target.value)}
                    />
                  </div>
                  <div style={{ minWidth: '140px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="caption-label" style={{ fontSize: '0.6rem' }}>Filter by Rating</span>
                    <select 
                      className="form-input" 
                      style={{ 
                        color: '#fff', 
                        border: '1px solid var(--color-border-dark)', 
                        background: 'var(--color-bg-dark)',
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.85rem'
                      }}
                      value={amcRatingFilter}
                      onChange={(e) => setAmcRatingFilter(e.target.value)}
                    >
                      <option value="All">All Ratings</option>
                      <option value="5★">5 Star (5★) only</option>
                      <option value="4★">4 Star (4★) & above</option>
                    </select>
                  </div>
                </div>

                {/* AMC Ledger Grid List */}
                <div className="fd-table-container">
                  <table className="fd-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Asset Management Company</th>
                        <th>Est.</th>
                        <th>Total AUM</th>
                        <th>AMFI Rating</th>
                        <th>Avg. Yield</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partners
                        .filter(p => p.type === 'AMC')
                        .filter(p => p.name.toLowerCase().includes(amcSearch.toLowerCase()))
                        .filter(p => {
                          if (amcRatingFilter === 'All') return true;
                          if (amcRatingFilter === '5★') return p.rating === '5★';
                          if (amcRatingFilter === '4★') return p.rating === '4★' || p.rating === '5★';
                          return true;
                        })
                        .map((amc, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 700, color: 'var(--color-text-dark)', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>
                              {amc.name}
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-dark)', fontWeight: 600 }}>
                              {amc.est}
                            </td>
                            <td style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>
                              {amc.aum}
                            </td>
                            <td style={{ color: 'var(--color-accent)', fontWeight: '700' }}>
                              {amc.rating}
                            </td>
                            <td style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                              {amc.avgReturn}
                            </td>
                            <td>
                              <button 
                                className="btn btn-primary" 
                                style={{ padding: '0.4rem 0.85rem', fontSize: '0.72rem', borderRadius: '4px' }} 
                                onClick={() => triggerPartnerInvest(amc.name)}
                              >
                                Select AMC
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {/* VIEW 5: INSURANCE PAGE */}
        {currentPage === 'insurance' && (
          <section className="section">
            {/* SUB-PAGE 1: LANDING GRID */}
            {insuranceSubPage === 'landing' && (
              <div className="container" style={{ textAlign: 'center' }}>
                <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Risk & Protection</div>
                <h2 className="title-serif-large" style={{ margin: '1rem 0' }}>Insuring the future of your loved ones</h2>
                <p className="subtext" style={{ margin: '0 auto 3rem auto', maxWidth: '750px' }}>
                  Insurance is a means of protection from financial loss. It is a form of risk management primarily used to hedge against the risk of a contingent, uncertain loss. The amount of money to be charged for a certain amount of insurance coverage is called the premium.
                </p>

                <div className="mf-landing-grid insurance-landing-grid">
                  <div className="mf-landing-card" onClick={() => { setInsuranceSubPage('life'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <div className="mf-landing-card-bg" style={{ backgroundImage: 'url("/india_life_insurance.jpg")' }}></div>
                    <div className="mf-landing-card-overlay">
                      <h3 className="mf-landing-title">Life Insurance</h3>
                      <span className="mf-landing-subtitle">Income Replacement (HLV)</span>
                    </div>
                  </div>

                  <div className="mf-landing-card" onClick={() => { setInsuranceSubPage('general'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <div className="mf-landing-card-bg" style={{ backgroundImage: 'url("/general_insurance_bg.jpg")' }}></div>
                    <div className="mf-landing-card-overlay">
                      <h3 className="mf-landing-title">General Insurance</h3>
                      <span className="mf-landing-subtitle">Asset & Vehicle Coverage</span>
                    </div>
                  </div>

                  <div className="mf-landing-card" onClick={() => { setInsuranceSubPage('health'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <div className="mf-landing-card-bg" style={{ backgroundImage: 'url("/india_health_insurance.jpg")' }}></div>
                    <div className="mf-landing-card-overlay">
                      <h3 className="mf-landing-title">Health Insurance</h3>
                      <span className="mf-landing-subtitle">Family Mediclaim Estimator</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-PAGE 2: LIFE INSURANCE */}
            {insuranceSubPage === 'life' && (
              <div className="container">
                <div className="back-btn-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }} onClick={() => setInsuranceSubPage('landing')}>
                    ← Back to Insurance Options
                  </button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted-light)', letterSpacing: '1px' }}>
                    Home / Insurance / <span style={{ color: 'var(--color-accent)' }}>Life Insurance</span>
                  </div>
                </div>

                <div className="grid-2" style={{ alignItems: 'flex-start', gap: '2.5rem' }}>
                  {/* Left Column: Guidance Inquiry Form & HLV Calculator */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Guidance Inquiry Card */}
                    {/* Guidance Inquiry Card */}
                    <div className="calculator-card">
                      {!lifeHelpSuccess ? (
                        <>
                          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Personalized Advisory</div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-text-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                            Don't Have an Insurance ! <br />
                            <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-text-muted-dark)', fontFamily: 'var(--font-sans)' }}>
                              Want guidance in selecting a plan? Fill out the form below & get in touch with us.
                            </span>
                          </h3>

                          <form onSubmit={handleLifeHelpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>YOUR NAME</label>
                              <input 
                                type="text" 
                                required 
                                placeholder="Enter your full name" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={lifeHelpName} 
                                onChange={(e) => setLifeHelpName(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>EMAIL</label>
                              <input 
                                type="email" 
                                required 
                                placeholder="name@domain.com" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={lifeHelpEmail} 
                                onChange={(e) => setLifeHelpEmail(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>MOBILE</label>
                              <input 
                                type="tel" 
                                required 
                                placeholder="+91 98765 43210" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={lifeHelpPhone} 
                                onChange={(e) => setLifeHelpPhone(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>YOUR MESSAGE</label>
                              <textarea 
                                placeholder="Tell us your age, cover requirements or questions..." 
                                className="calc-number-input" 
                                rows="3" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', resize: 'none', width: '100%' }}
                                value={lifeHelpMessage} 
                                onChange={(e) => setLifeHelpMessage(e.target.value)} 
                              />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}>
                              Get Help From Us
                            </button>
                          </form>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                          <div style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                            ✓ Inquiry Dispatched
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                            Thank you, {lifeHelpName}. Our certified life advisor will reach out to {lifeHelpEmail} or {lifeHelpPhone} within 24 hours.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* HLV Cover Planner Calculator */}
                    <div className="calculator-card">
                      <div className="calc-header">
                        <div>
                          <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>Life Valuation</span>
                          <h3 className="calc-title">HLV Cover Planner</h3>
                        </div>
                        <div className="live-badge">
                          <span className="live-badge-dot"></span>
                          CALCULATION
                        </div>
                      </div>

                      <div className="calc-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="calc-input-group">
                          <span className="caption-label dark">Annual Earnings</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={insIncome} onChange={(e) => setInsIncome(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="100000" max="5000000" step="50000" value={insIncome} onChange={(e) => setInsIncome(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: 0 }}>
                          <div className="calc-input-group">
                            <span className="caption-label dark">Working Years Left</span>
                            <div className="calc-input-val-container">
                              <input type="number" value={insWorkingYears} onChange={(e) => setInsWorkingYears(Number(e.target.value))} className="calc-number-input" />
                              <span className="calc-input-unit">Yrs</span>
                            </div>
                            <input type="range" min="1" max="40" value={insWorkingYears} onChange={(e) => setInsWorkingYears(Number(e.target.value))} className="calc-slider" />
                          </div>

                          <div className="calc-input-group">
                            <span className="caption-label dark">Liabilities</span>
                            <div className="calc-input-val-container">
                              <span className="calc-input-symbol">₹</span>
                              <input type="number" value={insLiabilities} onChange={(e) => setInsLiabilities(Number(e.target.value))} className="calc-number-input" />
                            </div>
                            <input type="range" min="0" max="10000000" step="50000" value={insLiabilities} onChange={(e) => setInsLiabilities(Number(e.target.value))} className="calc-slider" />
                          </div>
                        </div>
                      </div>

                      <div className="calc-results" style={{ borderTop: '1px solid var(--color-border-light)' }}>
                        <span className="calc-result-title">Human Life Value (HLV) Recommended Cover</span>
                        <div className="calc-result-value" style={{ fontSize: '2.4rem' }}>{formatCurrency(insuranceResults.hlvNeeded)}</div>
                        <div className="ledger-receipt">
                          <div className="receipt-line"><span>Income Replacement (Earnings × Years × 0.7)</span><span>{formatCurrency(insIncome * insWorkingYears * 0.7)}</span></div>
                          <div className="receipt-line"><span>Outstanding Liabilities (Loans/Debts)</span><span>+{formatCurrency(insLiabilities)}</span></div>
                          <div className="receipt-line"><span>Existing Liquid Assets</span><span>-{formatCurrency(insLiquidAssets)}</span></div>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => triggerPartnerInvest('LIC OF INDIA')}>
                          Proceed to Life Coverage Quote
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Knowledge Base & FAQs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                    
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        Why Life Insurance?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        We prioritize insurance planning as a must because it is protection to the life cover risk. It will help you understand whether you are under-insured or over-insured and the existing policies can be earmarked in the financial planning structure.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        Life insurance is important to people who want to protect their family from financial distress after their death. It can be used to provide financial security for loved ones.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        The proceeds from a life insurance policy are paid to the beneficiary on a tax-free basis, which provides a lump sum that can be used for a number of purposes. Depending on the type of policy chosen, life insurance can also provide a savings component for the policyholder.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        How does life insurance provide financial security?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        The main reason people consider buying life insurance is to protect the people they leave behind. Having coverage in place is especially important during the policyholder's main earning years. During this time, he or she may have major expenses such as a mortgage, car payments and the like.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        He or she may have young children that need to be cared for, and/or aging parents that require assistance. In the case of a stay at home parent or spouse the funds may be used to pay someone else to perform the tasks, like cooking, housekeeping and child care, that the deceased once provided.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        The death benefit that an insurance policy provides is meant to replace income so that the policyholder's family is less likely to have to face a major lifestyle change in addition to dealing with the loss of someone who is very important to them. Most people are underinsured, as opposed to having enough coverage.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Ideally, the level of protection chosen should be enough to replace the policyholder's gross income for a number of years. Where the policyholder has a young family, it's not unrealistic to look a plan that will pay out an amount that is equal 10 years of earnings or more.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        What can a death benefit be used for ?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        The death benefit that is paid out under a life insurance policy can be used for any purpose the beneficiary deems appropriate. It's very common for the proceeds from the policy to be used to pay bills and debts the deceased has left behind. That way, his or her survivors are not required to pay them on the deceased's behalf.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        The cost of final arrangements is something that can be pricey, even for a very simple cremation or burial. An insurance policy can also be used to pay for funeral expenses and take that pressure off the family.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        Proceeds from a life insurance policy can also be used to pay off a mortgage or for general living expenses. If the policyholder has young children, the money may be used for childcare expenses or to hire a housekeeper or nanny. The funds can also be used to pay for post-secondary education for the insured's children, if desired.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Anything that the policyholder's salary was used for when he or she was alive can be paid for with the death benefit that an insurance policy provides. The funds can also be invested to provide a source of income for the surviving spouse or partner in retirement.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        How can life insurance provide savings ?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        Some types of life insurance plans have a savings component as well as provide protection if the policyholder dies. When the person chooses a permanent, universal or whole life insurance policy, part of the money that he or she pays in premiums is used to fund an investment savings plan. The money grows over time and the policyholder can use the money as collateral for a loan from the insurer if he or she needs to get access to cash in a hurry.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        The policyholder also has the option of canceling the policy and gaining access to the pool of funds if he or she wishes to do so. This is not a move that should be taken lightly and the policyholder should contact his or her agent or insurance company to discuss options before taking this step.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        The individual may also choose to cancel the existing policy and replace it with a term life policy that still provides a level of financial protection but does not include the savings component.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Life insurance is a product that should be included in a plan to protect the policyholder and his or her family from financial disaster. Life insurance is important because it can be used to pay bills and expenses on behalf of the deceased. The funds from a death benefit replace the policyholder's income and can be used to help to maintain a lifestyle similar to the one the policyholder's family had before disaster struck. It is one of the most loving things that a person can do for his or her family, since the person who is insured will not be benefiting from the coverage - the ones he or she loves the most will instead.
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* SUB-PAGE 3: GENERAL INSURANCE */}
            {insuranceSubPage === 'general' && (
              <div className="container">
                <div className="back-btn-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }} onClick={() => setInsuranceSubPage('landing')}>
                    ← Back to Insurance Options
                  </button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted-light)', letterSpacing: '1px' }}>
                    Home / Insurance / <span style={{ color: 'var(--color-accent)' }}>General & Vehicle Insurance</span>
                  </div>
                </div>

                <div className="grid-2" style={{ alignItems: 'flex-start', gap: '2.5rem' }}>
                  {/* Left Column: Guidance Inquiry Form & Vehicle IDV Calculator */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Guidance Inquiry Card */}
                    {/* Guidance Inquiry Card */}
                    <div className="calculator-card">
                      {!genHelpSuccess ? (
                        <>
                          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Asset & Motor Protection</div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-text-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                            Don't Have Vehicle / Asset Insurance ! <br />
                            <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-text-muted-dark)', fontFamily: 'var(--font-sans)' }}>
                              Want guidance in selecting a motor or asset plan? Fill out the form below & get in touch with us.
                            </span>
                          </h3>

                          <form onSubmit={handleGenHelpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>YOUR NAME</label>
                              <input 
                                type="text" 
                                required 
                                placeholder="Enter your full name" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={genHelpName} 
                                onChange={(e) => setGenHelpName(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>EMAIL</label>
                              <input 
                                type="email" 
                                required 
                                placeholder="name@domain.com" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={genHelpEmail} 
                                onChange={(e) => setGenHelpEmail(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>MOBILE</label>
                              <input 
                                type="tel" 
                                required 
                                placeholder="+91 98765 43210" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={genHelpPhone} 
                                onChange={(e) => setGenHelpPhone(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>YOUR MESSAGE</label>
                              <textarea 
                                placeholder="Tell us your vehicle model, registration year or coverage questions..." 
                                className="calc-number-input" 
                                rows="3" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', resize: 'none', width: '100%' }}
                                value={genHelpMessage} 
                                onChange={(e) => setGenHelpMessage(e.target.value)} 
                              />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}>
                              Get Help From Us
                            </button>
                          </form>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                          <div style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                            ✓ Motor Request Dispatched
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                            Thank you, {genHelpName}. Our motor & asset specialist will contact {genHelpEmail} or {genHelpPhone} shortly.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Vehicle IDV Planner Calculator */}
                    <div className="calculator-card">
                      <div className="calc-header">
                        <div>
                          <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>General Valuation</span>
                          <h3 className="calc-title">Vehicle IDV Planner</h3>
                        </div>
                        <div className="live-badge">
                          <span className="live-badge-dot"></span>
                          CALCULATION
                        </div>
                      </div>

                      <div className="calc-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="calc-input-group">
                          <span className="caption-label dark">Original Showroom Invoice Value</span>
                          <div className="calc-input-val-container">
                            <span className="calc-input-symbol">₹</span>
                            <input type="number" value={vehicleValue} onChange={(e) => setVehicleValue(Number(e.target.value))} className="calc-number-input" />
                          </div>
                          <input type="range" min="100000" max="3000000" step="20000" value={vehicleValue} onChange={(e) => setVehicleValue(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-input-group">
                          <span className="caption-label dark">Vehicle Age (For Depreciation Scale)</span>
                          <div className="calc-input-val-container">
                            <select className="calc-number-input" style={{ border: 'none', background: 'transparent' }} value={vehicleAge} onChange={(e) => setVehicleAge(Number(e.target.value))}>
                              <option value={1}>Less than 1 Year Old (10% Depr)</option>
                              <option value={2}>1 to 2 Years Old (20% Depr)</option>
                              <option value={3}>2 to 3 Years Old (30% Depr)</option>
                              <option value={4}>3 to 4 Years Old (40% Depr)</option>
                              <option value={5}>5+ Years Old (50% Depr)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="calc-results" style={{ borderTop: '1px solid var(--color-border-light)' }}>
                        <span className="calc-result-title">Estimated IDV</span>
                        <div className="calc-result-value" style={{ fontSize: '2.4rem' }}>{formatCurrency(insuranceResults.estimatedIdv)}</div>
                        <div className="ledger-receipt">
                          <div className="receipt-line"><span>Depreciation Applied</span><span>{vehicleAge * 10}%</span></div>
                          <div className="receipt-line"><span>Estimated Annual Premium</span><span>{formatCurrency(insuranceResults.motorPremium)}</span></div>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => triggerPartnerInvest('RELIANCE GENERAL INSURANCE')}>
                          Request Motor/General Quote
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Knowledge Base & FAQs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                    
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        Why General & Vehicle Insurance?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        General insurance safeguards your physical holdings, vehicles, and capital assets against sudden damages, theft, natural calamities, or legal liabilities. It acts as a financial buffer preventing out-of-pocket capital loss when unexpected accidents occur.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        Motor insurance is legally mandatory across India under the Motor Vehicles Act. Having comprehensive coverage ensures that both third-party legal claims and your own vehicle repair expenses are fully settled without financial strain.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Whether protecting a personal sedan, commercial transport fleet, or physical property, general insurance policies provide structured risk transfer backed by leading institutional insurers.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        What is Insured Declared Value (IDV) and how is vehicle premium calculated?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        Insured Declared Value (IDV) represents the current market value of your vehicle. It is the maximum sum assured that the insurance company will pay in the event of total loss or theft of the vehicle.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        IDV is calculated based on the manufacturer's listed selling price minus standard IRDAI depreciation scales based on vehicle age (10% for age under 1 year, scaling up to 50% for vehicles over 5 years old).
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Your annual premium is calculated using your vehicle's IDV, engine cubic capacity (cc), geographic location zone, and your earned No-Claim Bonus (NCB) discount.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        What coverages are included in Third-Party vs Comprehensive policies?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Third-Party Liability:</strong> Covers mandatory legal obligations for bodily injury, disability, death, or third-party property damage caused to another person or vehicle during an accident.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Own Damage (OD) Coverage:</strong> Protects your own vehicle against accidental collision damages, fire, explosion, lightning, burglary, theft, riots, earthquake, floods, and natural disasters.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        A <strong>Comprehensive Motor Package</strong> combines both Third-Party and Own Damage protection into a single policy, giving full end-to-end security.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        How do No-Claim Bonus (NCB) and Zero-Depreciation Riders work?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>No-Claim Bonus (NCB):</strong> A reward discount offered on your renewal premium for every claim-free policy year. NCB starts at 20% after 1 year and accumulates up to 50% for 5 consecutive claim-free years. NCB stays with the owner, not the vehicle.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Zero Depreciation (Bumper-to-Bumper) Add-on:</strong> Standard insurance claims deduct depreciation on replaced rubber, plastic, glass, and metal parts. A Zero Dep rider ensures 100% claim payout for parts without any depreciation deduction.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Additional recommended riders include Engine Protect, Consumables Cover, Roadside Assistance, and Personal Accident Cover for driver & passengers.
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* SUB-PAGE 4: HEALTH INSURANCE */}
            {insuranceSubPage === 'health' && (
              <div className="container">
                <div className="back-btn-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.75rem' }} onClick={() => setInsuranceSubPage('landing')}>
                    ← Back to Insurance Options
                  </button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted-light)', letterSpacing: '1px' }}>
                    Home / Insurance / <span style={{ color: 'var(--color-accent)' }}>Health & Mediclaim Insurance</span>
                  </div>
                </div>

                <div className="grid-2" style={{ alignItems: 'flex-start', gap: '2.5rem' }}>
                  {/* Left Column: Guidance Inquiry Form & Mediclaim Calculator */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Guidance Inquiry Card */}
                    {/* Guidance Inquiry Card */}
                    <div className="calculator-card">
                      {!healthHelpSuccess ? (
                        <>
                          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>Family Health Advisory</div>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-text-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                            Don't Have Health / Mediclaim Insurance ! <br />
                            <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-text-muted-dark)', fontFamily: 'var(--font-sans)' }}>
                              Want guidance in selecting a family floater or top-up plan? Fill out the form below & get in touch with us.
                            </span>
                          </h3>

                          <form onSubmit={handleHealthHelpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>YOUR NAME</label>
                              <input 
                                type="text" 
                                required 
                                placeholder="Enter your full name" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={healthHelpName} 
                                onChange={(e) => setHealthHelpName(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>EMAIL</label>
                              <input 
                                type="email" 
                                required 
                                placeholder="name@domain.com" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={healthHelpEmail} 
                                onChange={(e) => setHealthHelpEmail(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>MOBILE</label>
                              <input 
                                type="tel" 
                                required 
                                placeholder="+91 98765 43210" 
                                className="calc-number-input" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', width: '100%' }}
                                value={healthHelpPhone} 
                                onChange={(e) => setHealthHelpPhone(e.target.value)} 
                              />
                            </div>
                            <div className="form-group">
                              <label className="caption-label dark" style={{ fontSize: '0.65rem', marginBottom: '0.25rem', display: 'block' }}>YOUR MESSAGE</label>
                              <textarea 
                                placeholder="Tell us members to cover, eldest member age or questions..." 
                                className="calc-number-input" 
                                rows="3" 
                                style={{ color: 'var(--color-text-dark)', border: '1px solid var(--color-border-light)', background: '#fff', padding: '0.6rem 0.75rem', fontSize: '0.85rem', resize: 'none', width: '100%' }}
                                value={healthHelpMessage} 
                                onChange={(e) => setHealthHelpMessage(e.target.value)} 
                              />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.25rem' }}>
                              Get Help From Us
                            </button>
                          </form>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                          <div style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                            ✓ Mediclaim Request Dispatched
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dark)' }}>
                            Thank you, {healthHelpName}. Our certified health advisor will contact {healthHelpEmail} or {healthHelpPhone} within 24 hours.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mediclaim Premium Estimator Calculator */}
                    <div className="calculator-card">
                      <div className="calc-header">
                        <div>
                          <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>Mediclaim Valuation</span>
                          <h3 className="calc-title">Premium Estimator</h3>
                        </div>
                        <div className="live-badge">
                          <span className="live-badge-dot"></span>
                          CALCULATION
                        </div>
                      </div>

                      <div className="calc-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="calc-input-group">
                          <span className="caption-label dark">Age of Eldest Member</span>
                          <div className="calc-input-val-container">
                            <input type="number" value={healthAge} onChange={(e) => setHealthAge(Number(e.target.value))} className="calc-number-input" />
                            <span className="calc-input-unit">Yrs</span>
                          </div>
                          <input type="range" min="18" max="75" value={healthAge} onChange={(e) => setHealthAge(Number(e.target.value))} className="calc-slider" />
                        </div>

                        <div className="calc-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: 0 }}>
                          <div className="calc-input-group">
                            <span className="caption-label dark">Desired Cover</span>
                            <div className="calc-input-val-container">
                              <select className="calc-number-input" style={{ border: 'none', background: 'transparent', fontSize: '1rem' }} value={healthCoverAmount} onChange={(e) => setHealthCoverAmount(Number(e.target.value))}>
                                <option value={500000}>₹5 Lakhs</option>
                                <option value={1000000}>₹10 Lakhs</option>
                                <option value={1500000}>₹15 Lakhs</option>
                                <option value={2000000}>₹20 Lakhs</option>
                              </select>
                            </div>
                          </div>

                          <div className="calc-input-group">
                            <span className="caption-label dark">Members Protected</span>
                            <div className="calc-input-val-container">
                              <select className="calc-number-input" style={{ border: 'none', background: 'transparent', fontSize: '1rem' }} value={healthMembers} onChange={(e) => setHealthMembers(e.target.value)}>
                                <option value="self">Self Only</option>
                                <option value="couple">Self + Spouse</option>
                                <option value="family">Family (2A + 2C)</option>
                                <option value="parents">Self + Parents</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="calc-results" style={{ borderTop: '1px solid var(--color-border-light)' }}>
                        <span className="calc-result-title">Estimated Annual Mediclaim Premium</span>
                        <div className="calc-result-value" style={{ fontSize: '2.4rem' }}>{formatCurrency(insuranceResults.estimatedHealthPremium)}</div>
                        <div className="ledger-receipt">
                          <div className="receipt-line"><span>Eldest Member Base Rate</span><span>{formatCurrency(healthAge * 280)}</span></div>
                          <div className="receipt-line"><span>Floater Multiplier ({healthMembers})</span><span>× {healthMembers === 'self' ? '1.0' : healthMembers === 'couple' ? '1.6' : healthMembers === 'family' ? '2.1' : '2.4'}</span></div>
                          <div className="receipt-line"><span>High Sum Insured Loading</span><span>+{formatCurrency(healthCoverAmount * 0.0005)}</span></div>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => triggerPartnerInvest('STAR HEALTH INSURANCE')}>
                          Proceed to Mediclaim Coverage Quote
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Knowledge Base & FAQs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                    
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        Why Health Insurance?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        Medical emergencies can wipe out multi-year financial savings in days. A comprehensive health insurance policy acts as a shield protecting your capital ledger, ensuring access to top-tier hospital care without liquidating long-term investments.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        With healthcare cost inflation rising rapidly every year, having robust Mediclaim protection for your self, spouse, children, and parents ensures immediate access to quality medical treatment without financial distress.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Health insurance covers hospitalization costs, surgeries, ICU charges, diagnostic tests, doctor fees, and day-care procedures, providing complete financial security.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        How does Cashless Hospitalization and Family Floater coverage work?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Cashless Hospitalization:</strong> When admitted to any network hospital (spanning 8,000+ top hospitals nationwide), the TPA desk settles hospital bills directly with the insurance provider. You do not need to arrange cash or wait for post-discharge reimbursements.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Family Floater Plan:</strong> Instead of buying separate individual policies for each member, a Family Floater policy places your entire family under a single, larger pool of sum insured (e.g. ₹10 Lakhs or ₹25 Lakhs).
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Any family member can utilize the full sum insured if hospitalization occurs during the policy year, providing maximum coverage efficiency at a lower combined premium.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        What medical expenses are covered under a Mediclaim Policy?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>In-Patient Hospitalization:</strong> Room rent, ICU expenses, surgeon & doctor fees, nursing charges, blood, oxygen, and operation theater costs for hospital stays exceeding 24 hours.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Pre & Post-Hospitalization:</strong> Diagnostic tests, doctor consultations, and medications taken up to 30–60 days before hospital admission and 60–180 days post-discharge.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <strong>Day-Care & Advanced Procedures:</strong> Modern medical procedures like cataract surgery, chemotherapy, dialysis, and radiotherapy that require under 24 hours of hospital stay due to technological advancement.
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border-dark)', paddingTop: '1.75rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                        How to select the right sum insured and claim tax deductions under Section 80D?
                      </h3>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Choosing Sum Insured:</strong> For urban metro families, a minimum floater cover of ₹10 Lakhs to ₹25 Lakhs is recommended to comfortably cover tertiary hospital costs. Super top-up riders can be added to boost coverage to ₹50L+ at minimal extra cost.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        <strong>Tax Benefit under Section 80D:</strong> Premiums paid for self, spouse, and dependent children qualify for tax deductions up to ₹25,000 per financial year.
                      </p>
                      <p className="about-history-text" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        An additional deduction of up to ₹25,000 (or ₹50,000 for senior citizen parents) is available for health premiums paid for parents, enabling total tax savings of up to ₹75,000 under Section 80D.
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            )}
          </section>
        )}

        {/* VIEW 6: CONTACT US PAGE */}
        {currentPage === 'contact' && (
          <section className="section">
            <div className="container grid-2" style={{ alignItems: 'flex-start' }}>
              <div>
                <div className="section-tag">Get In Touch</div>
                <h2 className="title-serif-large">Contact<br />Our <span className="italic-gold">Office</span></h2>
                <p className="subtext">
                  Have inquiries about your portfolio entries, account reconciliations, or starting new SIPs? Send us your message and we'll reply to your email or open a direct mail connection.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  <div className="team-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>
                      Registered Email
                    </div>
                    <p className="about-history-text" style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>giriinvestments@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="calculator-card" style={{ marginTop: '2rem' }}>
                {!contactSuccess ? (
                  <>
                    <div className="calc-header">
                      <div>
                        <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>Direct Line</span>
                        <h3 className="calc-title">Send Message</h3>
                      </div>
                    </div>

                    <form onSubmit={handleContactSubmit} className="modal-form" style={{ marginTop: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Shri Ram Prasad" 
                          className="form-input" 
                          value={contactName} 
                          onChange={(e) => setContactName(e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="ram.prasad@gmail.com" 
                          className="form-input" 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="SIP Portfolio Inquiry" 
                          className="form-input" 
                          value={contactSubject} 
                          onChange={(e) => setContactSubject(e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Message Details</label>
                        <textarea 
                          required 
                          placeholder="Type your questions or details here..." 
                          className="form-input" 
                          rows="4" 
                          style={{ resize: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
                          value={contactMessage} 
                          onChange={(e) => setContactMessage(e.target.value)} 
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={contactSending}>
                        {contactSending ? 'Dispatching Message...' : 'Send to Company Mail'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="success-state">
                    <div className="success-icon-circle">
                      <Check size={32} />
                    </div>
                    <h3 className="modal-title">Mail Dispatch Initiated</h3>
                    <p className="modal-sub" style={{ textAlign: 'center' }}>
                      Opening default mail client to deliver your inquiry securely to `customercare@giisfinancial.com`.
                    </p>
                    <div className="ledger-receipt">
                      <div className="receipt-line"><span>FROM</span><span>{contactName}</span></div>
                      <div className="receipt-line"><span>EMAIL</span><span>{contactEmail}</span></div>
                      <div className="receipt-line"><span>SUBJECT</span><span>{contactSubject}</span></div>
                      <div className="receipt-line"><span>STATUS</span><span style={{ color: 'var(--color-success)', fontWeight: '700' }}>DISPATCHING...</span></div>
                    </div>
                    <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted-dark)' }}>
                      Click submit again if mail client did not open automatically.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* VIEW 7: CLIENT RESOURCES PAGE */}
        {currentPage === 'downloads' && (
          <section className="section">
            <div className="container">
              
              {!isResourcesUnlocked ? (
                /* LOCKED PORTAL: CLIENT IDENTITY VERIFICATION GATEKEEPER */
                <div className="client-gate-container">
                  <div className="client-gate-card">
                    <div className="gate-header">
                      <div className="gate-lock-badge">
                        <Lock size={28} />
                      </div>
                      <div className="section-tag" style={{ justifyContent: 'center', margin: '0.75rem auto 0.5rem auto' }}>
                        Verification Required
                      </div>
                      <h2 className="gate-title">Client Resources Portal</h2>
                      <p className="gate-subtitle">
                        Client forms, legal disclosures and official documents are restricted. Please enter your contact details below to unlock instant access. Your details will be sent directly to our advisory team.
                      </p>
                    </div>

                    <form onSubmit={handleResourceGateSubmit} className="gate-form">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Shri Ayank Kumar Giri" 
                          className="form-input"
                          value={gateName}
                          onChange={(e) => setGateName(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone / WhatsApp Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210" 
                          className="form-input"
                          value={gatePhone}
                          onChange={(e) => setGatePhone(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Gmail / Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="client@gmail.com" 
                          className="form-input"
                          value={gateEmail}
                          onChange={(e) => setGateEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Residential Address *</label>
                        <textarea 
                          required 
                          rows="3"
                          placeholder="House / Flat No., Road, City, Pincode" 
                          className="form-input"
                          style={{ resize: 'vertical' }}
                          value={gateAddress}
                          onChange={(e) => setGateAddress(e.target.value)}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary gate-submit-btn"
                        disabled={gateSubmitting}
                      >
                        {gateSubmitting ? (
                          <>Dispatching Details & Unlocking...</>
                        ) : (
                          <>Unlock Client Resources <Lock size={16} style={{ marginLeft: '0.4rem' }} /></>
                        )}
                      </button>

                      <p className="gate-privacy-note">
                        🔒 Your details will be transmitted securely to <strong>giriinvestments@gmail.com</strong> for portfolio reconciliation.
                      </p>
                    </form>
                  </div>
                </div>
              ) : (
                /* UNLOCKED PORTAL: FULL CLIENT RESOURCES ACCESS */
                <>
                  {/* Header Title & Subtitle */}
                  <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative' }}>
                    <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.85rem' }}>Client Portal</div>
                    <h2 className="title-serif-large" style={{ margin: '0.5rem 0 1rem 0' }}>Client Resources</h2>
                    <p className="subtext" style={{ margin: '0 auto', maxWidth: '680px' }}>
                      Forms, documents and resources you may need — all in one place.
                    </p>
                    <div style={{ marginTop: '0.85rem' }}>
                      <span className="resource-meta-tag" style={{ background: 'rgba(22, 163, 74, 0.08)', color: 'var(--color-success)', borderColor: 'rgba(22, 163, 74, 0.25)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Unlock size={12} /> Verified Client Portal Access
                      </span>
                    </div>
                  </div>

              {/* Search & Category Filter Controls */}
              <div className="resource-filter-container">
                <div className="resource-search-box">
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search forms, documents, or portals..." 
                    className="resource-search-input"
                    value={resourceSearch}
                    onChange={(e) => setResourceSearch(e.target.value)}
                  />
                  {resourceSearch && (
                    <button className="search-clear-btn" onClick={() => setResourceSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="resource-category-tabs">
                  {['All', 'Investment', 'Insurance', 'KYC', 'External Portals'].map((cat) => (
                    <button
                      key={cat}
                      className={`resource-tab ${resourceCategory === cat ? 'active' : ''}`}
                      onClick={() => setResourceCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document Groups Container */}
              <div className="resource-groups-wrapper">
                
                {/* Section 1: Official Policy & Servicing Forms */}
                {(resourceCategory === 'All' || resourceCategory === 'Insurance' || resourceCategory === 'Client Forms') && (
                  <div className="resource-group-block">
                    <div className="resource-group-header">
                      <div className="group-header-badge">POLICY & SERVICING FORMS</div>
                      <p className="group-header-sub">Official documents for policy servicing, claim requests & bank mandates downloadable directly from our website.</p>
                    </div>

                    <div className="resource-grid">
                      {filteredResources
                        .filter(f => f.sectionGroup === 'Giri Investment Forms')
                        .map((file) => (
                          <div key={file.id} className="resource-card-compact">
                            <div className="resource-card-left">
                              <div className="resource-icon-badge">
                                {file.externalUrl ? <Globe size={18} /> : <FileText size={18} />}
                              </div>
                              <div className="resource-card-content">
                                <div className="resource-card-top-row">
                                  <h3 className="resource-title">{file.title}</h3>
                                </div>
                                <p className="resource-desc">{file.desc}</p>
                                <div className="resource-timestamp">
                                  <span>Updated {file.updated || 'Aug 2026'}</span>
                                </div>
                                
                                {downloadingFileId === file.id && (
                                  <div className="download-progress-bar-container" style={{ marginTop: '0.4rem' }}>
                                    <div className="download-progress-bar-fill"></div>
                                  </div>
                                )}
                                
                                {downloadCompletedId === file.id && (
                                  <div style={{ color: 'var(--color-success)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: '0.35rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Check size={13} /> File downloaded to device!
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="resource-card-actions">
                              {file.previewUrl && (
                                <a 
                                  href={file.previewUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="btn btn-outline resource-btn-preview"
                                >
                                  Preview
                                </a>
                              )}
                              <button 
                                className="btn btn-primary resource-btn-action" 
                                onClick={() => handleDownloadTrigger(file.id)}
                                disabled={downloadingFileId !== null}
                              >
                                <ArrowDownToLine size={14} /> {downloadingFileId === file.id ? 'Downloading...' : 'Download'}
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Section 2: KYC & Investment Forms */}
                {(resourceCategory === 'All' || resourceCategory === 'Investment' || resourceCategory === 'KYC' || resourceCategory === 'Client Forms') && (
                  <div className="resource-group-block">
                    <div className="resource-group-header">
                      <div className="group-header-badge">KYC & INVESTMENT FORMS</div>
                      <p className="group-header-sub">KYC application forms used for investor onboarding and KYC-related requirements.</p>
                    </div>

                    <div className="resource-grid">
                      {filteredResources
                        .filter(f => f.sectionGroup === 'KYC & Investment Forms')
                        .map((file) => (
                          <div key={file.id} className="resource-card-compact">
                            <div className="resource-card-left">
                              <div className="resource-icon-badge">
                                {file.externalUrl ? <Globe size={18} /> : <FileText size={18} />}
                              </div>
                              <div className="resource-card-content">
                                <div className="resource-card-top-row">
                                  <h3 className="resource-title">{file.title}</h3>
                                </div>
                                <p className="resource-desc">{file.desc}</p>
                                <div className="resource-timestamp">
                                  <span>Updated {file.updated || 'Aug 2026'}</span>
                                </div>
                                
                                {downloadingFileId === file.id && (
                                  <div className="download-progress-bar-container" style={{ marginTop: '0.4rem' }}>
                                    <div className="download-progress-bar-fill"></div>
                                  </div>
                                )}
                                
                                {downloadCompletedId === file.id && (
                                  <div style={{ color: 'var(--color-success)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', marginTop: '0.35rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Check size={13} /> File downloaded to device!
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="resource-card-actions">
                              {file.previewUrl && (
                                <a 
                                  href={file.previewUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="btn btn-outline resource-btn-preview"
                                >
                                  Preview
                                </a>
                              )}
                              <button 
                                className="btn btn-primary resource-btn-action" 
                                onClick={() => handleDownloadTrigger(file.id)}
                                disabled={downloadingFileId !== null}
                              >
                                <ArrowDownToLine size={14} /> {downloadingFileId === file.id ? 'Downloading...' : 'Download'}
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Section 3: Official External Resources */}
                {(resourceCategory === 'All' || resourceCategory === 'External Portals') && (
                  <div className="resource-group-block">
                    <div className="resource-group-header">
                      <div className="group-header-badge portal-badge">OFFICIAL RESOURCES</div>
                      <p className="group-header-sub">Verified links to third-party institution portals for online verification & official forms.</p>
                    </div>

                    <div className="resource-grid">
                      {filteredResources
                        .filter(f => f.sectionGroup === 'Official Resources')
                        .map((file) => (
                          <div key={file.id} className="resource-card-compact">
                            <div className="resource-card-left">
                              <div className="resource-icon-badge" style={{ background: 'rgba(2, 132, 199, 0.08)', color: '#0284c7' }}>
                                <Globe size={18} />
                              </div>
                              <div className="resource-card-content">
                                <div className="resource-card-top-row">
                                  <h3 className="resource-title">{file.title}</h3>
                                </div>
                                <p className="resource-desc">{file.desc}</p>
                                <div className="resource-timestamp">
                                  <span>Verified {file.updated || 'Aug 2026'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="resource-card-actions">
                              <button 
                                className="btn btn-primary resource-btn-action" 
                                style={{ background: '#0284c7', borderColor: '#0284c7' }}
                                onClick={() => handleDownloadTrigger(file.id)}
                              >
                                Open Official Portal <ExternalLink size={13} />
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}

                {/* Empty State when no results match search */}
                {filteredResources.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <Search size={32} style={{ color: '#94a3b8', marginBottom: '0.75rem' }} />
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>No matching resources found</h4>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Try clearing your search term or selecting "All" categories.</p>
                    <button 
                      className="btn btn-outline" 
                      style={{ marginTop: '1rem', padding: '0.45rem 1.1rem', fontSize: '0.75rem' }}
                      onClick={() => { setResourceSearch(''); setResourceCategory('All'); }}
                    >
                      Clear Search & Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Institutional Legal Disclaimer Note */}
              <div className="resource-legal-disclaimer">
                <ShieldCheck size={20} className="disclaimer-icon" />
                <span>
                  <strong>Important Disclaimer:</strong> Forms and requirements may change from time to time. Please verify the latest version and applicable requirements with the relevant institution before submission.
                </span>
              </div>
            </>
          )}

        </div>
      </section>
    )}

      </main>

      {/* ----------------------------------------------------
          4-COLUMN LUXURY FOOTER (MATCHING USER REFERENCE)
         ---------------------------------------------------- */}
      <footer className="footer-luxury">
        <div className="container">
          {/* Section 15: Mountain Peak Drawing Animation */}
          <div className="footer-mountain-container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <svg className="footer-mountain-svg" viewBox="0 0 400 60" style={{ maxWidth: '320px', height: '55px', margin: '0 auto' }}>
              <path 
                className="footer-mountain-path" 
                d="M 10 50 L 170 50 L 200 10 L 230 50 L 390 50" 
                fill="none" 
                stroke="var(--color-accent)" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-accent)', letterSpacing: '2.5px', marginTop: '0.5rem' }}>
              GIRI INVESTMENT — PEAKS OF TRUST, SINCE 1996
            </div>
          </div>

          <div className="footer-grid-4">
            
            {/* Column 1: Get In Touch */}
            <div className="footer-col">
              <h3 className="footer-col-title">Get In Touch</h3>
              <ul className="footer-info-list">
                <li>
                  <div className="footer-icon-box">📍</div>
                  <div>
                    <strong>Giri Investment & Advisory</strong><br />
                    Jharkhand State Highway 4, Noamundi,<br />
                    Jharkhand - 833218
                  </div>
                </li>
                <li>
                  <div className="footer-icon-box">✉️</div>
                  <div>
                    <a href="mailto:giriinvestments@gmail.com" className="footer-link">giriinvestments@gmail.com</a>
                  </div>
                </li>
              </ul>

              {/* Social Icons Row */}
              <div className="footer-social-row">
                <a href="https://www.facebook.com/giri.investments/" target="_blank" rel="noopener noreferrer" className="footer-social-circle" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/shambhu-sharan-giri-82946044/" target="_blank" rel="noopener noreferrer" className="footer-social-circle" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.instagram.com/giri_investment_/" target="_blank" rel="noopener noreferrer" className="footer-social-circle" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Popular Links */}
            <div className="footer-col">
              <h3 className="footer-col-title">Popular Links</h3>
              <ul className="footer-nav-list">
                <li onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>› Home</li>
                <li onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>› About Us</li>
                <li onClick={() => { setCurrentPage('mutual_funds'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>› Mutual Funds</li>
                <li onClick={() => { setCurrentPage('insurance'); setInsuranceSubPage('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>› Insurance Guidance</li>
                <li onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>› Consultation</li>
                <li onClick={() => { setCurrentPage('downloads'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>› Downloads</li>
              </ul>
            </div>

            {/* Column 3: Location */}
            <div className="footer-col">
              <h3 className="footer-col-title">Location</h3>
              <ul className="footer-nav-list location-list">
                <li>📍 Noamundi</li>
                <li>📍 Jamshedpur</li>
                <li>📍 Ranchi</li>
                <li>📍 Rourkela</li>
                <li>📍 Bhubaneswar</li>
                <li>📍 Delhi</li>
                <li>📍 Lucknow</li>
              </ul>
            </div>

            {/* Column 4: Find Us (Google Maps Embed Card) */}
            <div className="footer-col">
              <h3 className="footer-col-title">Find Us</h3>
              <div className="footer-map-card">
                <div className="map-badge-header">
                  <a 
                    href="https://maps.app.goo.gl/VmZCWBZNd4edSgtv8?g_st=ic" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="map-open-btn"
                  >
                    Open in Maps ↗
                  </a>
                </div>
                <iframe 
                  title="Giri Investment Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7042571285624!2d85.52989737592881!3d22.364807941230492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1fb5282c83825f%3A0x6888b7af46c2d3a!2sGIRI%20INVESTMENT!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="160" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Back To Top */}
          <div className="footer-bottom-bar">
            <div className="copyright-container">
              <span className="copyright-text">
                Copyright © {new Date().getFullYear()} All Rights Reserved &nbsp;|&nbsp; Designed & Developed By
              </span>
              <a 
                href="https://www.linkedin.com/in/ayank-kumar-giri-9895ab339/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="author-linkedin-pill"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                <span>Ayank Kumar Giri — Connect on LinkedIn</span>
              </a>
            </div>
            
            <button 
              className="back-to-top-btn" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Back to Top"
              aria-label="Back to Top"
            >
              ▲
            </button>
          </div>
        </div>
      </footer>

      {/* ----------------------------------------------------
          PARTNER DETAIL OVERLAY TOOLTIP
         ---------------------------------------------------- */}
      {selectedPartnerInfo && (
        <div className="modal-overlay" onClick={() => setSelectedPartnerInfo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPartnerInfo(null)}>
              <X size={18} />
            </button>
            <div className="modal-body" style={{ padding: '2rem' }}>
              <span className="caption-label dark">{selectedPartnerInfo.type} Partner</span>
              <h3 className="modal-title" style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>{selectedPartnerInfo.name}</h3>
              <div className="portfolio-divider" style={{ margin: '1rem 0' }}></div>
              
              <div className="portfolio-details" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div className="portfolio-row">
                  <span className="portfolio-row-label">Established Year</span>
                  <span className="portfolio-row-val">{selectedPartnerInfo.est}</span>
                </div>
                <div className="portfolio-row">
                  <span className="portfolio-row-label">Trust Rating</span>
                  <span className="portfolio-row-val" style={{ color: 'var(--color-accent)' }}>{selectedPartnerInfo.rating}</span>
                </div>

                {selectedPartnerInfo.type === 'AMC' ? (
                  <>
                    <div className="portfolio-row">
                      <span className="portfolio-row-label">Assets Under Management</span>
                      <span className="portfolio-row-val">{selectedPartnerInfo.aum}</span>
                    </div>
                    <div className="portfolio-row">
                      <span className="portfolio-row-label">Avg. 5Yr Annualized Return</span>
                      <span className="portfolio-row-val trend-up">{selectedPartnerInfo.avgReturn}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="portfolio-row">
                      <span className="portfolio-row-label">Solvency Ratio</span>
                      <span className="portfolio-row-val">{selectedPartnerInfo.solvency}</span>
                    </div>
                    <div className="portfolio-row">
                      <span className="portfolio-row-label">Claim Settlement Ratio</span>
                      <span className="portfolio-row-val trend-up">{selectedPartnerInfo.claimRatio}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="btn-group" style={{ justifyContent: 'flex-end' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ fontSize: '0.75rem', padding: '0.5rem 1.2rem' }}
                  onClick={() => triggerPartnerInvest(selectedPartnerInfo.name)}
                >
                  Invest with {selectedPartnerInfo.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODAL: BOOK A CONSULTATION / SCHEDULE MEETING
         ---------------------------------------------------- */}
      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowScheduleModal(false)}>
              <X size={18} />
            </button>
            <div className="modal-body">
              {!scheduleSuccess ? (
                <>
                  <h3 className="modal-title">Book a Consultation</h3>
                  <p className="modal-sub">Schedule your annual portfolio review with an expert advisor.</p>
                  
                  <form onSubmit={handleScheduleSubmit} className="modal-form">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Shri Sharan Giri"
                        value={scheduleName}
                        onChange={(e) => setScheduleName(e.target.value)}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="sharan.giri@gmail.com"
                        value={scheduleEmail}
                        onChange={(e) => setScheduleEmail(e.target.value)}
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={schedulePhone}
                        onChange={(e) => setSchedulePhone(e.target.value)}
                        className="form-input" 
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Select Date</label>
                        <input 
                          type="date" 
                          required 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="form-input"
                          min="2026-07-23" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Available Time Slots</label>
                        <div className="slot-grid">
                          {['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM'].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                              onClick={() => setSelectedSlot(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                      disabled={!selectedSlot}
                    >
                      Confirm Schedule
                    </button>
                  </form>
                </>
              ) : (
                <div className="success-state">
                  <div className="success-icon-circle">
                    <Check size={32} />
                  </div>
                  <h3 className="modal-title">Meeting Scheduled</h3>
                  <p className="modal-sub" style={{ textAlign: 'center' }}>
                    Your folio review has been successfully booked. An email confirmation has been sent.
                  </p>
                  
                  <div className="ledger-receipt">
                    <div className="receipt-line"><span>FOLIO STATUS</span><span>CONFIRMED</span></div>
                    <div className="receipt-line"><span>CLIENT</span><span>{scheduleName}</span></div>
                    <div className="receipt-line"><span>DATE / TIME</span><span>{selectedDate} @ {selectedSlot}</span></div>
                    <div className="receipt-line"><span>ADVISOR</span><span>SSG SENIOR CONSULTANT</span></div>
                  </div>
                  <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted-dark)' }}>
                    Reconciled automatically at checkout counter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODAL: START INVESTING
         ---------------------------------------------------- */}
      {showInvestModal && (
        <div className="modal-overlay" onClick={() => setShowInvestModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowInvestModal(false)}>
              <X size={18} />
            </button>
            <div className="modal-body">
              {!investSuccess ? (
                <>
                  <h3 className="modal-title">Start Your Investment</h3>
                  <p className="modal-sub">Create a new entry in Giri Investment's secure folio ledger.</p>
                  
                  <form onSubmit={handleInvestSubmit} className="modal-form">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Smt. Parvati Giri"
                        value={investName}
                        onChange={(e) => setInvestName(e.target.value)}
                        className="form-input" 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="parvati.giri@gmail.com"
                        value={investEmail}
                        onChange={(e) => setInvestEmail(e.target.value)}
                        className="form-input" 
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Investment Type</label>
                        <select 
                          className="form-input"
                          value={investType}
                          onChange={(e) => setInvestType(e.target.value)}
                          style={{ height: '100%', background: '#fff' }}
                        >
                          <option value="SIP">Monthly SIP</option>
                          <option value="Lump Sum">Lump Sum Mutual Fund</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Partner Brand</label>
                        <select 
                          className="form-input"
                          value={investPartner}
                          onChange={(e) => setInvestPartner(e.target.value)}
                          style={{ height: '100%', background: '#fff' }}
                        >
                          <option value={investPartner}>{investPartner}</option>
                          {partners.filter(p => p.type === 'AMC' && p.name !== investPartner).map((p) => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Investment Amount (₹)</label>
                      <input 
                        type="number" 
                        required 
                        min="500"
                        placeholder="5000"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(Number(e.target.value))}
                        className="form-input" 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                    >
                      Transact & Reconcile Ledger
                    </button>
                  </form>
                </>
              ) : (
                <div className="success-state">
                  <div className="success-icon-circle" style={{ backgroundColor: '#e5edea', color: 'var(--color-success)' }}>
                    <Activity size={32} />
                  </div>
                  <h3 className="modal-title">Reconciliation Successful</h3>
                  <p className="modal-sub" style={{ textAlign: 'center' }}>
                    Your transaction has been processed. A new passbook record was created.
                  </p>
                  
                  <div className="ledger-receipt">
                    <div className="receipt-line"><span>RECONCILED FOLIO</span><span style={{ fontWeight: '700', color: 'var(--color-accent)' }}>{reconciledFolio}</span></div>
                    <div className="receipt-line"><span>INVESTOR</span><span>{investName}</span></div>
                    <div className="receipt-line"><span>PARTNER FUND</span><span>{investPartner}</span></div>
                    <div className="receipt-line"><span>TYPE / FREQUENCY</span><span>{investType}</span></div>
                    <div className="receipt-line"><span>TRANSACT AMOUNT</span><span>{formatCurrency(investAmount)}</span></div>
                    <div className="receipt-line"><span>STATUS</span><span style={{ color: 'var(--color-success)', fontWeight: '700' }}>LEDGER RECORDED</span></div>
                  </div>
                  
                  <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted-dark)' }}>
                    Thank you for trusting Giri Investment since 1996.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Dedicated Mobile Calculator Fullscreen Modal / Page */}
      {showMobileCalcModal && (
        <div className="mobile-calc-modal-overlay">
          <div className="mobile-calc-modal-container">
            <div className="mobile-calc-topbar">
              <button className="mobile-calc-back-btn" onClick={() => setShowMobileCalcModal(false)}>
                <ArrowLeft size={18} /> Back to Home
              </button>
              <div className="live-badge">
                <span className="live-badge-dot"></span> LIVE CALCULATION
              </div>
            </div>

            <div className="mobile-calc-modal-body">
              <div className="calculator-card mobile-fullscreen-card">
                <div className="calc-header" style={{ marginBottom: '1rem' }}>
                  <div>
                    <span className="caption-label dark" style={{ fontSize: '0.65rem' }}>Financial Calculator</span>
                    <h3 className="calc-title">
                      {activeTab === 'sip' && 'SIP Growth Planner'}
                      {activeTab === 'retirement' && 'Retirement Corpus Planner'}
                      {activeTab === 'insurance' && 'Insurance Cover Planner'}
                    </h3>
                  </div>
                </div>

                <div className="calc-tabs">
                  <button className={`calc-tab ${activeTab === 'sip' ? 'active' : ''}`} onClick={() => setActiveTab('sip')}>SIP Calculator</button>
                  <button className={`calc-tab ${activeTab === 'retirement' ? 'active' : ''}`} onClick={() => setActiveTab('retirement')}>Retirement Planner</button>
                  <button className={`calc-tab ${activeTab === 'insurance' ? 'active' : ''}`} onClick={() => setActiveTab('insurance')}>Insurance Need</button>
                </div>

                {activeTab === 'sip' && (
                  <div>
                    <div className="calc-grid">
                      <div className="calc-input-group">
                        <span className="caption-label dark">Monthly SIP</span>
                        <div className="calc-input-val-container">
                          <span className="calc-input-symbol">₹</span>
                          <input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="1000" max="100000" step="1000" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Expected Return</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="calc-number-input" />
                          <span className="calc-input-symbol">%</span>
                        </div>
                        <input type="range" min="5" max="25" step="0.5" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Investment Period</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="calc-number-input" />
                          <span className="calc-input-unit">Yrs</span>
                        </div>
                        <input type="range" min="1" max="40" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Goal Target</span>
                        <div className="calc-input-val-container">
                          <span className="calc-input-symbol">₹</span>
                          <input type="number" value={sipTarget} onChange={(e) => setSipTarget(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="1000000" max="500000000" step="1000000" value={sipTarget} onChange={(e) => setSipTarget(Number(e.target.value))} className="calc-slider" />
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--color-border-light)', borderRadius: '4px', backgroundColor: 'rgba(30, 37, 34, 0.02)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        <span>Goal Progress (vs {formatCurrency(sipTarget)})</span>
                        <span style={{ fontWeight: '700' }}>{sipResults.progressPercent}%</span>
                      </div>
                      <div className="card-progress-bar-container" style={{ background: '#e2ded6', height: '6px', marginTop: 0 }}>
                        <div className="card-progress-bar-fill" style={{ width: `${sipResults.progressPercent}%` }}></div>
                      </div>
                    </div>

                    <div className="calc-results">
                      <span className="calc-result-title">Projected Corpus</span>
                      <div className="calc-result-value">{formatCurrency(sipResults.futureValue)}</div>
                      <div className="calc-chart-container">
                        <svg className="calc-chart-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chart-gradient-mobile" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path className="calc-chart-path-invested" d={`M 0 110 L 400 ${110 - (sipResults.totalInvested / sipResults.futureValue) * 90}`} />
                          <path className="calc-chart-path-fill" d={`M 0 110 ${sipResults.chartPoints.map((pt, i) => {
                            const x = (i / (sipResults.chartPoints.length - 1)) * 400;
                            const y = 110 - (pt.corpus / sipResults.futureValue) * 90;
                            return `L ${x} ${y}`;
                          }).join(' ')} L 400 110 Z`} />
                          <path className="calc-chart-path-line" d={`M 0 110 ${sipResults.chartPoints.map((pt, i) => {
                            const x = (i / (sipResults.chartPoints.length - 1)) * 400;
                            const y = 110 - (pt.corpus / sipResults.futureValue) * 90;
                            return `L ${x} ${y}`;
                          }).join(' ')}`} />
                        </svg>
                      </div>

                      <div className="calc-chart-footer">
                        <div>Total Invested: <span className="calc-chart-footer-val">{formatCurrency(sipResults.totalInvested)}</span></div>
                        <div>Gain: <span className="calc-chart-footer-val" style={{ color: 'var(--color-success)' }}>+{formatCurrency(sipResults.estReturns)}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'retirement' && (
                  <div>
                    <div className="calc-grid">
                      <div className="calc-input-group">
                        <span className="caption-label dark">Current Age</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={retAge} onChange={(e) => setRetAge(Number(e.target.value))} className="calc-number-input" />
                          <span className="calc-input-unit">Yrs</span>
                        </div>
                        <input type="range" min="18" max="60" value={retAge} onChange={(e) => setRetAge(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Retirement Age</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={retTargetAge} onChange={(e) => setRetTargetAge(Number(e.target.value))} className="calc-number-input" />
                          <span className="calc-input-unit">Yrs</span>
                        </div>
                        <input type="range" min={retAge + 1} max="80" value={retTargetAge} onChange={(e) => setRetTargetAge(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Monthly Expense</span>
                        <div className="calc-input-val-container">
                          <span className="calc-input-symbol">₹</span>
                          <input type="number" value={retExpenses} onChange={(e) => setRetExpenses(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="10000" max="200000" step="5000" value={retExpenses} onChange={(e) => setRetExpenses(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Expected Inflation</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={retInflation} onChange={(e) => setRetInflation(Number(e.target.value))} className="calc-number-input" />
                          <span className="calc-input-symbol">%</span>
                        </div>
                        <input type="range" min="4" max="10" step="0.5" value={retInflation} onChange={(e) => setRetInflation(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Post-Retirement Return</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={retPostReturn} onChange={(e) => setRetPostReturn(Number(e.target.value))} className="calc-number-input" />
                          <span className="calc-input-symbol">%</span>
                        </div>
                        <input type="range" min="4" max="15" step="0.5" value={retPostReturn} onChange={(e) => setRetPostReturn(Number(e.target.value))} className="calc-slider" />
                      </div>
                    </div>

                    <div className="calc-results">
                      <span className="calc-result-title">Required Retirement Corpus</span>
                      <div className="calc-result-value">{formatCurrency(retirementResults.corpusNeeded)}</div>
                      <div className="ledger-receipt">
                        <div className="receipt-line"><span>Years to Retirement</span><span>{retirementResults.yearsToRetire} Years</span></div>
                        <div className="receipt-line"><span>Inflation Adjusted Expense</span><span>{formatCurrency(retirementResults.inflationAdjustedExpenses)}/mo</span></div>
                        <div className="receipt-line"><span>Monthly Saving Needed (at 12%)</span><span style={{ color: 'var(--color-success)', fontWeight: 700 }}>{formatCurrency(retirementResults.monthlySavingsRequired)}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'insurance' && (
                  <div>
                    <div className="calc-grid">
                      <div className="calc-input-group">
                        <span className="caption-label dark">Annual Income</span>
                        <div className="calc-input-val-container">
                          <span className="calc-input-symbol">₹</span>
                          <input type="number" value={insIncome} onChange={(e) => setInsIncome(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="300000" max="5000000" step="50000" value={insIncome} onChange={(e) => setInsIncome(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Total Liabilities/Loans</span>
                        <div className="calc-input-val-container">
                          <span className="calc-input-symbol">₹</span>
                          <input type="number" value={insLiabilities} onChange={(e) => setInsLiabilities(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="0" max="10000000" step="100000" value={insLiabilities} onChange={(e) => setInsLiabilities(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">No. of Dependents</span>
                        <div className="calc-input-val-container">
                          <input type="number" value={insDependents} onChange={(e) => setInsDependents(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="0" max="8" value={insDependents} onChange={(e) => setInsDependents(Number(e.target.value))} className="calc-slider" />
                      </div>

                      <div className="calc-input-group">
                        <span className="caption-label dark">Liquid Assets Deductions</span>
                        <div className="calc-input-val-container">
                          <span className="calc-input-symbol">₹</span>
                          <input type="number" value={insLiquidAssets} onChange={(e) => setInsLiquidAssets(Number(e.target.value))} className="calc-number-input" />
                        </div>
                        <input type="range" min="0" max="5000000" step="50000" value={insLiquidAssets} onChange={(e) => setInsLiquidAssets(Number(e.target.value))} className="calc-slider" />
                      </div>
                    </div>

                    <div className="calc-results">
                      <span className="calc-result-title">Recommended Term Insurance Cover</span>
                      <div className="calc-result-value">{formatCurrency(insuranceResults.recommendedCover)}</div>
                      <div className="ledger-receipt">
                        <div className="receipt-line"><span>Income Replacement (10x)</span><span>{formatCurrency(insuranceResults.incomeMultiple)}</span></div>
                        <div className="receipt-line"><span>Outstanding Loans added</span><span>+{formatCurrency(insLiabilities)}</span></div>
                        <div className="receipt-line"><span>Assets deducted</span><span>-{formatCurrency(insLiquidAssets)}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
