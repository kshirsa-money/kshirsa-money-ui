import { EventEmitter } from "events";

const toastEmitter = new EventEmitter();

// Function to show toast globally
export const showToast = ({ type, message, titleColor, backgroundColor, duration = 2000, show=true }) => {
  toastEmitter.emit("showToast", { type, message, titleColor, backgroundColor, duration, show });
};

// Event listener function
export const toastListener = toastEmitter;
