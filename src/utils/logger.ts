export const log = (type: "info" | "error", ...messages: any) => {
  switch (type) {
    case "info":
      for (const infoMsg of messages) _log(type, infoMsg);
      break;
    case "error":
      for (const errMsg of messages) _error(type, errMsg);
      break;
    default:
      for (const msg of messages) _log(type, msg);
  }
};

const _log = (type: "info" | string, message: any) =>
  console.log(`[ANYKIT][${type.toUpperCase()}]: ${message}`);

const _error = (type: "error" | string, message: any) =>
  console.error(`[ANYKIT][${type.toUpperCase()}]: ${message}`);
