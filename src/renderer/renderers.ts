import inquirer from "inquirer";
import {
  PageId,
  PaymentMethod,
  VendingMachineState,
} from "../BaseData/index.js";
import { STOCKS } from "../consts.js";
import {
  ChooseBeveragePageQuestion,
  InsertCoinPageQuestion,
  MainPageQuestion,
  paymentMethodQuestion,
} from "../questions/index.js";

// 결제 수단 페이지 렌더링
export const renderLandingPage = async (state: VendingMachineState) => {
  if (state.paymentMethod) {
    terminatePage("이미 결제 수단이 선택되었습니다");
  }

  if (state.currentPageId !== PageId.LangingPage) {
    terminatePage("잘못된 페이지로 접근하셨습니다");
  }

  const answers = await inquirer.prompt([paymentMethodQuestion()]);

  // Access the selected payment method value
  const selectedPaymentMethod: PaymentMethod = answers.paymentMethod;

  // Use selectedPaymentMethod (it will be 'cash' or 'credit')
  state.setPaymentMethod(selectedPaymentMethod);

  if (selectedPaymentMethod === "credit") {
    state.setCurrentPageId(PageId.MainMenuPage);
    return;
  }
  state.setCurrentPageId(PageId.InsertCoinPage);
};

// 메인 페이지 렌더링  음료를 뽑을지 돈을 넣을지, 혹은 그만둘지를 선택
export const renderMainMenuPage = async (state: VendingMachineState) => {
  if (state.currentPageId !== PageId.MainMenuPage) {
    terminatePage("잘못된 페이지로 접근하셨습니다");
  }

  if (!state.paymentMethod) {
    terminatePage("결제 수단이 선택되지 않았습니다");
  }

  const answers = await inquirer.prompt([MainPageQuestion(state)]);
  const mainMenu: string = answers.mainMenu;

  switch (mainMenu) {
    case "chooseBeverage":
      state.setCurrentPageId(PageId.ChooseBeveragePage);
      break;
    case "insertCoin":
      state.setCurrentPageId(PageId.InsertCoinPage);
      break;
    case "terminate": {
      if (state.paymentMethod === "credit") {
        terminatePage("결제를 취소 하였습니다.");
        break;
      }
      terminatePage(
        "결제를 취소 하였습니다. 거스름돈은 " +
          state.paymentAmount +
          "원 입니다."
      );
      break;
    }
    default:
      terminatePage("잘못된 페이지로 접근하셨습니다");
  }
};

// 현금 투입 페이지 렌더링
export const renderInsertCoinPage = async (state: VendingMachineState) => {
  if (
    state.currentPageId !== PageId.InsertCoinPage ||
    state.paymentMethod !== "cash"
  ) {
    terminatePage("잘못된 페이지로 접근하셨습니다");
  }

  const answers = await inquirer.prompt([InsertCoinPageQuestion()]);
  const insertedCoin: number = answers.insertedCoin;

  state.addPaymentAmount(insertedCoin);
  state.setCurrentPageId(PageId.MainMenuPage);
};

// 음료 선택 페이지 렌더링
export const renderChooseBeveragePage = async (state: VendingMachineState) => {
  if (
    state.currentPageId !== PageId.ChooseBeveragePage ||
    !state.paymentMethod
  ) {
    terminatePage("잘못된 페이지로 접근하셨습니다");
  }

  const answers = await inquirer.prompt([ChooseBeveragePageQuestion(state)]);
  const selectedBeverage: string = answers.beverage;

  console.log(selectedBeverage + "를 선택하셨습니다.");

  if (state.paymentMethod === "credit") {
    terminatePage("결제가 완료되었습니다. 좋은 하루 되세요");
    return;
  }
  const selectedBeveragePrice = STOCKS.find(
    (stock) => stock.name === selectedBeverage
  )?.price;

  if (!selectedBeveragePrice) {
    terminatePage("잘못된 음료를 선택하셨습니다");
    return;
  }
  state.subtractPaymentAmount(selectedBeveragePrice);
  console.log("거스름돈은 " + state.paymentAmount + "원 입니다.");
  state.setCurrentPageId(PageId.MainMenuPage);
};

// 페이지 종료

export const terminatePage = (msg: string) => {
  console.log(msg);
  console.log(`--------------------------------
--------------------------------
--------------------------------
--------------------------------
--------TERMINATED PAGE----------
  `);
  process.exit(1);
};
