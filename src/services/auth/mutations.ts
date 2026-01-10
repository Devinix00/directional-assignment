import { useMutation } from "@tanstack/react-query";
import authApis from "./apis";
import type { LoginRequest } from "./types";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApis.login(data),
  });
}
