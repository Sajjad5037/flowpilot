import reviewCycles from "../mock/reviewCycles.json";

export async function getReviewCycles() {
  return reviewCycles;
}

export async function updateReviewCycle(id, sendDate) {
  console.log("Updating Review Cycle", {
    id,
    sendDate,
  });

  return {
    success: true,
  };
}