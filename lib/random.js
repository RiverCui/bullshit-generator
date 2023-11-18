// Fake random number generator，线性插值
export function randomInt(min=0, max=100) {
  const p = Math.random();
  return Math.floor(p * (max - min) + min);
}

// 随机选出数组中的一个元素
export function randomPick(arr) {
  const len = arr.length - 1;
  const index = randomInt(0, len);
  [arr[index], arr[len]] = [arr[len], arr[index]]
  return arr[index]
}

export function createRandomPicker(arr) {
  arr = [...arr]; // copy 数组，避免原始修改
  function randomPick() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    [arr[index], arr[len]] = [arr[len], arr[index]];
    return arr[index]
  }
  randomPick() // 抛弃第一次选择的结果
  return randomPick
}
