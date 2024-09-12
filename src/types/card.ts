import { Focused } from "react-credit-cards-2";

export interface ICardState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
}

export interface ICardValidation {
  number: boolean;
  expiry: boolean;
  cvc: boolean;
  name: boolean;
}
