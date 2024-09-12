import creditCardType from "credit-card-type";
import {
  Visa,
  Mastercard,
  Amex,
  Discover,
  Diners,
  Jcb,
  Unionpay,
} from "react-payment-logos/dist/flat";

export const getCardTypeInfo = (value: string) => {
  const cardTypes = creditCardType(value);
  if (cardTypes.length > 0) {
    const type = cardTypes[0].type;
    let Logo;
    switch (type) {
      case "visa":
        Logo = Visa;
        break;
      case "mastercard":
        Logo = Mastercard;
        break;
      case "american-express":
        Logo = Amex;
        break;
      case "discover":
        Logo = Discover;
        break;
      case "diners-club":
        Logo = Diners;
        break;
      case "jcb":
        Logo = Jcb;
        break;
      case "unionpay":
        Logo = Unionpay;
        break;
      default:
        Logo = null;
    }
    return { type: type, niceType: cardTypes[0].niceType, Logo };
  }
  return { type: "", niceType: "", Logo: null };
};
