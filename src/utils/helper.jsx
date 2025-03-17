export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${amPm}`;
};

export const formatTransactionDate = (date, timeCheck = true) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
if(timeCheck) {
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  if (isTomorrow) return 'Tomorrow';
}

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatAmountWithRupeeSymbol = (amount) => {
  const floatAmount = parseFloat(amount);
  if (isNaN(floatAmount)) {
    return '';
  }
  return `₹${floatAmount.toFixed(2)}`;
};

export const getCombinedDateTime = (date, time) => {
  const combinedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
  return combinedDate;
};

export const getCombinedDateTimeString = (date, time) => {
  const pad = (num) => String(num).padStart(2, '0'); // Ensures two-digit format

  const combinedDate = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` + `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return combinedDate;
};

export const getFirstWord = (str) => {
  return str.split(' ')[0];
};

export const utcToDataTime = (utcDateTime) => {
  const date = new Date(utcDateTime);
  return date;
}

export const formatLocalDateTime = (utcDateTime) => {
  const date = new Date(utcDateTime).
  toLocaleString("en-US", {
    year: "numeric",
    month: "short", // "Mar"
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true, // Converts to AM/PM format
    timeZone: "Asia/Kolkata", // Change as per your requirement
  });
  return date;
}

export const createDuplicateTransactionPayload = (transaction) => {
    return {
      amount: transaction?.amount?.toString(),
      categoryId: transaction?.categoryId,
      isRecurring: false,
      paymentMode: transaction?.paymentMode,
      tags: transaction?.tags || [],
      transactionTime: transaction?.transactionTime,
      transactionType: transaction?.transactionType,
    };
  };

  export const checkIsModifiedFormData = (formData, initialFormData) => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  }