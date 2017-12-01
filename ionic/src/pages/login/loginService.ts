import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
import { APP_SERVE_URL } from '../../providers/Constants';

@Injectable ()
export class LoginService {
    constructor(private httpService: HttpService){

    }

    getUser() {
        return this.httpService.get(APP_SERVE_URL + '/user',null);
    }

    findList(param) {
        return this.httpService.post(APP_SERVE_URL + '后端地址',param);
    }

    save(UserInfo) {
        return this.httpService.post(APP_SERVE_URL + '后端地址',UserInfo);
    }
}