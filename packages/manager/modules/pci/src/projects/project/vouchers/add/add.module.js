import angular from 'angular';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-api-services';

import legacy from './legacy/add.module';
import add from './add/add.module';
import routing from './add.routing';

const moduleName = 'ovhManagerPciProjectVouchersAdd';

angular
  .module(moduleName, [
    add,
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ovh-api-services',
    'ui.router',
    legacy,
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;