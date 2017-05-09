function newId (arr) {
  const max = Math.max(...arr);
  return !isFinite(max) || isNaN(max) ? 1 : max + 1;
}

export default {
  newId
}
