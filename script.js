// 遊戲核心邏輯

const GAME_TYPES = {
    BEEF: 'beef',
    PORK: 'pork',
    MUSHROOM: 'mushroom',
    PEPPER: 'pepper',
    BEEF_TONGUE: 'beef_tongue',
    A5_WAGYU_CUBE: 'a5_wagyu_cube',
    PRAWN: 'prawn',
    WAGYU_RIB: 'wagyu_rib',
    SCALLOP: 'scallop',
    IBERICO_PORK: 'iberico_pork',
    ZUCCHINI: 'zucchini',
    ANGUS_SHORT_RIB: 'angus_short_rib'
};

const INGREDIENTS = {
    [GAME_TYPES.BEEF]: {
        name: '頂級雪花牛', image: 'beef.png',
        times: { medium: 3000, perfect: 6000, burnt: 9000 },
        scores: { raw: -10, medium: 10, perfect: 50, burnt: -20 },
        messages: { raw: "太生了！", medium: "還可以再烤一下！", perfect: "完美！肉汁四溢！", burnt: "焦掉了啦！" }
    },
    [GAME_TYPES.PORK]: {
        name: '厚切五花肉', image: 'pork.png',
        times: { medium: 5000, perfect: 9000, burnt: 14000 },
        scores: { raw: -20, medium: 10, perfect: 60, burnt: -20 },
        messages: { raw: "豬肉要吃全熟！", medium: "再酥脆一點更好！", perfect: "外酥內軟！極品！", burnt: "硬得像石頭..." }
    },
    [GAME_TYPES.MUSHROOM]: {
        name: '鮮香菇', image: 'mushroom.png',
        times: { medium: 4000, perfect: 7000, burnt: 11000 },
        scores: { raw: -5, medium: 10, perfect: 30, burnt: -10 },
        messages: { raw: "只有生味...", medium: "出水了，快好了！", perfect: "鮮嫩多汁！", burnt: "變成香菇乾了..." }
    },
    [GAME_TYPES.PEPPER]: {
        name: '青椒', image: 'pepper.png',
        times: { medium: 2000, perfect: 4000, burnt: 7000 },
        scores: { raw: -5, medium: 10, perfect: 20, burnt: -10 },
        messages: { raw: "青椒味很重！", medium: "剛剛好！", perfect: "清脆爽口！", burnt: "黑漆漆的..." }
    },
    [GAME_TYPES.BEEF_TONGUE]: {
        name: '厚切牛舌', image: 'beef_tongue_png_1773470040714.png', needsFlip: true, flipTime: 3000, flipWindow: 3000,
        times: { medium: 5000, perfect: 8000, burnt: 12000 },
        scores: { raw: -15, medium: 20, perfect: 70, burnt: -30 },
        messages: { raw: "牛舌太生咬不斷", medium: "又脆又Q", perfect: "極致脆口，太美味了！", burnt: "像在咬輪胎..." }
    },
    [GAME_TYPES.A5_WAGYU_CUBE]: {
        name: 'A5和牛磚', image: 'a5_wagyu_cube_png_1773470054792.png', needsFlip: true, flipTime: 4000, flipWindow: 3500,
        times: { medium: 6000, perfect: 10000, burnt: 13000 },
        scores: { raw: -30, medium: 30, perfect: 100, burnt: -50 },
        messages: { raw: "血水還很多", medium: "油脂剛融化", perfect: "入口即化！神之手！", burnt: "暴殄天物啊！" }
    },
    [GAME_TYPES.PRAWN]: {
        name: '大草蝦', image: 'prawn_png_1773470072215.png',
        times: { medium: 4000, perfect: 8000, burnt: 12000 },
        scores: { raw: -10, medium: 15, perfect: 45, burnt: -15 },
        messages: { raw: "蝦肉還是透明的", medium: "快熟了", perfect: "Q彈鮮甜！", burnt: "蝦殼黏肉了" }
    },
    [GAME_TYPES.WAGYU_RIB]: {
        name: 'A5和牛肋條', image: 'wagyu_rib_png_1773470087905.png', needsFlip: true, flipTime: 4500, flipWindow: 3500,
        times: { medium: 7000, perfect: 11000, burnt: 15000 },
        scores: { raw: -20, medium: 25, perfect: 85, burnt: -40 },
        messages: { raw: "筋還很硬", medium: "越嚼越香", perfect: "油花與焦香的完美結合！", burnt: "變成木炭了" }
    },
    [GAME_TYPES.SCALLOP]: {
        name: '北海道大干貝', image: 'scallop_png_1773470099868.png',
        times: { medium: 3000, perfect: 6000, burnt: 9000 },
        scores: { raw: -15, medium: 20, perfect: 60, burnt: -25 },
        messages: { raw: "太生了", medium: "半生熟很剛好", perfect: "鮮甜無比！", burnt: "干貝縮水變硬啦" }
    },
    [GAME_TYPES.IBERICO_PORK]: {
        name: '伊比利梅花豬', image: 'iberico_pork_png_1773470116758.png',
        times: { medium: 4000, perfect: 8000, burnt: 13000 },
        scores: { raw: -15, medium: 15, perfect: 55, burnt: -20 },
        messages: { raw: "還沒熟", medium: "橡木果香氣出來了", perfect: "會流汁的豬肉！", burnt: "烤太乾了" }
    },
    [GAME_TYPES.ZUCCHINI]: {
        name: '櫛瓜', image: 'zucchini_png_1773470132815.png',
        times: { medium: 2500, perfect: 5000, burnt: 8000 },
        scores: { raw: -5, medium: 10, perfect: 25, burnt: -10 },
        messages: { raw: "硬邦邦", medium: "剛出水", perfect: "清甜解膩！", burnt: "烤爛了..." }
    },
    [GAME_TYPES.ANGUS_SHORT_RIB]: {
        name: '安格斯牛小排', image: 'angus_short_rib_png_1773470147218.png', needsFlip: true, flipTime: 3500, flipWindow: 3000,
        times: { medium: 5500, perfect: 9000, burnt: 12000 },
        scores: { raw: -15, medium: 20, perfect: 65, burnt: -30 },
        messages: { raw: "太生", medium: "肉汁湧現", perfect: "骨邊肉最美味！", burnt: "浪費好肉" }
    }
};

