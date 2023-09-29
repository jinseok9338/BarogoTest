import { VendingMachineState } from "../BaseData";
import { STOCKS, VALID_COINS } from "../consts";
import { formatPrice } from "../helper";

export const paymentMethodQuestion = () => {
  return {
    type: "list",
    name: "paymentMethod",
    message: "결제 수단을 고르시오",
    choices: [
      { name: "현금", value: "cash" },
      { name: "카드", value: "credit" },
    ],
  };
};

export const MainPageQuestion = (state: VendingMachineState) => {
  // 만약 신용 카드면 돈을 더 넣는 선택지 x
  if (state.paymentMethod === "credit") {
    return {
      type: "list",
      name: "mainMenu",
      message: "원하는 사항을 고르시오",
      choices: [
        { name: "음료 선택", value: "chooseBeverage" },
        { name: "종료", value: "terminate" },
      ],
    };
  }
  // 만약 현금이면 돈을 더 넣을지 음료를 뽑을지 그만둘지 선택
  // 현재 투입된 금액이 stock 의 가장 낮은 price 보다 낮으면 음료를 뽑을 수 없다.

  if (
    state.paymentMethod === "cash" &&
    state.paymentAmount < Math.min(...STOCKS.map((stock) => stock.price))
  ) {
    return {
      type: "list",
      name: "mainMenu",
      message: `원하는 사항을 고르시오 (현재 투입된 금액 ${formatPrice(
        state.paymentAmount
      )} 으로는 음료를 뽑을 수 없습니다)`,
      choices: [
        { name: "돈을 더 넣는다", value: "insertCoin" },
        { name: "종료", value: "terminate" },
      ],
    };
  }
  return {
    type: "list",
    name: "mainMenu",
    message: `원하는 사항을 고르시오 (현재 투입된 금액 ${formatPrice(
      state.paymentAmount
    )})`,
    choices: [
      { name: "음료 선택", value: "chooseBeverage" },
      { name: "돈을 더 넣는다", value: "insertCoin" },
      { name: "종료", value: "terminate" },
    ],
  };
};

export const InsertCoinPageQuestion = () => {
  const coins = VALID_COINS;
  return {
    type: "list",
    name: "insertedCoin",
    message: "돈을 넣으시오",
    choices: coins.map((coin) => ({
      name: formatPrice(coin),
      value: coin,
    })),
  };
};

export const ChooseBeveragePageQuestion = (state: VendingMachineState) => {
  if (state.paymentMethod === "cash") {
    const stocks = STOCKS.filter((stock) => stock.price <= state.paymentAmount);
    return {
      type: "list",
      name: "beverage",
      message: "음료를 고르시오",
      choices: stocks.map((stock) => ({
        name: `${stock.name} - (${formatPrice(stock.price)})`,
        value: stock.name,
      })),
    };
  }
  return {
    type: "list",
    name: "beverage",
    message: "음료를 고르시오",
    choices: STOCKS.map((stock) => ({
      name: `${stock.name} - (${formatPrice(stock.price)})`,
      value: stock.name,
    })),
  };
};
