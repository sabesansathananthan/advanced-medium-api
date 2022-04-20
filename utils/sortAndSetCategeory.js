const sortAndSetCategory = (array) => {
  const allTagsWithCount = array.reduce((tagsWithCount, currentTag) => {
    tagsWithCount[currentTag] = (tagsWithCount[currentTag] || 0) + 1; //increment the number of counts of a tag
    return tagsWithCount;
  }, {});

  //sort the tag(key) according its count
  const sortedTagsArray = Object.keys(allTagsWithCount).sort((a, b) => {
    return allTagsWithCount[b] - allTagsWithCount[a];
  });
  return sortedTagsArray;
};

module.exports = sortAndSetCategory;
