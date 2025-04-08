document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');

    let lastScrollY = window.scrollY;
    let hideThreshold = 1;
    let isHidden = false;

    window.addEventListener('scroll', () => {
        let currentScrollY = window.scrollY;

        if (currentScrollY > hideThreshold && !isHidden) {
            header.style.transform = 'translateY(-100%)';
            isHidden = true;
        } else if (currentScrollY < lastScrollY && isHidden) {
           header.style.transform = 'translateY(0)';
            isHidden = false;
            hideThreshold = currentScrollY + 1; }

        lastScrollY = currentScrollY;
    });
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth',
                });
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.getAttribute('data-src');
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    const eventCards = document.querySelectorAll('.events ul li');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});
function playVideo(index) {
    const image = document.getElementById('preview' + index);
    const video = document.getElementById('hoverVideo' + index);
  
    image.style.opacity = '0'; 
    video.play(); 
  }
  
  function pauseVideo(index) {
    const image = document.getElementById('preview' + index);
    const video = document.getElementById('hoverVideo' + index);
  
    image.style.opacity = '1'; 
    video.pause(); 
    video.currentTime = 0; 
  }
  const rotatingText = document.getElementById("rotatingText");
  const text = "CLICK HERE TO DONATE TODAY ".split("");

  text.forEach((char, i) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.style.transform = `rotate(${i * (360 / text.length)}deg)`;
    rotatingText.appendChild(span);
  })
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".visit");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show1");
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("bg-video");
    const hoverContainer = document.querySelector(".hover-container");

    let isVideoVisible = false;

    function showVideo(event) {
        if (!isVideoVisible) {
            video.style.display = "block";
            setTimeout(() => {
                video.style.opacity = "1";
            }, 10);
            video.play();
            isVideoVisible = true;
        }
        moveVideo(event);
    }

    function moveVideo(event) {
        const rect = hoverContainer.getBoundingClientRect();
        const maxWidth = window.innerWidth * 0.6; 

        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        video.style.left = `${x}px`;
        video.style.top = `${y}px`;
        video.style.transform = "translate(-50%, -50%)";

        if (event.clientX > maxWidth) {
            hideVideo();
        }
    }

    function hideVideo() {
        if (isVideoVisible) {
            video.style.opacity = "0";
            video.pause();
            video.currentTime = 0;
            setTimeout(() => {
                video.style.display = "none";
            }, 300);
            isVideoVisible = false;
        }
    }

    hoverContainer.addEventListener("mouseenter", showVideo);
    hoverContainer.addEventListener("mousemove", moveVideo);
    hoverContainer.addEventListener("mouseleave", hideVideo);
});
document.addEventListener("DOMContentLoaded", function () { 
    function addHoverEffect(id) {
        const svg = document.getElementById("wheel" + id);
        const hoverBox = document.getElementById("hover-wheel" + id);

        if (!svg || !hoverBox) {
            console.log("Element not found: wheel" + id + " or hover-wheel" + id);
            return;
        }

        svg.addEventListener("mouseenter", function () {
            hoverBox.style.transform = "translateX(20px)";
            hoverBox.style.opacity = "1";
        });

        svg.addEventListener("mouseleave", function () {
            hoverBox.style.transform = "translateX(0)";
            hoverBox.style.opacity = "0";
        });
    }

    addHoverEffect(1);
    addHoverEffect(2);
});
document.addEventListener('DOMContentLoaded', function () {
    const parallaxElements1 = document.querySelectorAll('[id^="pics"]'); 
    const parallaxElements2 = document.querySelectorAll('[id^="via"], .the, .txt,.text,.visit');

    function applyParallax() {
        let scrollY = window.scrollY;

        // parallaxElements1.forEach(element => {
        //     if (element.dataset.visible === "true") {
        //         let offset = (scrollY - element.dataset.start) * 0.1;
        //         element.style.transform = `translateY(${offset}px)`;
        //     }
        // });

        parallaxElements2.forEach(element => {
            if (element.dataset.visible === "true") {
                let offset = (scrollY - element.dataset.start) * 0.05; 
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.dataset.visible = "true";
                entry.target.dataset.start = window.scrollY;
            } else {
                entry.target.dataset.visible = "false";
            }
        });
    }, { threshold: 0.1 });

    [...parallaxElements1, ...parallaxElements2].forEach(element => observer.observe(element));

    window.addEventListener('scroll', applyParallax);
});
const hamburger = document.getElementById('ham');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {  hamburger.classList.toggle('active');
  overlay.classList.toggle('active');
});
const slides = document.querySelectorAll('.carousel-slide');
  const images = document.querySelectorAll('.carousel-image');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let isAnimating = false;

  function showSlide(index, direction) {
      if (isAnimating) return;
      isAnimating = true;

      if (index >= totalSlides) {
          currentSlide = 0;
      } else if (index < 0) {
          currentSlide = totalSlides - 1;
      } else {
          currentSlide = index;
      }

     images.forEach(img => {
          if (direction === "next") {
              img.style.transformOrigin = "top left";
              img.style.transform = "rotate(90deg)";
          } else {
              img.style.transformOrigin = "bottom right";
              img.style.transform = "rotate(-90deg)";
          }
          img.style.opacity = "0";
      });

      setTimeout(() => {
          document.querySelector('.carousel-container').style.transform = `translateX(${-currentSlide * 100}%)`;

          setTimeout(() => {
              images.forEach(img => {
                  img.style.transform = "rotate(0deg)";
                  img.style.opacity = "1";
              });
              isAnimating = false;
          }, 500);
      }, 300);
  }

  document.getElementById('nextBtn').addEventListener('click', () => showSlide(currentSlide + 1, "next"));
  document.getElementById('prevBtn').addEventListener('click', () => showSlide(currentSlide - 1, "prev"));
  document.addEventListener('DOMContentLoaded', function () {
    const parallaxElements1 = document.querySelectorAll('.con'); 
    const parallaxElements2 = document.querySelectorAll('.carousel-wrapper'); 

    function applyParallax() {
        let scrollY = window.scrollY;

        parallaxElements1.forEach(element => {
            if (element.dataset.visible === "true") {
                let offset = (scrollY - element.dataset.start) * 0.08;
                element.style.transform = `translateY(${offset}px)`;
            }
        });

         parallaxElements2.forEach(element => {
             if (element.dataset.visible === "true") {
                 let offset = (scrollY - element.dataset.start) * 0.1; 
                 element.style.transform = `translateY(${offset}px)`;
             }
         });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.dataset.visible = "true";
                entry.target.dataset.start = window.scrollY;
            } else {
                entry.target.dataset.visible = "false";
            }
        });
    }, { threshold: 0.1 });

    [...parallaxElements1, ...parallaxElements2].forEach(element => observer.observe(element));

    window.addEventListener('scroll', applyParallax);
});
function updateSVGPath() {
    const prevSvgElement = document.getElementById('svg1');
    const nextSvgElement = document.querySelector('#nextBtn svg');
    
    const prevPathElement = prevSvgElement.querySelector('path');
    const nextPathElement = nextSvgElement.querySelector('path');
    
    const viewportWidth = window.innerWidth;
  
    if (viewportWidth <= 480) {
      
      prevPathElement.setAttribute('d', 'M51.8697 5.99991L47.63 1.33625L48.37 0.663574L53.37 6.16357L53.6757 6.49991L53.37 6.83625L48.37 12.3362L47.63 11.6636L51.8697 6.99991H40V5.99991H51.8697Z');
      
     
      nextPathElement.setAttribute('d', 'M51.8697 5.99991L47.63 1.33625L48.37 0.663574L53.37 6.16357L53.6757 6.49991L53.37 6.83625L48.37 12.3362L47.63 11.6636L51.8697 6.99991H40V5.99991H51.8697Z');
  
    } else {
      
      prevPathElement.setAttribute('d', 'M51.8697 5.99991L47.63 1.33625L48.37 0.663574L53.37 6.16357L53.6757 6.49991L53.37 6.83625L48.37 12.3362L47.63 11.6636L51.8697 6.99991H-1.14441e-05V5.99991H51.8697Z');
      
      nextPathElement.setAttribute('d', 'M51.8697 5.99991L47.63 1.33625L48.37 0.663574L53.37 6.16357L53.6757 6.49991L53.37 6.83625L48.37 12.3362L47.63 11.6636L51.8697 6.99991H-1.14441e-05V5.99991H51.8697Z');
    }
  }
  
  updateSVGPath();
  

