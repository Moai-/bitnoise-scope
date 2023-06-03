import { Grid, styled } from '@mui/material';
import icon from './icon.png';
import title from './title.png';

const Header = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: '100%'
}));

const HeaderIcon = styled('img')(({ theme }) => ({
  height: '50px',
  width: '50px',
}));

const HeaderTitle = styled('img')(({ theme }) => ({
  height: '50px',
  width: '130px',
}));

const HeaderContent: React.FC = () => {

  return (
    <Header>
      <Grid container alignItems="center">
        <Grid item>
          <HeaderIcon src={icon} alt="Aato" />
        </Grid>
        <Grid item>
          <HeaderTitle src={title} alt="Arptat" />
        </Grid>
      </Grid>
    </Header>
  );
};

export default HeaderContent;