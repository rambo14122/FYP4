import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GameProvider} from '../../../../providers/tables/game/game';
import {SettingProvider} from '../../../../providers/setting/setting';
import {Puzzle} from '../../../../assets/models/interfaces/Puzzle';

@IonicPage()
@Component({
  selector: 'page-puzzle-list',
  templateUrl: 'puzzle-list.html',
})
export class PuzzleListPage {
  locationId: string;
  puzzleTemp = {} as Puzzle;

  constructor(private settingProvider: SettingProvider, private gameProvider: GameProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.locationId = this.navParams.get("locationId");
    console.log("locationId", this.locationId);
    console.log(this.gameProvider.puzzleInfoKeys[this.locationId]);
    this.initPuzzle();
  }

  initPuzzle() {
    this.puzzleTemp = {} as Puzzle;
    this.puzzleTemp.title = '';
    this.puzzleTemp.strictAnswer = false;
    this.puzzleTemp.puzzleContent = '';
    this.puzzleTemp.hint1 = '';
    this.puzzleTemp.hint2 = '';
    this.puzzleTemp.answer = '';
    this.puzzleTemp.photoUrl = '';
    this.puzzleTemp.order = 0;
    this.puzzleTemp.special = false;
  }

  editPuzzle(puzzleId) {
    this.puzzleTemp = this.gameProvider.gameTableInfo[this.locationId][puzzleId];
  }

  deletePuzzle(puzzleId) {
    this.puzzleTemp = null;
    this.updatePuzzle(puzzleId);
  }

  addPuzzle() {
    console.log("clickedAdd");
    this.settingProvider.getEstimatedServerTimeOnce().then((res) => {
      console.log(res);
      this.updatePuzzle(res);
    }).catch((err) => {
    });
  }

  updatePuzzle(puzzleId) {
    this.gameProvider.updatePuzzle(this.locationId, puzzleId, this.puzzleTemp).then((res) => {
      console.log("update game table res", res)
    }).catch((err) => {
      console.log("update game table err", err);
    })
    this.initPuzzle();
  }

}
