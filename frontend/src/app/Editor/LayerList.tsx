import { List, ListItemButton, ListItemText, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useEditorSelector } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { setCurrentLayer } from '../../redux/editor/actions';

const LayerContainer = styled(Box)(({ theme }) => ({
    height: '200px',
    width: '100%',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.black,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
}));
const LayerList = () => {

    const { layers, currentLayer } = useEditorSelector();
    const dispatch = useDispatch();

    const handleClick = (id: string) => {
        const newLayer = layers?.find(layer => layer.id === id);
        if (newLayer) {
            dispatch(setCurrentLayer(newLayer))
        }
    };

    if (!layers) {
        return null;
    }

    return (
        <LayerContainer>
            <List component="nav" aria-label="Layer list">
                {layers.map(layer => (
                    <ListItemButton selected={layer.id === currentLayer?.id} key={layer.id} onClick={() => handleClick(layer.id)}>
                        <ListItemText primary={layer.name} />
                    </ListItemButton>
                ))}
            </List>
        </LayerContainer>
    );
};

export default LayerList;