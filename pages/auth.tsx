import { useState } from 'react';
import Image from 'next/image';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignInSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInBody } from '@/types/auth.types';
import { SignIn } from '@/service/api/auth/auth.mutation';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks';

function Auth() {
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();

  const { mutateAsync, isPending } = SignIn({
    onSuccess(data) {
      signIn(data);
    },
    onError(error) {
      toast.error(`Ops something wrong: ${error.response.data.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInBody>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInBody> = (formData) => {
    mutateAsync(formData);
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-between">
      <div className="w-1/2 h-full flex flex-col gap-5 justify-center p-30">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={300}
          height={300}
          className="mx-auto"
        />

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Username"
            error={errors.username !== undefined}
            helperText={errors.username?.message}
            disabled={isPending}
            {...register('username')}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={errors.password !== undefined}
            helperText={errors.password?.message}
            disabled={isPending}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseUp={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            {...register('password')}
          />

          <div className="flex justify-end">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>

      <div className="w-1/2 h-full bg-gray-400" />
    </div>
  );
}

export default Auth;
