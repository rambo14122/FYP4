import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StatusProvider} from '../../providers/tables/status/status';
import {GroupProvider} from '../../providers/tables/group/group';
import {GameProvider} from '../../providers/tables/game/game';


@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(private gameProvider: GameProvider, private statusProvider: StatusProvider, private groupProvider: GroupProvider, public navCtrl: NavController, public navParams: NavParams) {
  }


  joinGroup() {

  }

  puzzleSolve(puzzleId) {
    console.log("test");
  }

  startGame() {
    this.statusProvider.groupStart().then((res) => {
    }).catch((err) => {
    });
  }
}
