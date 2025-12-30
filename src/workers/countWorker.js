self.onmessage = (e) => {
  const arr = e.data;

  const counts = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  self.postMessage(counts);
};
