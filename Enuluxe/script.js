function findProperty() {
    const location = document.getElementById('location').value;
    
    if (location.trim() === '') {
        alert('Please enter a location to search for properties.');
        return;
    }
    
    alert(`Searching for properties in: ${location}`);

    console.log('Searching for properties in:', location);
}

function setupPropertyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.textContent.trim();
      
      propertyCards.forEach(card => {
        if (filter === 'All') {
          card.style.display = 'block';
        } else {
          const propertyType = card.querySelector('h3').textContent;
          if (propertyType.includes(filter.split(' ')[1])) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const propertyCard = button.closest('.property-card');
      const propertyName = propertyCard.querySelector('h3').textContent;
      alert(`Viewing details for: ${propertyName}`);
    });
  });

 
  const viewAllBtn = document.querySelector('.view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {

      propertyCards.forEach(card => {
        card.style.display = 'block';
      });

      filterButtons.forEach(btn => btn.classList.remove('active'));
      filterButtons[0].classList.add('active');
 
      document.querySelector('.properties').scrollIntoView({ behavior: 'smooth' });
    });
  }
}
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location');
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                findProperty();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  setupPropertyFilters();
});



// CountUp Animation Script

(function () {
  const els = document.querySelectorAll(".countup");
  if (!els.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatNumber(value, separator, decimals) {
    const opts = {
      useGrouping: !!separator,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    };
    let formatted = new Intl.NumberFormat("en-US", opts).format(value);
    if (separator && separator !== ",") {
      formatted = formatted.replace(/,/g, separator);
    }
    return formatted;
  }

  function decimalsOf(n) {
    const s = String(n);
    return s.includes(".") ? s.split(".")[1].length : 0;
  }

  function animateCount(el) {
    const from = parseFloat(el.dataset.from ?? "0");
    const to = parseFloat(el.dataset.to ?? "0");
    const duration = parseInt(el.dataset.duration ?? "2000", 10);
    const delay = parseInt(el.dataset.delay ?? "0", 10);
    const dir = (el.dataset.direction || "up").toLowerCase();
    const separator = el.dataset.separator || "";

    const maxDecimals = Math.max(decimalsOf(from), decimalsOf(to));
    const start = dir === "down" ? from : from;
    const end = dir === "down" ? to : to; // keeping for clarity

    if (prefersReduced || duration === 0) {
      el.textContent = formatNumber(end, separator, maxDecimals);
      return;
    }

    let startTime = null;
    const totalChange = end - start;

    function step(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const t = Math.min(elapsed / duration, 1);     // 0..1
      // easeOutCubic for a nice feel
      const eased = 1 - Math.pow(1 - t, 3);
      const current = start + totalChange * eased;

      el.textContent = formatNumber(current, separator, maxDecimals);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(end, separator, maxDecimals); // snap to final
      }
    }

    setTimeout(() => requestAnimationFrame(step), delay);
  }

  // Trigger when elements enter the viewport
  const io = ("IntersectionObserver" in window)
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 })
    : null;

  els.forEach(el => {
    // set initial text
    el.textContent = el.dataset.from ?? "0";
    if (io) io.observe(el);
    else animateCount(el); // fallback if IntersectionObserver not supported
  });
})();