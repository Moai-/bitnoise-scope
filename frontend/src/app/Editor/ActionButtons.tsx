import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import { PlayArrow, Pause, Clear, GetApp, Save } from '@mui/icons-material';
import { useCanvasContext } from '../../context/canvas';

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: theme.spacing(1),
    width: '100%'
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#fff',
    '&:hover': {
        backgroundColor: '#fff',
    },
    borderRadius: '25%',
    padding: theme.spacing(1),
}));

const ActionButtons = () => {
    const {isPaused, setIsPaused, clear} = useCanvasContext();
    const playPauseIcon = isPaused ? <PlayArrow /> : <Pause />;
    return (
        <ButtonContainer>
            <StyledIconButton onClick={()=>{setIsPaused(!isPaused)}}>
                {playPauseIcon}
            </StyledIconButton>
            <StyledIconButton onClick={clear}>
                <Clear />
            </StyledIconButton>
            <StyledIconButton>
                <GetApp />
            </StyledIconButton>
            <StyledIconButton>
                <Save />
            </StyledIconButton>
        </ButtonContainer>
    );
};

export default ActionButtons;