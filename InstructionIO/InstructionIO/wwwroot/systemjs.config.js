/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',

   
      

      'ng2-material-dropdown': 'npm:ng2-material-dropdown/dist/ng2-dropdown.bundle.js',
      'rxjs': 'npm:rxjs',
      'angular-froala-wysiwyg': 'npm:angular-froala-wysiwyg/bundles/angular-froala-wysiwyg.umd.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'angular-star-rating': 'npm:angular-star-rating/angular-star-rating.umd.js',
      'angular2-infinite-scroll': 'npm:angular2-infinite-scroll',
      'ng2-dragula': 'npm:ng2-dragula/bundles/ng2-dragula.umd.js',
      'angular-l10n': 'npm:angular-l10n/bundles/angular-l10n.umd.js',
      'moment': 'node_modules/moment/moment.js',
      'ngx-bootstrap': 'npm:ngx-bootstrap/bundles/ngx-bootstrap.umd.js',
      'ngx-swiper-wrapper': 'npm:ngx-swiper-wrapper/bundles/ngx-swiper-wrapper.umd.js',
      'angular2-modal': 'npm:angular2-modal/bundles/angular2-modal.umd.js',
      'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/bundles/angular2-modal.bootstrap.umd.js',
      'ng2-tag-input': 'npm:ng2-tag-input/dist/ng2-tag-input.bundle.js',
      'angular2-cookie': 'npm:angular2-cookie'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        "ng2-ckeditor": {
            "main": "lib/index.js",
            "defaultExtension": "js",
        },
      app: {
          main: './main.js',
          defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-infinite-scroll': {
          main: 'angular2-infinite-scroll.js',
          defaultExtension: 'js'
      },
      'angular2-cookie': {
          main: './core.js',
          defaultExtension: 'js'
      }
    }
  });
})(this);
