import { Grid, Paper, styled, useMediaQuery } from '@mui/material';
import Logo from '../Logo'

const LogoContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(1),
}));

const Menu = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  marginTop: theme.spacing(1),
}));

const Canvas = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  margin: theme.spacing(2),
}));

const Sidepane = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2)
}));

const Layout = () => {
  const isMinWidth = useMediaQuery('(min-width:960px)');

  const desktopBottomMargin = isMinWidth ? {} : {marginBottom: 0}

  const leftPane = (
    <Sidepane container item xs={12} md={2} direction='column' spacing={2}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Menu>
        Menu
      </Menu>
    </Sidepane>
  );

  const canvasPane = (
    <Canvas style={{...desktopBottomMargin}}>
      Canvas
    </Canvas>
  );

  return (
    <Grid container style={{ height: '97vh'}}>
      {!isMinWidth && canvasPane}
      {leftPane}
      {isMinWidth && canvasPane}
    </Grid>
  );
};
export default Layout;