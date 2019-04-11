function copyArray(source) {
  //深复制
  let index = -1;
  const length = source.length || 0;
  let array = new Array(length);
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
export {
  copyArray
}
