export function getMergeSortAnimation(array: number[]) {
  const animations: any[] = [];
  if (array.length <= 1) {
    return array;
  }
  const cloneArray = array.slice();
  mergeSort(array, 0, array.length - 1, cloneArray, animations);
  return animations;
}
function mergeSort(
  array: number[],
  startidx: number,
  endidx: number,
  cloneArray: number[],
  animations: any[]
) {
  if (startidx === endidx) return;
  const mididx = Math.floor((startidx + endidx) / 2);
  mergeSort(cloneArray, startidx, mididx, array, animations);
  mergeSort(cloneArray, mididx + 1, endidx, array, animations);
  merge(array, startidx, mididx, endidx, cloneArray, animations);
}
function merge(
  array: number[],
  startidx: number,
  mididx: number,
  endidx: number,
  cloneArray: number[],
  animations: any[]
) {
  let [k, i, j] = [startidx, startidx, mididx + 1];
  //Merge equal parts
  while (i <= mididx && j <= endidx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (cloneArray[i] <= cloneArray[j]) {
      animations.push([k, cloneArray[i]]);
      array[k++] = cloneArray[i++];
    } else {
      animations.push([k, cloneArray[j]]);
      array[k++] = cloneArray[j++];
    }
  }
  //Merge leftover
  while (i<= mididx){
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, cloneArray[i]])
    array[k++] = cloneArray[i++]
  }
  while (j<= endidx){
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, cloneArray[j]])
    array[k++] = cloneArray[j++]
  }
}
