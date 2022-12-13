import { currentActivity, fetchNewActivity } from "./api.js";
import { DataStore } from "./dataStore.js";

const dataStore = new DataStore("activities");

const list = document.getElementById("list");
const placeholderCard = document.getElementById("placeholder-card");

const onBoredClicked = () => {
  fetchNewActivity();
};

const boredButton = document.getElementById("bored-button");
boredButton.onclick = onBoredClicked;

const onNopeClicked = () => {
  fetchNewActivity();
};

const nopeButton = document.getElementById("nope-button");
nopeButton.onclick = onNopeClicked;

const onLikeClicked = () => {
  dataStore.addActivity(currentActivity);
  fetchNewActivity();
  renderList();
};

const likeButton = document.getElementById("like-button");
likeButton.onclick = onLikeClicked;

const deleteActivity = (key) => {
  dataStore.deleteActivity(key);

  renderList();
};

const clearList = () => {
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
};

const renderList = () => {
  clearList();

  const savedActivities = dataStore.getActivities();

  savedActivities.forEach((savedActivity) => {
    const newCard = placeholderCard.cloneNode(true);
    console.log(savedActivity);
    newCard.id = savedActivity.key;

    const newCardActivity = newCard.querySelector(".activity");
    newCardActivity.innerText = savedActivity.activity;

    const newCardType = newCard.querySelector(".type");
    newCardType.innerText = savedActivity.type;

    const newCardParticipants = newCard.querySelector(".participants");
    newCardParticipants.innerText = savedActivity.participants;

    const newCardPrice = newCard.querySelector(".price");
    newCardPrice.innerText = savedActivity.price;

    if (savedActivity.link) {
      const newCardLink = newCard.querySelector(".link");
      const newCardLinkContainer = newCard.querySelector(".link-container");

      newCardLink.href = savedActivity.link;
      newCardLinkContainer.hidden = false;
    }

    const newCardDeleteButton = newCard.querySelector(".delete-button");
    newCardDeleteButton.onclick = () => {
      deleteActivity(savedActivity.key);
    };

    list.appendChild(newCard);
  });
};

window.onload = () => {
  renderList();
  fetchNewActivity();
};
