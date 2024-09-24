import { UseFormReturn, FieldValues } from "react-hook-form";
import React, { createContext, useContext, PropsWithChildren } from "react";
import { ICity, IWarehouse } from "@/app/actions/nova-poshta";

export type ExtendedUseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = UseFormReturn<TFieldValues, TContext> & {
  handleCardInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCardFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  cardType: string;

  handleCityInput: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleCitySelect: (city: ICity) => Promise<void>;
  cities: ICity[];
  warehouses: IWarehouse[];
};

const FormContext = createContext<ExtendedUseFormReturn<any, any> | null>(null);

export const ExtendedFormProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>({
  children,
  methods,
}: PropsWithChildren<{
  methods: ExtendedUseFormReturn<TFieldValues, TContext>;
}>) => (
  <FormContext.Provider value={methods as ExtendedUseFormReturn<any, any>}>
    {children}
  </FormContext.Provider>
);

export const useExtendedFormContext = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(): ExtendedUseFormReturn<TFieldValues, TContext> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useExtendedFormContext must be used within a FormProvider"
    );
  }
  return context as ExtendedUseFormReturn<TFieldValues, TContext>;
};
