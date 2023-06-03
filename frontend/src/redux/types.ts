export type SignalId = string;
export type SignalReference = {
    id: SignalId,
    props: any
}

export type CodeLayerId = string;
export type CodeLayer = {
    name: string,
    id: CodeLayerId,
    code: string,
    signal: SignalReference
}

export type MandalaId = string;
export type Mandala = {
    name: string,
    id: MandalaId,
    layers: Array<CodeLayer>
}

export type MandalaState = {
    examples: Array<Mandala>,
    mine: Array<Mandala>,
}

export enum PropType {
    STRING = 'string',
    NUMBER = 'number'
}

export type PropInstance = {
    name: string,
    type: PropType,
    def: any,
}

export type SignalContainer = {
    name: string;
    description: string;
    id: SignalId;
    code: string;
    props: Array<PropInstance>;
}

export type SignalSourcesState = {
    examples: Array<SignalContainer>;
    mine: Array<SignalContainer>;
}

export type EditorState = {
    mandala: Mandala | null,
    layers: Array<CodeLayer> | null,
    currentLayer: CodeLayer | null,
    showSignalSelector: boolean,
}

export type ReduxState = {
    signalSources: SignalSourcesState,
    mandalas: MandalaState,
    editor: EditorState
}