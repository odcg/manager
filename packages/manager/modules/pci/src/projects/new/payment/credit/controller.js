export default class PciProjectsNewPaymentCreditCtrl {
  /* @ngInject */
  constructor(CucCloudMessage, pciProjectNew) {
    this.CucCloudMessage = CucCloudMessage;
    this.pciProjectNew = pciProjectNew;
  }

  onCreditBtnClick() {
    this.globalLoading.finalize = true;

    return this.pciProjectNew
      .finalizeCart(this.cart)
      .then((order) => this.onCartFinalized(order))
      .catch(() => {
        this.CucCloudMessage.error(
          this.$translate.instant(
            'pci_project_new_payment_credit_checkout_error',
          ),
          'pci.projects.new.payment',
        );
      })
      .finally(() => {
        this.globalLoading.finalize = false;
      });
  }
}
