import AtmCardIcon from "../../assets/icons/atmCardIcon";
import BankIcon from "../../assets/icons/bankIcon";
import CashIcon from "../../assets/icons/cashIcon";
import CreditCardIcon from "../../assets/icons/CreditCardIcon";
import OtherIcon from "../../assets/icons/otherIcon";
import UpiIcon from "../../assets/icons/upiIcon";

const paymentModeOptions = [
    { value: 'CASH', label: 'Cash', icon: <CashIcon height={30} width={30} /> },
    { value: 'CREDIT_CARD', label: 'Credit Card', icon: <CreditCardIcon height={30} width={30} /> },
    { value: 'NET_BANKING', label: 'Net Banking', icon: <BankIcon height={30} width={30} /> },
    { value: 'UPI', label: 'Upi', icon: <UpiIcon height={30} width={30} /> },
    { value: 'DEBIT_CARD', label: 'Debit Card', icon: <AtmCardIcon height={30} width={30} color='white' /> },
    { value: 'OTHERS', label: 'Other', icon: <OtherIcon height={30} width={30} /> },
    // { value: 'BANK TRANSFER', label: 'Bank Transfer' },
    // { value: 'PAYTM', label: 'Paytm' },
    // { value: 'GOOGLE PAY', label: 'Google Pay' },
    // { value: 'PHONE PE', label: 'Phone Pe' },
    // { value: 'AMAZON PAY', label: 'Amazon Pay' },
    // { value: 'BHIM', label: 'Bhim' },
    // { value: 'CREDIT CARD', label: 'Credit Card' },
];

export default paymentModeOptions;