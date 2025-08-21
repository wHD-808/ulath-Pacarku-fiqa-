/* CONFIG - teks pertanyaan */
const questionTexts = [
  "Ciee ada yg lagi ultah 🎂",
  "Coba deh kamu berdoa ✨",
  "Amminnn, udah dibantu tuh 🙏",
  "Panjang umur ya sayangkuu ❤️",
  "Sehat selalu, I love youuu 💕"
];

/* ===== init elements ===== */
const slidesEl = document.getElementById('slides');
const slides = Array.from(document.querySelectorAll('.slide'));
const slidesCount = slides.length;
const questionArea = document.getElementById('questionArea');
const startBtn = document.getElementById('startBtn');
const introScreen = document.getElementById('introScreen');
const bgMusic = document.getElementById('bgMusic');
const video = document.getElementById('ucapanVideo');

let current = 0;

/* show slide by index */
function showSlide(i){
  if (i < 0) i = 0;
  if (i >= slidesCount) i = slidesCount - 1;
  slidesEl.style.transform = `translateX(${ -i * 100 }vw)`;
  current = i;
  renderQuestionButton(i);
}

/* render question button */
function renderQuestionButton(i){
  questionArea.innerHTML = '';
  if (i >= slidesCount - 1) {
    // slide terakhir (video)
    if (!bgMusic.paused){
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
    if (video){
      try { video.requestFullscreen?.(); } catch(e){}
      video.play().catch(()=>{/* ignore */});
    }
    return;
  }

  const qText = questionTexts[i] ?? 'AWAS BOOM';
  const lanjutBtn = document.createElement('button');
  lanjutBtn.className = 'questionBtn';
  lanjutBtn.textContent = qText;
  lanjutBtn.addEventListener('click', () => {
    showSlide(i + 1);
  });
  questionArea.appendChild(lanjutBtn);
}

/* start button handler */
startBtn.addEventListener('click', () => {
  introScreen.classList.add('hidden');
  bgMusic.play().catch(()=>{/* ignore if blocked */});
  showSlide(0);
});

/* ===== particle background: Love rain ===== */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = innerWidth; canvas.height = innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

const hearts = [];
for (let i=0;i<60;i++){
  hearts.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*18 + 8,
    vy: Math.random()*1 + 0.6,
    alpha: Math.random()*0.5 + 0.5
  });
}

function drawHeart(x,y,size,alpha){
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(size/20, size/20);
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.bezierCurveTo(-10,-10,-20,10,0,20);
  ctx.bezierCurveTo(20,10,10,-10,0,0);
  ctx.closePath();
  ctx.fillStyle = `rgba(255,100,150,${alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h => {
    h.y += h.vy;
    if (h.y > canvas.height+20){
      h.y = -20;
      h.x = Math.random()*canvas.width;
    }
    drawHeart(h.x,h.y,h.size,h.alpha);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
