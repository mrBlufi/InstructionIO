import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { Sanitizer, SecurityContext } from "@angular/core/src/security";

export class Safe {

    constructor(private sanitizer: DomSanitizer) { }

    safeOnUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    safeOnHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
