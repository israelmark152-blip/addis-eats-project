// 1. Data Array (State) — load from localStorage if available, otherwise start empty
let marketItems = JSON.parse(localStorage.getItem("addisMarketList")) || [];

// 2. DOM Elements
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const marketList = document.querySelector("#market-list");

// Helper Function: Save current state to localStorage
function saveToStorage() {
  localStorage.setItem("addisMarketList", JSON.stringify(marketItems));
}

// 3. Render Function
function renderList() {
  marketList.innerHTML = "";

  marketItems.forEach(function (item) {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    
    if (item.completed) {
      li.classList.add("done");
    }

    li.innerHTML = `
      <span class="item-text">${item.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    marketList.appendChild(li);
  });
}

// 4. Form Submission (Add Item)
itemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = itemInput.value.trim();

  if (text !== "") {
    marketItems.push({
      id: Date.now(),
      text: text,
      completed: false
    });

    itemInput.value = "";
    saveToStorage(); // Save updated list
    renderList();
  }
});

// 5. Event Delegation (Delete + Toggle Purchased)
marketList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;
  
  const id = Number(li.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    marketItems = marketItems.filter(item => item.id !== id);
  } else if (e.target.classList.contains("item-text")) {
    marketItems = marketItems.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
  }

  saveToStorage(); // Save updated list
  renderList();
});

// Initial Render on Page Load
renderList();