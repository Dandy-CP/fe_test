import { useMutation } from '@/hooks';
import { CreateGerbangSchema } from '@/schema/gerbang.schema';
import { CreateGerbangBody } from '@/types/gerbang.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogActions, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

function CreateGerbangContent({ onClose, onSuccess }: Props) {
  const { mutationData, isPending } = useMutation({
    endpoint: '/gerbangs',
    onSuccess() {
      toast.success('Success create gerbang');
      onSuccess();
    },
    onError() {
      toast.error('Error on create gerbang');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGerbangBody>({
    resolver: zodResolver(CreateGerbangSchema),
  });

  const onSubmit: SubmitHandler<CreateGerbangBody> = (formData) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    mutationData({
      method: 'POST',
      payload: {
        id: randomNumber,
        ...formData,
      },
    });
  };

  return (
    <div className="w-125 p-5">
      <p className="font-semibold text-xl">Create Gerbang</p>

      <form
        className="mt-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          placeholder="Id Cabang"
          fullWidth
          size="small"
          type="number"
          error={errors.IdCabang !== undefined}
          helperText={errors.IdCabang?.message}
          {...register('IdCabang', { valueAsNumber: true })}
        />
        <TextField
          placeholder="Nama Gerbang"
          fullWidth
          size="small"
          error={errors.NamaGerbang !== undefined}
          helperText={errors.NamaGerbang?.message}
          {...register('NamaGerbang')}
        />
        <TextField
          placeholder="Nama Cabang"
          fullWidth
          size="small"
          error={errors.NamaCabang !== undefined}
          helperText={errors.NamaCabang?.message}
          {...register('NamaCabang')}
        />

        <DialogActions>
          <Button disabled={isPending} type="submit">
            Create
          </Button>

          <Button
            disabled={isPending}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default CreateGerbangContent;
