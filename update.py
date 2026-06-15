import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. GSAP Scripts in Head
head_target = '<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">\n<style>'
head_replacement = '''<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<!-- GSAP & SplitType -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/split-type"></script>
<style>'''
html = html.replace(head_target, head_replacement)

# 2. Preloader and Cursor CSS + Modify Reveal CSS
css_target = '''  /* ===================== REVEAL ANIMATION ===================== */
  .reveal{opacity:1; transform:translateY(0) scale(1); transition:opacity .7s cubic-bezier(0.2, 0.8, 0.2, 1), transform .7s cubic-bezier(0.2, 0.8, 0.2, 1);}
  .js .reveal{opacity:0; transform:translateY(40px) scale(0.96);}
  .js .reveal.in-view{opacity:1; transform:translateY(0) scale(1);}
  
  .stagger-1 { transition-delay: 0.1s; }
  .stagger-2 { transition-delay: 0.2s; }
  .stagger-3 { transition-delay: 0.3s; }
  .stagger-4 { transition-delay: 0.4s; }

  /* ===================== RESPONSIVE ===================== */'''

css_replacement = '''  /* ===================== PRELOADER & CURSOR ===================== */
  .preloader{
    position:fixed; inset:0; z-index:9999; background:var(--denim);
    display:flex; align-items:center; justify-content:center;
  }
  .preloader-arch{
    width:80px; height:80px; border-radius:50% 50% 16px 16px / 60% 60% 16px 16px;
    background:var(--orange); overflow:hidden; position:relative;
  }
  .preloader-fill{
    position:absolute; bottom:0; left:0; width:100%; height:0%; background:var(--pure);
  }
  
  .custom-cursor {
    position:fixed; top:0; left:0; width:12px; height:12px;
    border-radius:50%; background:var(--orange);
    pointer-events:none; z-index:10000;
    transform:translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
  }
  .custom-cursor.hovered {
    width:40px; height:40px; background:rgba(253,137,22,0.2);
    border:2px solid var(--orange);
  }
  body{ cursor:none; }
  a, button, input, textarea, select { cursor:none; }

  /* ===================== GSAP REVEAL PREP ===================== */
  .js .reveal { opacity:0; visibility:hidden; }
  .js .gsap-split { visibility:hidden; }

  /* ===================== RESPONSIVE ===================== */'''
html = html.replace(css_target, css_replacement)

# 3. HTML Body Start (Preloader and Cursor)
body_target = '<body>\n\n<header>'
body_replacement = '''<body>

<!-- Custom Cursor -->
<div class="custom-cursor"></div>

<!-- Preloader -->
<div class="preloader">
  <div class="preloader-arch"><div class="preloader-fill"></div></div>
</div>

<header>'''
html = html.replace(body_target, body_replacement)

# 4. Adding gsap-split class to h1 and h2
html = re.sub(r'<h1>(.*?)</h1>', r'<h1 class="gsap-split">\1</h1>', html)
html = re.sub(r'<h2(.*?)>(.*?)</h2>', r'<h2\1 class="gsap-split">\2</h2>', html)

# 5. Replace existing script block entirely
script_start = '<script>'
script_end = '</script>\n\n</body>'

new_script = '''<script>
  // Setup GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
  });
  document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  // Magnetic Buttons
  document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Text Splitting setup
  const splitTextElements = document.querySelectorAll('.gsap-split');
  splitTextElements.forEach(el => {
    new SplitType(el, { types: 'words, chars', tagName: 'span' });
    gsap.set(el, { visibility: 'visible' }); // reveal after split
    gsap.set(el.querySelectorAll('.char'), { opacity: 0, y: 20 });
  });

  // Preloader Animation Sequence
  const masterTimeline = gsap.timeline();
  
  masterTimeline.to('.preloader-fill', {
    height: '100%',
    duration: 1.2,
    ease: "power3.inOut"
  })
  .to('.preloader', {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut"
  })
  .fromTo('.gsap-split .char', 
    { opacity: 0, y: 40 }, 
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, ease: "back.out(1.7)", clearProps: "all" },
    "-=0.4"
  )
  .fromTo('.door-frame .arch-inner',
    { scaleY: 0, transformOrigin: "bottom center" },
    { scaleY: 1, duration: 1.2, ease: "power3.out", clearProps: "all" },
    "-=0.6"
  );

  // Scroll Animations for elements
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 40, autoAlpha: 0 },
      {
        opacity: 1, y: 0, autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Timeline (Approach Section) Scrub Animation
  const timelineSteps = document.querySelectorAll('.step-arch');
  timelineSteps.forEach(step => {
    // Add the orange fill line dynamically if it isn't there, or just animate its scale
    // Original CSS used an ::after pseudo-element. GSAP can't easily animate pseudo-elements,
    // so we'll wrap a real div inside for the animation.
    step.innerHTML = '<div class="step-fill" style="width:100%; height:100%; background:var(--orange); transform-origin:left;"></div>';
    
    gsap.fromTo(step.querySelector('.step-fill'),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.5
        }
      }
    );
  });

  // Parallax background on Approach section via GSAP
  gsap.to('.approach', {
    backgroundPosition: `center 100%`,
    ease: "none",
    scrollTrigger: {
      trigger: '.approach',
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // ScrollSpy for Navigation
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  // Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });
    if (isValid) {
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      btn.style.opacity = '0.8';
      setTimeout(() => {
        alert('Thanks, your message has been sent successfully. We will get back to you shortly.');
        contactForm.reset();
        inputs.forEach(input => input.classList.remove('is-valid'));
        btn.innerText = originalText;
        btn.style.opacity = '1';
      }, 1200);
    }
  });

  // Back to Top Button
  const bttBtn = document.getElementById('bttBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      bttBtn.classList.add('show');
    } else {
      bttBtn.classList.remove('show');
    }
  });
  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
</script>

</body>'''

# Replace the entire script block
import re
html = re.sub(r'<script>.*?</script>\s*</body>', new_script, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Update complete!")
