
    /* ============ Existing Confetti, Hearts, Typewriter, Age, Surprise code =========== */
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettiPieces = [];
    for (let i = 0; i < 150; i++) {
      confettiPieces.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height, r: Math.random() * 6 + 4, d: Math.random() * 10 + 10, color: `hsl(${Math.random() * 360},100%,50%)`, tilt: Math.random() * 10 - 10 });
    }
    function drawConfetti() { ctx.clearRect(0, 0, canvas.width, canvas.height); confettiPieces.forEach(p => { ctx.beginPath(); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.r, p.r); }); updateConfetti(); }
    function updateConfetti() { confettiPieces.forEach(p => { p.y += p.d / 15; p.x += Math.sin(p.y / 20); if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; } }); }
    function loop() { drawConfetti(); requestAnimationFrame(loop); }
    loop();

    /* Floating Hearts */
    const heartContainer = document.getElementById("hearts-container");
    function createHeart() { const heart = document.createElement("div"); heart.classList.add("heart"); heart.style.left = Math.random() * window.innerWidth + "px"; heart.style.bottom = "-50px"; heart.innerText = "💖"; heartContainer.appendChild(heart); setTimeout(() => heart.remove(), 6000); }
    setInterval(createHeart, 800);

    /* Typewriter Message */
    const msg = `Tumhari muskaan humesha bani rahe,
Har subah naye sapne laaye,
Har raat khushiyon se bhari ho.
Dosti ka yeh rishta aise hi chamakta rahe.
Love you to the moon and back! 💖`;
    let i = 0;
    function type() {
      if (i < msg.length) {
        const wish = document.getElementById("wish");
        const char = msg.charAt(i);
        wish.innerHTML += char === "\n" ? "<br>" : char;
        if (Math.random() < 0.35) {
          const spark = document.createElement("span");
          spark.innerText = ["✨", "🎉", "💖", "🎂", "🎁"][Math.floor(Math.random() * 5)];
          spark.style.position = "absolute";
          spark.style.left = (Math.random() * 250) + "px";
          spark.style.top = (Math.random() * 130) + "px";
          wish.appendChild(spark);
          setTimeout(() => spark.remove(), 600);
        }
        i++;
        setTimeout(type, 50);
      }
    }
    type();

    /* Age Counter */
    let age = 0;
    const ageEl = document.getElementById('age');
    const targetAge = 19;
    const ageInterval = setInterval(() => { if (age < targetAge) { age++; ageEl.innerText = `🎉 ${age} 🎉`; } else { clearInterval(ageInterval); } }, 100);

    /* Surprise */
    function showSurprise() {
      document.getElementById('secret').style.display = 'block';
      burstConfetti();
      launchFireworks();
      const rect = document.getElementById('surprise-btn').getBoundingClientRect();
      heartFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    /* Confetti Burst */
    function burstConfetti() { for (let i = 0; i < 200; i++) { confettiPieces.push({ x: Math.random() * canvas.width, y: canvas.height, r: Math.random() * 8 + 4, d: Math.random() * 15 + 5, color: `hsl(${Math.random() * 360},100%,50%)`, tilt: Math.random() * 10 - 10, opacity: 0.6 }); } }

    /* Layered Fireworks */
    function launchFireworks() { for (let i = 0; i < 70; i++) { confettiPieces.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height / 2, r: Math.random() * 6 + 4, d: Math.random() * 15 + 5, color: `hsl(${Math.random() * 360},100%,50%)`, tilt: Math.random() * 20 - 10, opacity: 0.5 }); } }

    /* Heart Fireworks */
    const fireworkSound = new Audio("firework.mp3");
    function playFireworkSound() { fireworkSound.currentTime = 0; fireworkSound.play(); }
    function heartFireworks(x, y) {
      for (let i = 0; i < 20; i++) {
        const conf = document.createElement("div");
        conf.style.position = "absolute";
        conf.style.left = x + "px";
        conf.style.top = y + "px";
        conf.style.fontSize = "20px";
        conf.style.color = `hsl(${Math.random() * 360},100%,50%)`;
        conf.innerText = "❤️";
        conf.style.opacity = 1;
        conf.style.pointerEvents = "none";
        document.body.appendChild(conf);
        let angle = (i / 20) * Math.PI * 2;
        let radius = 0;
        const anim = setInterval(() => {
          radius += 4;
          conf.style.left = x + radius * Math.cos(angle) + "px";
          conf.style.top = y + radius * Math.sin(angle) + "px";
          conf.style.opacity -= 0.05;
          if (conf.style.opacity <= 0) { clearInterval(anim); conf.remove(); }
        }, 30);
      }
      playFireworkSound();
    }

    /* Balloon Pop */
    const balloonPopSound = new Audio("pop.mp3");
    document.querySelectorAll('.balloon').forEach(balloon => { balloon.addEventListener('click', () => { balloon.style.transform = "scale(0) rotate(720deg)"; balloon.style.transition = "transform 0.6s ease"; balloonPopSound.currentTime = 0; balloonPopSound.play(); setTimeout(() => balloon.style.transform = "", 600); }); });

    /* Emoji Trail */
    function createEmojiTrail(x, y, emoji) { const trail = document.createElement("div"); trail.innerText = emoji; trail.style.position = "absolute"; trail.style.left = x + "px"; trail.style.top = y + "px"; trail.style.fontSize = "18px"; trail.style.opacity = 1; trail.style.pointerEvents = "none"; trail.style.zIndex = 3; document.body.appendChild(trail); let pos = 0; const anim = setInterval(() => { trail.style.top = y - pos + "px"; trail.style.opacity -= 0.03; pos += 2; if (trail.style.opacity <= 0) { clearInterval(anim); trail.remove(); } }, 20); }
    document.querySelector('.card').addEventListener('mousemove', (e) => { if (Math.random() < 0.3) { createEmojiTrail(e.clientX, e.clientY, ["✨", "🎂", "🎉", "💖", "🎁"][Math.floor(Math.random() * 5)]); } });

    /* Floating text particles */
    function floatTextParticles() { const msgText = document.getElementById("wish").innerText; for (let i = 0; i < 5; i++) { const char = document.createElement("div"); char.innerText = msgText.charAt(Math.floor(Math.random() * msgText.length)); char.style.position = "absolute"; char.style.left = Math.random() * window.innerWidth + "px"; char.style.top = window.innerHeight + "px"; char.style.fontSize = "18px"; char.style.color = `hsl(${Math.random() * 360},100%,50%)`; char.style.opacity = 1; char.style.pointerEvents = "none"; document.body.appendChild(char); let pos = 0; const anim = setInterval(() => { pos += 2; char.style.top = window.innerHeight - pos + "px"; char.style.opacity -= 0.02; if (char.style.opacity <= 0) { clearInterval(anim); char.remove(); } }, 30); } }
    setInterval(floatTextParticles, 800);

    /* Mouse Parallax */
    document.addEventListener('mousemove', (e) => {
      const card = document.querySelector('.card');
      let x = (window.innerWidth / 2 - e.clientX) / 50;
      let y = (window.innerHeight / 2 - e.clientY) / 50;
      card.style.transform = `rotateY(${x * 1.2}deg) rotateX(${y * 1.2}deg) scale(1.05)`;
      document.querySelectorAll('.balloon').forEach((b, i) => { b.style.transform = `translateX(${i * 10}px) rotate(${x * 5}deg) rotateX(${y * 5}deg)`; });
      document.querySelectorAll('.floating-gif').forEach((f, i) => { f.style.transform = `translateX(${x * 5}px) translateY(${y * 5}px)`; });
    });

    /* ================= New Enhancements ================= */

    /* Multiple Candle Flames */
    const candleFlames = [];
    for (let j = 0; j < 3; j++) {
      const flame = document.createElement("div");
      flame.classList.add("candle-flame");
      flame.style.left = `${45 + j * 12}px`;
      flame.style.bottom = "65px";
      document.body.appendChild(flame);
      candleFlames.push(flame);
    }
    setInterval(() => {
      candleFlames.forEach(f => {
        const scale = 1 + Math.random() * 0.4;
        const translateY = Math.random() * -2;
        f.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        f.style.opacity = 0.7 + Math.random() * 0.3;
      });
    }, 150);

    /* Fireworks Anywhere */
    document.body.addEventListener("click", (e) => {
      for (let i = 0; i < 30; i++) {
        confettiPieces.push({ x: e.clientX, y: e.clientY, r: Math.random() * 6 + 2, d: Math.random() * 8 + 2, color: `hsl(${Math.random() * 360},100%,50%)`, tilt: Math.random() * 10 - 10, opacity: 0.5 });
      }
    });

    /* Music Controls */
    const audio = document.querySelector("audio");
    const musicBtn = document.createElement("button");
    musicBtn.innerText = "🔊 Play/Pause";
    musicBtn.style.position = "fixed";
    musicBtn.style.top = "20px";
    musicBtn.style.right = "20px";
    musicBtn.style.padding = "10px 15px";
    musicBtn.style.zIndex = 5;
    musicBtn.style.borderRadius = "10px";
    musicBtn.style.border = "none";
    musicBtn.style.background = "linear-gradient(90deg,#ff6b6b,#ffd166,#6bc1ff,#a1ff6b)";
    musicBtn.style.color = "#fff";
    musicBtn.style.cursor = "pointer";
    musicBtn.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.3)";
    document.body.appendChild(musicBtn);
    musicBtn.addEventListener("click", () => { if (audio.paused) audio.play(); else audio.pause(); });

    /* Floating Sparkle Trail Following Cursor */
    document.body.addEventListener("mousemove", (e) => {
      if (Math.random() < 0.2) {
        const sparkle = document.createElement("div");
        sparkle.innerText = ["✨", "💖", "🎉"][Math.floor(Math.random() * 3)];
        sparkle.style.position = "absolute";
        sparkle.style.left = e.clientX + "px";
        sparkle.style.top = e.clientY + "px";
        sparkle.style.fontSize = "16px";
        sparkle.style.opacity = 1;
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = 4;
        document.body.appendChild(sparkle);
        let move = 0;
        const anim = setInterval(() => {
          move += 2;
          sparkle.style.top = e.clientY - move + "px";
          sparkle.style.opacity -= 0.03;
          if (sparkle.style.opacity <= 0) { clearInterval(anim); sparkle.remove(); }
        }, 20);
      }
    });

    /* Extra Parallax Enhancements */
    document.addEventListener('mousemove', (e) => {
      const card = document.querySelector('.card');
      let x = (window.innerWidth / 2 - e.clientX) / 60;
      let y = (window.innerHeight / 2 - e.clientY) / 60;
      card.style.transform = `rotateY(${x * 1.5}deg) rotateX(${y * 1.5}deg) scale(1.05)`;
      document.querySelectorAll('.balloon').forEach((b, i) => { b.style.transform = `translateX(${i * 8 + x * 8}px) rotate(${x * 8}deg) rotateX(${y * 8}deg)`; });
      document.querySelectorAll('.floating-gif').forEach((f, i) => { f.style.transform = `translateX(${x * 6}px) translateY(${y * 6}px)`; });
    });

    /* Random Shooting Stars */
    function createShootingStar() {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = "3px";
      star.style.height = "3px";
      star.style.background = "white";
      star.style.position = "absolute";
      star.style.left = Math.random() * window.innerWidth + "px";
      star.style.top = "-5px";
      star.style.opacity = 0.8;
      star.style.pointerEvents = "none";
      star.style.zIndex = 0;
      document.body.appendChild(star);
      let top = 0;
      const anim = setInterval(() => {
        top += 8;
        star.style.left = parseFloat(star.style.left) + 4 + "px";
        star.style.top = top + "px";
        star.style.opacity -= 0.03;
        if (star.style.opacity <= 0) { clearInterval(anim); star.remove(); }
      }, 30);
    }
    setInterval(() => { if (Math.random() < 0.3) createShootingStar(); }, 1000);
    /* ================= Magical Night Sky + Interactive Fireworks ================= */

    // Create night sky overlay
    const skyCanvas = document.createElement('canvas');
    skyCanvas.id = "skyCanvas";
    skyCanvas.style.position = 'absolute';
    skyCanvas.style.top = 0;
    skyCanvas.style.left = 0;
    skyCanvas.style.width = '100%';
    skyCanvas.style.height = '100%';
    skyCanvas.style.pointerEvents = 'none';
    skyCanvas.style.zIndex = 0;
    document.body.appendChild(skyCanvas);

    const skyCtx = skyCanvas.getContext('2d');
    skyCanvas.width = window.innerWidth;
    skyCanvas.height = window.innerHeight;

    let stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * skyCanvas.width,
        y: Math.random() * skyCanvas.height,
        size: Math.random() * 2,
        alpha: Math.random()
      });
    }

    // Draw stars
    function drawStars() {
      skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
      skyCtx.fillStyle = 'black';
      skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);

      stars.forEach(star => {
        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha > 1) star.alpha = 1;
        if (star.alpha < 0) star.alpha = 0;
        skyCtx.globalAlpha = star.alpha;
        skyCtx.fillStyle = 'white';
        skyCtx.beginPath();
        skyCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        skyCtx.fill();
      });
      skyCtx.globalAlpha = 1;
    }

    // Shooting stars
    function createShootingStar() {
      let x = Math.random() * skyCanvas.width * 0.8;
      let y = Math.random() * skyCanvas.height * 0.5;
      let length = 150;
      let speed = 10;

      function shoot() {
        skyCtx.strokeStyle = 'white';
        skyCtx.lineWidth = 2;
        skyCtx.beginPath();
        skyCtx.moveTo(x, y);
        skyCtx.lineTo(x + length, y + length * 0.3);
        skyCtx.stroke();
        x += speed;
        y += speed * 0.3;
        length *= 0.95;
        if (length > 0) requestAnimationFrame(shoot);
      }
      shoot();
    }

    // Fireworks on click
    document.body.addEventListener('click', (e) => {
      let particles = [];
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 2,
          radius: Math.random() * 4 + 2,
          color: `hsl(${Math.random() * 360},100%,50%)`,
          alpha: 1
        });
      }

      function explode() {
        skyCtx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
        drawStars();
        particles.forEach(p => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.alpha -= 0.03;
          skyCtx.globalAlpha = p.alpha;
          skyCtx.fillStyle = p.color;
          skyCtx.beginPath();
          skyCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          skyCtx.fill();
        });
        skyCtx.globalAlpha = 1;
        particles = particles.filter(p => p.alpha > 0);
        if (particles.length > 0) requestAnimationFrame(explode);
      }
      explode();
    });

    // Animate stars
    function animateSky() {
      drawStars();
      if (Math.random() < 0.02) createShootingStar();
      requestAnimationFrame(animateSky);
    }
    animateSky();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
      skyCanvas.width = window.innerWidth;
      skyCanvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * skyCanvas.width,
          y: Math.random() * skyCanvas.height,
          size: Math.random() * 2,
          alpha: Math.random()
        });
      }
    });
    /* ================= Floating Lanterns Effect ================= */

    const lanternContainer = document.createElement('div');
    lanternContainer.style.position = 'absolute';
    lanternContainer.style.top = 0;
    lanternContainer.style.left = 0;
    lanternContainer.style.width = '100%';
    lanternContainer.style.height = '100%';
    lanternContainer.style.pointerEvents = 'none';
    lanternContainer.style.zIndex = 0;
    document.body.appendChild(lanternContainer);

    function createLantern() {
      const lantern = document.createElement('div');
      lantern.innerHTML = '🏮'; // Lantern emoji
      lantern.style.position = 'absolute';
      lantern.style.fontSize = `${20 + Math.random() * 30}px`;
      lantern.style.left = `${Math.random() * window.innerWidth}px`;
      lantern.style.bottom = `-50px`;
      lantern.style.opacity = 0.8 + Math.random() * 0.2;
      lantern.style.pointerEvents = 'none';
      lanternContainer.appendChild(lantern);

      let posY = -50;
      let sway = Math.random() * 50; // horizontal sway amount
      let swayDirection = Math.random() < 0.5 ? 1 : -1;
      let swaySpeed = 0.5 + Math.random(); // sway speed

      const anim = setInterval(() => {
        posY += 1 + Math.random(); // vertical speed
        lantern.style.bottom = `${posY}px`;
        lantern.style.left = `${parseFloat(lantern.style.left) + swayDirection * swaySpeed}px`;
        sway -= swaySpeed;
        if (sway <= 0) swayDirection *= -1; // reverse sway
        if (posY > window.innerHeight + 50) {
          clearInterval(anim);
          lantern.remove();
        }
      }, 30);
    }

    // Create lanterns at intervals
    setInterval(() => {
      if (Math.random() < 0.4) createLantern();
    }, 800);

    // Adjust lanterns on window resize
    window.addEventListener('resize', () => {
      // Nothing needs reset; new lanterns will adapt
    });
    /* ================= Floating Fireflies Effect ================= */

    const fireflyContainer = document.createElement('div');
    fireflyContainer.style.position = 'absolute';
    fireflyContainer.style.top = 0;
    fireflyContainer.style.left = 0;
    fireflyContainer.style.width = '100%';
    fireflyContainer.style.height = '100%';
    fireflyContainer.style.pointerEvents = 'none';
    fireflyContainer.style.zIndex = 0;
    document.body.appendChild(fireflyContainer);

    function createFirefly() {
      const firefly = document.createElement('div');
      firefly.innerText = '✨';
      firefly.style.position = 'absolute';
      firefly.style.fontSize = `${10 + Math.random() * 15}px`;
      firefly.style.left = `${Math.random() * window.innerWidth}px`;
      firefly.style.top = `${Math.random() * window.innerHeight}px`;
      firefly.style.opacity = 0.5 + Math.random() * 0.5;
      firefly.style.pointerEvents = 'none';
      fireflyContainer.appendChild(firefly);

      let dx = (Math.random() - 0.5) * 2; // horizontal movement
      let dy = (Math.random() - 0.5) * 2; // vertical movement

      const anim = setInterval(() => {
        let x = parseFloat(firefly.style.left);
        let y = parseFloat(firefly.style.top);

        // Move firefly
        x += dx;
        y += dy;

        // Bounce off edges
        if (x < 0 || x > window.innerWidth) dx *= -1;
        if (y < 0 || y > window.innerHeight) dy *= -1;

        firefly.style.left = `${x}px`;
        firefly.style.top = `${y}px`;

        // Fading trail effect
        firefly.style.opacity = 0.5 + 0.5 * Math.sin(Date.now() / 500 + x);

      }, 30);

      // Remove firefly after 20-30 seconds
      setTimeout(() => { clearInterval(anim); firefly.remove(); }, 25000 + Math.random() * 5000);
    }

    // Spawn multiple fireflies randomly
    setInterval(() => {
      if (Math.random() < 0.5) createFirefly();
    }, 500);
    /* ================= Emoji Rain Effect ================= */

    const emojiContainer = document.createElement('div');
    emojiContainer.style.position = 'absolute';
    emojiContainer.style.top = 0;
    emojiContainer.style.left = 0;
    emojiContainer.style.width = '100%';
    emojiContainer.style.height = '100%';
    emojiContainer.style.pointerEvents = 'none';
    emojiContainer.style.zIndex = 1; // above background but below card
    document.body.appendChild(emojiContainer);

    const emojis = ["🎂", "🎉", "💖", "🎁", "✨"];

    function createEmojiRain() {
      const emoji = document.createElement('div');
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'absolute';
      emoji.style.fontSize = `${20 + Math.random() * 30}px`;
      emoji.style.left = `${Math.random() * window.innerWidth}px`;
      emoji.style.top = `-50px`;
      emoji.style.opacity = 0.7 + Math.random() * 0.3;
      emoji.style.pointerEvents = 'auto';
      emojiContainer.appendChild(emoji);

      let posY = -50;
      let sway = Math.random() * 50;
      let swayDirection = Math.random() < 0.5 ? 1 : -1;
      let swaySpeed = 0.3 + Math.random() * 0.7;

      // Hover effect
      emoji.addEventListener('mouseenter', () => {
        emoji.style.transition = "transform 0.3s";
        emoji.style.transform = "scale(1.5) rotate(30deg)";
        setTimeout(() => emoji.style.transform = "", 300);
      });

      const anim = setInterval(() => {
        posY += 1 + Math.random();
        emoji.style.top = `${posY}px`;
        emoji.style.left = `${parseFloat(emoji.style.left) + swayDirection * swaySpeed}px`;
        sway -= swaySpeed;
        if (sway <= 0) swayDirection *= -1;
        if (posY > window.innerHeight + 50) {
          clearInterval(anim);
          emoji.remove();
        }
      }, 30);
    }

    // Spawn emoji rain continuously
    setInterval(() => {
      if (Math.random() < 0.6) createEmojiRain();
    }, 400);
    /* ================= Interactive Particle Explosion ================= */

    function createParticles(x, y) {
      const particleContainer = document.createElement('div');
      particleContainer.style.position = 'absolute';
      particleContainer.style.left = 0;
      particleContainer.style.top = 0;
      particleContainer.style.width = '100%';
      particleContainer.style.height = '100%';
      particleContainer.style.pointerEvents = 'none';
      particleContainer.style.zIndex = 4;
      document.body.appendChild(particleContainer);

      const shapes = ["✨", "💖", "🎉", "⭐", "🎂"];
      let particles = [];

      for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.innerText = shapes[Math.floor(Math.random() * shapes.length)];
        p.style.position = 'absolute';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.fontSize = `${10 + Math.random() * 20}px`;
        p.style.opacity = 1;
        p.style.pointerEvents = 'none';
        particleContainer.appendChild(p);

        const angle = Math.random() * 2 * Math.PI;
        const speed = 2 + Math.random() * 4;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        particles.push({ el: p, dx, dy, life: 30 + Math.random() * 20 });
      }

      const anim = setInterval(() => {
        particles.forEach((p, i) => {
          const left = parseFloat(p.el.style.left);
          const top = parseFloat(p.el.style.top);
          p.el.style.left = `${left + p.dx}px`;
          p.el.style.top = `${top + p.dy}px`;
          p.el.style.opacity = p.life / 50;
          p.life -= 1;
          if (p.life <= 0) {
            p.el.remove();
            particles.splice(i, 1);
          }
        });
        if (particles.length === 0) {
          clearInterval(anim);
          particleContainer.remove();
        }
      }, 30);
    }

    // Trigger particles on card hover
    const cardEl = document.querySelector('.card');
    cardEl.addEventListener('mouseenter', (e) => { createParticles(e.clientX, e.clientY); });
    cardEl.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.3) createParticles(e.clientX, e.clientY);
    });

    // Trigger particles on click anywhere
    document.body.addEventListener('click', (e) => { createParticles(e.clientX, e.clientY); });

    /* ================= Magic Mouse Glow Trail ================= */

    document.body.addEventListener('mousemove', (e) => {
      if (Math.random() < 0.4) { // Control frequency
        const sparkle = document.createElement('div');
        const shapes = ["✨", "💖", "🎉", "⭐", "🎂"];
        sparkle.innerText = shapes[Math.floor(Math.random() * shapes.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.fontSize = `${10 + Math.random() * 20}px`;
        sparkle.style.opacity = 1;
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = 5;
        document.body.appendChild(sparkle);

        let life = 0;
        const anim = setInterval(() => {
          life++;
          sparkle.style.top = parseFloat(sparkle.style.top) - 1.5 + 'px'; // move up
          sparkle.style.opacity -= 0.03; // fade out
          if (life > 30) {
            clearInterval(anim);
            sparkle.remove();
          }
        }, 20);
      }
    });
    /* ================= Neon Ring / Halo Effect ================= */
    document.body.addEventListener('click', (e) => {
      const ring = document.createElement('div');
      ring.style.position = 'absolute';
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
      ring.style.width = '20px';
      ring.style.height = '20px';
      ring.style.border = '3px solid hsl(' + Math.random() * 360 + ',100%,70%)';
      ring.style.borderRadius = '50%';
      ring.style.pointerEvents = 'none';
      ring.style.zIndex = 5;
      document.body.appendChild(ring);

      let size = 20;
      let opacity = 1;
      const anim = setInterval(() => {
        size += 8;
        opacity -= 0.05;
        ring.style.width = size + 'px';
        ring.style.height = size + 'px';
        ring.style.left = e.clientX - size / 2 + 'px';
        ring.style.top = e.clientY - size / 2 + 'px';
        ring.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(anim);
          ring.remove();
        }
      }, 30);
    });

    /* ================= Floating Lanterns ================= */
    class Lantern {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20 + Math.random() * 20;
        this.speedY = 0.3 + Math.random() * 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.width = this.size + 'px';
        this.el.style.height = this.size + 'px';
        this.el.style.borderRadius = '50%';
        this.el.style.background = this.color;
        this.el.style.boxShadow = `0 0 ${this.size / 2}px ${this.color}`;
        this.el.style.pointerEvents = 'none';
        this.el.style.zIndex = 1;
        document.body.appendChild(this.el);
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.el.style.top = this.y + 'px';
        this.el.style.left = this.x + 'px';
        if (this.y + this.size < 0) {
          this.el.remove();
          return false;
        }
        return true;
      }
    }

    const lanterns = [];

    function createLantern(x = Math.random() * window.innerWidth, y = window.innerHeight) {
      lanterns.push(new Lantern(x, y));
    }

    // Auto spawn lanterns slowly
    setInterval(() => { createLantern() }, 1500);

    // Optional: spawn lanterns on click
    document.body.addEventListener('click', (e) => { createLantern(e.clientX, e.clientY); });

    // Animation loop
    function updateLanterns() {
      for (let i = lanterns.length - 1; i >= 0; i--) {
        if (!lanterns[i].update()) lanterns.splice(i, 1);
      }
      requestAnimationFrame(updateLanterns);
    }
    updateLanterns();
    /* ================= Shooting Stars / Meteor Shower ================= */
    class ShootingStar {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight / 2;
        this.len = 80 + Math.random() * 50;
        this.speed = 8 + Math.random() * 5;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 1;
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.width = '2px';
        this.el.style.height = '2px';
        this.el.style.background = 'white';
        this.el.style.pointerEvents = 'none';
        this.el.style.zIndex = 0;
        this.el.style.opacity = this.opacity;
        document.body.appendChild(this.el);
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.02;
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.width = this.len * this.opacity / 10 + 'px';
        this.el.style.height = '2px';
        this.el.style.opacity = this.opacity;
        if (this.opacity <= 0) {
          this.el.remove();
          return false;
        }
        return true;
      }
    }

    const shootingStars = [];

    function spawnShootingStar() {
      shootingStars.push(new ShootingStar());
    }

    // Randomly spawn shooting stars
    setInterval(() => { if (Math.random() < 0.5) spawnShootingStar(); }, 800);

    // Animation loop
    function updateShootingStars() {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (!shootingStars[i].update()) shootingStars.splice(i, 1);
      }
      requestAnimationFrame(updateShootingStars);
    }
    updateShootingStars();


    /* ================= Floating Fireflies ================= */
    class Firefly {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = 2 + Math.random() * 3;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.width = this.size + 'px';
        this.el.style.height = this.size + 'px';
        this.el.style.borderRadius = '50%';
        this.el.style.background = 'yellow';
        this.el.style.boxShadow = `0 0 ${this.size * 2}px yellow`;
        this.el.style.opacity = this.opacity;
        this.el.style.pointerEvents = 'none';
        this.el.style.zIndex = 0;
        document.body.appendChild(this.el);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += (Math.random() * 0.02 - 0.01); // flicker
        if (this.opacity > 1) this.opacity = 1;
        if (this.opacity < 0.1) this.opacity = 0.1;
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.opacity = this.opacity;
        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * window.innerHeight;
        }
      }
    }

    const fireflies = [];
    for (let i = 0; i < 40; i++) { fireflies.push(new Firefly()); }

    function updateFireflies() {
      fireflies.forEach(f => f.update());
      requestAnimationFrame(updateFireflies);
    }
    updateFireflies();
    /* ================= Interactive Balloons with Trails ================= */
    document.querySelectorAll('.balloon').forEach(balloon => {
      balloon.addEventListener('mousemove', (e) => {
        // 30% chance to create a trail particle
        if (Math.random() < 0.3) {
          const trail = document.createElement('div');
          trail.innerText = ["✨", "💖", "🎉", "🎂", "🎁"][Math.floor(Math.random() * 5)];
          trail.style.position = 'absolute';
          trail.style.left = e.clientX + "px";
          trail.style.top = e.clientY + "px";
          trail.style.fontSize = "14px";
          trail.style.opacity = 1;
          trail.style.pointerEvents = "none";
          trail.style.zIndex = 3;
          document.body.appendChild(trail);

          let move = 0;
          const anim = setInterval(() => {
            move += 2;
            trail.style.top = e.clientY - move + "px";
            trail.style.opacity -= 0.03;
            if (trail.style.opacity <= 0) {
              clearInterval(anim);
              trail.remove();
            }
          }, 20);
        }
      });

      balloon.addEventListener('click', () => {
        // Balloon pops into mini sparkles/confetti
        for (let i = 0; i < 15; i++) {
          const sparkle = document.createElement('div');
          sparkle.innerText = ["✨", "💖", "🎉", "🎂", "🎁"][Math.floor(Math.random() * 5)];
          sparkle.style.position = 'absolute';
          sparkle.style.left = balloon.getBoundingClientRect().left + "px";
          sparkle.style.top = balloon.getBoundingClientRect().top + "px";
          sparkle.style.fontSize = "12px";
          sparkle.style.opacity = 1;
          sparkle.style.pointerEvents = "none";
          sparkle.style.zIndex = 4;
          document.body.appendChild(sparkle);

          let angle = (i / 15) * 2 * Math.PI;
          let radius = 0;
          const anim = setInterval(() => {
            radius += 3 + Math.random() * 2;
            sparkle.style.left = balloon.getBoundingClientRect().left + radius * Math.cos(angle) + "px";
            sparkle.style.top = balloon.getBoundingClientRect().top + radius * Math.sin(angle) + "px";
            sparkle.style.opacity -= 0.05;
            if (sparkle.style.opacity <= 0) {
              clearInterval(anim);
              sparkle.remove();
            }
          }, 30);
        }

        // Pop balloon animation
        balloon.style.transform = "scale(0) rotate(720deg)";
        balloon.style.transition = "transform 0.6s ease";
        setTimeout(() => {
          balloon.style.transform = "";
        }, 600);

        // Optional pop sound
        const balloonPopSound = new Audio("pop.mp3");
        balloonPopSound.currentTime = 0;
        balloonPopSound.play();
      });
    });

    /* ================= Rainbow Glow Cursor Trail ================= */
    document.addEventListener('mousemove', (e) => {
      const trail = document.createElement('div');
      trail.style.position = 'absolute';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.width = '12px';
      trail.style.height = '12px';
      trail.style.borderRadius = '50%';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = 5;
      trail.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
      trail.style.boxShadow = `0 0 10px ${trail.style.background}, 0 0 20px ${trail.style.background}`;
      document.body.appendChild(trail);

      let size = 12;
      let opacity = 1;
      const anim = setInterval(() => {
        size += 1;
        opacity -= 0.03;
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';
        trail.style.opacity = opacity;
        trail.style.left = (e.clientX - size / 2) + 'px';
        trail.style.top = (e.clientY - size / 2) + 'px';
        if (opacity <= 0) {
          clearInterval(anim);
          trail.remove();
        }
      }, 20);
    });


    let score = 0;
    const scoreBoard = document.getElementById('scoreBoard');
    const colors = ["#ff6b6b", "#6bc1ff", "#ffd166", "#a1ff6b", "#ff9a9e", "#ffb347", "#ff7eb9"];

    function createBalloon() {
      const balloon = document.createElement('div');
      const size = 50 + Math.random() * 50;
      balloon.style.width = size + 'px';
      balloon.style.height = size + 'px';
      balloon.style.position = 'absolute';
      balloon.style.borderRadius = '50%';
      balloon.style.cursor = 'pointer';
      balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.left = Math.random() * (window.innerWidth - size) + 'px';
      balloon.style.bottom = '-100px';
      balloon.style.animation = `float ${4 + Math.random() * 4}s linear forwards`;

      balloon.addEventListener('click', () => {
        score++;
        scoreBoard.innerText = `Score: ${score}`;
        balloon.remove();
      });

      document.body.appendChild(balloon);

      balloon.addEventListener('animationend', () => {
        balloon.remove();
      });
    }

    // Floating animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
