import { AnyKit } from "./anyKit";

declare global {
  interface Window {
    anykit: any;
  }
}

window.anykit = new AnyKit({});
