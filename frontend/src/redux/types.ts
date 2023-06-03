export type SignalReference = {
    id: string,
    props: any
}

export type CodeLayer = {
    name: string,
    id: string,
    code: string,
    signal: SignalReference
}

export type Mandala = {
    name: string,
    id: string,
    layers: Array<CodeLayer>
}

export type MandalaState = {
    examples: Array<Mandala>,
    mine: Array<Mandala>,
}

export type EditorState = {
    mandala: Mandala | null,
    layers: Array<CodeLayer> | null,
}

export type ReduxState = {
    mandalas: MandalaState,
    editor: EditorState
}