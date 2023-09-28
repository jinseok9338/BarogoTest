import { PageId, VendingMachineState } from "../BaseData";
import { renderLandingPage, terminatePage } from "./renderers";

export const render = async (state: VendingMachineState) => {
  while (true) {
    switch (state.currentPageId) {
      case PageId.LangingPage:
        await renderLandingPage(state);
        break;

      default:
        terminatePage("에러가 발생했습니다 처음부터 다시 시작해주세요");
    }
  }
};
