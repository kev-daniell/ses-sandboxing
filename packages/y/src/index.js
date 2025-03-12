import { zCompromisedFromZ } from "@ses/z";
import { BTC } from "@ses/btc";

// TODO: require y package
export const yCompromisedFromY = () => {
  BTC.prototype.importantMethod = () => {
    console.log("hijacked BTC class important method");
    return "hijacked BTC";
  };
  return "yFn";
};

// TODO: require z package
export const zCompromisedFromY = () => {
  zCompromisedFromZ();
  return "zFn";
};
