// const sendErrorToBackend = async (error, context) => {
//   try {
//     await axios.post("/api/error-report", {
//       error: {
//         message: error.message,
//         stack: error.stack,
//       },
//       context,
//     });
//   } catch (err) {
//     console.error("Error reporting failed:", err);
//   }
// };

// utils/discord-notification.js
const sendErrorToDiscord = async (error, context) => {
  // const webhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_URL;
  // // Add Discord user IDs to env variables or configure as needed
  // const userIds = process.env.REACT_APP_DISCORD_NOTIFY_USERS?.split(",") || [];

  // if (!webhookUrl) {
  //   console.error("Discord webhook URL not configured");
  //   return;
  // } 

  // const embed = {
  //   title: "API Error Occurred",
  //   description: `**Error**: ${error.message}\n**Path**: ${window.location.pathname}\n**Context**: ${context}`,
  //   color: 0xff0000,
  //   timestamp: new Date().toISOString(),
  // };

  // // Create mentions string if there are user IDs
  // const mentions =
  //   userIds.length > 0
  //     ? userIds
  //         .map((id, index) => (index === 0 ? `<@&${id}>` : `<@${id}>`))
  //         .join(" ") + " New error reported!"
  //     : "";

  // try {
  //   await fetch(webhookUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       content: mentions || undefined, // Only include content if there are mentions
  //       embeds: [embed],
  //     }),
  //   });
  // } catch (err) {
  //   console.error("Failed to send Discord notification:", err);
  // }
};

export default sendErrorToDiscord;
