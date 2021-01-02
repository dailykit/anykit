import { render, html } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import "@material/mwc-button";
import "@material/mwc-dialog";
import { log } from "../utils/logger";

export class AnykitApp extends HTMLElement {
  _text: string = "";
  _modalOpened: boolean = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.text = this.getAttribute("text") || "Buy as a MealKit";
  }

  get text() {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this.setAttribute("text", value);
    this.update();
  }

  get modalOpened() {
    return this._modalOpened;
  }

  set modalOpened(value: boolean) {
    this._modalOpened = value;
    this.update();
  }

  toggleModal = () => (this.modalOpened = !this.modalOpened);
  closeModal = () => (this.modalOpened = false);

  update() {
    log("info", this.modalOpened, this.text);
    render(this.template(), this.shadowRoot as any, { eventContext: this });
  }

  template() {
    return html` <style>
        .btn--fixed {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          z-index: 10000;
        }
        mwc-button {
          --mdc-theme-primary: #ff9e2a;
          --mdc-theme-on-primary: white;
        }
      </style>
      <mwc-dialog
        heading="Hello Anykit"
        @closed=${this.closeModal}
        ?open=${this.modalOpened}
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
          tortor, viverra et erat eget, sodales mattis massa. Fusce consectetur
          tempus eros, non hendrerit urna vestibulum vel. Maecenas fringilla
          lorem non libero aliquam scelerisque. Quisque egestas magna nec metus
          semper bibendum. Aliquam at posuere nunc, quis euismod enim. Morbi et
          enim in lectus molestie ultricies in in tellus. Pellentesque egestas
          in dui ut facilisis. Curabitur dapibus malesuada dui vitae interdum.
          Sed et sagittis enim. In eleifend tincidunt tellus vel pulvinar. Cras
        </div>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          cancel
        </mwc-button>
      </mwc-dialog>

      <mwc-button
        @click=${this.toggleModal}
        unelevated
        label="${this.text}"
        class=${classMap({ "btn--fixed": !window.anykitConfig.isManual })}
      ></mwc-button>`;
  }
}
