import { render } from "./src/renderer";
import { VendingMachineState } from "./src/BaseData";

async function main() {
  const state = new VendingMachineState();
  render(state);
}

main();
