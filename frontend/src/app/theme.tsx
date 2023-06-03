import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0AB0EA',
        },
        secondary: {
            main: '#FBD203',
        },
        background: {
            default: '#F3F3F3',
        },
    },
});

const ThemeWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper