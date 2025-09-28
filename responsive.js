// ==================== Responsive JS ====================
function adjustResponsiveElements() {
  // Canvas
  const canvas = document.getElementById("confetti");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Sky or background canvas if exists
  const skyCanvas = document.getElementById("skyCanvas");
  if (skyCanvas) {
    skyCanvas.width = window.innerWidth;
    skyCanvas.height = window.innerHeight;
  }

  // Emoji or floating elements
  const emojiContainer = document.querySelector(".emoji-container");
  if (emojiContainer) {
    emojiContainer.style.width = window.innerWidth + "px";
    emojiContainer.style.height = window.innerHeight + "px";
  }

  // Lantern container
  const lanternContainer = document.querySelector(".lantern-container");
  if (lanternContainer) {
    lanternContainer.style.width = window.innerWidth + "px";
    lanternContainer.style.height = window.innerHeight + "px";
  }

  // Cards, messages, or main elements
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    if (window.innerWidth < 768) {
      card.style.transform = "scale(0.8)";
      card.style.margin = "10px auto";
    } else {
      card.style.transform = "scale(1)";
      card.style.margin = "20px auto";
    }
  });

  // Score Board or top elements
  const scoreBoard = document.getElementById('scoreBoard');
  if (scoreBoard) {
    scoreBoard.style.top = window.innerWidth < 768 ? '10px' : '20px';
    scoreBoard.style.right = window.innerWidth < 768 ? '10px' : '20px';
    scoreBoard.style.fontSize = window.innerWidth < 768 ? '14px' : '18px';
  }

  // Music / control buttons
  const musicBtns = document.querySelectorAll(".music-btn");
  musicBtns.forEach(btn => {
    btn.style.top = window.innerWidth < 768 ? '10px' : '20px';
    btn.style.right = window.innerWidth < 768 ? '10px' : '20px';
    btn.style.padding = window.innerWidth < 768 ? '6px 10px' : '10px 15px';
  });
}

// Initial call
adjustResponsiveElements();

// Call on window resize
window.addEventListener('resize', adjustResponsiveElements);
