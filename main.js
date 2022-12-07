const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");
const linkContainer = document.getElementById("link-container");
const list = document.getElementById("list");
const placeholderCard = document.getElementById("placeholder-card");

let currentActivity;

const fetchNewActivity = () => {
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
  const savedActivitiesString = localStorage.getItem("activities");

  const savedActivities = JSON.parse(savedActivitiesString) ?? [];

  savedActivities.push(currentActivity);

  localStorage.setItem("activities", JSON.stringify(savedActivities));

  fetchNewActivity();
  renderList();
};

const likeButton = document.getElementById("like-button");
likeButton.onclick = onLikeClicked;

const deleteActivity = (key) => {
  const savedActivitiesString = localStorage.getItem("activities");

  const savedActivities = JSON.parse(savedActivitiesString) ?? [];

  const updatedActivities = savedActivities.filter(
    (activity) => activity.key !== key
  );

  localStorage.setItem("activities", JSON.stringify(updatedActivities));

  renderList();
};

const clearList = () => {
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
};

const renderList = () => {
  clearList();

  const savedActivitiesString = localStorage.getItem("activities");

  const savedActivities = JSON.parse(savedActivitiesString) ?? [];

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
