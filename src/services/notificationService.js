import { mockNotifications } from "../mock/notifications";

console.log("notificationService loaded");

const notificationService = {
  async getNotifications() {
    return mockNotifications;
  },

  async getTopbarNotifications() {
    return mockNotifications.notifications;
  },
};

export default notificationService;