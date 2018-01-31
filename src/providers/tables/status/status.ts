import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StatusProvider {

  constructor(public http: HttpClient) {
  }

}
