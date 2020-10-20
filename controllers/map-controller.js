
const createMap = (row, col) => {
  let outerArray = [];
  for (let i = 0; i < row; i++) {
    let innerArray = [];
    for (let j = 0; j < col; j++) {
      innerArray.push("");
    }
    outerArray.push(innerArray);
  }
  return outerArray;
}

const fillMap = (map, val, count) => {
  let rows = map.length;
  let cols = map[0].length;
  while (count) {
    let y = floorRand(rows);
    let x = floorRand(cols);
    if (!map[y][x]) {
      map[y][x] = val;
      count--;
    }
  }
  return map
};

const floorRand = (scale) => {
  return Math.floor(Math.random() * scale);
};

const  adjacentCellsValues = ( map, val) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === val) {
        map = addOneNestedArrAdjacents(map, i, j, val);
      }
    }
  }
  return map;
}

const addOneNestedArrAdjacents = ( map, i,j, val) => {
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    if (map[a]) {
      for (let b of jList) {
        if (map[a][b] !== undefined && map[a][b] !== val) {
          if (typeof map[a][b] !== "number") map[a][b] = 0;
          map[a][b]++;
        }
      }
    }
  }
  return map;
}

module.exports = {
  createMap,
  fillMap,
  adjacentCellsValues
}