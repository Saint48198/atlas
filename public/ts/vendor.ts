// Polyfills
import 'node_modules/es6-shim';
// (these modules are what are in 'angular2/bundles/angular2-polyfills' so don't use that here)
import 'node_modules/es6-promise';
import 'node_modules/zone.js/lib/browser/zone-microtask';

if ('production' !== process.env.ENV) {
  // Reflect Polyfill
  require('es7-reflect-metadata/dist/browser');
  Error['stackTraceLimit'] = Infinity;
  Zone['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
}

if ('production' === process.env.ENV) {
  // Reflect with es7-reflect-metadata/reflect-metadata is added
  // by webpack.prod.config ProvidePlugin
  let ngCore = require('angular2/core');
  ngCore.enableProdMode();
}
// Angular 2
import 'node_modules/angular2/platform/browser';
import 'node_modules/angular2/platform/common_dom';
import 'node_modules/angular2/router';
import 'node_modules/angular2/http';
import 'node_modules/angular2/core';

// RxJS
import 'node_modules/rxjs';

// Other vendors for example jQuery, Lodash, angular2-jwt
