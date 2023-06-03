import { Grid, Paper, styled, useMediaQuery } from '@mui/material';
import Logo from '../Logo'
import Player from '../Player';
import LayerList from '../Editor/LayerList';
import LayerDetails from '../Editor/LayerDetails';
import LayerCode from '../Editor/LayerCode';
import ActionButtons from '../Editor/ActionButtons';

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
  alignItems: 'start',
  flexDirection: 'column',
  justifyContent: 'start',
  color: theme.palette.common.white,
  padding: theme.spacing(1),
}));

const Canvas = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  margin: theme.spacing(2),
  overflow: 'hidden',
}));

const Sidepane = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2)
}));

const PlayerWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  margin: 'auto',
  width: '100%',
}));

const PlayerContainer = styled(Grid)(({ theme }) => ({
}));



const Layout = () => {
  const isMinWidth = useMediaQuery('(min-width:960px)');

  const desktopBottomMargin = isMinWidth ? {} : {width: 0, marginBottom: 0 }
  const narrowestDimension = `85v${isMinWidth ? 'h': 'w'}`
  const marginLeft = isMinWidth ? '30px' : '90%'

  const leftPane = (
    <Sidepane container item xs={12} md={2} direction='column' spacing={2}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Menu>
        <LayerList />
        <LayerDetails />
        <LayerCode />
        <ActionButtons />
      </Menu>
    </Sidepane>
  );

  const canvasPane = (
    <Canvas style={{ ...desktopBottomMargin }}>
      <PlayerWrapper sx={{marginLeft}}>
        <PlayerContainer sx={{width: narrowestDimension, height: narrowestDimension}}>
          <Player style={{width: '100%', height: '100%'}} />
        </PlayerContainer>
      </PlayerWrapper>
      <Player />
    </Canvas>
  );

  return (
    <Grid container style={{ height: '97vh' }}>
      {!isMinWidth && canvasPane}
      {leftPane}
      {isMinWidth && canvasPane}
    </Grid>
  );
};
export default Layout;