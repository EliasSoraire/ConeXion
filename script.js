document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Agrega fade-in a todas las secciones ANTES de crear el observer
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-in");
  });

  // Scroll animations
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Al cargar la página, agrega .visible a los .fade-in que ya están en pantalla
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
    }
  });

  // Form submission
  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        submitButton.textContent = "¡Gracias!";

        // Show success message
        const successMessage = document.createElement("div");
        successMessage.textContent =
          "Tu consulta ha sido enviada. Nos pondremos en contacto contigo pronto.";
        successMessage.style.color = "#7C3AED";
        successMessage.style.marginTop = "1rem";
        successMessage.style.textAlign = "center";
        successMessage.style.fontWeight = "bold";

        this.appendChild(successMessage);

        // Reset form after 3 seconds
        setTimeout(() => {
          this.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          successMessage.remove();
        }, 3000);
      }, 1500);
    });
  }

  // Service card hover effects
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      if (this.classList.contains("premium")) {
        this.style.transform = "scale(1.08)";
      } else {
        this.style.transform = "translateY(-10px)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (this.classList.contains("premium")) {
        this.style.transform = "scale(1.05)";
      } else {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Initialize navbar state
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  }

  // Theme Toggle Functionality
  const themeToggle = document.querySelector(".theme-toggle-float");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or use preferred color scheme
  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Apply the current theme
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });
});
