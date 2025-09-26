import type { AlertColor } from '@mui/material';

export type NotifyOptions = {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
};