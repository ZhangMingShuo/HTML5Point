/* web worker 完成运算可使用postMessage通知页面
worker创建完成后,会等待包含图像数据和开始模糊指令的消息 */
importScripts('./blur.js')

addEventListener('message', messageHandler, true)

function messageHandler(e) {
  let messageType = e.data.type
  switch (messageType){
    case ('blur'): 
      sendStatus(`worker started blur on data in range: ${e.data.startX} - ${e.data.startX + e.data.width}`)
      let imageData = e.data.imageData
      imageData = boxBlur(imageData, e.data.width, e.data.height, e.data.startX)
      postMessage({
        'type': 'progress',
        'imageData': imageData,
        'width': e.data.width,
        'height': e.data.height,
        'startX': e.data.startX
      })
      sendStatus(`finished blur on data in range: ${e.data.startX} - ${e.data.width+e.data.startX}`)
      break
    default:
      sendStatus(`worker got message ${e.data}`)
  }
}

function sendStatus(statusText) {
  postMessage({
    'type': 'status',
    'statusText': statusText
  })
}

