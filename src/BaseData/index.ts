interface BaseState {
  paymentMethod: PaymentMethod;
  paymentAmount: number;
  currentPageId: PageId;
}

export enum PageId {
  LangingPage = 0, // this is where you choose payment method
  MainMenuPage = 1,
  ChooseBeveragePage = 2,
  InsertCoinPage = 3,
}

const BASE_STATE = {
  paymentMethod: undefined,
  paymentAmount: 0,
  currentPageId: PageId.LangingPage,
};

export type PaymentMethod = "cash" | "credit" | undefined;

interface BaseState {
  paymentMethod: PaymentMethod;
  paymentAmount: number;
  currentPageId: PageId;
}

export class VendingMachineState implements BaseState {
  paymentMethod: PaymentMethod;
  paymentAmount: number;
  currentPageId: PageId;

  constructor() {
    this.paymentMethod = BASE_STATE.paymentMethod;
    this.paymentAmount = BASE_STATE.paymentAmount;
    this.currentPageId = BASE_STATE.currentPageId;
  }

  public setPaymentMethod(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public addPaymentAmount(paymentAmount: number) {
    this.paymentAmount += paymentAmount;
  }

  public subtractPaymentAmount(paymentAmount: number) {
    this.paymentAmount -= paymentAmount;
  }

  public setCurrentPageId(currentPageId: number) {
    this.currentPageId = currentPageId;
  }
}
