// --- データ配列群 ---
const nationalities = ['日本', 'アメリカ', 'イギリス', 'フランス', 'ドイツ', '中国', 'イタリア', 'カナダ', '無国籍・不明', '日本（ハーフ）'];
const hairColors = ['黒髪', '金髪', '銀髪/白髪', '茶髪', '赤髪', 'インナーカラー', '派手髪（青/紫など）', 'アッシュグレー', 'グラデーション'];
const eyeColors = ['黒目/暗転', '青眼', '赤眼', '金眼/黄眼', '緑眼', 'オッドアイ', 'ヘーゼル', '紫眼', 'ジト目'];

const mustSkills = [
  '目星', '聞き耳', '図書館', '心理学', '医学', '応急手当', 
  'オカルト', '精神分析', '回避', 'キック', 'こぶし', '隠れる', 
  '忍び歩き', '説得', '言いくるめ', '鍵開け', '運転', '機械修理',
  '武道/マーシャルアーツ', '芸術/製作', 'ほかの言語'
];

const emotions = [
  '後悔', '楽観', '焦燥', '執着', '虚無', '復讐心', '罪悪感', 
  '自己犠牲', '好奇心', '冷笑', '依存', '正義感', '諦念', '愛憎', '承認欲求'
];

const firstPersons = ['私（わたし）', '僕（ぼく）', '俺（おれ）', '自分', '当方', '私（わたくし）', '小生'];
const tones = ['敬語・丁寧', 'タメ口・フランク', '丁寧だが毒舌', '粗暴・口が悪い', '淡々・無感情', '～使い（お嬢様/古風など）', 'おどおど・不審'];

const hos = ['HO1', 'HO2', 'HO3', 'HO4'];

// --- 配列からランダムで1つ取得する関数 ---
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// --- ダイス計算関数 (例: 3d6, 2d6+6) ---
function rollDice(diceCount, fixedAdd = 0) {
  let sum = 0;
  for (let i = 0; i < diceCount; i++) {
    sum += Math.floor(Math.random() * 6) + 1;
  }
  return sum + fixedAdd;
}

// --- ボタンクリック時の生成処理 ---
document.getElementById('generateBtn').addEventListener('click', () => {
  // 外見・ルーツ
  document.getElementById('nationality').textContent = getRandomItem(nationalities);
  document.getElementById('hairColor').textContent = getRandomItem(hairColors);
  document.getElementById('eyeColor').textContent = getRandomItem(eyeColors);
  
  // 指定条件
  document.getElementById('hoNumber').textContent = getRandomItem(hos);
  document.getElementById('mustSkill').textContent = getRandomItem(mustSkills);
  document.getElementById('emotion').textContent = getRandomItem(emotions);

  // フレーバー
  document.getElementById('firstPerson').textContent = getRandomItem(firstPersons);
  document.getElementById('tone').textContent = getRandomItem(tones);

  // 能力値 (CoC 6版基準)
  const stats = {
    'STR': rollDice(3),
    'CON': rollDice(3),
    'POW': rollDice(3),
    'DEX': rollDice(3),
    'APP': rollDice(3),
    'SIZ': rollDice(2, 6),
    'INT': rollDice(2, 6),
    'EDU': rollDice(3, 3)
  };

  // ステータス表示の生成
  const statusGrid = document.getElementById('statusGrid');
  statusGrid.innerHTML = '';
  for (const [key, value] of Object.entries(stats)) {
    const item = document.createElement('div');
    item.className = 'status-item';
    item.innerHTML = `<span>${key}</span><strong>${value}</strong>`;
    statusGrid.appendChild(item);
  }

  // カードを表示する
  document.getElementById('resultCard').classList.remove('hidden');
});

// --- シェア用テキスト作成関数 ---
function generateShareText() {
  const nationality = document.getElementById('nationality').textContent;
  const hairColor = document.getElementById('hairColor').textContent;
  const eyeColor = document.getElementById('eyeColor').textContent;
  const hoNumber = document.getElementById('hoNumber').textContent;
  const mustSkill = document.getElementById('mustSkill').textContent;
  const emotion = document.getElementById('emotion').textContent;
  const firstPerson = document.getElementById('firstPerson').textContent;
  const tone = document.getElementById('tone').textContent;

  return `【探索者お題メーカー】
👤外見：${nationality} / ${hairColor} / ${eyeColor}
⚠️指定：${hoNumber} / 必修:『${mustSkill}』 / 感情:【${emotion}】
💬口調：一人称「${firstPerson}」/ ${tone}

#探索者お題メーカー #TRPG`;
}

// --- クリップボードにコピー ---
document.getElementById('copyBtn').addEventListener('click', () => {
  const text = generateShareText();
  navigator.clipboard.writeText(text).then(() => {
    alert('結果をクリップボードにコピーしました！');
  });
});

// --- X（Twitter）で共有 ---
document.getElementById('shareXBtn').addEventListener('click', () => {
  const text = generateShareText();
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});
