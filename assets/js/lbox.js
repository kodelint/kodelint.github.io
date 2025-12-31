// Lightbox logic
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const images = document.querySelectorAll(".page img");
images.forEach(image => {
  image.addEventListener("click", e => {
    lightbox.classList.add("active");
    const img = document.createElement("img");
    img.src = image.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    img.style.setProperty("cursor","not-allowed");
    lightbox.appendChild(img);
    lightbox.style.setProperty("cursor", "zoom-out");
  });
});

lightbox.addEventListener("click", e => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});


// Deploy Button Logic
document.querySelectorAll('.deploy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card hover mess if any

    const originalText = btn.innerHTML;
    const url = btn.getAttribute('data-url');
    
    // 1. Change to loading state
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Cloning...';
    btn.style.opacity = '1'; // Ensure it stays visible
    btn.style.cursor = 'wait';

    // 2. Simulate network delay (funny)
    setTimeout(() => {
       btn.innerHTML = '<i class="fas fa-check"></i> Deployed!';
       btn.style.backgroundColor = '#00ff9d';
       btn.style.color = '#000';
       
       // 3. Redirect after success
       setTimeout(() => {
         window.open(url, '_blank');
         // Reset button after a while (if user comes back)
         setTimeout(() => {
           btn.innerHTML = originalText;
           btn.style.backgroundColor = ''; // Revert to CSS default
           btn.style.color = '';
           btn.style.cursor = 'pointer';
         }, 1000);
       }, 800);
    }, 1200);
  });
});
