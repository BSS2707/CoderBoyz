const siteLoader = document.querySelector('#site-loader');
const loaderStartedAt = performance.now();
let loaderDismissed = false;

function dismissSiteLoader() {
  if (loaderDismissed || !siteLoader) return;
  loaderDismissed = true;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minimumDisplayTime = reduceMotion ? 0 : 700;
  const fadeDuration = reduceMotion ? 0 : 500;
  const remainingTime = Math.max(0, minimumDisplayTime - (performance.now() - loaderStartedAt));
  window.setTimeout(() => {
    siteLoader.classList.add('is-leaving');
    document.querySelector('#main')?.removeAttribute('aria-busy');
    window.setTimeout(() => siteLoader.remove(), fadeDuration);
  }, remainingTime);
}

document.querySelector('#main')?.setAttribute('aria-busy', 'true');
window.addEventListener('load', dismissSiteLoader, { once: true });
window.setTimeout(dismissSiteLoader, 4500);

const techCategories = {
  ai: { label: 'CATEGORY / 01', title: 'Artificial intelligence & machine learning', items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'XGBoost', 'LightGBM', 'Hugging Face', 'Ollama', 'LangChain', 'Large language models', 'Generative AI', 'NLP', 'Computer vision', 'Deep learning'] },
  data: { label: 'CATEGORY / 02', title: 'Data science & analytics', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'SciPy', 'Jupyter Notebook', 'Google Colab', 'Streamlit', 'Power BI', 'Microsoft Excel', 'SQL'] },
  frontend: { label: 'CATEGORY / 03', title: 'Frontend development', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Bootstrap', 'Tailwind CSS', 'SCSS', 'Framer Motion'] },
  backend: { label: 'CATEGORY / 04', title: 'Backend development', items: ['Python', 'Flask', 'Django', 'FastAPI', 'Node.js', 'Express.js', 'PHP', 'REST APIs'] },
  database: { label: 'CATEGORY / 05', title: 'Database & storage', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'SQLite', 'Redis', 'Vector databases', 'ChromaDB', 'FAISS'] },
  mobile: { label: 'CATEGORY / 06', title: 'Mobile app development', items: ['Flutter', 'Dart', 'React Native', 'Kotlin', 'Swift', 'Android development', 'iOS development'] },
  cloud: { label: 'CATEGORY / 07', title: 'Cloud, DevOps & deployment', items: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Git', 'GitHub', 'Vercel', 'Netlify', 'Cloudflare', 'Linux', 'CI/CD'] },
  design: { label: 'CATEGORY / 08', title: 'UI/UX & design', items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Wireframing', 'Prototyping', 'Responsive design'] },
  languages: { label: 'CATEGORY / 09', title: 'Programming languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'C#', 'PHP', 'Dart', 'SQL'] }
};

const techIconPaths = {
  Python: 'python/3776AB', TensorFlow: 'tensorflow/FF6F00', PyTorch: 'pytorch/EE4C2C', 'Scikit-learn': 'scikitlearn/F7931E', Keras: 'keras/D00000', OpenCV: 'opencv/5C3EE8', 'Hugging Face': 'huggingface/FFD21E',
  Pandas: 'pandas/150458', NumPy: 'numpy/013243', Plotly: 'plotly/3F4F75', Streamlit: 'streamlit/FF4B4B', SciPy: 'scipy/8CAAE6', 'Jupyter Notebook': 'jupyter/F37626', 'Google Colab': 'googlecolab/F9AB00',
  HTML5: 'html5/E34F26', JavaScript: 'javascript/F7DF1E', TypeScript: 'typescript/3178C6', 'React.js': 'react/61DAFB', 'React Native': 'react/61DAFB', 'Next.js': 'nextdotjs/FFFFFF', Bootstrap: 'bootstrap/7952B3', 'Tailwind CSS': 'tailwindcss/06B6D4', SCSS: 'sass/CC6699',
  Django: 'django/44B78B', 'Node.js': 'nodedotjs/5FA04E', 'Express.js': 'express/FFFFFF', PHP: 'php/777BB4', MySQL: 'mysql/4479A1', PostgreSQL: 'postgresql/4169E1', MongoDB: 'mongodb/47A248', Firebase: 'firebase/FFCA28', SQLite: 'sqlite/003B57', Supabase: 'supabase/3FCF8E', Redis: 'redis/FF4438',
  Flutter: 'flutter/02569B', Dart: 'dart/0175C2', Kotlin: 'kotlin/7F52FF', Swift: 'swift/F05138', 'Google Cloud': 'googlecloud/4285F4', Docker: 'docker/2496ED', Git: 'git/F05032', GitHub: 'github/FFFFFF', Vercel: 'vercel/FFFFFF', Netlify: 'netlify/00C7B7', Cloudflare: 'cloudflare/F38020', Linux: 'linux/FCC624',
  Figma: 'figma/F24E1E', Java: 'openjdk/FFFFFF', C: 'c/FFFFFF', 'C++': 'cplusplus/FFFFFF'
};

const techTabs = [...document.querySelectorAll('.tech-tab')];
const techTitle = document.querySelector('#tech-title');
const techLabel = document.querySelector('#tech-label');
const techGrid = document.querySelector('#tech-grid');

function renderTechnology(category) {
  const data = techCategories[category];
  if (!data) return;
  techTitle.textContent = data.title;
  techLabel.textContent = data.label;
  techGrid.replaceChildren(...data.items.map((item, index) => {
    const chip = document.createElement('span');
    chip.className = 'tech-chip';
    chip.style.animationDelay = `${Math.min(index, 9) * 25}ms`;
    const symbol = document.createElement('span');
    symbol.className = 'tech-symbol';
    symbol.setAttribute('aria-hidden', 'true');
    if (techIconPaths[item]) {
      symbol.style.setProperty('--tech-brand-color', `#${techIconPaths[item].split('/')[1]}`);
    }
    const initials = document.createElement('span');
    initials.className = 'tech-initials';
    initials.textContent = item.replace(/[^A-Z0-9]/gi, '').slice(0, 2).toUpperCase();
    symbol.append(initials);
    if (techIconPaths[item]) {
      const logo = document.createElement('img');
      logo.className = 'tech-logo';
      logo.alt = '';
      logo.loading = 'lazy';
      logo.decoding = 'async';
      logo.addEventListener('load', () => symbol.classList.add('has-logo'), { once: true });
      logo.addEventListener('error', () => logo.remove(), { once: true });
      logo.src = `assets/technology/${techIconPaths[item].split('/')[0]}.svg`;
      symbol.append(logo);
    }
    const name = document.createElement('span');
    name.textContent = item;
    chip.append(symbol, name);
    return chip;
  }));
}

techTabs.forEach((tab) => tab.addEventListener('click', () => {
  techTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  renderTechnology(tab.dataset.category);
}));
renderTechnology('ai');

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mainNav.classList.toggle('open', open);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}));

