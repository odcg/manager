import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';

import vnc from '../../../instances/instance/vnc/vnc.module';
import routing from './vnc.routing';

const moduleName = 'ovhManagerPciBaremetalInstanceVNC';

angular
  .module(moduleName, [
    vnc,
    'ui.router',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(routing);

export default moduleName;
