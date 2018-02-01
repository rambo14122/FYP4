import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Group} from '../../../assets/models/interfaces/Group';
import {SettingProvider} from '../../setting/setting';
import {Events} from 'ionic-angular';
import {UserProvider} from '../user/user';


@Injectable()
export class GroupProvider {

  readonly GROUP_TABLE = '/GroupTable';
  groupTableRef = firebase.database().ref(this.GROUP_TABLE);
  groupTableInfo: Group[];
  groupTableInfoKeys = [];
  readonly GROUP_TABLE_UPDATE = "groupTableUpdate";
  readonly groupSyncTime = 'groupSyncTime';
  firstTimeFlag = true;
  userGroupId = '';
  groupLeaderFlag = false;


  constructor(private settingProvider: SettingProvider, private events: Events, private userProvider: UserProvider) {
  }

  getGroupTable() {
    this.groupTableRef.on('value', (snapshot) => {
      this.groupTableInfo = this.settingProvider.snapshotToArray(snapshot);
      this.groupTableInfo.sort(((group1, group2) => {
        if (group1.groupNumber < group2.groupNumber)
          return -1;
        if (group1.groupNumber > group2.groupNumber)
          return 1;
        return 0;
      }));
      this.groupTableInfoKeys = Object.keys(this.groupTableInfo);
      this.updateUserGroupStatus();
      console.log("user group status", this.userGroupId);
      this.events.publish(this.GROUP_TABLE_UPDATE);
    });
  }

  updateUserGroupStatus() {
    this.firstTimeFlag = false;
    this.userGroupId = '';
    this.groupLeaderFlag = false;

    for (let groupId of this.groupTableInfoKeys) {
      if (this.groupTableInfo[groupId].members.indexOf(this.userProvider.getUid()) > -1) {
        this.userGroupId = groupId;
        if (this.groupTableInfo[groupId].groupCreator == this.userProvider.getUid()) {
          this.groupLeaderFlag = true;
        }
        break;
      }
    }
  }
  quitGroup()
  {
    
  }

  createGroup(groupTemp) {
    groupTemp.groupSyncTime = this.settingProvider.getFireBaseTimeStamp();
    var promise = new Promise(((resolve, reject) => {
      this.settingProvider.getEstimatedServerTimeOnce().then((res) => {
        this.groupTableRef.child(res + '').set(groupTemp).then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      });
    }));
    return promise;
  }

  joinGroup(groupId) {
    var promise = new Promise((resolve, reject) => {
      this.getGroupSynTime(groupId).then((res) => {
        if (res != this.groupTableInfo[groupId].groupSyncTime) {
          reject("Network busy, join again later");
        }
        else {
          this.groupTableInfo[groupId].groupSyncTime = this.settingProvider.getFireBaseTimeStamp();
          this.groupTableInfo[groupId].members.push(this.userProvider.getUid());
          this.groupTableRef.child(groupId).update(this.groupTableInfo[groupId]).then((res) => {
            resolve(true)
          }).catch((err) => {
            reject(err);
          })
        }
      }).catch((err) => {
        reject(err);
      })

    })
    return promise;
  }

  quitGroup(groupId) {
  }

  getGroupSynTime(groupId) {
    var promise = new Promise((resolve, reject) => {
      this.groupTableRef.child(groupId).child(this.groupSyncTime).once('value').then((snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

}
