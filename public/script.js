// script.js
document.getElementById("check-api")?.addEventListener("click", async () => {
  try {
    const resp = await fetch("/matrix");
    const json = await resp.json();
    document.getElementById("apiResult").textContent = json.message;

    console.log("%cHint:", "color: orange; font-weight: bold;");
    console.log("Check DevTools → Network → /matrix→ Headers → X-CTF-Flag");
  } catch (err) {
    document.getElementById("apiResult").textContent = "Error: " + err;
  }
});
