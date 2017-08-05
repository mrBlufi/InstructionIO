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
const RoleData_1 = require("./model/RoleData");
const Role_Service_1 = require("./service/Role.Service");
const angular_l10n_1 = require("angular-l10n");
const Comment_Service_1 = require("./service/Comment.Service");
let CommentComponent = class CommentComponent {
    constructor(roleservice, http, commentservice) {
        this.roleservice = roleservice;
        this.http = http;
        this.commentservice = commentservice;
        this.comment = new Array();
        this.roleinfo = new RoleData_1.RoleData(-1, false, false);
        this.editorContent = 'Comment Text';
        roleservice.getDataRole().subscribe(data => {
            this.roleinfo = data;
            console.log(this.roleinfo);
        });
    }
    submit() {
        let com = new Comment_1.Comment();
        com.context = this.editorContent;
        com.datecreate = new Date();
        this.addComment(com);
    }
    getComment() {
        this.commentservice.getComment(this.idInstruction).subscribe(date => {
            this.comment = date;
            console.log(this.comment);
        });
    }
    addComment(obj) {
        this.commentservice.addComment(obj, this.idInstruction);
        this.getComment();
    }
    delcomment(id) {
        this.commentservice.delcomment(id, this.idInstruction);
        this.getComment();
    }
};
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], CommentComponent.prototype, "lang", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CommentComponent.prototype, "comment", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CommentComponent.prototype, "idInstruction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CommentComponent.prototype, "theme", void 0);
CommentComponent = __decorate([
    core_1.Component({
        selector: 'comment',
        templateUrl: '/partial/commentComponent',
        styleUrls: ['css/comment.css', 'css/themes/themeComment.css']
    }),
    __metadata("design:paramtypes", [Role_Service_1.RoleService, http_1.Http, Comment_Service_1.CommentService])
], CommentComponent);
exports.CommentComponent = CommentComponent;
//# sourceMappingURL=comment.component.js.map