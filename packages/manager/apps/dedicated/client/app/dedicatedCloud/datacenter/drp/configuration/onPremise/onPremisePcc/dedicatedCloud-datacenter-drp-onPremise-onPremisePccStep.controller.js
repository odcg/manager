export default class {
  /* @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  $onInit() {
    this.drpInformations = this.$state.params.drpInformations;
  }

  validateConfiguration() {
    this.isValidating = true;

    return this.setupConfiguration(this.drpInformations).finally(() => {
      this.isValidating = false;
    });
  }
}
