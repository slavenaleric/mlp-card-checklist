const socket = io();
let collection = {};

// Receive live state from server
socket.on('init_state', (serverCollection) => {
    collection = serverCollection;
    initGrid();
});

// Sync changes instantly across all connected screens (PCs & Phones)
socket.on('sync_collection', (serverCollection) => {
    collection = serverCollection;
    updateUI();
});

document.addEventListener("DOMContentLoaded", () => {
    setupInputListener();
});

const setList = [
    {
        rarity: "XR - EXTREME RARE",
        level: 3,
        cards: [
            { code: "RBE02-XR-001", name: "Twilight Sparkle (XR)" },
            { code: "RBE02-XR-002", name: "Pinkie Pie (XR)" },
            { code: "RBE02-XR-003", name: "Rainbow Dash (XR)" },
            { code: "RBE02-XR-004", name: "Rarity (XR)" },
            { code: "RBE02-XR-005", name: "Fluttershy (XR)" },
            { code: "RBE02-XR-006", name: "Applejack (XR)" },
            { code: "RBE02-XR-007", name: "Spike (XR)" },
            { code: "RBE02-XR-008", name: "Discord & Mane Six (XR)" }
        ]
    },
    {
        rarity: "USR - ULTRA SPECIAL RARE",
        level: 3,
        cards: [
            { code: "RBE02-USR-001", name: "Princess Twilight Sparkle (USR)" },
            { code: "RBE02-USR-002", name: "Pinkie Pie (USR)" },
            { code: "RBE02-USR-003", name: "Rainbow Dash (USR)" },
            { code: "RBE02-USR-004", name: "Rarity (USR)" },
            { code: "RBE02-USR-005", name: "Fluttershy (USR)" },
            { code: "RBE02-USR-006", name: "Applejack (USR)" },
            { code: "RBE02-USR-007", name: "Starlight Glimmer (USR)" },
            { code: "RBE02-USR-008", name: "Trixie (USR)" }
        ]
    },
    {
        rarity: "UR - ULTRA RARE",
        level: 3,
        cards: [
            { code: "RBE02-UR-001", name: "Twilight Sparkle (UR)" },
            { code: "RBE02-UR-002", name: "Pinkie Pie (UR)" },
            { code: "RBE02-UR-003", name: "Rainbow Dash (UR)" },
            { code: "RBE02-UR-004", name: "Rarity (UR)" },
            { code: "RBE02-UR-005", name: "Fluttershy (UR)" },
            { code: "RBE02-UR-006", name: "Applejack (UR)" },
            { code: "RBE02-UR-007", name: "Apple Bloom (UR)" },
            { code: "RBE02-UR-008", name: "Scootaloo (UR)" },
            { code: "RBE02-UR-009", name: "Sweetie Belle (UR)" },
            { code: "RBE02-UR-010", name: "DJ Pon-3 (UR)" },
            { code: "RBE02-UR-011", name: "Photo Finish (UR)" },
            { code: "RBE02-UR-012", name: "Cozy Glow (UR)" },
            { code: "RBE02-UR-013", name: "Diamond Tiara (UR)" },
            { code: "RBE02-UR-014", name: "Twilight Sparkle Variant (UR)" },
            { code: "RBE02-UR-015", name: "Pinkie Pie Variant (UR)" },
            { code: "RBE02-UR-016", name: "Rainbow Dash Variant (UR)" },
            { code: "RBE02-UR-017", name: "Rarity Variant (UR)" },
            { code: "RBE02-UR-018", name: "Fluttershy Variant (UR)" },
            { code: "RBE02-UR-019", name: "Applejack Variant (UR)" }
        ]
    },
    {
        rarity: "SSR - SUPER SPARK RARE",
        level: 2,
        cards: [
            { code: "MLPME03-SSR-001", name: "Twilight Sparkle (SSR)" },
            { code: "MLPME03-SSR-002", name: "Pinkie Pie (SSR)" },
            { code: "MLPME03-SSR-003", name: "Rainbow Dash (SSR)" },
            { code: "MLPME03-SSR-004", name: "Rarity (SSR)" },
            { code: "MLPME03-SSR-005", name: "Fluttershy (SSR)" },
            { code: "MLPME03-SSR-006", name: "Applejack (SSR)" },
            { code: "RBE02-SSR-013", name: "Spike (SSR)" },
            { code: "MLPME03-SSR-014", name: "Starlight Glimmer (SSR)" },
            { code: "MLPME03-SSR-015", name: "Maud Pie (SSR)" },
            { code: "MLPME03-SSR-016", name: "Apple Bloom (SSR)" },
            { code: "MLPME03-SSR-017", name: "Granny Smith (SSR)" },
            { code: "MLPME03-SSR-018", name: "Zecora (SSR)" },
            { code: "MLPME03-SSR-019", name: "Mrs. Cupcake (SSR)" },
            { code: "MLPME03-SSR-020", name: "Mr. Carrot Cake (SSR)" },
            { code: "RBE02-SSR-001", name: "Daring Do (SSR)" }
        ]
    },
    {
        rarity: "TGR - TRANSPARENT GOLDEN RARE",
        level: 2,
        cards: [
            { code: "RBE02-TGR-001", name: "Twilight Sparkle (TGR)" },
            { code: "RBE02-TGR-002", name: "Pinkie Pie (TGR)" },
            { code: "RBE02-TGR-003", name: "Rainbow Dash (TGR)" },
            { code: "RBE02-TGR-004", name: "Rarity (TGR)" },
            { code: "RBE02-TGR-005", name: "Fluttershy (TGR)" },
            { code: "RBE02-TGR-006", name: "Applejack (TGR)" },
            { code: "RBE02-TGR-007", name: "Queen Chrysalis (TGR)" },
            { code: "RBE02-TGR-008", name: "Mistmane (TGR)" }
        ]
    },
    {
        rarity: "ST - SPECIAL TRANSPARENT",
        level: 2,
        cards: [
            { code: "RBE02-ST-001", name: "Twilight Sparkle (ST)" },
            { code: "RBE02-ST-002", name: "Pinkie Pie (ST)" },
            { code: "RBE02-ST-003", name: "Rainbow Dash (ST)" },
            { code: "RBE02-ST-004", name: "Rarity (ST)" },
            { code: "RBE02-ST-005", name: "Fluttershy (ST)" },
            { code: "RBE02-ST-006", name: "Applejack (ST)" },
            { code: "RBE02-ST-007", name: "Apple Bloom (ST)" },
            { code: "RBE02-ST-008", name: "Scootaloo (ST)" },
            { code: "RBE02-ST-009", name: "Sweetie Belle (ST)" },
            { code: "RBE02-ST-010", name: "Sugar Belle (ST)" },
            { code: "RBE02-ST-011", name: "Princess Cadance (ST)" },
            { code: "RBE02-ST-012", name: "Starlight Glimmer (ST)" },
            { code: "RBE02-ST-013", name: "Twilight Sparkle Alt (ST)" },
            { code: "RBE02-ST-014", name: "Pinkie Pie Alt (ST)" },
            { code: "RBE02-ST-015", name: "Rainbow Dash Alt (ST)" },
            { code: "RBE02-ST-016", name: "Rarity Alt (ST)" },
            { code: "RBE02-ST-017", name: "Fluttershy Alt (ST)" },
            { code: "RBE02-ST-018", name: "Applejack Alt (ST)" },
            { code: "RBE02-ST-019", name: "Queen Chrysalis (ST)" },
            { code: "RBE02-ST-020", name: "Mistmane (ST)" }
        ]
    },
    {
        rarity: "TR - TRANSPARENT RARE",
        level: 2,
        cards: [
            { code: "RBE02-TR-001", name: "Twilight Sparkle (TR)" },
            { code: "RBE02-TR-002", name: "Pinkie Pie (TR)" },
            { code: "RBE02-TR-003", name: "Rainbow Dash (TR)" },
            { code: "RBE02-TR-004", name: "Rarity (TR)" },
            { code: "RBE02-TR-005", name: "Fluttershy (TR)" },
            { code: "RBE02-TR-006", name: "Applejack (TR)" },
            { code: "RBE02-TR-007", name: "Apple Bloom (TR)" },
            { code: "RBE02-TR-008", name: "Scootaloo (TR)" },
            { code: "RBE02-TR-009", name: "Sweetie Belle (TR)" },
            { code: "RBE02-TR-010", name: "Sugar Belle (TR)" },
            { code: "RBE02-TR-011", name: "Princess Cadance (TR)" },
            { code: "RBE02-TR-012", name: "Starlight Glimmer (TR)" }
        ]
    },
    {
        rarity: "FR - FUN RARE",
        level: 1,
        cards: [
            { code: "RBE02-FR-001", name: "Twilight Sparkle (FR)" },
            { code: "RBE02-FR-002", name: "Pinkie Pie (FR)" },
            { code: "RBE02-FR-003", name: "Rainbow Dash (FR)" },
            { code: "RBE02-FR-004", name: "Rarity (FR)" },
            { code: "RBE02-FR-005", name: "Fluttershy (FR)" },
            { code: "RBE02-FR-006", name: "Applejack (FR)" },
            { code: "RBE02-FR-007", name: "Spike (FR)" },
            { code: "RBE02-FR-008", name: "Cherry Jubilee (FR)" },
            { code: "RBE02-FR-009", name: "Prince Blueblood (FR)" },
            { code: "RBE02-FR-010", name: "Matilda (FR)" },
            { code: "RBE02-FR-011", name: "Suri Polomare (FR)" },
            { code: "RBE02-FR-012", name: "Countess Coloratura (FR)" },
            { code: "RBE02-FR-013", name: "Bulk Biceps (FR)" },
            { code: "RBE02-FR-014", name: "Fancy Pants (FR)" },
            { code: "RBE02-FR-016", name: "Twist (FR)" },
            { code: "RBE02-FR-018", name: "Thunderlane (FR)" }
        ]
    },
    {
        rarity: "SR - SUPER RARE",
        level: 2,
        cards: [
            { code: "MLPME03-SR-001", name: "Twilight Sparkle (SR)" },
            { code: "MLPME03-SR-003", name: "Pinkie Pie (SR)" },
            { code: "MLPME03-SR-005", name: "Rainbow Dash (SR)" },
            { code: "MLPME03-SR-007", name: "Fluttershy (SR)" },
            { code: "MLPME03-SR-009", name: "Rarity (SR)" },
            { code: "MLPME03-SR-011", name: "Applejack (SR)" },
            { code: "MLPME03-SR-013", name: "Spike (SR)" },
            { code: "MLPME03-SR-014", name: "Muffins (Derpy) (SR)" },
            { code: "MLPME03-SR-015", name: "Mayor Mare (SR)" },
            { code: "MLPME03-SR-016", name: "Sweetie Belle (SR)" },
            { code: "MLPME03-SR-017", name: "Princess Luna (SR)" },
            { code: "MLPME03-SR-018", name: "Fluttershy & Discord (SR)" },
            { code: "MLPME03-SR-019", name: "Spitfire (SR)" },
            { code: "MLPME03-SR-020", name: "Babs Seed (SR)" }
        ]
    },
    {
        rarity: "R - RARE",
        level: 1,
        cards: [
            { code: "MLPME02-R-001", name: "Princess Twilight Sparkle (R)" },
            { code: "MLPME02-R-002", name: "Pinkie Pie (R)" },
            { code: "MLPME02-R-003", name: "Rainbow Dash (R)" },
            { code: "MLPME02-R-004", name: "Rarity (R)" },
            { code: "MLPME02-R-005", name: "Fluttershy (R)" },
            { code: "MLPME02-R-006", name: "Applejack (R)" },
            { code: "MLPME02-R-007", name: "Nurse Redheart (R)" },
            { code: "MLPME02-R-008", name: "Cozy Glow (R)" },
            { code: "MLPME02-R-009", name: "Toola Roola (R)" },
            { code: "MLPME02-R-010", name: "Coconut Cream (R)" },
            { code: "MLPME02-R-011", name: "Inky Rose (R)" },
            { code: "MLPME02-R-012", name: "Prince Blueblood (R)" },
            { code: "MLPME02-R-013", name: "Sunny Daze (R)" },
            { code: "MLPME02-R-014", name: "Peachy Pie (R)" },
            { code: "MLPME02-R-015", name: "Bulk Biceps (R)" },
            { code: "MLPME03-R-001", name: "Princess Twilight Sparkle Alt (R)" },
            { code: "MLPME03-R-002", name: "Pinkie Pie Alt (R)" },
            { code: "MLPME03-R-003", name: "Rainbow Dash Alt (R)" },
            { code: "MLPME03-R-004", name: "Rarity Alt (R)" },
            { code: "MLPME03-R-005", name: "Fluttershy Alt (R)" },
            { code: "MLPME03-R-006", name: "Applejack Alt (R)" },
            { code: "MLPME03-R-007", name: "Spike Alt (R)" },
            { code: "MLPME03-R-008", name: "Prim Hemline (R)" },
            { code: "MLPME03-R-009", name: "Hoity Toity (R)" },
            { code: "MLPME03-R-010", name: "Photo Finish (R)" },
            { code: "MLPME03-R-011", name: "Sapphire Shores (R)" },
            { code: "MLPME03-R-012", name: "Fancy Pants (R)" },
            { code: "MLPME03-R-013", name: "Svengallop (R)" },
            { code: "MLPME03-R-014", name: "Tree Hugger (R)" },
            { code: "MLPME03-R-015", name: "Sassy Saddles (R)" }
        ]
    },
    {
        rarity: "BASE - BASE CARDS",
        level: 1,
        cards: [
            { code: "RBE02-BASE-001", name: "Base Card 01" },
            { code: "RBE02-BASE-002", name: "Base Card 02" },
            { code: "RBE02-BASE-003", name: "Base Card 03" },
            { code: "RBE02-BASE-004", name: "Base Card 04" },
            { code: "RBE02-BASE-005", name: "Base Card 05" },
            { code: "RBE02-BASE-006", name: "Base Card 06" },
            { code: "RBE02-BASE-007", name: "Base Card 07" },
            { code: "RBE02-BASE-008", name: "Base Card 08" },
            { code: "RBE02-BASE-009", name: "Base Card 09" },
            { code: "RBE02-BASE-010", name: "Base Card 10" },
            { code: "RBE02-BASE-011", name: "Base Card 11" },
            { code: "RBE02-BASE-012", name: "Base Card 12" },
            { code: "RBE02-BASE-013", name: "Base Card 13" },
            { code: "RBE02-BASE-014", name: "Base Card 14" },
            { code: "RBE02-BASE-015", name: "Base Card 15" },
            { code: "RBE02-BASE-016", name: "Base Card 16" },
            { code: "RBE02-BASE-017", name: "Base Card 17" },
            { code: "RBE02-BASE-018", name: "Base Card 18" }
        ]
    },
    {
        rarity: "PR - PROMO CARDS",
        level: 3,
        cards: [
            { code: "MLPE-PR-007", name: "Fly to the Moon! (PR)" }
        ]
    }
];

