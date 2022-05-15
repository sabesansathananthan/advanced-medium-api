const sortDate = (a, b) => {
  if (a.pubDate > b.pubDate) return -1;
  if (a.pubDate < b.pubDate) return 1;
  return 0;
};

module.exports = sortDate;
