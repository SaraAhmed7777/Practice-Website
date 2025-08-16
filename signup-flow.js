<!-- filename: signup-flow.js -->
<script>
/**
 * - this is frontend-only “signup” flow for demo.
 * - we intercept clicks on [data-signup="event|project"] buttons.
 * - if user "logged in" (we just check localStorage for now), we confirm on-site,
 *   save a "signed up" flag locally, then open the external link in a new tab.
 * - when you wire backend, swap the TODO block with a POST to our API.
 */

// quick fake auth flag so UI can block if needed (you’ll replace this with real auth)
const AUTH_KEY = "cunyserve_auth"; // { isLoggedIn: true, name: "..." }
function isLoggedIn() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}").isLoggedIn === true; }
  catch { return false; }
}

// signed-up lists (so buttons can flip to "Signed up")
const SIGNUP_EVENTS_KEY   = "cunyserve_signedup_events";
const SIGNUP_PROJECTS_KEY = "cunyserve_signedup_projects";

function _list(key){ return JSON.parse(localStorage.getItem(key) || "[]"); }
function _save(key, arr){ localStorage.setItem(key, JSON.stringify(arr)); }
function markSignedUp(kind, id){
  const key = kind === "event" ? SIGNUP_EVENTS_KEY : SIGNUP_PROJECTS_KEY;
  const list = _list(key);
  if (!list.includes(id)) { list.push(id); _save(key, list); }
}
window.hasSignedUp = function(kind, id) {
  const key = kind === "event" ? SIGNUP_EVENTS_KEY : SIGNUP_PROJECTS_KEY;
  return _list(key).includes(id);
};

// tiny confirm toast/modal
function confirmSignupUI({title, host, whenText}) {
  return new Promise(resolve => {
    const wrap = document.createElement("div");
    wrap.className = "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4";
    wrap.innerHTML = `
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-5">
        <h3 class="text-lg font-semibold text-[#0056b3]">${title}</h3>
        <p class="text-sm text-gray-600 mt-1">${host ? host : ""} ${whenText ? "· " + whenText : ""}</p>
        <p class="text-sm text-gray-700 mt-3">We’ll record your signup here first, then open the partner’s page so you can finish.</p>
        <div class="mt-5 flex gap-2 justify-end">
          <button id="sgn-cancel" class="px-3 py-2 rounded-xl bg-gray-100 text-gray-700">Cancel</button>
          <button id="sgn-ok" class="px-3 py-2 rounded-xl bg-[#0056b3] text-white">Confirm signup</button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
    wrap.querySelector("#sgn-cancel").onclick = () => { document.body.removeChild(wrap); resolve(false); };
    wrap.querySelector("#sgn-ok").onclick     = () => { document.body.removeChild(wrap); resolve(true);  };
  });
}

function requireLoginUI() {
  // super lightweight nudge. Replace with real redirect to your login page if you have it.
  alert("Please log in to sign up.");
  // window.location.href = "/login"; // uncomment when login exists
}

async function handleSignupClick(e) {
  const el = e.target.closest("[data-signup]");
  if (!el) return;

  e.preventDefault();

  const kind = el.getAttribute("data-signup");       // "event" | "project"
  const id   = el.getAttribute("data-id");           // internal id
  const title = el.getAttribute("data-title") || "";
  const host  = el.getAttribute("data-org") || "";
  const when  = el.getAttribute("data-when") || "";
  const requiresLogin = el.getAttribute("data-requires-login") === "true";
  const externalUrl   = el.getAttribute("data-external-url") || ""; // partner link
  const internalUrl   = el.getAttribute("href") || "";              // our own route (kept for analytics/consistency)

  if (requiresLogin && !isLoggedIn()) {
    requireLoginUI();
    return;
  }

  const ok = await confirmSignupUI({title, host, whenText: when});
  if (!ok) return;

  // TODO(sabbir): call backend to create signup record:
  // await fetch('/api/signups', { method:'POST', headers:{'Content-Type':'application/json'},
  //   body: JSON.stringify({ kind, id }) });

  // update local state so the button flips instantly
  markSignedUp(kind, id);
  el.textContent = "Signed up";
  el.classList.remove("bg-[#0056b3]","hover:bg-[#0a4b95]","text-white");
  el.classList.add("bg-gray-200","text-gray-500","cursor-default");
  el.setAttribute("aria-disabled","true");

  // optional: ping our internal route for analytics (no-op for now)
  if (internalUrl && internalUrl.startsWith("/")) {
    // fetch(internalUrl, { method: 'POST' }).catch(()=>{});
  }

  // finally open the partner’s page so they can finish
  if (externalUrl) window.open(externalUrl, "_blank", "noopener");
}

document.addEventListener("click", handleSignupClick);
</script>
