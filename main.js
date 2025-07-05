// Portfolio Website JavaScript - Fixed Version
// Author: John Doe
// Description: Interactive functionality for portfolio website

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio website loading...")

  // Pastikan body terlihat segera
  document.body.style.opacity = "1"
  document.body.classList.add("loaded")

  // Initialize AOS with fallback
  initializeAOS()

  // Initialize all functionality
  initThemeToggle()
  initMobileMenu()
  initSmoothScrolling()
  initActiveNavigation()
  initContactForm()
  initFloatingLabels()
  initParallaxEffect()
  initProjectCards()
  initLoadingAnimation()
  initScrollToTop()

  console.log("✅ Portfolio website loaded successfully!")
})

// Initialize AOS with fallback
function initializeAOS() {
  try {
    const AOS = window.AOS // Declare the AOS variable
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: "ease-out-cubic",
      })
      console.log("✅ AOS initialized")
    } else {
      console.log("⚠️ AOS not loaded, continuing without animations")
    }
  } catch (error) {
    console.log("⚠️ AOS error:", error)
  }
}

// Dark Mode Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const html = document.documentElement

  if (!themeToggle) {
    console.log("⚠️ Theme toggle button not found")
    return
  }

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem("theme") || "light"
  html.classList.toggle("dark", currentTheme === "dark")

  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark")
    const newTheme = html.classList.contains("dark") ? "dark" : "light"
    localStorage.setItem("theme", newTheme)

    // Add animation feedback
    themeToggle.style.transform = "scale(0.9)"
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)"
    }, 150)
  })

  console.log("✅ Theme toggle initialized")
}

// Mobile Menu Toggle Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (!mobileMenuBtn || !mobileMenu) {
    console.log("⚠️ Mobile menu elements not found")
    return
  }

  const mobileMenuIcon = mobileMenuBtn.querySelector("i")

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden")

    if (isOpen) {
      mobileMenu.classList.add("hidden")
      if (mobileMenuIcon) {
        mobileMenuIcon.classList.remove("fa-times")
        mobileMenuIcon.classList.add("fa-bars")
      }
    } else {
      mobileMenu.classList.remove("hidden")
      if (mobileMenuIcon) {
        mobileMenuIcon.classList.remove("fa-bars")
        mobileMenuIcon.classList.add("fa-times")
      }
    }
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      if (mobileMenuIcon) {
        mobileMenuIcon.classList.remove("fa-times")
        mobileMenuIcon.classList.add("fa-bars")
      }
    })
  })

  console.log("✅ Mobile menu initialized")
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  console.log("✅ Smooth scrolling initialized")
}

