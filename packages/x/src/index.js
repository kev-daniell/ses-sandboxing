import { BTC } from "@ses/btc";
import { yCompromisedFromY, zCompromisedFromY } from "@ses/y";

export const xCompromisedFromX = () => {
    BTC.prototype.importantMethod = () => {
        console.log('BTC class important method');
        return "hijacked BTC"
    }

    return "xFn";
}

// TODO: require y package
export const yCompromisedFromX = () => {
    yCompromisedFromY();
    return "yFn";
}

// TODO: require z package
export const zCompromisedFromX = () => {
    zCompromisedFromY();
    return "zFn";
}