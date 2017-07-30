"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Safe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    safeOnUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    safeOnHtml(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
exports.Safe = Safe;
//# sourceMappingURL=safeOn.js.map