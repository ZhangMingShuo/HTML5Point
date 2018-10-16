addEventListener('message', messageHandler, true)

function messageHandler(e) {
  postMessage(`你传过来的数据"${e.data}"我原样给你`)
}