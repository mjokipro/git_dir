function squares(nums1, nums2) {
  if (nums1.length !== nums2.length) {
    return false;
  }

  for (let i = 0; i < nums1.length; i++) {
    let correctIndex = nums2.indexOf(nums1[i] ** 2);

    if (correctIndex === -1) {
      return false;
    }

    nums2.splice(correctIndex, 1);
  }

  return true;
}
// end squares

function squaresWithFreqCounter(nums1, nums2) {
  if (nums1.length !== nums2.length) return false;

  let nums1Freqs = createFrequencyCounter(nums1);
  let nums2Freqs = createFrequencyCounter(nums2);

  for (let key of nums1Freqs.keys()) {
    if (nums2Freqs.has(key ** 2) === false) {
      return false;
    }

    if (nums2Freqs.get(key ** 2) !== nums1Freqs.get(key)) {
      return false;
    }
  }

  return true;
}
// end squaresWithFreqCounter