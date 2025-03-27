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

export const formatTransactionDateTime = (date, timeCheck = true) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  // Format time as hh:mm AM/PM
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour

  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  if (timeCheck) {
    if (isToday) return `Today, ${formattedTime}`;
    if (isYesterday) return `Yesterday, ${formattedTime}`;
    if (isTomorrow) return `Tomorrow, ${formattedTime}`;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return {
    date: `${day}-${month}-${year}`,
    time: formattedTime
  };
};


export const formatFilterDate = (date) => {
  // date = new Date(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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

  export const getDateRanges = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
  
    const getStartOfMonth = (year, month) => new Date(year, month, 1).toISOString();
    const getEndOfMonth = (year, month) => new Date(year, month + 1, 0).toISOString();
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const ranges = [
      {
        label: currentYear.toString(),
        fromDate: new Date(currentYear, 0, 1).toISOString(),
        toDate: today.toISOString(),
      },
      {
        label: (currentYear - 1).toString(),
        fromDate: new Date(currentYear - 1, 0, 1).toISOString(),
        toDate: new Date(currentYear - 1, 11, 31).toISOString(),
      },
      {
        label: `${monthNames[currentMonth]} ${currentYear.toString().slice(-2)}`,
        fromDate: getStartOfMonth(currentYear, currentMonth),
        toDate: today.toISOString(),
      },
    ];
  
for (let i = 1; i <= 3; i++) {
      const month = currentMonth - i;
      const year = month < 0 ? currentYear - 1 : currentYear;
      const adjustedMonth = (month + 12) % 12;
  
      ranges.push({
        label: `${monthNames[adjustedMonth]} ${year.toString().slice(-2)}`,
        fromDate: getStartOfMonth(year, adjustedMonth),
        toDate: getEndOfMonth(year, adjustedMonth),
      });
    }
  
    return ranges;
  };

  export const countFilters = (params) => {
    let count = 0;
    if (params.hashTag && params.hashTag.length > 0) count++;
    if (params.transactionType && params.transactionType.length > 0) count++;
    if (params.paymentMode && params.paymentMode.length > 0) count++;
    if (params.category && params.category.length > 0) count++;
    if (params.fromDate) count++;
    if (params.toDate) count++;
    // if (params.dateLabel) count++;
    if (params.amountMin) count++;
    if (params.amountMax) count++;
    return count;
  };

  export const formattedPaymentModes = (paymentModes) => {
    return paymentModes?.map(mode => ({
      label: mode.replace(/_/g, ' ').toLowerCase(),
      value: mode
    }));
  };