document.getElementById('email-input').addEventListener('input', function () {
    const emailValue = this.value.trim();
    const submitButton = document.getElementById('bt');
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (emailPattern.test(emailValue)) {
      submitButton.disabled = false; 
    } else {
      submitButton.disabled = true; 
    }
  });
  

  document.getElementById('subscribe-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
  
    const emailInput = document.getElementById('email-input');
    const responseMessage = document.getElementById('response-message');
    const emailValue = emailInput.value.trim();
    const newsSection = document.querySelector('.news');
  

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (emailPattern.test(emailValue)) {

      responseMessage.textContent = 'Thank you for subscribing!';
      responseMessage.classList.remove('error');
      responseMessage.classList.add('success');
  
      newsSection.classList.add('hidden-elements');
  
      emailInput.value = '';
      emailInput.disabled = true;
      document.getElementById('bt').disabled = true;
    } else {
      responseMessage.textContent = 'The email you entered is not valid. Please try again.';
      responseMessage.classList.remove('success');
      responseMessage.classList.add('error');
  
      newsSection.classList.remove('hidden-elements');
    }
  });

  window.onload = function() {
    var elements = document.querySelectorAll('.con, .ph, .plan');

    elements.forEach(function(element) {
      var currentTop = parseInt(window.getComputedStyle(element).top, 10);
      element.style.top = (currentTop + 50) + 'px'; 
    });

    setTimeout(function() {
      elements.forEach(function(element) {
        element.style.opacity = '1'; 
        var finalTop = parseInt(window.getComputedStyle(element).top, 10) - 50;
        element.style.top = finalTop + 'px'; });
    }, 200); 
  };  


  