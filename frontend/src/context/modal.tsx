import { FC, ReactNode, createContext, useContext, useState } from "react";

type TAction = {
    onClick: (text: string) => void,
    text: string,
}

type TModal = {
    open: boolean,
    text: string,
    actions: Array<TAction>,
}

type TModalContext = {
    modal: TModal,
    openModal: (text: string, actions: Array<TAction>) => void,
    closeModal: () => void,
}

const ModalContext = createContext<TModalContext>({
    modal: {
        open: false,
        text: '',
        actions: [],
    },
    openModal: () => { },
    closeModal: () => { },
});

const ModalContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const [modal, setModal] = useState<TModal>({
        open: false,
        text: '',
        actions: [],
    });

    const openModal = (text: string, actions: Array<TAction>) => {
        setModal({ open: true, text, actions });
    };

    const closeModal = () => {
        setModal({ ...modal, open: false });
    };

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};

export default ModalContextWrapper;