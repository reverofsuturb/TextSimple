const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // storing triggered events
  window.deferredPrompt = event;
});

// click event handler for the install 
butInstall.addEventListener('click', async () => {
const promptEvent = window.deferredPrompt;

if (!promptEvent) {
  return;
}

promptEvent.prompt();
// reset the prompt so it can only be used once
window.deferredPrompt = null;
});

// handler for the app installed event
window.addEventListener('appinstalled', (event) => {
  // clears the prompt
  window.deferredPrompt = null;
});
