import { render, html } from "lit-html";

class AnykitButton extends HTMLElement {
  _text: string = "";

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

  update() {
    render(this.template(), this.shadowRoot as any, { eventContext: this });
  }

  template() {
    return html` <style>
        button {
          background-color: tomato;
          color: white;
          padding: 1.25rem;
          border: 0;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .fixed {
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          z-index: 10000;
        }

        button:hover {
          filter: brightness(0.9);
        }
      </style>

      <button>${this.text}</button>`;
  }
}

customElements.define("anykit-button", AnykitButton);
