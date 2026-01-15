import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationData } from '@/utils/requestClient';
import { SignInBody, SignInResponse } from '@/types/auth.types';
import { ApiError } from '@/types/client.types';

export function SignIn(
  options?: UseMutationOptions<SignInResponse, ApiError, SignInBody>
) {
  return useMutation<SignInResponse, ApiError, SignInBody>({
    mutationFn: async (body) => {
      return await mutationData({
        url: '/auth/login',
        method: 'POST',
        body: {
          ...body,
        },
      });
    },
    ...options,
  });
}
