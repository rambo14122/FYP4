import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GameProvider} from '../../../providers/tables/game/game';
import {StatusProvider} from '../../../providers/tables/status/status';


@IonicPage()
@Component({
  selector: 'page-puzzle-solve',
  templateUrl: 'puzzle-solve.html',
})
export class PuzzleSolvePage {
  puzzleId = '';
  lock = false;

  constructor(private gameProvider: GameProvider, private statusProvider: StatusProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.puzzleId = this.navParams.get('puzzleId');
  }

  answerPuzzle() {
    this.lock = true;
    this.statusProvider.answerPuzzle(this.puzzleId).then((res) => {
      this.statusProvider.changePoint(this.statusProvider.answerPoint).then((res) => {
        this.lock = false;
        if (res) {
          this.navCtrl.pop();
        }
      }).catch((err) => {
        this.lock = false;
      });
    }).catch((err) => {
      this.lock = false;
    });
  }

  viewHint1() {
    if (this.checkPoint()) {
      this.lock = true;
      this.statusProvider.viewHint1(this.puzzleId).then((res) => {
        this.statusProvider.changePoint(this.statusProvider.hintPoint).then((res) => {
          this.lock = false;
        }).catch((err) => {
          this.lock = false;
        });
      }).catch((err) => {
        this.lock = false;
      });
    }
  }

  viewHint2() {
    if (this.checkPoint()) {
      this.lock = true;
      this.statusProvider.viewHint2(this.puzzleId).then((res) => {
        this.statusProvider.changePoint(this.statusProvider.hintPoint).then((res) => {
          this.lock = false;
        }).catch((err) => {
          this.lock = false;
        });
      }).catch((err) => {
        this.lock = false;
      });
    }
  }

  checkPoint() {
    if (this.statusProvider.groupStatus.point < 20) {
      //to do
      return false
    }
    return true;
  }
}
