import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { CookieOptionsArgs } from "angular2-cookie/services";
@Injectable()
export class    ThemeService {
    public theme: string = 'light';
    constructor(private _cookieService: CookieService) {

    }
    
    setcookie(value: string) {
        let key = 'theme';
        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this.put(key, value, opts);
    }
    

    getCookie(key: string) {
        let cookie = this._cookieService.get(key);
        if (!cookie) return 'light';
        else
            return cookie;
    }

    put(key: string, value: string, options?: CookieOptionsArgs): void {
        this._cookieService.put(key, value, options);
    }


}