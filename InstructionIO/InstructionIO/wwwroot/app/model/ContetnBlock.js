"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const safeOn_1 = require("../tools/safeOn");
class ContentBlock {
    constructor(type, sanitizer) {
        this.sanitizer = sanitizer;
        this.type = type;
        this.safe = new safeOn_1.Safe(sanitizer);
    }
    get content() {
        return this.type == 'text' ? this.safe.safeOnHtml(this._content) : this.safe.safeOnUrl(this._content);
    }
    set content(content) {
        this._content = content;
    }
}
exports.ContentBlock = ContentBlock;
//# sourceMappingURL=ContetnBlock.js.map