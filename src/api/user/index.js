import { useDispatch } from "react-redux"
import { getAllUser, getAllUserFail, getAllUserSuccess, getDetailsUser, getDetailsUserFail, getDetailsUserSuccess, requestAddUser, requestAddUserFail, requestAddUserSuccess, requestUpdateUser, requestUpdateUserFail, requestUpdateUserSuccess } from "../../states/modules/user"
import callApi from "../callApi"
import store from "../../states/configureStore"
import Http from "../Https"

export const requestGetAllUser = () => async (dispatch, getState) => {
    const filter = getState().user.dataFilter
    return callApi({
        method: 'get',
        apiPath: `api/auth/get-all`,
        actionTypes: [getAllUser, getAllUserSuccess, getAllUserFail],
        variables: { ...filter },
        dispatch,
        getState
    })
}

export const requestCreateUser = (data) => {
    const dispatch = store.dispatch;
    const getState = store.getState;
    console.log(data)
    return callApi({
        method: 'post',                                                                                                                                                                                                                                                                                                                        
        apiPath: `api/auth/create`,
        actionTypes: [requestAddUser, requestAddUserSuccess, requestAddUserFail],
        variables: { ...data },
        dispatch,
        getState,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const handleUpdateUser = (data, id) => {
    const dispatch = store.dispatch;
    const getState = store.getState;
    return callApi({
        method: 'put',
        apiPath: `api/auth/update/${id}`,
        actionTypes: [requestUpdateUser, requestUpdateUserSuccess, requestUpdateUserFail],
        variables: { ...data },
        dispatch,
        getState,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const requestGetDetailsUser = (id) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `api/auth/details/${id}`,
        actionTypes: [getDetailsUser, getDetailsUserSuccess, getDetailsUserFail],
        variables: {},
        dispatch,
        getState
    })
}

export const requestDeleteUser = (id) => {
    return Http.delete(`auth/delete/${id}`);
}