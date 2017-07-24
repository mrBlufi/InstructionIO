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
var core_1 = require("@angular/core");
var ChildComponent = (function () {
    function ChildComponent(route) {
        var _this = this;
        this.route = route;
        this.onClick = function ($event) {
            console.log('onClick $event: ', $event);
            _this.onClickResult = $event;
        };
        this.onRatingChange = function ($event) {
            console.log('onRatingUpdated $event: ', $event);
            _this.onRatingChangeResult = $event;
        };
        this.onHoverRatingChange = function ($event) {
            console.log('onHoverRatingChange $event: ', $event);
            _this.onHoverRatingChangeResult = $event;
        };
        this.stringarray = ["111111111111111", "22222222222", "333333333333333"];
    }
    ChildComponent.prototype.ngOnInit = function () {
        this.sub = this.route.params.subscribe(function (params) {
            console.log(+params['category']);
        });
    };
    ChildComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return ChildComponent;
}());
ChildComponent = __decorate([
    core_1.Component({
        selector: 'child-content',
        templateUrl: '/partial/contentChildHomeComponent',
        styleUrls: ['css/blog-home.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ChildComponent);
exports.ChildComponent = ChildComponent;
//# sourceMappingURL=childcontenthome.component.js.map