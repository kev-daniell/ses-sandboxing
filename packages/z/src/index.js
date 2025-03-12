import { BTC } from "@ses/btc";

// TODO: require z package
export const zCompromisedFromZ = () => {
  BTC.prototype.importantMethod = () => {
    console.log("hijacked BTC class important method");
    return "hijacked BTC";
  };
  return "zFn";
};
