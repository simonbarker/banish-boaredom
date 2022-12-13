const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");
const linkContainer = document.getElementById("link-container");

export let currentActivity;

export const fetchNewActivity = () => {
  fetch("https://www.boredapi.com/api/activity/")
    .then((res) => res.json())
    .then((data) => {
      activity.innerText = data.activity;
      type.innerText = data.type;
      participants.innerText = data.participants;
      price.innerText = data.price;

      if (data.link.length) {
        link.href = data.link;
        linkContainer.hidden = false;
      } else {
        linkContainer.hidden = true;
      }

      currentActivity = data;
    })
    .catch((error) => console.log(error));
};
