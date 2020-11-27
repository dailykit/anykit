import { AnyKit } from "./anyKit";

declare global {
  interface Window {
    AnyKit: typeof AnyKit;
  }
}

window.AnyKit = AnyKit;
