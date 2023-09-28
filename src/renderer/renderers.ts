import inquirer from "inquirer";
import { PageId, PaymentMethod, VendingMachineState } from "../BaseData";
import { paymentMethodQuestion } from "../questions";

export const renderLandingPage = async (state: VendingMachineState) => {
  if (state.paymentMethod) {
    terminatePage("이미 결제 수단이 선택되었습니다");
  }

  const answers = await inquirer.prompt([paymentMethodQuestion]);

  // Access the selected payment method value
  const selectedPaymentMethod: PaymentMethod = answers.paymentMethod;

  // Use selectedPaymentMethod (it will be 'cash' or 'credit')
  state.setPaymentMethod(selectedPaymentMethod);

  if (selectedPaymentMethod === "cash") {
    state.setCurrentPageId(PageId.MainMenuPage);
    return;
  }
  state.setCurrentPageId(PageId.ChooseBeveragePage);
};

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
