// ===== 文思阁 前端脚本 =====

/* 1. 专题轮播：手动左右切换，无自动播放（契合 PRD 护眼/无动效要求） */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(n) {
    if (slides.length === 0) return;
    slides.forEach(item => item.classList.remove("active"));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
}
function prevSlide() {
    showSlide(slideIndex - 1);
}
function nextSlide() {
    showSlide(slideIndex + 1);
}

/* 2. 每日经典名句库 —— 直接在此增删文字即可 */
const sentenceList = [
    { text: "腹有诗书气自华，读书万卷始通神。", source: "苏轼" },
    { text: "学而不思则罔，思而不学则殆。", source: "《论语》" },
    { text: "路漫漫其修远兮，吾将上下而求索。", source: "屈原《离骚》" },
    { text: "见贤思齐焉，见不贤而内自省也。", source: "《论语》" },
    { text: "不积跬步，无以至千里；不积小流，无以成江海。", source: "《荀子·劝学》" },
    { text: "沉舟侧畔千帆过，病树前头万木春。", source: "刘禹锡" },
    { text: "天生我材必有用，千金散尽还复来。", source: "李白《将进酒》" },
    { text: "非淡泊无以明志，非宁静无以致远。", source: "诸葛亮《诫子书》" },
    { text: "海上生明月，天涯共此时。", source: "张九龄" },
    { text: "千磨万击还坚劲，任尔东西南北风。", source: "郑燮《竹石》" }
];

let currentSentence = -1;
function refreshSentence() {
    let rand;
    // 避免连续两次抽到同一句
    do {
        rand = Math.floor(Math.random() * sentenceList.length);
    } while (rand === currentSentence && sentenceList.length > 1);
    currentSentence = rand;
    const item = sentenceList[rand];
    const elText = document.getElementById("dailySentence");
    const elSource = document.getElementById("sentenceSource");
    if (elText) elText.innerText = item.text;
    if (elSource) elSource.innerText = "—— " + item.source;
}

/* 3. 条目点击展开/收起（表面文字框 → 弹出长文）
   - 点击卡片切换展开状态
   - 点击已展开的长文区域不收起，方便选中与阅读 */
function toggleEntry(el, e) {
    if (e && e.target.closest(".entry-detail")) return;
    el.classList.toggle("open");
}

/* 4. 初始化 */
window.addEventListener("DOMContentLoaded", function () {
    showSlide(0);
    refreshSentence();
});
