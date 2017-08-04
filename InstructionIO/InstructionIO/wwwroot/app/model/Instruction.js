"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInfo_1 = require("./UserInfo");
const Category_1 = require("./Category");
class Instruction {
    constructor() {
        this.author = new UserInfo_1.UserInfo();
        this.createDate = new Date(Date.now());
        this.lastChangedDate = new Date(Date.now());
        this.category = new Category_1.Category();
    }
    ;
}
exports.Instruction = Instruction;
//# sourceMappingURL=Instruction.js.map