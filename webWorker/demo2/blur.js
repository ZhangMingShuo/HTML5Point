/* 通过求附近像素值的平均值对图像进行模糊处理 */
/* 在UI线程中,这种循环终止之前用户界面可能无法响应用户的其他操作,不过使用web worker后台操作执行计算就可以接受了 */

function inRange(i, width, height) {
  return ((i >= 0) && (i < width * height * 4))
}

function averageNeighbors(imageData, width, height, i) {
  let v = imageData[i]
  //主方向
  let north = inRange(i - width * 4, width, height) ? imageData[i - width * 4] : v
  let south = inRange(i + width * 4, width, height) ? imageData[i + width * 4] : v
  let west = inRange(i - 4, width, height) ? imageData[i - 4] : v
  let east = inRange(i + 4, width, height) ? imageData[i + 4] : v
  //相邻对角线
  let ne = inRange(i - width * 4 + 4, width, height) ? imageData[i - width * 4 + 4] : v
  let nw = inRange(i - width * 4 - 4, width, height) ? imageData[i - width * 4 - 4] : v
  let se = inRange(i + width * 4 + 4, width, height) ? imageData[i + width * 4 + 4] : v
  let sw = inRange(i + width * 4 - 4, width, height) ? imageData[i + width * 4 - 4] : v
  //平均
  let newVal = Math.floor((north + south + east + west + se + sw + ne + nw + v)/9)

  if(isNaN(newVal)){
    sendStatus(`bad value ${i} for height ${height}`)
    throw new Error('NaN')
  }
  return newVal
}

function boxBlur(imageData, width, height) {
  let data = []
  let val = 0
  for(let i = 0; i < width * height * 4; i++){
    val = averageNeighbors(imageData, width, height, i)
    data[i] = val
  }
  return data
}