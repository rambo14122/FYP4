import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {SettingProvider} from '../../setting/setting';
import {Events} from 'ionic-angular';
import {Location} from '../../../assets/models/interfaces/Location';

@Injectable()
export class GameProvider {
  readonly GAME_TABLE = '/GameTable';
  gameTableRef = firebase.database().ref(this.GAME_TABLE);
  gameTableInfo: Location[];
  gameTableInfoKeys = [];
  puzzleInfoKeys = [];
  readonly GAME_TABLE_UPDATE = "gameTableUpdate";

  constructor(private events: Events, private settingProvider: SettingProvider) {

  }

  getGameTable() {
    this.gameTableRef.on('value', (snapshot) => {
      this.gameTableInfo = this.settingProvider.snapshotToArray(snapshot);
      this.gameTableInfo.sort(((location1, location2) => {
        if (location1.order < location2.order)
          return -1;
        if (location1.order > location2.order)
          return 1;
        return 0;
      }));

      this.gameTableInfoKeys = Object.keys(this.gameTableInfo);
      for (let locationId of this.gameTableInfoKeys) {
        if (this.gameTableInfo[locationId].puzzles != null) {
          this.settingProvider.jsonToArray(this.gameTableInfo[locationId].puzzles).sort((puzzle1, puzzle2) => {
            if (puzzle1.order < puzzle2.order)
              return -1;
            if (puzzle1.order > puzzle2.order)
              return 1;
            return 0;
          })
          this.puzzleInfoKeys[locationId] = Object.keys(this.gameTableInfo[locationId].puzzles);
        }

      }
      this.events.publish(this.GAME_TABLE_UPDATE);
    });
  }

  updateGameTable(gameToUpdate) {
    var promise = new Promise((resolve, reject) => {
        this.gameTableRef.set(gameToUpdate).then(() => {
          resolve(true);
        }).catch((err) => {
          resolve(err);
        })
      }
    )
    return promise;
  }
}
