import React from "react";
import { FormProvider, FormProviderProps } from "react-hook-form";

interface Props {
  methods: Omit<FormProviderProps<any>, "children">;
  children: React.ReactNode;
}

const Form = ({ methods, children }: Props) => {
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
