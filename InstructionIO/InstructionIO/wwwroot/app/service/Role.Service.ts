import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RoleData } from "../model/RoleData";

@Injectable()
export class RoleService {
    public roleinfo: RoleData;

    constructor(private http: Http) {
        
    }

    getDataRole() {
        
        return this.http.get('/api/profile/roleinfo').map(res => (res).json());
    }

    
}