let currentScore = 0;
let selectedIngredient = null;
const grillCells = [];
let gameActive = false;
let currentLevel = 0;
let timeLeft = 0;
let gameTimer = null;
let currentOrder = [];
let soundEnabled = true;
let foodOnGrillCount = 0;

// 初始化遊戲
function init() {
    setupGrill();
    setupIngredientsPanel();
}

// 建立圓形烤網格子
function setupGrill() {
    const mesh = document.querySelector('.grill-mesh');
    mesh.innerHTML = '';
    const cols = 10;
    const rows = 10;
    const centerX = cols / 2;
    const centerY = rows / 2;
    const radius = 4.8; // 圓形範圍半徑

    for (let i = 0; i < cols * rows; i++) {
        const x = i % cols;
        const y = Math.floor(i / cols);
        
        const cell = document.createElement('div');
        cell.className = 'grill-cell';
        
        // 檢查是否在圓內
        const dist = Math.sqrt(Math.pow(x - centerX + 0.5, 2) + Math.pow(y - centerY + 0.5, 2));
        if (dist > radius) {
            cell.classList.add('invalid'); // 圓形外的格子隱藏且無法點擊
        } else {
            // Randomize temp
            const rand = Math.random();
            let temp = 'normal';
            if (rand < 0.2) temp = 'hot';
            else if (rand > 0.8) temp = 'low';
            
            if (temp !== 'normal') cell.classList.add(`temp-${temp}`);
            cell.addEventListener('click', () => onGrillClick(cell));
        }

        cell.dataset.index = i;
        mesh.appendChild(cell);
        grillCells.push({ element: cell, food: null, temp: cell.classList.contains('invalid') ? 'invalid' : (cell.classList.contains('temp-hot') ? 'hot' : (cell.classList.contains('temp-low') ? 'low' : 'normal')) });
    }
}

