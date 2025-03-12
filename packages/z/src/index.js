import { BTC } from "@ses/btc";

export const zCompromisedFromZ = () => {
  BTC.prototype.importantMethod = () => {
    console.log("hijacked BTC class important method");
    return "hijacked BTC";
  };
  return "zFn";
};
