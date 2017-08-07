"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
const core_1 = require("@angular/core");
const Home_Service_1 = require("./service/Home.Service");
const Profile_Service_1 = require("./service/Profile.Service");
const angular_l10n_1 = require("angular-l10n");
const RoleData_1 = require("./model/RoleData");
const Role_Service_1 = require("./service/Role.Service");
let ChildComponent = class ChildComponent {
    constructor(_Activatedroute, _router, homeservice, profileservice, roleservice) {
        this._Activatedroute = _Activatedroute;
        this._router = _router;
        this.homeservice = homeservice;
        this.profileservice = profileservice;
        this.roleservice = roleservice;
        this.categoryQueryParams = null;
        this.sortQueryParams = null;
        this.userQueryParams = null;
        this.searchQueryParams = null;
        this.instructions = null;
        this.stepSkip = 0;
        this.tagsearch = false;
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.infinitydisable = false;
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
        });
    }
    ngOnInit() {
        this.sub = this._Activatedroute.queryParams
            .subscribe(params => {
            this.stepSkip = 0;
            this.categoryQueryParams = params['category'];
            this.sortQueryParams = params['sort'];
            this.userQueryParams = params['user'];
            this.searchQueryParams = params['q'];
            this.tagsearch = params['tag'];
            this.getInstructions();
        }, err => console.log(err));
    }
    onClick($event, idI) {
        this.onClickResult = $event;
        if (this.roleinfo.id != -1)
            this.homeservice.setRating(idI, this.roleinfo.id, $event.rating).subscribe(data => { console.log(data); });
    }
    ;
    getInstructions() {
        if (this.searchQueryParams != null) {
            this.getInstructionsSearch();
        }
        else if (this.userQueryParams != null) {
            this.getInstructionsUser();
        }
        else {
            this.getInstructionsFullUser();
        }
    }
    setrating(ratingRelation) {
        if (ratingRelation.length == 0)
            return 0;
        let rating = 0;
        for (var i = 0; i < ratingRelation.length; i++) {
            rating += ratingRelation[i].value;
        }
        return rating / ratingRelation.length;
    }
    getInstructionsFullUser() {
        if (this.sortQueryParams == null)
            this.sortQueryParams = 'popular';
        if (this.categoryQueryParams == null)
            this.categoryQueryParams = 'Full';
        this.homeservice.getInstructionsFull(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
        }, err => console.log(err));
    }
    getInstructionsUser() {
        this.profileservice.getInstructions(this.userQueryParams, this.stepSkip).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
        }, err => console.log(err));
    }
    getInstructionsSearch() {
        this.homeservice.getInstructionsSearch(this.searchQueryParams, this.stepSkip, this.tagsearch).subscribe(data => {
            this.instructions = data;
            this.stepSkip += 1;
        }, err => console.log(err));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    onScroll() {
        if (this.searchQueryParams != null) {
            this.getScrollSearchData();
        }
        else if (this.userQueryParams != null) {
            this.getScrollUserData();
        }
        else {
            this.getScrollFullData();
        }
    }
    getScrollFullData() {
        if (this.infinitydisable)
            return;
        this.infinitydisable = true;
        this.homeservice.getInstructionsFull(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(data => {
            if (!data) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));
    }
    getScrollUserData() {
        if (this.infinitydisable)
            return;
        this.infinitydisable = true;
        this.profileservice.getInstructions(this.userQueryParams, this.stepSkip).subscribe(data => {
            if (!data) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));
    }
    getScrollSearchData() {
        if (this.infinitydisable)
            return;
        this.infinitydisable = true;
        this.homeservice.getInstructionsSearch(this.searchQueryParams, this.stepSkip, this.tagsearch).subscribe(data => {
            if (!data) {
                this.infinitydisable = false;
                return;
            }
            let instructionscroll = data;
            this.instructions = this.instructions.concat(instructionscroll);
            this.stepSkip += 1;
            this.infinitydisable = false;
        }, err => console.log(err));
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], ChildComponent.prototype, "lang", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ChildComponent.prototype, "theme", void 0);
ChildComponent = __decorate([
    core_1.Component({
        selector: 'child-content',
        templateUrl: '/partial/contentChildHomeComponent',
        styleUrls: ['css/blog-home.css', 'css/themes/themeChildContent.css', 'css/themes/themeCommon.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router, Home_Service_1.HomeService,
        Profile_Service_1.ProfileService, Role_Service_1.RoleService])
], ChildComponent);
exports.ChildComponent = ChildComponent;
//# sourceMappingURL=childcontenthome.component.js.map