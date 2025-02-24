export default function main() {
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };
  const checkPermission = () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("No support for service worker!");
    }

    if (!("Notification" in window)) {
      throw new Error("No support for notification API");
    }

    if (!("PushManager" in window)) {
      throw new Error("No support for Push API");
    }
  };

  const registerSW = async () => {
    console.log("calling  registersw");
    const registration = await navigator.serviceWorker.register("sw.js");
    console.log("Service Worker registered with scope:", registration.scope);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BNpUzE5LHk7p0WamKUuJLQa2DkFbQGinHlFYGnzxAi4zkuZQ2O1H94IG9Q2t-dSy1JvXyqOGE5Kl0u_ApZQV3IQ"
      ),
    });

    sendSubscriptionToBackend(subscription);
    return registration;
  };

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      throw new Error("Notification permission not granted");
    }
  };

  const main = async () => {
    checkPermission();
    await requestNotificationPermission();
    await registerSW();
  };
  main();

  const sendSubscriptionToBackend = async (subscription) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/push/save-subscription`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(subscription),
        }
      );
      if (response.ok) {
        console.log("Subscription sent to backend successfully");
      } else {
        console.error("Failed to send subscription to backend");
      }

      return response.json();
    } catch (error) {
      console.error("Error sending subscription to backend:", error);
    }
  };
}
