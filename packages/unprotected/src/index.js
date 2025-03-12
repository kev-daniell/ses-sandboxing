import { BTC } from "@ses/btc";
import {
  yCompromisedFromX,
  zCompromisedFromX,
  xCompromisedFromX,
} from "@ses/x";

export const unprotectedFooUsingDeps = (testingInput) => {
  switch (testingInput) {
    case "x":
      return xCompromisedFromX();
    case "y":
      return yCompromisedFromX();
    case "z":
      return zCompromisedFromX();
    default:
      return "fooUsingDeps default";
  }
};
