const CONFIG = {
voteUrl: "https://minecraft-mp.com/server/359176/vote/",

socials: {
tiktok: "https://vm.tiktok.com/ZS9DdjvLSHUoW-38MWP/",
whatsapp: "https://chat.whatsapp.com/IUWAK1QBRRu8ANo3fMXPwW?s=cl&p=a&mlu=0&ilr=0",
discord: "https://discord.gg/nx9aeJKHht"
},

minecraftStatusUrl:
"https://api.mcsrvstat.us/3/minexus.my.id"
};

/* =========================
START
========================= */

document.addEventListener("DOMContentLoaded", () => {
setupMobileMenu();
setupVoteButton();
setupSocialLinks();
fetchPlayerCount();
});

/* =========================
MOBILE NAVBAR
========================= */

function setupMobileMenu() {
const menuToggle =
document.getElementById("menuToggle");

const navLinks =
document.getElementById("navLinks");

if (!menuToggle || !navLinks) {
return;
}

menuToggle.addEventListener("click", () => {
const isOpen =
navLinks.classList.toggle("open");

menuToggle.setAttribute(
  "aria-expanded",
  String(isOpen)
);

menuToggle.textContent =
  isOpen ? "✕" : "☰";

});

navLinks.querySelectorAll("a").forEach((link) => {

link.addEventListener("click", () => {

  navLinks.classList.remove("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  menuToggle.textContent = "☰";

});

});
}

/* =========================
VOTE BUTTON
========================= */

function setupVoteButton() {
const voteButton =
document.getElementById("voteButton");

if (!voteButton) {
return;
}

voteButton.href =
CONFIG.voteUrl;

if (CONFIG.voteUrl === "#") {

voteButton.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    alert(
      "Link vote belum diatur."
    );

  }
);

}
}

/* =========================
SOCIAL LINKS
========================= */

function setupSocialLinks() {

const socialLinks =
document.querySelectorAll(
".social-icon"
);

socialLinks.forEach((link) => {

const label =
  link.getAttribute("aria-label");


let url = "#";


if (label === "TikTok") {
  url = CONFIG.socials.tiktok;
}

if (label === "WhatsApp") {
  url = CONFIG.socials.whatsapp;
}

if (label === "Discord") {
  url = CONFIG.socials.discord;
}


link.href = url;


if (url === "#") {

  link.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

    }
  );

}

});

}

/* =========================
PLAYER COUNT
========================= */

async function fetchPlayerCount() {

const playerCount =
document.getElementById(
"playerCount"
);

if (!playerCount) {
return;
}

try {

const response =
  await fetch(
    CONFIG.minecraftStatusUrl,
    {
      method: "GET",
      cache: "no-store"
    }
  );


if (!response.ok) {
  throw new Error(
    `HTTP ${response.status}`
  );
}


const data =
  await response.json();


if (data.online === true) {

  const online =
    Number(
      data.players?.online ?? 0
    );


  const max =
    Number(
      data.players?.max ?? 0
    );


  if (max > 0) {

    playerCount.textContent =
      `${online} / ${max}`;

  } else {

    playerCount.textContent =
      `${online}`;

  }


  return;

}


playerCount.textContent =
  "Offline";

} catch (error) {

console.error(
  "Gagal mengambil status server:",
  error
);


playerCount.textContent =
  "Unavailable";

}

}

/* =========================
AUTO REFRESH PLAYER
========================= */

setInterval(
fetchPlayerCount,
60000
);