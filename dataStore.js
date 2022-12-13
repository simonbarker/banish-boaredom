export class DataStore {
  constructor(saveKey) {
    this.saveKey = saveKey;
  }

  getActivities() {
    const savedActivitiesString = localStorage.getItem(this.saveKey);

    return JSON.parse(savedActivitiesString) ?? [];
  }

  addActivity(newActivity) {
    const savedActivitiesString = localStorage.getItem("activities");

    const savedActivities = JSON.parse(savedActivitiesString) ?? [];

    savedActivities.push(newActivity);

    localStorage.setItem("activities", JSON.stringify(savedActivities));
  }

  deleteActivity(key) {
    const savedActivitiesString = localStorage.getItem("activities");

    const savedActivities = JSON.parse(savedActivitiesString) ?? [];

    const updatedActivities = savedActivities.filter(
      (activity) => activity.key !== key
    );

    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  }
}
