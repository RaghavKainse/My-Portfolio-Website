document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // ILocomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 0.8,
    smartphone: { smooth: true },
    tablet: { smooth: true },
  });

  // ✅ Page load pe scroll top fix
  let firstLoad = true;
  scroll.on("scroll", () => {
    if (firstLoad) {
      scroll.scrollTo(0, { duration: 0, disableLerp: true });
      firstLoad = false;
    }
    ScrollTrigger.update();
  });

  // ✅ Navbar links ke liye smooth scroll
  document.querySelectorAll(".box2 a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href"); // e.g. #Home, #About
      scroll.scrollTo(target === "#Home" ? 0 : target, {
        offset: 0,
        duration: 800,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    });
  });

  // ✅ ScrollTrigger + Locomotive integration
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());

  /* ----------------------
     GSAP Animations
     ---------------------- */
  var t1 = gsap.timeline();
  t1.from(".box2 a", {
    y: -100,
    delay: 0.2,
    duration: 0.2,
    opacity: 0.5,
    stagger: 0.2,
  });
  t1.from(".box3", {
    x: -800,
    delay: 0.1,
    duration: 0.9,
    stagger: 0.2,
    opacity: 1,
  });
  gsap.from(".box4 img", {
    x: 800,
    rotate: 110,
    duration: 0.9,
    opacity: 0.5,
    stagger: 0.5,
  });

  // About Section
  gsap.from(".effect,.aboutbox1 img", {
    x: -600,
    delay: 0.5,
    duration: 0.9,
    opacity: 0.9,
    rotate: -135,
    scrollTrigger: {
      trigger: "#About",
      scroller: "#main",
      start: "top 80%",
      end: "bottom 50%",
      scrub: 1,
    },
  });

  // Projects Section
  gsap.to("#projectContainer img", {
    transform: "translateX(-205%)",
    scrollTrigger: {
      trigger: "#projectContainer",
      scroller: "#main",
      start: "top 20%",
      end: "800%",
      scrub: 2,
      opacity: 0.5,
      pin: true,
    },
  });

  // Skills Section
  gsap.from(".skilbox2 .iconss", {
    x: -800,
    delay: 0.9,
    duration: 0.9,
    stagger: 0.5,
    opacity: 0.5,
    scrollTrigger: {
      trigger: "#Skills",
      scroller: "#main",
      start: "top 80%",
      end: "bottom 100%",
      scrub: 1,
    },
  });
  gsap.from(".skilbox3 .iconss", {
    x: 800,
    delay: 0.9,
    duration: 0.9,
    stagger: 0.5,
    opacity: 0.5,
    scrollTrigger: {
      trigger: "#Skills",
      scroller: "#main",
      start: "top 80%",
      end: "bottom 100%",
      scrub: 1,
    },
  });
});
