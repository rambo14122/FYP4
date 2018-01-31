import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Location} from '../../../assets/models/interfaces/Location';
import * as firebase from 'firebase';


@Injectable()
export class GroupProvider {

  readonly GROUP_TABLE = '/GroupTable';
  groupTableRef = firebase.database().ref(this.GROUP_TABLE);
  groupTableInfo: Location[];
  groupTableInfoKeys = [];
  readonly GROUP_TABLE_UPDATE = "groupTableUpdate";

  constructor(public http: HttpClient) {
  }

}
