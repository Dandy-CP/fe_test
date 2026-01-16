import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

interface Props {
  rowsData: any[];
  columnsData: any[];
  totalData: number;
  isLoading?: boolean;
  PaginationModel: {
    page: number;
    pageSize: number;
  };
  setPaginationModel?: React.Dispatch<
    React.SetStateAction<{
      pageSize: number;
      page: number;
    }>
  >;
}

function Table({
  rowsData,
  columnsData,
  totalData,
  isLoading = false,
  PaginationModel,
  setPaginationModel,
}: Props) {
  return (
    <DataGrid
      rows={rowsData}
      columns={columnsData}
      rowCount={totalData}
      paginationMode="server"
      paginationModel={PaginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[5, 10, 20, 30, 40, 50, 100]}
      disableColumnMenu
      disableColumnResize
      disableRowSelectionOnClick
      loading={isLoading}
    />
  );
}

export default Table;
