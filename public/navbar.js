document.addEventListener('DOMContentLoaded', () => {
  fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;

    const getInvolvedBtn = document.getElementById('getInvolvedBtn');
      const getInvolvedDropdown = document.getElementById('getInvolvedDropdown');
      const aboutBtn = document.getElementById('aboutBtn');
      const aboutDropdown = document.getElementById('aboutDropdown');

      function hideAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(el => el.classList.add('hidden'));
      }

      getInvolvedBtn?.addEventListener('click', e => {
        e.stopPropagation();
        const isHidden = getInvolvedDropdown.classList.contains('hidden');
        hideAllDropdowns();
        if (isHidden) getInvolvedDropdown.classList.remove('hidden');
      });

      aboutBtn?.addEventListener('click', e => {
        e.stopPropagation();
        const isHidden = aboutDropdown.classList.contains('hidden');
        hideAllDropdowns();
        if (isHidden) aboutDropdown.classList.remove('hidden');
      });
      document.addEventListener('click', e => {
        const isInside = e.target.closest('#getInvolvedWrapper') || e.target.closest('#aboutWrapper');
        if (!isInside) hideAllDropdowns();v
      });
   });
});
