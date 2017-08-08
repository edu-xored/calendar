import { handleActions } from 'redux-actions';
import { changeData, changeModalData, changeModalVisible, changeModalAction } from '../actions/tableView';



 const defaultState = {
        data: [],
        modalIsOpen: false,
        modalData: {},
        modalAction: null
    };

const tableViewReducer = handleActions({
    [changeData]: (state, action) => ({
        data: action.payload.data,
        modalIsOpen: state.modalIsOpen,
        modalData: state.modalData,
        modalAction: state.modalAction
    }),
    [changeModalData]: (state, action) => ({
        data: state.data,
        modalIsOpen: state.modalIsOpen,
        modalData: action.payload.modalData,
        modalAction: state.modalAction
    }),
    [changeModalVisible]: (state, action) => ({
        data: state.data,
        modalIsOpen: action.payload.modalIsOpen,
        modalData: state.modalData,
        modalAction: state.modalAction
    }),
    [changeModalAction]: (state, action) => ({
        data: state.data,
        modalIsOpen: state.modalIsOpen,
        modalData: state.modalData,
        modalAction: action.payload.modalAction
    })
}, {
    state: defaultState
});

export default tableViewReducer;