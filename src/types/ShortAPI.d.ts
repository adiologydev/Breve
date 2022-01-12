export interface ShortAPIResponse {
  success: boolean;
  data: Data;
  error?: string;
}

export interface Data {
  _id: string;
  url: string;
  alias: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}
