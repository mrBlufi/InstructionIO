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
const core_1 = require("@angular/core");
const Comment_1 = require("./model/Comment");
const http_1 = require("@angular/http");
const http_2 = require("@angular/http");
const RoleData_1 = require("./model/RoleData");
const Role_Service_1 = require("./service/Role.Service");
let CommentComponent = class CommentComponent {
    constructor(roleservice, http) {
        this.roleservice = roleservice;
        this.http = http;
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.editorContent = 'Comment Text';
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            console.log(this.roleinfo);
        });
        this.getComment();
    }
    getComment() {
        this.http.get('/api/comment/test/comments').map(res => (res).json()).subscribe(date => {
            this.comments = date;
            console.log(this.comments);
        });
    }
    submit() {
        let com = new Comment_1.Comment();
        com.context = this.editorContent;
        com.datecreate = new Date(2017, 7, 31);
        this.addComment(com);
    }
    addComment(obj) {
        const body = JSON.stringify(obj);
        let headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/comment/test/comments/post/', body, { headers: headers }).subscribe((data) => {
            console.log('Response received');
            console.log(data);
            this.getComment();
        }, (err) => { console.log('Error'); }, () => console.log('Authentication Complete'));
    }
    delcomment(id) {
        console.log(id);
        if (id)
            this.http.get('/api/comment/test/comments/del/' + id).map(res => (res).json()).subscribe(date => {
                this.comments = date;
                console.log(this.comments);
            });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CommentComponent.prototype, "comment", void 0);
CommentComponent = __decorate([
    core_1.Component({
        selector: 'comment',
        templateUrl: '/partial/commentComponent',
        styleUrls: ['css/comment.css']
    }),
    __metadata("design:paramtypes", [Role_Service_1.RoleService, http_1.Http])
], CommentComponent);
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map