// Render the static grid structure ONCE
function initGrid() {
    const container = document.getElementById("rarity-container");
    container.innerHTML = "";

    setList.forEach(group => {
        const section = document.createElement("section");
        section.className = "rarity-section";

        const title = document.createElement("h3");
        title.className = "rarity-title";
        title.innerHTML = `<span>${group.rarity}</span><span>${group.cards.length} Cards</span>`;
        section.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "card-grid";

        group.cards.forEach(card => {
            const cardEl = document.createElement("div");
            cardEl.className = "card-item";
            cardEl.id = `card-${card.code}`;
            cardEl.innerHTML = `
                <div class="card-code">${card.code}</div>
                <div class="card-name">${card.name}</div>
                <div class="counter-controls">
                    <button onclick="updateCount('${card.code}', -1)">-</button>
                    <span id="count-${card.code}">0</span>
                    <button onclick="updateCount('${card.code}', 1)">+</button>
                </div>
            `;
            grid.appendChild(cardEl);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });

    updateUI();
}

// Update only the counts and stats without wiping the DOM (fixes lag!)
function updateUI() {
    let totalUniqueOwned = 0;
    let totalCardsCount = 0;
    let totalDuplicates = 0;
    let highestRarity = "None";
    const totalSetCards = setList.reduce((acc, g) => acc + g.cards.length, 0);

    setList.forEach(group => {
        group.cards.forEach(card => {
            const count = collection[card.code] || 0;
            const cardEl = document.getElementById(`card-${card.code}`);
            const countSpan = document.getElementById(`count-${card.code}`);

            if (cardEl && countSpan) {
                countSpan.innerText = count;
                if (count > 0) {
                    cardEl.classList.add('owned');
                    totalUniqueOwned++;
                    totalCardsCount += count;
                    if (count > 1) totalDuplicates += (count - 1);
                    highestRarity = group.rarity.split(" - ")[0];
                } else {
                    cardEl.classList.remove('owned');
                }
            }
        });
    });

    document.getElementById("total-owned").innerText = totalUniqueOwned;
    document.getElementById("stat-total-cards").innerText = totalCardsCount;
    document.getElementById("stat-completion").innerText = ((totalUniqueOwned / totalSetCards) * 100).toFixed(1) + "%";
    document.getElementById("stat-highest-rarity").innerText = highestRarity;
    document.getElementById("stat-duplicates").innerText = totalDuplicates;
}

function renderCards() {
    updateUI();
}

function updateCount(code, amount) {
    socket.emit('update_card', { code, amount });

    const cardEl = document.getElementById(`card-${code}`);
    if (cardEl) {
        cardEl.classList.add("pulse-animation");
        setTimeout(() => cardEl.classList.remove("pulse-animation"), 800);
    }

    let matchedGroup = null;
    setList.forEach(group => {
        if (group.cards.some(c => c.code === code)) matchedGroup = group;
    });

    if (matchedGroup && matchedGroup.level >= 3 && amount > 0) {
        triggerConfetti();
        const matchedCard = matchedGroup.cards.find(c => c.code === code);
        if (matchedCard) sendDiscordNotification(matchedCard.name, matchedGroup.rarity);
    }
}

function setupInputListener() {
    const input = document.getElementById("code-input");
    const feedback = document.getElementById("feedback");

    input.addEventListener("input", (e) => {
        let typedCode = e.target.value.trim().toUpperCase();
        
        if (typedCode.endsWith("L4") || typedCode.endsWith("L1")) {
            typedCode = typedCode.slice(0, -2);
        }
        
        let matchedCard = null;
        let matchedGroup = null;

        setList.forEach(group => {
            const found = group.cards.find(c => c.code.toUpperCase() === typedCode);
            if (found) {
                matchedCard = found;
                matchedGroup = group;
            }
        });

        if (matchedCard) {
            updateCount(matchedCard.code, 1);

            const isHighRarity = matchedGroup.level >= 3;
            feedback.style.color = isHighRarity ? "#ffde59" : "#ffb3da";
            feedback.innerText = isHighRarity 
                ? `WOW! Unpacked HIGH RARITY (${matchedGroup.rarity.split(" - ")[0]}): ${matchedCard.name}!`
                : `Added: [${matchedCard.code}] ${matchedCard.name}`;
            
            input.value = ""; 

            const el = document.getElementById(`card-${matchedCard.code}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: 80 }, () => ({
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 12,
        size: Math.random() * 8 + 4,
        color: ['#ff66b2', '#ffde59', '#9b51e0', '#00e5ff', '#ffffff'][Math.floor(Math.random() * 5)]
    }));

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25; 
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        frame++;
        if (frame < 60) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
}

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1566414328465326110/HvrVriQa_c_U5Yt-u0fBfHUcrTzmnkxVOAqEifCqlad-NwH1Kq9yolli5ZbW57M16gGk";

function sendDiscordNotification(cardName, rarityName) {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes("YOUR_DISCORD_WEBHOOK_URL")) return;

    const payload = {
        content: `🎉 **HIGH RARITY PULL!** 🎉\nJust unpacked **[${rarityName}]** -> **${cardName}**!`
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).catch(error => console.error("Error sending webhook:", error));
}

function resetCounts() {
    if (confirm("Are you sure you want to clear your card counts?")) {
        socket.emit('reset_collection');
    }
}