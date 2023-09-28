export const paymentMethodQuestion = {
  type: "list",
  name: "paymentMethod",
  message: "결제 수단을 고르시오",
  choices: [
    { name: "현금", value: "cash" },
    { name: "카드", value: "credit" },
  ],
};
