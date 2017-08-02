import { createActions } from 'redux-actions';

export const {
    changeData, 
    changeModalData, 
    changeModalVisible, 
    changeModalAction 
} = createActions({
    CHANGE_DATA: (data: any[]) => ({data}),
    CHANGE_MODAL_DATA: (data: any) => ({data}),
    CHANGE_MODAL_VISIBLE: (modalIsOpen: boolean) => ({modalIsOpen}), 
    CHANGE_MODAL_ACTION: (modalAction: (d: any) => void) => ({modalAction})
});
