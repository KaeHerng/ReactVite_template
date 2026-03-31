export const getStats = (interviews) => {
  const stats = {
    total: interviews.length,
    interview: 0,
    pending: 0,
    completed: 0,
    accepted: 0,
    rejected: 0,
    noOffer: 0,
    noResponse: 0,
  };

  interviews.forEach(item => {
    if (item.status === "interview") stats.interview++;
    if (item.status === "pending") stats.pending++;
    if (item.status === "completed") stats.completed++;

    if (item.offerDecision === "Accepted") stats.accepted++;
    if (item.offerDecision === "Rejected") stats.rejected++;
    if (item.offerDecision === "No Offer") stats.noOffer++;
    if (item.offerDecision === "No Response") stats.noResponse++;
  });

  return stats;
};