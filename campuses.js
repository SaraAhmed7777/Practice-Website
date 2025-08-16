<!-- filename: campuses.js -->
<script>
// single source of truth for the campus dropdowns
// (we populate <select> at runtime so both pages are always consistent)

window.CUNY_CAMPUSES = [
  // senior & professional schools
  "Baruch College",
  "Brooklyn College",
  "City College of New York (CCNY)",
  "Hunter College",
  "John Jay College of Criminal Justice",
  "Lehman College",
  "Medgar Evers College",
  "Queens College",
  "College of Staten Island (CSI)",
  "York College",
  "New York City College of Technology (City Tech)",
  "CUNY School of Professional Studies (CUNY SPS)",
  "CUNY School of Labor and Urban Studies (CUNY SLU)",
  "Macaulay Honors College",
  "CUNY School of Law",
  "The Graduate Center, CUNY",
  "Craig Newmark Graduate School of Journalism",
  "CUNY Graduate School of Public Health & Health Policy (CUNY SPH)",

  // community colleges
  "Borough of Manhattan Community College (BMCC)",
  "Bronx Community College",
  "Guttman Community College",
  "Hostos Community College",
  "Kingsborough Community College",
  "LaGuardia Community College",
  "Queensborough Community College",

  // allow listing non-CUNY things side-by-side
  "Non-CUNY"
];

// quick helper to fill any campus <select> with all campuses
window.populateCampusSelect = function(selectEl) {
  if (!selectEl) return;
  const current = selectEl.value;
  selectEl.innerHTML = ""; // reset
  const optAll = document.createElement("option");
  optAll.value = "All";
  optAll.textContent = "All Campuses";
  selectEl.appendChild(optAll);
  window.CUNY_CAMPUSES.forEach(name => {
    const o = document.createElement("option");
    o.value = name;
    o.textContent = name;
    selectEl.appendChild(o);
  });
  // try to keep previous selection if possible
  if (current) selectEl.value = current;
};
</script>
