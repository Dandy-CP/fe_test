import { useState } from 'react';
import { Add, Delete, Edit, Search } from '@mui/icons-material';
import { Button, Dialog, TextField } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { AlertDialog, Table } from '@/components/elements';
import {
  CreateGerbangContent,
  EditGerbangContent,
} from '@/components/modules/gerbang';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetch, useMutation } from '@/hooks';
import { MasterGerbangResponse, Row } from '@/types/gerbang.type';

function MasterGerbang() {
  const [searchNameQuery, setSearchNameQuery] = useState('');
  const [selectedData, setSelectedData] = useState<Row | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });

  const searchName = useDebounce(searchNameQuery);

  const { data, refetch } = useFetch<MasterGerbangResponse>({
    endpoint: '/gerbangs',
    inputParams: {
      NamaGerbang: searchName,
    },
  });

  const { mutationData, isPending } = useMutation({
    endpoint: '/gerbangs',
    onSuccess() {
      toast.success('Success Delete Data');
      refetch();
    },
    onError() {
      toast.error('Error on delete data');
    },
  });

  function handleDeleteData() {
    setIsDialogOpen(false);
    mutationData({
      payload: {
        id: selectedData?.id,
        IdCabang: selectedData?.IdCabang,
      },
      method: 'DELETE',
    });
  }

  const totalData = data?.count ?? 0;
  const gerbangData = data?.rows.rows ?? [];

  const columnsData: GridColDef[] = [
    {
      field: 'IdCabang',
      headerName: 'No',
      flex: 1,
      sortable: false,
    },
    {
      field: 'NamaCabang',
      headerName: 'Ruas',
      flex: 1,
    },
    {
      field: 'NamaGerbang',
      headerName: 'Gerbang',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex flex-row gap-3 items-center">
            <Button
              variant="contained"
              disabled={isPending}
              onClick={() => {
                setIsEditDialogOpen(true);
                setSelectedData(params.row);
              }}
              startIcon={<Edit />}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              disabled={isPending}
              onClick={() => {
                setIsDialogOpen(true);
                setSelectedData(params.row);
              }}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="font-semibold text-xl">Master Data Gerbang</h1>

      <div className="mt-5">
        <div className="flex flex-row justify-between items-center">
          <TextField
            value={searchNameQuery}
            placeholder="Cari Nama Gerbang"
            size="small"
            onChange={(event) => {
              setSearchNameQuery(event.target.value);
            }}
            slotProps={{
              input: {
                startAdornment: <Search />,
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setIsCreateDialogOpen(true);
            }}
          >
            Tambah
          </Button>
        </div>

        <div className="shadow-xl rounded-xl mt-10">
          <Table
            rowsData={gerbangData}
            columnsData={columnsData}
            totalData={totalData}
            PaginationModel={pagination}
            setPaginationModel={setPagination}
          />
        </div>
      </div>

      <AlertDialog
        title="Delete this data"
        message="Are you sure want delete this data?"
        onYes={() => {
          handleDeleteData();
        }}
        onClose={() => {
          setSelectedData(null);
        }}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      >
        <CreateGerbangContent
          onClose={() => setIsCreateDialogOpen(false)}
          onSuccess={() => {
            refetch();
            setIsCreateDialogOpen(false);
          }}
        />
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <EditGerbangContent
          selectedData={selectedData}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedData(null);
          }}
          onSuccess={() => {
            refetch();
            setIsEditDialogOpen(false);
            setSelectedData(null);
          }}
        />
      </Dialog>
    </div>
  );
}

export default MasterGerbang;
