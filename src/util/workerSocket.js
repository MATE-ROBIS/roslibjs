import work from 'webworkify';
import workerSocketImpl from './workerSocketImpl';

export default class WorkerSocket {
  constructor(uri) {
    this.onclose = undefined;
    this.onerror = undefined;
    this.onopen = undefined;
    this.onmessage = undefined;
    this.socket_ = work(workerSocketImpl);

    this.socket_.addEventListener(
      'message',
      this.handleWorkerMessage_.bind(this)
    );

    this.socket_.postMessage({
      uri: uri
    });
  }
  handleWorkerMessage_(ev) {
    var data = ev.data;
    if (data instanceof ArrayBuffer || typeof data === 'string') {
      // binary or JSON message from rosbridge
      this.onmessage(ev);
    } else {
      // control message from the wrapped WebSocket
      var type = data.type;
      if (type === 'close') {
        this.onclose(null);
      } else if (type === 'open') {
        this.onopen(null);
      } else if (type === 'error') {
        this.onerror(null);
      } else {
        throw 'Unknown message from workersocket';
      }
    }
  }
  send(data) {
    this.socket_.postMessage(data);
  }
  close() {
    this.socket_.postMessage({
      close: true
    });
  }
}
