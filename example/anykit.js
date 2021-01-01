(function () {
    'use strict';

    const log = (type, ...messages) => {
        switch (type) {
            case "info":
                for (const infoMsg of messages)
                    _log(type, infoMsg);
                break;
            case "error":
                for (const errMsg of messages)
                    _error(type, errMsg);
                break;
            default:
                for (const msg of messages)
                    _log(type, msg);
        }
    };
    const _log = (type, message) => console.log(`[ANYKIT][${type.toUpperCase()}]`, message);
    const _error = (type, message) => console.error(`[ANYKIT][${type.toUpperCase()}]`, message);

    class AnyKit {
        constructor(config) {
            this.baseStyles = `
    .anykit__btn {
      background-color: tomato;
      color: white;
      padding: 1.25rem;
      border: 0;
      border-radius: 0.25rem;
      cursor: pointer;
    }

    .anykit__btn:hover {
      filter: brightness(0.9);
    }

    .anykit__modal {
      width: 400px;
      height: 600px;
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      border-radius: 0.25rem;
      background: #444f66;
      transform: scale(0);
      transform-origin: bottom right;
      opacity: 0;
      transition: all 0.25s ease-out;
    }

    .anykit__modal--show {
      transform: scale(1);
      opacity: 1;
    }
  `;
            this.fixedStyles = `
    .anykit__btn--fixed {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 10000
    }
  `;
            this.config = config;
            const { location } = window;
            fetch("https://anykit-server.herokuapp.com/recipes", {
                method: "POST",
                body: JSON.stringify({
                    recipeUrl: location.toString(),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((req) => {
                log("info", req.status);
                return req.json();
            })
                .then((res) => {
                log("info", res);
            });
        }
        toggleModal(_) {
            const modal = document.querySelector(".anykit__modal");
            log("info", modal);
            modal === null || modal === void 0 ? void 0 : modal.classList.toggle("anykit__modal--show");
        }
        init() {
            var _a, _b;
            const bmkButton = document.createElement("button");
            const style = document.createElement("style");
            const modal = document.createElement("div");
            style.textContent = this.baseStyles;
            bmkButton.innerHTML = ((_a = this.config.button) === null || _a === void 0 ? void 0 : _a.text) || "Buy as MealKit";
            bmkButton.addEventListener("click", this.toggleModal);
            bmkButton.classList.add("anykit__btn");
            if ((_b = this.config.button) === null || _b === void 0 ? void 0 : _b.location) {
                const target = document.querySelector(this.config.button.location);
                if (!target) {
                    log("error", new Error(`no element found on this page with target=${this.config.button.location}`));
                    return;
                }
                target === null || target === void 0 ? void 0 : target.appendChild(bmkButton);
            }
            else {
                bmkButton.classList.add("anykit__btn--fixed");
                style.textContent += this.fixedStyles;
                document.body.appendChild(bmkButton);
            }
            modal.classList.add("anykit__modal");
            document.body.appendChild(modal);
            document.head.appendChild(style);
        }
    }

    window.anykit = new AnyKit({});
    window.anykit.init();

}());
