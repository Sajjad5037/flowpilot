import notifications from "../mock/notifications.json";

const notificationService = {
  async getNotifications() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(notifications);
      }, 200);
    });
  },
};

export default notificationService;