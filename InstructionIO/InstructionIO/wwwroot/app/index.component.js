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
var core_1 = require("@angular/core");
var HomeService_1 = require("./service/HomeService");
var IndexComponent = (function () {
    function IndexComponent(homeservice) {
        this.homeservice = homeservice;
        this.titleArray = ["Category1", "Category2", "Category3", "Category4", "Category5"];
        this.subcrib = this.titleArray[0];
        this.tags = null;
    }
    IndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.homeservice.getData()
            .subscribe(function (data) {
            _this.tags = data;
            console.log(_this.tags);
        }, function (err) { return console.log('Get me user error'); });
    };
    return IndexComponent;
}());
IndexComponent = __decorate([
    core_1.Component({
        selector: 'my-index',
        templateUrl: '/partial/indexComponent',
        styleUrls: ['css/blog-home.css']
    }),
    __metadata("design:paramtypes", [HomeService_1.HomeService])
], IndexComponent);
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map