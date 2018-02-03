import {Injectable} from '@angular/core';
import {Status} from '../../../assets/models/interfaces/Status';
import * as firebase from 'firebase';
import {Events} from 'ionic-angular';
import {SettingProvider} from '../../setting/setting';
import {PuzzleStatus} from '../../../assets/models/interfaces/PuzzleStatus';
import {GroupStatus} from '../../../assets/models/interfaces/GroupStatus';
import {GameProvider} from '../game/game';
import {GroupProvider} from '../group/group';

@Injectable()
export class StatusProvider {
  readonly STATUS_TABLE = '/StatusTable';
  statusTableRef = firebase.database().ref(this.STATUS_TABLE);
  statusTableInfo: Status;
  readonly endTime = 'endTime';
  readonly STATUS_TABLE_UPDATE = "statusTableUpdate";
  readonly groups = "groups";
  readonly puzzles = "puzzles";
  firstTimeFlag = true;
  firstUnsolved = '';
  puzzleStatus = [] as PuzzleStatus[];
  puzzleStatusKeys = [];
  groupStatus = {} as GroupStatus;

  constructor(private groupProvider: GroupProvider, private gameProvider: GameProvider, private settingProvider: SettingProvider, private events: Events) {
  }

  initParams() {
    this.groupStatus = {} as GroupStatus;
    this.puzzleStatus = [] as PuzzleStatus[];
    this.puzzleStatusKeys = [];
  }

  getStatusTable() {
    this.statusTableRef.on('value', (snapshot) => {
      this.initParams();
      this.statusTableInfo = snapshot.val();
      console.log("statusTable,", this.statusTableInfo);
      if (this.statusTableInfo.groups != null
        && this.statusTableInfo.groups.length != 0
        && this.groupProvider.userGroupId != null
        && this.groupProvider.userGroupId != '') {
        this.groupStatus = this.statusTableInfo.groups[this.groupProvider.userGroupId];
        this.getPuzzleStatus();
      }
      this.events.publish(this.STATUS_TABLE_UPDATE);
      if (this.firstTimeFlag)
        this.firstTimeFlag = false;
    });
  }

  getPuzzleStatus() {
    console.log(this.groupStatus.puzzles);
    var groupStatusArray = this.settingProvider.jsonToArray(this.groupStatus.puzzles);
    groupStatusArray.sort((puzzle1, puzzle2) => {
      if (puzzle1.order < puzzle2.order) {
        return -1;
      }
      if (puzzle1.order > puzzle2.order) {
        return 1;
      }
      return 0;
    });
    console.log("sorted:", groupStatusArray);
    groupStatusArray = this.groupStatus.puzzles;
    this.puzzleStatus = this.groupStatus.puzzles;
    console.log("puzzleS:", this.puzzleStatus);
    this.puzzleStatusKeys = Object.keys(this.puzzleStatus);
    this.getFirstUnsolved();
  }

  getFirstUnsolved() {
    this.firstUnsolved = '';
    for (let puzzleId of this.puzzleStatusKeys) {
      if (this.puzzleStatus[puzzleId].solved == false) {
        this.firstUnsolved = puzzleId;
        break;
      }
    }
  }

  groupStart() {
    var groupStatus = {} as GroupStatus;
    groupStatus.startTime = this.settingProvider.getFireBaseTimeStamp();
    groupStatus.endTime = '';
    groupStatus.point = 50;
    groupStatus.puzzles = this.getRandomPuzzles();
    var promise = new Promise((resolve, reject) => {
      this.statusTableRef.child(this.groups).child(this.groupProvider.userGroupId).set(groupStatus).then((res) => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;

  }

  getRandomPuzzles() {
    var puzzleStatusArray = [] as PuzzleStatus[];
    var order = 0;
    var locationOrder = this.getLocationOrder();

    for (let locationId of locationOrder) {
      if (this.gameProvider.gameTableInfo[locationId].puzzles != null) {
        for (let puzzleId of this.gameProvider.puzzleInfoKeys[locationId]) {
          var puzzleStatus = this.initPuzzleStatus();
          puzzleStatus.order = order;
          puzzleStatusArray[puzzleId] = puzzleStatus;
          order++;
        }
      }
    }
    return puzzleStatusArray;
  }

  getLocationOrder() {
    var locationOrder = [];
    locationOrder[0] = this.gameProvider.gameTableInfoKeys[0];
    var random = Math.floor(Math.random() * (this.gameProvider.gameTableInfoKeys.length - 1)) + 1;
    for (var i = 0; i < this.gameProvider.gameTableInfoKeys.length - 1; i++) {
      if (random + i == this.gameProvider.gameTableInfoKeys.length)
        random = 1 - i;
      locationOrder[i + 1] = this.gameProvider.gameTableInfoKeys[random + i];
    }
    return locationOrder;
  }

  initPuzzleStatus() {
    var puzzleStatus = {} as PuzzleStatus;
    puzzleStatus.solved = false;
    puzzleStatus.solvedBy = '';
    puzzleStatus.hint1 = false;
    puzzleStatus.hint2 = false;
    return puzzleStatus;
  }

  groupFinish() {

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
