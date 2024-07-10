import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.stompClient = null;
  }

  createStompClient(connection, options = {}) {
    const { headers, reconnectDelay, connectTimeout, ...rest } = options;

    this.stompClient = new Client({
      brokerURL: connection,
      connectHeaders: headers ? headers : {},
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: reconnectDelay ? reconnectDelay : 5000,
      ...rest,
    });

    this.stompClient.webSocketFactory = function () {
      return new SockJS(connection);
    };

    let connectTimeoutHandler;

    this.stompClient.beforeConnect = () => {
      const self = this;
      if (!connectTimeoutHandler) {
        connectTimeoutHandler = setTimeout(
          function () {
            console.log("stomp connect timeout:", new Date());
            self.stompClient.deactivate();
            clearTimeout(connectTimeoutHandler);
          },
          connectTimeout ? connectTimeout : 5 * 1000 * 60
        );
      }
    };

    this.stompClient.onConnect = (frame) => {
      console.log("stomp Connected: " + frame);
      clearTimeout(connectTimeoutHandler);
      // Example subscription
      this.stompClient.subscribe('/topic/notifications', (message) => {
        console.log('Received: ' + message.body);
      });
    };

    this.stompClient.onDisconnect = (frame) => {
      console.log("stomp disconnected:" + frame);
      clearTimeout(connectTimeoutHandler);
    };

    this.stompClient.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    this.stompClient.debug = (str) => {
      console.log(str);
    };

    this.stompClient.activate();
    return this.stompClient;
  }

  sendMessage(message) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({ destination: '/app/send', body: message });
    } else {
      console.error('STOMP client is not connected');
    }
  }
}

const webSocketServiceInstance = new WebSocketService();
export default webSocketServiceInstance;
