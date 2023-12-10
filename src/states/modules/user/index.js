import { createSlice } from "@reduxjs/toolkit"

const user = createSlice({
    name: "user",
    initialState: {
        isLoadingAddUser: false,
        isLoadingUpdateUser: false,
        isLoadingGetAllUser: false,
        isLoadingGetDetailUser: false,
        isLoadingDeleteUser: false,
        listUsers: [],
        detailsUsers: {},
        dataFilter: {
            search: "",
            sort_by: "",
            sort_order: "",
            page: 1,
            number_user: null,
            page_size: 8,
        },

        messageAddUserSuccess: {},

        modalAddUser: {
            isShowModalAddUser: false,
        },
        modalUpdateUser: {
            isShowModalUpdateUser: false,
        },
        modalDeleteUser: {
            isShowModalDeleteUser: false,
        },

        userActive: {
            email: "",
            username: "",
            fullname: "",
            description: "",
            phone: "",



        }
    },
    reducers: {
        setOpenModalAddUser: (state, actions) => ({
            ...state,
            modalAddUser: {
                ...state.modalAddUser,
                isShowModalAddUser: actions.payload,
            },
        }),
        setOpenModalUpdateUser: (state, actions) => ({
            ...state,
            modalUpdateUser: {
                ...state.modalUpdateUser,
                isShowModalUpdateUser: actions.payload,
            },
        }),
        setOpenModalDeleteUser: (state, actions) => ({
            ...state,
            modalDeleteUser: {
                ...state.modalDeleteUser,
                isShowModalDeleteUser: actions.payload,
            },
        }),

        requestAddUser: (state) => ({
            ...state,
            isLoadingAddUser: true,
        }),
        requestAddUserSuccess: (state, action) => ({
            ...state,
            isLoadingAddUser: false,
            messageAddUserSuccess: {
                message: action.payload.data,
            }
        }),
        requestAddUserFail: (state, action) => ({
            ...state,
            isLoadingAddUser: false,
        }),

        requestUpdateUser: (state) => ({
            ...state,
            isLoadingUpdateUser: true,
        }),
        requestUpdateUserSuccess: (state, action) => ({
            ...state,
            isLoadingUpdtateUser: false,
            messageUpdateUserSuccess: {
                message: action.payload.data,
            }
        }),
        requestUpdateUserFail: (state) => ({
            ...state,
            isLoadingUpdateUser: false,
        }),

        getAllUser: (state) => ({
            ...state,
            isLoadingGetAllUser: true
        }),
        getAllUserSuccess: (state, action) => ({
            ...state,
            listUsers: action.payload.data,
            isLoadingGetAllUser: false
        }),
        getAllUserFail: (state) => ({
            ...state,
            isLoadingGetAllUser: false
        }),

        getDetailsUser: (state) => ({
            ...state,
            isLoadingGetDetailsUser: true
        }),
        getDetailsUserSuccess: (state, action) => ({
            ...state,
            detailsUser: action.payload.data,
            isLoadingGetDetailsUser: false
        }),
        getDetailsUserFail: (state) => ({
            ...state,
            isLoadingGetDetailsUser: false
        }),

        requestDeleteProduct: (state) => ({
            ...state,
            isLoadingDeleteUser: true
        }),
        requestDeleteProductSuccess: (state, action) => ({
            ...state,
            isLoadingDeleteUser: false
        }),
        requestDeleteProductFail: (state) => ({
            ...state,
            isLoadingDeleteUser: false
        }),

        setUserActive: (state, action) => ({
            ...state,
            userActive: { ...action.payload }
        }),

        setUserDataFilter: (state, action) => ({
            ...state,
            dataFilter: { ...action.payload }
        }),
    }
});

export const {
    setOpenModalAddUser, setOpenModalUpdateUser, setOpenModalDeleteUser,
    getAllUser, getAllUserSuccess, getAllUserFail,
    getDetailsUser, getDetailsUserSuccess, getDetailsUserFail,
    requestAddUser, requestAddUserSuccess, requestAddUserFail,
    requestUpdateUser, requestUpdateUserSuccess, requestUpdateUserFail,
    requestDeleteProduct, requestDeleteProductSuccess, requestDeleteProductFail,
    setUserActive, setUserDataFilter
} = user.actions

export default user.reducer;