export const log = (
  type: "info" | "error",
  ...messages: Array<string | Error>
) => {
  switch (type) {
    case "info":
      for (const infoMsg of messages) console.log(infoMsg);
      break;
    case "error":
      for (const errMsg of messages) console.error(errMsg);
      break;
    default:
      for (const msg of messages) console.log(msg);
  }
};
