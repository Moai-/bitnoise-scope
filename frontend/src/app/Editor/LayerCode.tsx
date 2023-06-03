import Prism, { highlight } from 'prismjs';
import 'prismjs/themes/prism.css';
import Editor from 'react-simple-code-editor';
import { useEditorSelector } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { setCurrentLayer } from '../../redux/editor/actions';
import { useCanvasContext } from '../../context/canvas';

const LayerCode = () => {

    const { currentLayer } = useEditorSelector();
    const { error } = useCanvasContext();

    const dispatch = useDispatch();

    if (!currentLayer) {
        return null;
    }

    const handleValueChange = (code: string) => {
        dispatch(setCurrentLayer({
            ...currentLayer,
            code,
        }))
    }

    return (
        <Editor
            value={currentLayer?.code || ''}
            tabSize={1}
            insertSpaces={false}
            onValueChange={handleValueChange}
            highlight={code => highlight(code, Prism.languages.js, 'js')}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                color: 'black',
                backgroundColor: 'white',
                fontSize: 12,
                width: '100%',
                height: '100%',
                minHeight: '500px',
                border: `3px dotted ${error === null ? 'black' : 'red'}`,
            }}
        />
    )
}

export default LayerCode;