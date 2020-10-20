
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

const recursionClick = (target, row, column) => {
  target.id = `${row}_${column}_`;
  let rowList = [row - 1, row, row + 1];
  let colList = [column - 1, column, column + 1];
  for (let i of rowList) {
    for (let j of colList) {
      setImmediate(() => {
        if (document.getElementById(`${i}_${j}`))
          document.getElementById(`${i}_${j}`).click();
      });
    }
  }
  return;
}

const endGame = (target) => {
  endMineSweeperGame = true;
  target.style.backgroundColor = "black";
  let cols = target.parentElement.children.length;
  let rows = target.parentElement.parentElement.children.length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (document.getElementById(`${i}_${j}`))
        document.getElementById(`${i}_${j}`).click();
    }
  }
  return;
}


module.exports = {
  createMap,
  fillMap,
  adjacentCellsValues,
  recursionClick,
  endGame
}