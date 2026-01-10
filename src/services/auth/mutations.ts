import { useMutation } from "@tanstack/react-query";
import authApis from "./apis";

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApis.login({ email, password }),
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
