export default function LocalServiceWorkerRegister() {
  const swPath = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then((registration) => {
        console.log("Service worker registered", registration);
      });
    });
  }
}
