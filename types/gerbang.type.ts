export interface MasterGerbangResponse {
  total_pages: number;
  current_page: number;
  count: number;
  rows: Rows;
}

export interface Rows {
  count: number;
  rows: Row[];
}

export interface Row {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}

export interface CreateGerbangBody {
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}

export interface EditGerbangBody {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}
