document.addEventListener("DOMContentLoaded", () => {
  // Gestion du formulaire de contact
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message envoyé avec succès !");
      contactForm.reset();
    });
  }

  // Animation de fondu pour la section Hero
  gsap.from(".hero h2, .hero h1, .hero p, .hero a", {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.2,
    delay: 0.5,
  });

  // Animation de flottement pour l'image du héros
  const heroImg = document.querySelector(".hero-img img");
  if (heroImg) {
    gsap.to(heroImg, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }

  gsap.from(".hero-img img", {
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out",
  });

  // Animation des barres de compétences au scroll
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("aria-valuenow") + "%";
      gsap.to(bar, {
        width: targetWidth,
        duration: 1.5,
        ease: "power2.out",
      });
    });
  };

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars();
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
});

(function () {
  "use strict"; // Utilisation du mode strict pour éviter les erreurs courantes

  // Sélection du bouton de bascule de la navigation mobile
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  // Fonction pour basculer la navigation mobile
  function mobileNavToogle() {
    // Ajoute ou supprime la classe 'mobile-nav-active' sur le body
    document.querySelector("body").classList.toggle("mobile-nav-active");
    // Bascule l'icône du bouton entre 'bi-list' et 'bi-x'
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  // Ajout d'un écouteur d'événement au bouton de bascule si celui-ci existe
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  // Masquer la navigation mobile lors du clic sur un lien
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      // Si la navigation mobile est active, la masquer
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  // Initialisation de AOS (Animate On Scroll) pour les animations au défilement
  function aosInit() {
    AOS.init({
      duration: 600, // Durée de l'animation en millisecondes
      easing: "ease-in-out", // Type d'accélération de l'animation
      once: true, // L'animation ne se joue qu'une seule fois
      mirror: false, // L'animation ne se rejoue pas lors du défilement inverse
    });
  }
  // Ajout d'un écouteur d'événement pour initialiser AOS au chargement de la page
  window.addEventListener("load", aosInit);

  // Initialisation de GLightbox pour les galeries d'images
  const glightbox = GLightbox({
    selector: ".glightbox", // Sélecteur des éléments à inclure dans la lightbox
  });

  // Initialisation des sliders Swiper
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      // Récupération de la configuration Swiper depuis le HTML
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      // Si le swiper est un onglet, initialiser avec une pagination personnalisée
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        // Sinon, initialiser un Swiper standard
        new Swiper(swiperElement, config);
      }
    });
  }

  // Ajout d'un écouteur d'événement pour initialiser les Swipers au chargement de la page
  window.addEventListener("load", initSwiper);

  // Initialisation de PureCounter pour animer les compteurs
  new PureCounter();

  // Gestion des FAQ (Foire Aux Questions)
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        // Bascule la classe 'faq-active' sur l'élément parent pour afficher/masquer la réponse
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  // Correction de la position de défilement pour les liens avec hash (#)
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      // Vérifie si l'URL contient un hash
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          // Défilement fluide vers la section correspondante
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100); // Délai pour s'assurer que la page est prête
      }
    }
  });
})();

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
  };

  fetch('https://portfolio-backend-red-eta.vercel.app/submit-form', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('responseMessage').textContent = data.message;
  })
  .catch(error => {
      console.error('Erreur :', error);
  });
});
