type options = {
  type: "manual" | "auto";
  ingredients: string;
  steps: string;
  inventory: string;
  btnLocation: string;
};

export class AnyKit {
  config: options;
  constructor(config: options) {
    this.config = config;
  }

  init() {}
}
