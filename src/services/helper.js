function newId (arr) {
  const max = Math.max(...arr);
  return !isFinite(max) || isNaN(max) ? 1 : max + 1;
}

function fixArr (arr) {
  return arr && arr.length > 0 ? arr.filter(x => !!x) : []
}

export default {
  newId,
  fixArr
}
