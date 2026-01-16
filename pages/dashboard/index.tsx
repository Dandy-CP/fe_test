import { Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  GerbangChart,
  PaymentChart,
  RuasPieChart,
  ShiftPieChart,
} from '@/components/modules/dashboard';

function Dashboard() {
  return (
    <div>
      <h1 className="font-semibold text-xl">Dashboard</h1>

      <div className="mt-5">
        <div
          className="flex flex-row gap-3 mb-10"
          suppressHydrationWarning={true}
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker label="Tanggal" />
          </LocalizationProvider>

          <Button variant="contained">Filter</Button>
        </div>

        <div className="flex flex-row justify-between items-center">
          <PaymentChart />
          <ShiftPieChart />
        </div>

        <div className="flex flex-row justify-between items-center">
          <GerbangChart />
          <RuasPieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
