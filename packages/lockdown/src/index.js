import "ses";
import crypto from "crypto";

lockdown({ stackFiltering: "verbose" });

export const hardenExports = (exports) => {
  for (const [_, value] of Object.entries(exports)) {
    harden(value);
  }
};
