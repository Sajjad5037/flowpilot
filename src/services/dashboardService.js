import dashboardData from "../mock/dashboard.json";

class DashboardService {
  async getDashboard() {
    // Simulate an API request
    await new Promise((resolve) => setTimeout(resolve, 300));

    return dashboardData;
  }

  async getStatistics() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.statistics;
  }

  async getActivities() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.activities;
  }

  async getNotifications() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.notifications;
  }

  async getMeetings() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.meetings;
  }

  async getMonthlyReviews() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.monthlyReviews;
  }

  async getDepartmentPerformance() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.departmentPerformance;
  }

  async getReviewStatus() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.reviewStatus;
  }

  async getQuickActions() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.quickActions;
  }

  async getUpcomingReviewCycles() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.upcomingReviewCycles;
  }

  async getTopPerformers() {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return dashboardData.topPerformers;
  }
}

export default new DashboardService();