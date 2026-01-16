import { useMutation } from '@/hooks';
import { EditGerbangSchema } from '@/schema/gerbang.schema';
import { EditGerbangBody, Row } from '@/types/gerbang.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogActions, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  selectedData: Row | null;
  onClose: () => void;
  onSuccess: () => void;
}

function EditGerbangContent({ selectedData, onClose, onSuccess }: Props) {
  const { mutationData, isPending } = useMutation({
    endpoint: '/gerbangs',
    onSuccess() {
      toast.success('Success update gerbang');
      onSuccess();
    },
    onError() {
      toast.error('Error on update gerbang');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGerbangBody>({
    resolver: zodResolver(EditGerbangSchema),
    defaultValues: {
      id: selectedData?.id,
      IdCabang: selectedData?.IdCabang,
      NamaCabang: selectedData?.NamaCabang,
      NamaGerbang: selectedData?.NamaGerbang,
    },
  });

  const onSubmit: SubmitHandler<EditGerbangBody> = (formData) => {
    mutationData({
      method: 'PUT',
      payload: formData,
    });
  };

  return (
    <div className="w-125 p-5">
      <p className="font-semibold text-xl">
        Edit Gerbang {selectedData?.NamaGerbang}
      </p>

      <form
        className="mt-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            Edit
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

export default EditGerbangContent;
