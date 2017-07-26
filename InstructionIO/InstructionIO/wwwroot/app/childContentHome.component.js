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
var router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
var core_1 = require("@angular/core");
var HomeService_1 = require("./service/HomeService");
var ChildComponent = (function () {
    function ChildComponent(_Activatedroute, _router, homeservice) {
        var _this = this;
        this._Activatedroute = _Activatedroute;
        this._router = _router;
        this.homeservice = homeservice;
        this.onClick = function ($event) {
            //console.log('onClick $event: ', $event);
            _this.onClickResult = $event;
        };
        this.onRatingChange = function ($event) {
            //console.log('onRatingUpdated $event: ', $event);
            _this.onRatingChangeResult = $event;
        };
        this.onHoverRatingChange = function ($event) {
            //console.log('onHoverRatingChange $event: ', $event);
            _this.onHoverRatingChangeResult = $event;
        };
        this.stringarray = ["1", "2", "3"];
        this.categoryQueryParams = null;
        this.sortQueryParams = null;
        this.instructions = null;
        this.stepSkip = 0;
        this.infinitydisable = false;
    }
    ChildComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(Date.now);
        this.sub = this._Activatedroute.queryParams
            .subscribe(function (params) {
            _this.categoryQueryParams = params['category'];
            _this.sortQueryParams = params['sort'];
            _this.getInstructions();
            console.log('Query params ', params);
        }, function (err) { return console.log(err); });
    };
    ChildComponent.prototype.getInstructions = function () {
        var _this = this;
        if (this.sortQueryParams == null)
            this.sortQueryParams = 'popular';
        if (this.categoryQueryParams == null)
            this.categoryQueryParams = 'Full';
        this.homeservice.getInstructionsFirst(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(function (data) {
            _this.instructions = data;
            _this.stepSkip += 1;
            console.log(_this.instructions);
        }, function (err) { return console.log(err); });
    };
    ChildComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ChildComponent.prototype.onScroll = function () {
        var _this = this;
        if (this.infinitydisable)
            return;
        this.infinitydisable = true;
        console.log('scroll');
        this.homeservice.getInstructionsFirst(this.sortQueryParams, this.categoryQueryParams, this.stepSkip).subscribe(function (data) {
            if (data.length == 0) {
                _this.infinitydisable = false;
                return;
            }
            var instructionscroll = data;
            console.log(instructionscroll);
            _this.stepSkip += 1;
            for (var i = 0; i < instructionscroll.length; i++) {
                _this.instructions.push(instructionscroll[i]);
            }
            _this.infinitydisable = false;
        }, function (err) { return console.log(err); });
    };
    return ChildComponent;
}());
ChildComponent = __decorate([
    core_1.Component({
        selector: 'child-content',
        templateUrl: '/partial/contentChildHomeComponent',
        styleUrls: ['css/blog-home.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router, HomeService_1.HomeService])
], ChildComponent);
exports.ChildComponent = ChildComponent;
//# sourceMappingURL=childcontenthome.component.js.map