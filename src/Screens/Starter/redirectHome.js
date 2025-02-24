export const redirectHome = (routeData, questions, prevCorrect, history) => {
  if (routeData.count >= questions.length) {
    console.log("inside redirect function");
    let guestCoins;
    if (sessionStorage.getItem("claimedCoins")) {
      guestCoins = { coins: prevCorrect * 50 + 5000 };
    } else {
      guestCoins = { coins: prevCorrect * 50 };
    }

    sessionStorage.setItem("localCoins", JSON.stringify(guestCoins));

    return true;
  }
};