// 建立食材選擇面板
function setupIngredientsPanel() {
    const list = document.getElementById('ingredients-list');
    list.innerHTML = ''; // 清空原本的
    
    Object.values(GAME_TYPES).forEach(type => {
        const ing = INGREDIENTS[type];
        const btn = document.createElement('div');
        btn.className = 'ingredient-btn';
        btn.dataset.type = type;
        
        btn.innerHTML = `
            <div class="ingredient-icon" style="background-image: url('${ing.image}')"></div>
            <div class="ingredient-name">${ing.name}</div>
        `;
        
        btn.addEventListener('click', () => {
            if (!gameActive) return;
            document.querySelectorAll('.ingredient-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedIngredient = type;
            showMessage(`選取了 ${ing.name}，點擊烤網放置！`, '#f0f0f0');
        });
        
        list.appendChild(btn);
    });
}

// 關卡開始
window.startGame = function(level) {
    document.getElementById('start-screen').style.display = 'none';
    currentLevel = level;
    gameActive = true;
    currentScore = 0;
    document.getElementById('score').innerText = currentScore;
    
    // 清空烤網
    grillCells.forEach(cell => {
        if(cell.food) takeFood(cell, cell.element, true);
    });

    if (level === 1) {
        timeLeft = 60;
        document.getElementById('order-panel').style.display = 'none';
        showMessage('自由燒烤開始！目標 200 分！', '#ffd700');
    } else if (level === 2) {
        timeLeft = 90;
        setupOrder(8); // 增加變化，隨機選8個數量分配
        document.getElementById('order-panel').style.display = 'block';
        showMessage('客戶指定烤開始！請完成右側訂單！', '#ffd700');
    } else if (level === 3) {
        timeLeft = 120;
        setupOrder(12); // 進階關卡拉到12個訂單數量
        document.getElementById('order-panel').style.display = 'block';
        showMessage('終極燒烤開始！訂單要求【完美】熟度！', '#ffd700');
    }
    
    document.getElementById('abandon-btn').style.display = 'inline-block';
    updateTimerDisplay();
    // 確保不會有多個計時器
    if(gameTimer) clearInterval(gameTimer);
    gameTimer = setInterval(gameTick, 1000);
}

function gameTick() {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function updateTimerDisplay() {
    document.getElementById('time').innerText = timeLeft;
}

// 產生訂單 (Lv2, Lv3)
function setupOrder(itemCount) {
    currentOrder = [];
    const types = Object.values(GAME_TYPES);
    for (let i = 0; i < itemCount; i++) {
        const randType = types[Math.floor(Math.random() * types.length)];
        // 檢查是否已存在訂單中，有的話增加數量
        const existing = currentOrder.find(o => o.type === randType);
        if (existing) {
            existing.targetQty++;
        } else {
            currentOrder.push({ type: randType, targetQty: 1, currentQty: 0 });
        }
    }
    renderOrderList();
}

function renderOrderList() {
    const list = document.getElementById('order-list');
    list.innerHTML = '';
    currentOrder.forEach((order, index) => {
        const item = document.createElement('li');
        item.className = `order-item ${order.currentQty >= order.targetQty ? 'completed' : ''}`;
        item.innerHTML = `
            <div class="order-item-icon" style="background-image: url('${INGREDIENTS[order.type].image}')"></div>
            <span>${INGREDIENTS[order.type].name} x ${order.targetQty - order.currentQty}</span>
        `;
        list.appendChild(item);
    });
}

function checkOrderCompletion() {
    if (currentLevel < 2) return;
    const allCompleted = currentOrder.every(o => o.currentQty >= o.targetQty);
    if (allCompleted) {
        clearInterval(gameTimer);
        gameActive = false;
        alert(`算你有點本事！Level ${currentLevel} 勉強過關啦！\n總分: ${currentScore}\n別沾沾自喜，下次客人可沒這麼好對付！`);
        resetGameUI();
    }
}

function endGame() {
    clearInterval(gameTimer);
    gameActive = false;
    
    if (currentLevel === 1) {
        if (currentScore >= 200) {
            alert(`哼，才 ${currentScore} 分，勉強及格吧！別太得意，這種手藝還敢出來混？`);
        } else {
            alert(`時間到！才考了 ${currentScore} 分？\n目標 200 分都很難嗎？這種技術也想開店，還是回家抱棉被吧！`);
        }
    } else {
        alert(`時間到！連幾張單都搞不定，客人都氣跑了！\n總分: ${currentScore}\n技術這麼慘，趕快把店收一收，別丟人現眼了！`);
    }
    resetGameUI();
}

function resetGameUI() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('time').innerText = '--';
    document.getElementById('order-panel').style.display = 'none';
    document.getElementById('abandon-btn').style.display = 'none';
    
    // 清空烤網 (餐後清潔)
    grillCells.forEach(cell => {
        if(cell.food) takeFood(cell, cell.element, true);
    });
    
    showMessage('歡迎光臨！準備好請按開始！', '#4caf50');
}

// 放棄遊戲
window.abandonGame = function() {
    if(confirm("確定要放棄這次營業嗎？")) {
        clearInterval(gameTimer);
        gameActive = false;
        resetGameUI();
    }
}

// 播放與管理烤肉音效
function updateSizzleSound() {
    const audio = document.getElementById('sizzle-sound');
    if (!audio) return;
    
    if (foodOnGrillCount > 0 && soundEnabled && gameActive) {
        // 根據食材數量簡單調整音量 (最多不超過 1.0)
        audio.volume = Math.min(0.2 + (foodOnGrillCount * 0.15), 1.0);
        if (audio.paused) {
            audio.play().catch(e => console.log("Audio play blocked by browser:", e));
        }
    } else {
        audio.pause();
    }
}

window.toggleSound = function() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-btn');
    if (soundEnabled) {
        btn.innerText = '🔊 音效: 開';
        btn.classList.remove('muted');
    } else {
        btn.innerText = '🔇 音效: 關';
        btn.classList.add('muted');
    }
    updateSizzleSound();
}

