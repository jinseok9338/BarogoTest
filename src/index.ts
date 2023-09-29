import { render } from "./renderer/index.js";
import { VendingMachineState } from "./BaseData/index.js";

function main() {
  const state = new VendingMachineState();
  render(state);
}

main();
