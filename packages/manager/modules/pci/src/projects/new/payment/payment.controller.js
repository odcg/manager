export default class PciProjectNewPaymentCtrl {
  /* @ngInject */
  constructor($translate, CucCloudMessage, ovhPaymentMethod, PciProjectNewService) {
    // dependencies injections
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.ovhPaymentMethod = ovhPaymentMethod;
    this.PciProjectNewService = PciProjectNewService;

    // other attributes used in view
    this.step = null;

    this.paymentTypes = null;
    this.displayVoucher = false;
  }

  /* =============================
  =            Events            =
  ============================== */

  onPaymentAddLoaded() {
    this.step.loading.paymentTypes = false;
  }

  onPaymentAddTypeChange(paymentType) {
    this.step.model.paymentType = paymentType;
  }

  onToggleVoucherBtnClick() {
    this.displayVoucher = !this.displayVoucher;
  }

  onVoucherInputChange() {
    if (!this.step.model.voucher.value
      && !this.step.model.voucher.valid) {
      this.step.model.voucher.submitted = false;
    }
  }

  onVoucherFormSubmit() {
    this.step.loading.voucher = true;

    return this.PciProjectNewService
      .getNewProjectInfo({
        voucher: this.step.model.voucher.value,
      })
      .then(({ voucher }) => {
        this.voucherForm.voucher.$setValidity('voucher', true);
        this.step.model.voucher.valid = true;
        this.step.model.voucher.paymentMethodRequired = voucher.paymentMethodRequired;
        this.step.model.voucher.credit = voucher.credit;
        if (!this.step.model.voucher.paymentMethodRequired) {
          this.step.model.paymentType = null;
        }
      })
      .catch((error) => {
        this.step.model.voucher.credit = null;
        // @TODO => remove this test when API will be ready
        if (error.status === 403 && error.data.message === 'Please register a payment method') { //
          this.voucherForm.voucher.$setValidity('voucher', true);
          this.step.model.voucher.valid = true;
          this.step.model.voucher.paymentMethodRequired = true;
        } else {
          this.voucherForm.voucher.$setValidity('voucher', false);
          this.step.model.voucher.valid = false;
          this.step.model.voucher.paymentMethodRequired = null;
        }
      })
      .finally(() => {
        this.step.loading.voucher = false;
        this.step.model.voucher.submitted = true;
      });
  }

  /* -----  End of Events  ------ */

  /* =====================================
  =            Initialization            =
  ====================================== */

  $onInit() {
    this.step = this.getStepByName('payment');

    this.step.loading.init = true;
    this.displayVoucher = false;

    return this.ovhPaymentMethod.getDefaultPaymentMethod()
      .then((defaultPaymentMethod) => {
        this.step.model.defaultPaymentMethod = defaultPaymentMethod;

        if (!this.step.model.defaultPaymentMethod) {
          this.step.loading.paymentTypes = true;
        }
      })
      .finally(() => {
        this.step.loading.init = false;
      });
  }

  /* -----  End of Initialization  ------ */
}