// 處理烤網點擊
function onGrillClick(cell) {
    if (!gameActive) return;
    const cellData = grillCells[cell.dataset.index];

    if (cellData.food) {
        // 如果上面有食物
        if (cellData.food.needsFlipNow) {
            // 翻面邏輯
            flipFood(cellData.food);
        } else {
            // 拿起來
            takeFood(cellData, cell);
        }
    } else if (selectedIngredient) {
        // 放上食物
        putFood(cellData, cell);
    }
}

// 放置食物
function putFood(cellData, cell) {
    const type = selectedIngredient;
    const ing = INGREDIENTS[type];
    
    const foodEl = document.createElement('div');
    foodEl.className = 'food-item cooking status-raw';
    foodEl.style.backgroundImage = `url('${ing.image}')`;
    foodEl.dataset.foodType = type; // 用於 css 特調
    
    cell.appendChild(foodEl);
    
    const startTime = Date.now();
    let lastTime = startTime;
    let timerId;
    let smokeInterval;
    
    const foodObj = {
        type: type,
        element: foodEl,
        cookedTime: 0,
        status: 'raw', // raw, medium, perfect, burnt
        isFlipped: false,
        needsFlipNow: false,
        missedFlip: false
    };
    cellData.food = foodObj;

    // 煙霧特效
    smokeInterval = setInterval(() => {
        if(Math.random() > 0.5) createSmoke(cell);
    }, 1000);

    // 狀態更新迴圈
    const updateStatus = () => {
        if (!cellData.food) return; // 已經拿起來了
        if (!gameActive) {
            cellData.food.cleanup();
            return;
        }
        
        const now = Date.now();
        const dt = now - lastTime;
        lastTime = now;
        
        let mult = 1.0;
        if (cellData.temp === 'hot') mult = 1.8;
        if (cellData.temp === 'low') mult = 0.5;
        
        foodObj.cookedTime += dt * mult;
        
        // 處理翻面機制
        if (ing.needsFlip && !foodObj.isFlipped && !foodObj.missedFlip) {
            if (foodObj.cookedTime >= ing.flipTime && foodObj.cookedTime < ing.flipTime + ing.flipWindow) {
                if (!foodObj.needsFlipNow) {
                    foodObj.needsFlipNow = true;
                    showFlipPrompt(cell);
                }
            } else if (foodObj.cookedTime >= ing.flipTime + ing.flipWindow) {
                // 錯過翻面，直接燒焦
                foodObj.needsFlipNow = false;
                foodObj.missedFlip = true;
                removeFlipPrompt(cell);
                foodObj.cookedTime = ing.times.burnt; // 直接推進到燒焦時間
            }
        }

        if (foodObj.cookedTime >= ing.times.burnt) {
            foodObj.status = 'burnt';
            foodEl.className = 'food-item cooking status-burnt';
        } else if (foodObj.cookedTime >= ing.times.perfect) {
            foodObj.status = 'perfect';
            foodEl.className = 'food-item cooking status-perfect';
        } else if (foodObj.cookedTime >= ing.times.medium) {
            foodObj.status = 'medium';
            foodEl.className = 'food-item cooking status-medium';
        }

        timerId = requestAnimationFrame(updateStatus);
    };
    
    timerId = requestAnimationFrame(updateStatus);
    
    // 儲存清理函數
    foodObj.cleanup = () => {
        cancelAnimationFrame(timerId);
        clearInterval(smokeInterval);
        removeFlipPrompt(cell);
    };
    
    foodOnGrillCount++;
    updateSizzleSound();
}

