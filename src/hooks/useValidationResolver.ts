import { zodResolver } from "@hookform/resolvers/zod";

const useValidationResolver = (validationSchema: any) => {
  return {
    resolver: zodResolver(validationSchema),
  };
};

export default useValidationResolver;
