import { PageId, VendingMachineState } from "../BaseData/index.js";
import {
  renderChooseBeveragePage,
  renderInsertCoinPage,
  renderLandingPage,
  renderMainMenuPage,
  terminatePage,
} from "./renderers.js";

export const render = async (state: VendingMachineState) => {
  while (true) {
    switch (state.currentPageId) {
      case PageId.LangingPage:
        await renderLandingPage(state);
        break;
      case PageId.MainMenuPage:
        await renderMainMenuPage(state);
        break;
      case PageId.InsertCoinPage:
        await renderInsertCoinPage(state);
        break;
      case PageId.ChooseBeveragePage:
        await renderChooseBeveragePage(state);
        break;
      default:
        terminatePage("에러가 발생했습니다 처음부터 다시 시작해주세요");
    }
  }
};
