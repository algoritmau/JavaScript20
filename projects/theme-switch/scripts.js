const toggleThemeSwitch = document.querySelector('input[type="checkbox"]');
const lightModeIcon = document.querySelector('.theme-manager__icon--light');
const darkModeIcon = document.querySelector('.theme-manager__icon--dark');
const featureCardTitles = document.querySelectorAll('.feature-card__title');
const featureCardDescriptions = document.querySelectorAll(
  '.feature-card__desc'
);
const rulesRuler = document.querySelector('.rules__ruler');

toggleThemeSwitch.addEventListener('change', handleThemeSwitch);

function handleThemeSwitch(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeIcon.hidden = false;
    lightModeIcon.hidden = true;
    featureCardTitles.forEach(
      (featureCardTitle) => (featureCardTitle.style.color = '#141414')
    );
    featureCardDescriptions.forEach(
      (featureCardDescription) =>
        (featureCardDescription.style.color = '#141414')
    );
    rulesRuler.style.background = 'rgb(255 255 255 / 12%)';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    lightModeIcon.hidden = false;
    darkModeIcon.hidden = true;
  }
}
