export function getBubbleSortAnimation(array: number[]) {
  const animations: any[] = [];
  if (array.length <= 1) {
    return array;
  }
  const cloneArray = array.slice();
  while (cloneArray.length > 0) {
    for (let j = 0; j < cloneArray.length - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (cloneArray[j] > cloneArray[j + 1]) {
        let swap = cloneArray[j];
        cloneArray[j] = cloneArray[j + 1];
        animations.push([j, cloneArray[j]]);
        cloneArray[j + 1] = swap;
        animations.push([j + 1, cloneArray[j + 1]]);
      } else {
        animations.push([j, cloneArray[j]]);
        animations.push([j + 1, cloneArray[j + 1]]);
      }
    }
    cloneArray.pop();
  }
  console.log(cloneArray);
  return animations;
}
