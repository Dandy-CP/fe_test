import React, { useState } from 'react';
import { Moment } from 'moment';
import { Button, Tab, Tabs, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Print } from '@mui/icons-material';
import { TotalTunai } from '@/components/modules/laporan-lalin';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function LaporanLalinPerHari() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [value, setValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedDate(null);
    setPagination({ page: 1, pageSize: 10 });
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">Laporan Lalin Per Hari</h1>

      <div className="mt-5 w-full">
        <div className="w-full p-8 shadow-xl rounded-md">
          <div className="flex flex-row gap-5">
            <TextField placeholder="Search" />

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={selectedDate}
                label="Tanggal"
                onChange={(value) => {
                  setSelectedDate(value);
                  setPagination({ page: 1, pageSize: 10 });
                }}
              />
            </LocalizationProvider>

            <Button
              variant="contained"
              onClick={() => {
                setSelectedDate(null);
                setPagination({ page: 1, pageSize: 10 });
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-row justify-between">
            <Tabs value={value} onChange={handleChangeTab}>
              <Tab label="Total Tunai" />
              <Tab label="Total E-Toll" />
              <Tab label="Total Flo" />
              <Tab label="Total KTP" />
              <Tab label="Total Keseluruhan" />
              <Tab label="Total E-Toll + Tunai + Flo" />
            </Tabs>

            <Button variant="contained" startIcon={<Print />}>
              Export
            </Button>
          </div>

          <CustomTabPanel value={value} index={0}>
            <TotalTunai
              pagination={pagination}
              setPagination={setPagination}
              selectedDate={selectedDate}
            />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}

export default LaporanLalinPerHari;
