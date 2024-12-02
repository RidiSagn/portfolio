  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('threejs-container').appendChild(renderer.domElement);

  // Генерація частинок
  const particles = new THREE.BufferGeometry();
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 700;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    transparent: true,
    opacity: 0.7,
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  camera.position.z = 60;

  // Відстеження положення мишки
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  // Затримка і плавність інтерполяції
  const inertiaFactor = 0.15;

  document.addEventListener('mousemove', (event) => {
    targetX = (event.clientX - window.innerWidth / 2) * 0.001;
    targetY = (event.clientY - window.innerHeight / 2) * 0.001;
  });

  function animate() {
    requestAnimationFrame(animate);

    // Інерційний рух: плавний перехід між поточним і цільовим положенням
    currentX += (targetX - currentX) * inertiaFactor;
    currentY += (targetY - currentY) * inertiaFactor;

    // Рух камери з інерцією
    camera.position.x = currentX * 10;
    camera.position.y = -currentY * 10;
    camera.lookAt(scene.position);

    // Плавне обертання частинок для створення динамічного фону
    particleSystem.rotation.y += 0.0005;
    particleSystem.rotation.x += 0.0005;

    renderer.render(scene, camera);
  }
  animate();

  // Динамічне оновлення розміру
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  AOS.init({
    duration: 1000, // Продолжительность анимации
    once: true,     // Анимация только при первом скролле
  });
  const translations = {

    ru: {
      heroTitle: "Создаю современные веб-решения",
      viewProjects: "Смотреть проекты",
      projectsTitle: "Последние проекты",
      project1Title: "Мои Проекти",
      project1Desc: "Краткое описание первого проекта.",
      project1Link: "Подробнее",
      contactTitle: "Мои контакты",
    },

  };
  
  // Language switcher function
  function switchLanguage(lang) {
    document.getElementById("hero-title").textContent = translations[lang].heroTitle;
    document.getElementById("view-projects").textContent = translations[lang].viewProjects;
    document.getElementById("projects-title").textContent = translations[lang].projectsTitle;
  
    document.getElementById("project1-title").textContent = translations[lang].project1Title;
    document.getElementById("project1-link").textContent = translations[lang].project1Link;
  
    document.getElementById("contact-title").textContent = translations[lang].contactTitle;
  }
  
  // Event listeners for buttons
  document.getElementById("btn-ua").addEventListener("click", () => switchLanguage("ua"));
  document.getElementById("btn-ru").addEventListener("click", () => switchLanguage("ru"));
  document.getElementById("btn-en").addEventListener("click", () => switchLanguage("en"));
  
  // Default language
  switchLanguage("ru");
