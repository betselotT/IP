'use strict';

/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * Preloader will be visible until document load
 */
const preloader = document.querySelector("[data-preloader]");
const loadingSpinner = document.querySelector("[data-loading-spinner]");

document.addEventListener("DOMContentLoaded", function () {
  loadingSpinner.style.display = "none"; // Hide the loading spinner
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * Show the mobile navbar when clicking the menu button
 * and hide after clicking the menu close button or overlay
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

/**
 * Active header & back top btn when window scroll down to 100px
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);

/**
 * Tab switching for the about section
 */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-text");

function switchTab(tabId) {
  tabContents.forEach(content => {
    content.style.display = "none";
  });

  tabButtons.forEach(button => {
    button.classList.remove("active");
  });

  document.getElementById(tabId).style.display = "block";
}

tabButtons.forEach(button => {
  button.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");
    switchTab(tabId);
    tabButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

/**
 * Scroll reveal
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15 &&
      !revealElements[i].classList.contains("revealed")
    ) {
      revealElements[i].classList.add("revealed");
    }
  }
};

window.addEventListener("scroll", revealElementOnScroll);
window.addEventListener("load", revealElementOnScroll);

/**
 * Smooth scrolling for navigation links
 */
const navLinks = document.querySelectorAll(".navbar-link");

const scrollToSection = function (event) {
  event.preventDefault();
  const targetId = event.target.getAttribute("data-scroll-to") || event.target.getAttribute("href");
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop - header.clientHeight,
      behavior: "smooth"
    });

    // Close the mobile navigation menu if it's open
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  }
}

addEventOnElements(navLinks, "click", scrollToSection);
