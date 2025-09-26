import { createContext, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Snackbar, type AlertColor } from '@mui/material';

export type NotifyOptions = {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
};

type NotifyCtxValue = {
  notify: (opts: NotifyOptions) => void;
};

const NotifyCtx = createContext<NotifyCtxValue | null>(null);

function NotifyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [autoHideDuration, setAutoHideDuration] = useState<number | undefined>(4000);

  const notify = useCallback((opts: NotifyOptions) => {
    setMessage(opts.message);
    setSeverity(opts.severity ?? 'info');
    setAutoHideDuration(opts.autoHideDuration ?? 4000);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotifyCtx.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={(_, reason) => {
          if (reason === 'clickaway') return;
          handleClose();
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotifyCtx.Provider>
  );
}

export { NotifyCtx, NotifyProvider };
