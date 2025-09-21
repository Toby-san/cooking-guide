// ===== DATA =====
const recipes = [
  { title: "Milk Tea (Lahpet Yay)", category: "Beverages / Tea",
    img: "https://placehold.co/400x300/FF6F00/FFF?text=Milk+Tea",
    time: "5–7 minutes",
    ingredients: ["Black tea leaves", "Water", "Sweetened condensed milk", "Sugar"],
    instructions: "1. Boil water, add tea leaves and simmer 3–5 minutes. 2. Strain, add condensed milk & sugar, stir and serve hot."
  },
  { title: "Tea Leaf Salad", category: "Salads (Thoke)",
    img: "https://placehold.co/400x300/FF6F00/FFF?text=Tea+Leaf+Salad",
    time: "10 minutes",
    ingredients: ["Fermented tea leaves", "Shredded cabbage", "Roasted peanuts"],
    instructions: "Mix all ingredients with lime juice and fish sauce. Serve immediately."
  },
  // add more recipes here ...
];

// ===== ELEMENTS =====
const homeView = document.getElementById('home');
const menuView = document.getElementById('menu');
const exploreBtn = document.getElementById('explore-btn');
const backHomeBtn = document.getElementById('back-home');
const categoryBar = document.getElementById('category-bar');
const recipeGrid = document.getElementById('recipe-grid');
const modal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const printBtn = document.getElementById('print-btn');

// ===== STATE =====
let activeCategory = 'All';

// ===== FUNCTIONS =====
function showView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  view.classList.add('active');
}

function buildCategories() {
  const categories = ['All', ...new Set(recipes.map(r => r.category))];
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.className = cat === 'All' ? 'active' : '';
    btn.onclick = () => {
      document.querySelectorAll('.category-bar button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = cat;
      renderRecipes();
    };
    categoryBar.appendChild(btn);
  });
}

function renderRecipes() {
  recipeGrid.innerHTML = '';
  const list = activeCategory === 'All' ? recipes : recipes.filter(r => r.category === activeCategory);
  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `<img src="${r.img}" alt="${r.title}"><h3>${r.title}</h3>`;
    card.onclick = () => openModal(r);
    recipeGrid.appendChild(card);
  });
}

function openModal(r) {
  modalBody.innerHTML = `
    <h2>${r.title}</h2>
    <p><strong>Cooking Time:</strong> ${r.time}</p>
    <h3>Ingredients</h3>
    <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>How to Cook</h3>
    <p>${r.instructions}</p>
  `;
  modal.style.display = 'flex';
}

// ===== EVENTS =====
exploreBtn.onclick = () => showView(menuView);
backHomeBtn.onclick = () => showView(homeView);
modalClose.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
printBtn.onclick = () => window.print();

// ===== INIT =====
buildCategories();
renderRecipes();