// Active Navigation Highlighting
function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  if (sections.length === 0 || navLinks.length === 0) {
    console.log("⚠️ Navigation sections or links not found")
    return
  }

  function highlightActiveSection() {
    let current = ""
    const scrollPosition = window.scrollY + 200

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("text-blue-600", "dark:text-blue-400", "active")
      link.classList.add("text-gray-700", "dark:text-gray-300")

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-gray-700", "dark:text-gray-300")
        link.classList.add("text-blue-600", "dark:text-blue-400", "active")
      }
    })
  }

  // Throttle scroll event for better performance
  let ticking = false
  function updateActiveSection() {
    if (!ticking) {
      requestAnimationFrame(() => {
        highlightActiveSection()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", updateActiveSection)
  highlightActiveSection() // Initial call

  console.log("✅ Active navigation initialized")
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const successMessage = document.getElementById("success-message")
  const errorMessage = document.getElementById("error-message")

  if (!contactForm || !successMessage || !errorMessage) {
    console.log("⚠️ Contact form elements not found")
    return
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")?.trim() || ""
    const email = formData.get("email")?.trim() || ""
    const message = formData.get("message")?.trim() || ""

    // Hide previous messages
    successMessage.classList.add("hidden")
    errorMessage.classList.add("hidden")

    // Validation
    if (!validateForm(name, email, message)) {
      return
    }

    // Simulate form submission
    submitForm(name, email, message)
  })

  function validateForm(name, email, message) {
    // Basic validation
    if (!name || !email || !message) {
      showError("Please fill in all required fields.")
      return false
    }

    // Name validation
    if (name.length < 2) {
      showError("Name must be at least 2 characters long.")
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address.")
      return false
    }

    // Message validation
    if (message.length < 10) {
      showError("Message must be at least 10 characters long.")
      return false
    }

    return true
  }

  function showError(message) {
    if (errorMessage) {
      errorMessage.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`
      errorMessage.classList.remove("hidden")

      // Scroll to error message
      errorMessage.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  function submitForm(name, email, message) {
    const submitButton = contactForm.querySelector('button[type="submit"]')
    if (!submitButton) return

    const originalText = submitButton.innerHTML

    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...'
    submitButton.disabled = true

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitButton.innerHTML = originalText
      submitButton.disabled = false

      // Show success message
      successMessage.classList.remove("hidden")

      // Reset form
      contactForm.reset()

      // Remove floating label states
      const inputs = contactForm.querySelectorAll("input, textarea")
      inputs.forEach((input) => {
        input.classList.remove("has-value")
      })

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" })

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.add("hidden")
      }, 5000)
    }, 2000)
  }

  console.log("✅ Contact form initialized")
}

// Floating Labels Animation
function initFloatingLabels() {
  const formInputs = document.querySelectorAll("#contact-form input, #contact-form textarea")

  if (formInputs.length === 0) {
    console.log("⚠️ Form inputs not found")
    return
  }

  formInputs.forEach((input) => {
    // Check initial state
    if (input.value.trim() !== "") {
      input.classList.add("has-value")
    }

    // Handle input events
    input.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.classList.add("has-value")
      } else {
        this.classList.remove("has-value")
      }
    })

    input.addEventListener("blur", function () {
      if (this.value.trim() !== "") {
        this.classList.add("has-value")
      } else {
        this.classList.remove("has-value")
      }
    })

    input.addEventListener("focus", function () {
      this.classList.add("has-value")
    })
  })

  console.log("✅ Floating labels initialized")
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
  const hero = document.querySelector("#hero")
  if (!hero) {
    console.log("⚠️ Hero section not found")
    return
  }

  const floatingElements = hero.querySelectorAll(".animate-float")

  function updateParallax() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    if (hero && scrolled < hero.offsetHeight) {
      hero.style.transform = `translate3d(0, ${rate}px, 0)`
    }

    // Update floating elements
    floatingElements.forEach((element, index) => {
      const speed = 0.2 + index * 0.1
      const yPos = scrolled * speed
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    })
  }

  // Throttle parallax updates
  let ticking = false
  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
      setTimeout(() => {
        ticking = false
      }, 16)
    }
  }

  window.addEventListener("scroll", requestParallaxUpdate)
  console.log("✅ Parallax effect initialized")
}

// Project Cards Animation
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")
  if (projectCards.length === 0) {
    console.log("⚠️ Project cards not found")
    return
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          entry.target.classList.add("animate-in")
        }, index * 100)
      }
    })
  }, observerOptions)

  projectCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    projectObserver.observe(card)

    // Add hover effects
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  console.log("✅ Project cards initialized")
}

// Loading Animation
function initLoadingAnimation() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger initial animations
    setTimeout(() => {
      const heroElements = document.querySelectorAll("#hero [data-aos]")
      heroElements.forEach((el) => {
        el.classList.add("aos-animate")
      })
    }, 300)
  })

  console.log("✅ Loading animation initialized")
}

// Scroll to Top Functionality
function initScrollToTop() {
  // Create scroll to top button
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className =
    "fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50 opacity-0 pointer-events-none"
  scrollToTopBtn.id = "scroll-to-top"
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  function toggleScrollToTop() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.pointerEvents = "auto"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.pointerEvents = "none"
    }
  }

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  window.addEventListener("scroll", toggleScrollToTop)
  console.log("✅ Scroll to top initialized")
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // Preload critical resources
  const criticalResources = ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=250&width=400"]

  criticalResources.forEach((resource) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = resource
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
optimizePerformance()

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
})

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!
👨‍💻 Developed by John Doe
📧 Contact: john.doe@example.com
🌟 Thanks for checking out the code!

Debug Info:
- AOS: ${typeof window.AOS !== "undefined" ? "✅ Loaded" : "❌ Not loaded"}
- Sections: ${document.querySelectorAll("section[id]").length}
- Project Cards: ${document.querySelectorAll(".project-card").length}
`)
