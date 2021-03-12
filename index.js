const WebSocket = require('ws');
var atob = require('atob');
var {MsgData} = require('./chain');

var ws = new WebSocket('wss://rpc.cosmos.network:443/websocket');


String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));//from   w w w . j a va  2 s  . com
  }
  return bytes;
};

ws.on('open', function open() {
  ws.send( JSON.stringify({
    jsonrpc: '2.0',
    method: 'subscribe',
    id: '1',
    params: ["tm.event='Tx'"],
  }));
});

ws.on('message', function incoming(data) {
  let encoded= atob(data.result.data.value.TxResult.result.data)
  let binary = encoded.getBytes()
  console.log('Chain Create Captured!!!')
  console.log(MsgData.decode(new Uint8Array(binary.slice(3)))) //slice 3 is removing the length prefix framing which must be handled outside the deseriealizer
});