const header = document.querySelector('.site-header');
const navLinks = [...mainNav.querySelectorAll('a[href^="#"]:not(.nav-cta)')];
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -65% 0px' });
document.querySelectorAll('#home, #services, #technology, #work, #about, #team, #contact').forEach((section) => sectionObserver.observe(section));

const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-toggle-knob');
let savedTheme;
try {
  savedTheme = localStorage.getItem('coderboyz-theme');
} catch {
  savedTheme = null;
}
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function setTheme(theme, save = false) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeIcon.textContent = isDark ? '☾' : '☼';
  if (save) {
    try {
      localStorage.setItem('coderboyz-theme', isDark ? 'dark' : 'light');
    } catch {
      // The selected theme still applies for this page when storage is unavailable.
    }
  }
}

setTheme(initialTheme);
themeToggle.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('#form-status');
const submitButton = enquiryForm.querySelector('button[type="submit"]');
enquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const formData = new FormData(enquiryForm);
  if (formData.get('botcheck')) return;
  submitButton.disabled = true;
  submitButton.querySelector('.submit-label').textContent = 'Sending...';
  formStatus.textContent = 'Sending your enquiry securely...';
  formStatus.classList.remove('status-error', 'status-success');
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'The form provider did not accept the enquiry.');
    enquiryForm.reset();
    formStatus.textContent = 'Thanks, your enquiry was sent. We’ll be in touch soon.';
    formStatus.classList.add('status-success');
  } catch (error) {
    formStatus.textContent = 'We could not send your enquiry. Please email coderboyz30@gmail.com directly.';
    formStatus.classList.add('status-error');
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector('.submit-label').textContent = 'Send enquiry';
  }
});

