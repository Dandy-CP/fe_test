import { Table } from '@/components/elements';
import { useFetch } from '@/hooks';
import { LalinResponse } from '@/types/lalin.types';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

interface Props {
  selectedDate?: moment.Moment | null;
  pagination: {
    page: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      pageSize: number;
    }>
  >;
}

function TotalTunai({ selectedDate, pagination, setPagination }: Props) {
  const { data, isFetching } = useFetch<LalinResponse>({
    endpoint: '/lalins',
    inputParams: {
      page: pagination.page,
      limit: pagination.pageSize,
      tanggal: selectedDate?.format().split('T')[0] ?? '',
    },
  });

  const totalData = data?.count ?? 0;
  const dataLalin =
    data?.rows.rows.map((value) => {
      return {
        ...value,
        Hari: moment(value.Tanggal).format('dddd'),
        Tanggal: moment(value.Tanggal).format('LL'),
      };
    }) ?? [];

  const columnsData: GridColDef[] = [
    {
      field: 'IdCabang',
      headerName: 'ID Cabang',
      flex: 1,
      sortable: false,
    },
    {
      field: 'IdGardu',
      headerName: 'ID Gardu',
      flex: 1,
    },
    {
      field: 'IdAsalGerbang',
      headerName: 'ID Asal Gerbang',
      flex: 1,
    },
    {
      field: 'Golongan',
      headerName: 'Golongan',
      flex: 1,
    },
    {
      field: 'Shift',
      headerName: 'Shift',
      flex: 1,
    },
    {
      field: 'Hari',
      headerName: 'Hari',
      flex: 1,
    },
    {
      field: 'Tanggal',
      headerName: 'Tanggal',
      flex: 1,
    },
    {
      field: 'Tunai',
      headerName: 'Tunai',
      flex: 1,
    },
  ];

  return (
    <div className="p-5">
      <Table
        columnsData={columnsData}
        rowsData={dataLalin}
        totalData={totalData}
        isLoading={isFetching}
        PaginationModel={pagination}
        setPaginationModel={setPagination}
      />
    </div>
  );
}

export default TotalTunai;
