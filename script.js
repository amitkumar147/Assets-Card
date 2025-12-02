const assets = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'litecoin', symbol: 'LTC' },
  { id: 'ripple', symbol: 'XRP' },
  { id: 'polkadot', symbol: 'DOT' },
  { id: 'dogecoin', symbol: 'DOGE' },
  { id: 'avalanche-2', symbol: 'AVAX' },
  { id: 'chainlink', symbol: 'LINK' },
];

const prices = {};
const slider = document.getElementById("assets-slider");

// Create asset cards dynamically
assets.forEach(asset => {
  const card = document.createElement("div");
  card.className = "asset";
  card.innerHTML = `
    <h2>${asset.symbol}</h2>
    <input type="number" step="0.0001" placeholder="Quantity" id="${asset.id}-qty">
    <p>Price: $<span id="${asset.id}-price">0</span></p>
    <p>Value: $<span id="${asset.id}-value">0</span></p>
  `;
  slider.appendChild(card);

  // Load saved quantity
  const qtyInput = card.querySelector("input");
  const saved = localStorage.getItem(asset.id);
  if (saved) qtyInput.value = saved;

  // Update localStorage & value
  qtyInput.addEventListener("input", () => {
    localStorage.setItem(asset.id, qtyInput.value || 0);
    updateValues(asset.id);
  });
});

// Fetch live prices from CoinGecko
async function fetchPrices() {
  try {
    const ids = assets.map(a => a.id).join(',');
    const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    const data = await resp.json();

    assets.forEach(asset => {
      prices[asset.id] = data[asset.id].usd;
      document.getElementById(`${asset.id}-price`).textContent = prices[asset.id];
      updateValues(asset.id);
    });
  } catch (err) {
    console.error("Price fetch error:", err);
  }
}

// Update USD value based on quantity
function updateValues(assetId) {
  const qty = parseFloat(document.getElementById(`${assetId}-qty`).value) || 0;
  const value = qty * (prices[assetId] || 0);
  document.getElementById(`${assetId}-value`).textContent = value.toFixed(2);
}

// Initial fetch
fetchPrices();

// Update prices every 1 second
setInterval(fetchPrices, 1000);
function checkPassword() {
    const correctPassword = "HrituXRaghav"; // अपना password डालें
    const userPassword = document.getElementById("password-input").value;

    if (userPassword === correctPassword) {
        document.getElementById("password-screen").style.display = "none";
        document.getElementById("asset-card").style.display = "block";
    } else {
        document.getElementById("error").innerText = "Wrong Password!";
    }
}