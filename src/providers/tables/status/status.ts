import {Injectable} from '@angular/core';
import {Status} from '../../../assets/models/interfaces/Status';
import * as firebase from 'firebase';
import {Events} from 'ionic-angular';
import {SettingProvider} from '../../setting/setting';

@Injectable()
export class StatusProvider {
  readonly STATUS_TABLE = '/StatusTable';
  statusTableRef = firebase.database().ref(this.STATUS_TABLE);
  statusTableInfo: Status;
  readonly endTime = 'endTime';
  readonly STATUS_TABLE_UPDATE = "statusTableUpdate";

  constructor(private settingProvider: SettingProvider, private events: Events) {
  }

  getStatusTable() {
    this.statusTableRef.on('value', (snapshot) => {
      this.statusTableInfo = snapshot.val();
      console.log("statusTable,", this.statusTableInfo);
      this.events.publish(this.STATUS_TABLE_UPDATE);
    });
  }

  startGame() {
    var statusTemp = {} as Status;
    statusTemp.startTime = this.settingProvider.getFireBaseTimeStamp();
    statusTemp.endTime = '';
    var promise = new Promise((resolve, reject) => {
        this.statusTableRef.set(statusTemp).then((res) => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })
      }
    )
    return promise;
  }

  endGame() {
    var promise = new Promise((resolve, reject) => {
        this.statusTableRef.child(this.endTime).set(this.settingProvider.getFireBaseTimeStamp()).then((res) => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })
      }
    )
    return promise;
  }

}
