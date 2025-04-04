document.addEventListener('DOMContentLoaded', () => {
    // Ensure normal state on load
    document.getElementById('horror-overlay').classList.add('hidden');
    showSection(null); // Hide all interactive sections initially
  });
  
  const sections = ['hug-animation', 'talk-section', 'explore-section'];
  
  function showSection(sectionId) {
    sections.forEach(id => {
      const section = document.getElementById(id);
      section.classList.add('hidden');
      section.classList.remove('fade-in');
    });
    if (sectionId) {
      const selectedSection = document.getElementById(sectionId);
      selectedSection.classList.remove('hidden');
      selectedSection.classList.add('fade-in');
    }
  }
  
  // Hug Button
  document.getElementById('hug-btn').addEventListener('click', () => {
    showSection('hug-animation');
    const hugEmoji = document.getElementById('hug-emoji');
    const leftCharacter = document.querySelector('.character.left');
    const rightCharacter = document.querySelector('.character.right');
  
    // Reset to panda emoji and make it visible
    hugEmoji.textContent = '🐼';
    hugEmoji.style.opacity = '1';
  
    // Reset animations
    leftCharacter.style.animation = 'none';
    rightCharacter.style.animation = 'none';
    setTimeout(() => {
      leftCharacter.style.animation = '';
      rightCharacter.style.animation = '';
    }, 10);
  
    // Change to happy face emoji when animation ends
    leftCharacter.addEventListener('animationend', () => {
      hugEmoji.style.opacity = '0';
      setTimeout(() => {
        hugEmoji.textContent = '😊';
        hugEmoji.style.opacity = '1';
      }, 300);
    }, { once: true });
  });
  
  // Talk Button
  document.getElementById('talk-btn').addEventListener('click', () => {
    showSection('talk-section');
  });
  
  // Form Submission
  document.getElementById('response-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('response-text').value;
    fetch('/save-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    .then(response => response.text())
    .then(data => {
      showMessage('Thank you for sharing. I\'m here for you!');
      document.getElementById('response-text').value = '';
    })
    .catch(error => {
      showMessage('Oops, something went wrong!');
      console.error('Error:', error);
    });
  });
  
  // Explore Button
  document.getElementById('explore-btn').addEventListener('click', () => {
    showSection('explore-section');
  });
  
  // Flower Clicks with Heart Confetti
  document.querySelectorAll('.flower').forEach(flower => {
    flower.addEventListener('click', () => {
      flower.classList.add('clicked');
      const rect = flower.getBoundingClientRect();
      const flowerX = rect.left + rect.width / 2;
      const flowerY = rect.top + rect.height / 2;
  
      for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        document.body.appendChild(heart);
  
        heart.style.left = flowerX + 'px';
        heart.style.top = flowerY + 'px';
  
        const size = 10 + Math.random() * 20;
        heart.style.setProperty('--heart-size', size + 'px');
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        heart.style.setProperty('--heart-color', color);
  
        heart.style.transform = 'rotate(45deg)';
  
        const angle = Math.random() * 2 * Math.PI;
        const distance = 50 + Math.random() * 100;
        const finalX = flowerX + Math.cos(angle) * distance;
        const finalY = flowerY + Math.sin(angle) * distance;
        const randomRotation = Math.random() * 360;
  
        setTimeout(() => {
          heart.style.transition = 'all 1s ease-out';
          heart.style.left = finalX + 'px';
          heart.style.top = finalY + 'px';
          heart.style.transform = `rotate(${45 + randomRotation}deg)`;
          heart.style.opacity = '0';
        }, 10);
  
        setTimeout(() => {
          heart.remove();
        }, 1000);
      }
    });
  });
  
// Surprise Button with Horror Theme
const horrorMessages = [
    "I'm always around you 👻",
    "Sad nahi ho skti, choice nahi hai ye 😈",
    "Tumhe nahi chorege 😡",
    "Jyada ho rha hai haan? 😒",
    "Dur ho toh kya hua 🙊"
  ];
  
  document.getElementById('surprise-btn').addEventListener('click', () => {
    const overlay = document.getElementById('horror-overlay');
    overlay.classList.remove('hidden');
  
    const randomIndex = Math.floor(Math.random() * horrorMessages.length);
    document.getElementById('horror-message').textContent = horrorMessages[randomIndex];
  
    document.querySelectorAll('.ghost').forEach(ghost => {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;
      ghost.style.left = x + '%';
      ghost.style.top = y + '%';
  
      // Add click event to change message
      ghost.addEventListener('click', () => {
        const newRandomIndex = Math.floor(Math.random() * horrorMessages.length);
        document.getElementById('horror-message').textContent = horrorMessages[newRandomIndex];
      });
    });
  });
  
  document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('horror-overlay').classList.add('hidden');
  });
  
  // Show Message Function
  function showMessage(message) {
    const messageArea = document.getElementById('message-area');
    messageArea.textContent = message;
    messageArea.classList.remove('hidden');
    setTimeout(() => {
      messageArea.classList.add('hidden');
    }, 3000);
  }