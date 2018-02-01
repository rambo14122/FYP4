import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network';
import * as firebase from "firebase";

@Injectable()
export class SettingProvider {

  readonly CONNECTION_STATE = '.info/connected';
  readonly SERVER_OFFSET = '.info/serverTimeOffset';
  connectionGood = true;
  timer;
  time;

  constructor(private network: Network) {
  }

  startLocalTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.time += 1000;
      console.log(this.time);
    }, 1000);
  }

  stopLocalTimer() {
    clearInterval(this.timer);
  }

  getEstimatedServerTimeOnce() {
    var offsetRef = firebase.database().ref(this.SERVER_OFFSET);
    var promise = new Promise((resolve, reject) => {
      offsetRef.once('value').then((snapshot) => {
        var offset = snapshot.val();
        var estimatedServerTimeMs = new Date().getTime() + offset;
        this.time = parseInt(estimatedServerTimeMs);
        resolve(estimatedServerTimeMs);
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

  checkFireBaseConnection() {
    var connectedRef = firebase.database().ref(this.CONNECTION_STATE);
    connectedRef.on("value", (snapshot) => {
      if (snapshot.val() === true) {
        console.log("connected");
      } else {
      }
    });
  }

  checkConnection() {
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.connectionGood = false;
    });

    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      setTimeout(() => {
        this.connectionGood = true;
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
        if (this.network.type = 'cellular') {
          console.log('we got a cellular connection, woohoo!');
        }
      }, 3000);
    });
  }

  getFireBaseTimeStamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  snapshotToArray = (snapshot) => {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      returnArr[childSnapshot.key] = item;
    });
    return returnArr;
  }
  jsonToArray = (json) => {
    var arr = Object.keys(json).map(function (k) {
      return json[k]
    });
    return arr;
  }


}
