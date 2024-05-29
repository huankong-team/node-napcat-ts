import { CQWebsocketBase } from './CQWebsocketBase.ts'

export class CQWebsocket extends CQWebsocketBase {
  // ==================Api操作=============================
  send_private_msg() {
    this.send('')
  }
}
