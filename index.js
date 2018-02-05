let canvasEl = document.getElementById('canvas'),
    ctx = canvasEl.getContext('2d');

function drawNthCurve(n) {
  ctx.fillStyle = 'black'
  const { width, height } = canvasEl
  ctx.fillRect(0,0,width,height);
  ctx.strokeStyle = 'white'
  ctx.beginPath()
  fillCurve([[0,0],[width,height]],n);
  ctx.stroke();
}

// let quadrantPoints = [
//   [ width / 4, height * 3 / 4 ],
//   [ width / 4, height / 4 ],
//   [ width * 3 / 4, height / 4 ],
//   [ width * 3 / 4, height * 3 / 4 ]
// ]
// ctx.moveTo(...quadrantPoints[0])
// for (let i = 1; i < quadrantPoints.length; i++) {
//   ctx.lineTo(...quadrantPoints[i])
// }

function center(topLeft,btmRight) {
  return [
    (btmRight[0] + topLeft[0]) / 2,
    (btmRight[1] + topLeft[1]) / 2
  ]
}

const f = {0:0,1:3,2:2,3:1},
      g = {0:2,1:1,2:0,3:3};

function quadrants(square, rflct) {
  let [x1,y1] = square[0],
      [x2,y2] = square[1],
      xMid = (x1 + x2) / 2,
      yMid = (y1 + y2) / 2,
      qs = new Array(4);

  function reflectIdx(i,ref) {
    if (ref[0]) i = f[i];
    if (ref[1]) i = g[i];
    return i;
  }

  qs[reflectIdx(0,rflct)] = [[x1,yMid],[xMid,y2]]
  qs[reflectIdx(1,rflct)] = [[x1,y1],[xMid,yMid]]
  qs[reflectIdx(2,rflct)] = [[xMid,y1],[x2,yMid]]
  qs[reflectIdx(3,rflct)] = [[xMid,yMid],[x2,y2]]

  return qs
}

function fillCurve(square, n, rflct = [false,false]) {
  if (n < 1) return;
  
  let qs = quadrants(square, rflct)
  if (n == 1) {
    for (let i = 0; i < qs.length; i++)
      ctx.lineTo(...center(...qs[i]));
  }
  else {
    fillCurve(qs[0], n - 1, [!rflct[0],rflct[1]])
    fillCurve(qs[1], n - 1, rflct)
    fillCurve(qs[2], n - 1, rflct)
    fillCurve(qs[3], n - 1, [rflct[0],!rflct[1]])
  }
}

let input = document.getElementById('iter')
input.onclick = (e) => drawNthCurve(e.target.value);
drawNthCurve(input.value)
/*
recursion(n)
outer:
  i = 0
inner:
  i++
  if (i < n)
    divide into quadrants with orientation
    foreach quadrant call self
    moveTo "bottomleft",
    line around quadrant points


*/