@keyframes float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-120vh); }
}`;
    document.head.appendChild(style);

    // Generate balloons continuously
    setInterval(createBalloon, 800);

    // ---------------------------

    // ===== WELCOME BUTTON =====
    const enterBtn = document.getElementById('enter-btn');
    const welcome = document.getElementById('welcome');
    const main = document.getElementById('main-interface');

    enterBtn.onclick = () => {
      // Fade out welcome screen
      welcome.style.opacity = 0;

      // After 1 second, hide welcome & show main interface
      setTimeout(() => {
        welcome.style.display = 'none';       // Hide welcome screen
        main.style.display = 'none';         // Show main interface
      }, 1000);
    }
    window.onload = function () {
      // Initially hide Thank You page (double safety)
      document.getElementById('thankyou-page').style.display = 'none';

      // Call showThankYouPage() at the very end of your events
      // Example: after 10 seconds or after some animation
      setTimeout(() => {
        showThankYouPage();
      }, 50000);  // 10s for demo
    };

    function showThankYouPage() {
      // Hide other screens
      const welcome = document.getElementById('welcome-screen');
      const main = document.getElementById('main-interface');
      if (welcome) welcome.style.display = 'none';
      if (main) main.style.display = 'none';

      // Show Thank You page
      const thankYou = document.getElementById('thankyou-page');
      if (thankYou) thankYou.style.display = 'flex';
    }
    // ---------------
    function showMain() {
      document.getElementById('welcomePage').style.display = 'none';
      document.getElementById('mainInterface').style.display = 'block';
    }

    function showThankYou() {
      document.getElementById('mainInterface').style.display = 'none';
      document.getElementById('thankYouPage').style.display = 'block';
    }

 const music = document.getElementById("bg-music");
  music.volume = 10.0; // Max volume (0.0 = mute, 1.0 = full)
  function playTransitionVideo() {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("transition-video");
  const thankYouPage = document.getElementById("thankyou-page");
  const mainInterface = document.getElementById("main-interface");
  const giftBtn = document.getElementById("gift-btn");

  // Main interface hide
  mainInterface.style.display = "none";

  // Video show karo
  videoContainer.style.display = "flex";
  video.currentTime = 0;
  video.play();

  // Jab user Gift button click kare
  giftBtn.onclick = () => {
    video.pause();
    videoContainer.style.display = "none";
    thankYouPage.style.display = "flex";
  };
}
