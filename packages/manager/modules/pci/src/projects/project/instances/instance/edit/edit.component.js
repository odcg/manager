import controller from './edit.controller';
import template from './edit.html';

export default {
  template,
  controller,
  bindings: {
    goBack: '<',
    imageEditSuccessMessage: '<',
    instance: '<',
    instanceId: '<',
    projectId: '<',
  },
};
