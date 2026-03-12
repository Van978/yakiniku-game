// 遊戲核心邏輯

const GAME_TYPES = {
    BEEF: 'beef',
    PORK: 'pork',
    MUSHROOM: 'mushroom',
    PEPPER: 'pepper'
};

const INGREDIENTS = {
    [GAME_TYPES.BEEF]: {
        name: '頂級雪花牛',
        image: 'beef.png',
        color: '#ff4d4d', // 原始顏色
        times: { medium: 3000, perfect: 6000, burnt: 9000 }, // 毫秒
        scores: { raw: -10, medium: 10, perfect: 50, burnt: -20 },
        messages: { raw: "太生了！", medium: "還可以再烤一下！", perfect: "完美！肉汁四溢！", burnt: "焦掉了啦！" }
    },
    [GAME_TYPES.PORK]: {
        name: '厚切五花肉',
        image: 'pork.png',
        color: '#ffb3b3',
        times: { medium: 5000, perfect: 9000, burnt: 14000 },
        scores: { raw: -20, medium: 10, perfect: 60, burnt: -20 },
        messages: { raw: "豬肉要吃全熟！", medium: "再酥脆一點更好！", perfect: "外酥內軟！極品！", burnt: "硬得像石頭..." }
    },
    [GAME_TYPES.MUSHROOM]: {
        name: '鮮香菇',
        image: 'mushroom.png',
        color: '#e6ccb3',
        times: { medium: 4000, perfect: 7000, burnt: 11000 },
        scores: { raw: -5, medium: 10, perfect: 30, burnt: -10 },
        messages: { raw: "只有生味...", medium: "出水了，快好了！", perfect: "鮮嫩多汁！", burnt: "變成香菇乾了..." }
    },
    [GAME_TYPES.PEPPER]: {
        name: '青椒',
        image: 'pepper.png',
        color: '#4dff4d',
        times: { medium: 2000, perfect: 4000, burnt: 7000 },
        scores: { raw: -5, medium: 10, perfect: 20, burnt: -10 },
        messages: { raw: "青椒味很重！", medium: "剛剛好！", perfect: "清脆爽口！", burnt: "黑漆漆的..." }
    }
};

let currentScore = 0;
let selectedIngredient = null;
const grillCells = [];

// 初始化遊戲
function init() {
    setupGrill();
    setupIngredientsPanel();
}

// 建立烤網格子
function setupGrill() {
    const mesh = document.querySelector('.grill-mesh');
    const cols = 12;
    const rows = 7;

    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement('div');
        cell.className = 'grill-cell';
        
        // Randomize temp
        const rand = Math.random();
        let temp = 'normal';
        if (rand < 0.2) temp = 'hot';
        else if (rand > 0.8) temp = 'low';
        
        if (temp !== 'normal') cell.classList.add(`temp-${temp}`);
        
        cell.dataset.index = i;
        cell.addEventListener('click', () => onGrillClick(cell));
        mesh.appendChild(cell);
        grillCells.push({ element: cell, food: null, temp: temp });
    }
}

// 建立食材選擇面板
function setupIngredientsPanel() {
    const list = document.getElementById('ingredients-list');
    
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
            document.querySelectorAll('.ingredient-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedIngredient = type;
            showMessage(`選擇了 ${ing.name}，點擊烤網放置！`, '#f0f0f0');
        });
        
        list.appendChild(btn);
    });
}

// 處理烤網點擊
function onGrillClick(cell) {
    const cellData = grillCells[cell.dataset.index];

    if (cellData.food) {
        // 如果上面有食物，拿起來
        takeFood(cellData, cell);
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
    
    cell.appendChild(foodEl);
    
    const startTime = Date.now();
    let lastTime = startTime;
    let timerId;
    let smokeInterval;
    
    const foodObj = {
        type: type,
        element: foodEl,
        cookedTime: 0,
        status: 'raw' // raw, medium, perfect, burnt
    };
    cellData.food = foodObj;

    // 煙霧特效
    smokeInterval = setInterval(() => {
        if(Math.random() > 0.5) createSmoke(cell);
    }, 1000);

    // 狀態更新迴圈
    const updateStatus = () => {
        if (!cellData.food) return; // 已經拿起來了
        
        const now = Date.now();
        const dt = now - lastTime;
        lastTime = now;
        
        let mult = 1.0;
        if (cellData.temp === 'hot') mult = 1.8;
        if (cellData.temp === 'low') mult = 0.5;
        
        foodObj.cookedTime += dt * mult;
        
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
    };
}

// 取下食物
function takeFood(cellData, cell) {
    const food = cellData.food;
    food.cleanup(); // 停止狀態更新
    
    const ing = INGREDIENTS[food.type];
    const status = food.status;
    const points = ing.scores[status];
    const msg = ing.messages[status];
    
    // 更新分數
    currentScore += points;
    document.getElementById('score').innerText = currentScore;
    
    // 顯示訊息和飄字特效
    const msgColor = points > 0 ? (status === 'perfect' ? '#ffd700' : '#4caf50') : '#ff3333';
    showMessage(`${msg} (${points > 0 ? '+' : ''}${points}分)`, msgColor);
    showPointsPopup(cell, points);
    
    // 移除元素
    cell.innerHTML = '';
    cellData.food = null;
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
