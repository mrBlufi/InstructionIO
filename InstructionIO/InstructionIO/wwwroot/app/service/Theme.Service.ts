import { Injectable } from '@angular/core';

@Injectable()
export class    ThemeService {
    public theme: string='light';

    constructor() {

    }
    setTheme(theme: string) {
        this.theme=theme;
    }

    getTheme() {
        return this.theme;
    }


}