const chatLauncher = document.querySelector('#chat-launcher');
const chatPanel = document.querySelector('#chat-panel');
const chatClose = document.querySelector('#chat-close');
const chatMessages = document.querySelector('#chat-messages');
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');

function setChatOpen(open) {
  chatPanel.hidden = !open;
  chatLauncher.setAttribute('aria-expanded', String(open));
  chatLauncher.setAttribute('aria-label', open ? 'Close CoderBoyz FAQ assistant' : 'Open CoderBoyz FAQ assistant');
  if (open) chatInput.focus();
}

chatLauncher.addEventListener('click', () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener('click', () => setChatOpen(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !chatPanel.hidden) setChatOpen(false); });

function addChatMessage(text, sender) {
  const message = document.createElement('p');
  message.className = `chat-bubble ${sender}`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getFaqAnswer(question) {
  const text = question.toLowerCase();
  if (/price|cost|budget|₹|pricing/.test(text)) return 'Website projects start at ₹3,000. Business sites start at ₹6,000, premium sites at ₹9,000, and custom applications at ₹12,000+. Domain and hosting are separate; final pricing depends on scope.';
  if (/service|offer|build|develop/.test(text)) return 'We work on AI and machine learning, data science and analytics, websites, mobile apps, custom software, and UI/UX design. Tell us about your idea through the project enquiry form.';
  if (/technology|tech stack|tools|use/.test(text)) return 'Our stack spans Python, React, JavaScript, data and AI libraries, databases, mobile, cloud, and design tools. We choose based on project requirements; the Technologies section has the category list.';
  if (/portfolio|project|work|example/.test(text)) return 'Selected work includes GrowVora, Prathmesh Films, Rudra Vaghela, and SRN Bharatanatyam. Visit the Our Work section to open each live website.';
  if (/consult|book|meeting|appointment|available|time slot/.test(text)) return 'The initial consultation is free. Live availability booking is not connected yet, so please send an enquiry and the team will coordinate a time directly.';
  if (/pay|payment|razorpay|advance/.test(text)) return 'Payment checkout is not connected on this website. Project payment terms and any advance are confirmed in the quotation before payment.';
  if (/contact|email|reach|whatsapp/.test(text)) return 'Email coderboyz30@gmail.com, use the enquiry form, or message us on WhatsApp using the button on this page.';
  if (/team|who/.test(text)) return 'CoderBoyz is represented here by Bhavya S Solanki (AI/ML and web), Rudra J Dave (full-stack), and Jemil A Patel (UI/UX and development). See the Team section for profiles.';
  if (/start|idea|project/.test(text)) return 'Share your project details in the enquiry form. We’ll review the goals and follow up to discuss scope and next steps.';
  return 'I’m a rule-based FAQ assistant, not a connected AI service. I can answer about services, pricing, portfolio, team, consultations, payments, and contact details.';
}

function respondToChat(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addChatMessage(cleanQuestion, 'user');
  addChatMessage(getFaqAnswer(cleanQuestion), 'bot');
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  respondToChat(chatInput.value);
  chatInput.value = '';
});
document.querySelectorAll('.chat-prompts button').forEach((button) => button.addEventListener('click', () => respondToChat(button.dataset.question)));