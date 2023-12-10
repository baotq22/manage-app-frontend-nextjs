import {
    getAllProduct,
    getAllProductFail,
    getAllProductSuccess,
    getDetailsProduct,
    getDetailsProductFail,
    getDetailsProductSuccess,
    requestAddProduct,
    requestAddProductFail,
    requestAddProductSuccess,
    requestDeleteProduct,
    requestDeleteProductFail,
    requestDeleteProductSuccess,
    requestUpdateProduct,
    requestUpdateProductFail,
    requestUpdateProductSuccess
} from "@/states/modules/product"
import callApi from '../callApi'
import Http from '../Https'
import store from "@/states/configureStore"

export const requestGetAllProduct = () => async (dispatch, getState) => {
    const filter = getState().product.dataFilter
    return callApi({
        method: 'get',
        apiPath: `api/product/get-all`,
        actionTypes: [getAllProduct, getAllProductSuccess, getAllProductFail],
        variables: { ...filter },
        dispatch,
        getState
    })
}

export const requestCreateProduct = (data) => {
    const dispatch = store.dispatch;
    const getState = store.getState;
    console.log(data);
    return callApi({
        method: 'post',
        apiPath: `api/product/create`,
        actionTypes: [requestAddProduct, requestAddProductSuccess, requestAddProductFail],
        variables: { ...data },
        dispatch,
        getState,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const handleUpdateProduct = (data, id) => {
    const dispatch = store.dispatch;
    const getState = store.getState;
    return callApi({
        method: 'put',
        apiPath: `api/product/update/${id}`,
        actionTypes: [requestUpdateProduct, requestUpdateProductSuccess, requestUpdateProductFail],
        variables: { ...data },
        dispatch,
        getState,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export const requestGetDetailsProduct = (id) => async (dispatch, getState) => {
    console.log('detail', id)
    return callApi({
        method: 'get',
        apiPath: `api/product/details/${id}`,
        actionTypes: [getDetailsProduct, getDetailsProductSuccess, getDetailsProductFail],
        variables: {},
        dispatch,
        getState
    })
}

export const requestsDeleteProduct = (id) => {
    return Http.delete(`product/delete/${id}`);
}