// 翻面執行邏輯
function flipFood(foodObj) {
    foodObj.needsFlipNow = false;
    foodObj.isFlipped = true;
    removeFlipPrompt(foodObj.element.parentElement);
    
    // 視覺翻面特效 (新增 CSS 類別處理原本的旋轉特效與覆蓋問題)
    foodObj.element.classList.add('flipped');
    
    showMessage(`完美翻面！繼續烤滿分吧！`, '#ffd700');
    // 給予獎勵分
    currentScore += 10;
    document.getElementById('score').innerText = currentScore;
    showPointsPopup(foodObj.element.parentElement, 10);
}

function showFlipPrompt(cell) {
    let prompt = cell.querySelector('.flip-prompt');
    if (!prompt) {
        prompt = document.createElement('div');
        prompt.className = 'flip-prompt';
        prompt.innerText = '快翻面！';
        cell.appendChild(prompt);
    }
}

function removeFlipPrompt(cell) {
    if(!cell) return;
    const prompt = cell.querySelector('.flip-prompt');
    if (prompt) prompt.remove();
}

// 取下食物
function takeFood(cellData, cell, silent = false) {
    const food = cellData.food;
    food.cleanup(); // 停止狀態更新
    
    if (!silent) {
        const ing = INGREDIENTS[food.type];
        const status = food.status;
        let points = ing.scores[status];
        
        // 錯過翻面的懲罰
        if (ing.needsFlip && food.missedFlip) {
            points = ing.scores.burnt - 10; // 額外扣分
        }

        const msg = (ing.needsFlip && food.missedFlip) ? "忘記翻面，焦成炭了！" : ing.messages[status];
        
        // 更新分數
        currentScore += points;
        document.getElementById('score').innerText = currentScore;
        
        // 顯示訊息和飄字特效
        const msgColor = points > 0 ? (status === 'perfect' ? '#ffd700' : '#4caf50') : '#ff3333';
        showMessage(`${msg} (${points > 0 ? '+' : ''}${points}分)`, msgColor);
        showPointsPopup(cell, points);

        // 檢查訂單 (Lv2, Lv3)
        if (currentLevel >= 2) {
            const orderItem = currentOrder.find(o => o.type === food.type);
            if (orderItem && orderItem.currentQty < orderItem.targetQty) {
                // 判斷是否符合過關條件
                let isValid = false;
                if (currentLevel === 2 && (status === 'medium' || status === 'perfect')) isValid = true;
                if (currentLevel === 3 && status === 'perfect') isValid = true;

                if (isValid) {
                    orderItem.currentQty++;
                    renderOrderList();
                    checkOrderCompletion();
                } else if (!isValid && status !== 'raw') {
                    showMessage(`熟度不符合訂單要求！`, '#ff3333');
                }
            }
        }
    }
    
    // 移除元素
    cell.innerHTML = '';
    cellData.food = null;
    
    foodOnGrillCount--;
    updateSizzleSound();
}

function showMessage(msg, color) {
    const msgBoard = document.getElementById('message');
    msgBoard.innerText = msg;
    msgBoard.style.color = color;
}

function showPointsPopup(cell, points) {
    const rect = cell.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = `points-popup ${points > 0 ? 'points-good' : 'points-bad'}`;
    popup.innerText = points > 0 ? `+${points}` : points;
    
    // 相對於烤爐容器的位置
    const grillRect = document.querySelector('.grill-container').getBoundingClientRect();
    popup.style.left = `${rect.left - grillRect.left + rect.width / 2}px`;
    popup.style.top = `${rect.top - grillRect.top}px`;
    
    document.querySelector('.grill-container').appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 1000);
}

function createSmoke(cell) {
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    cell.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1000);
}

// 啟動遊戲
window.onload = init;
