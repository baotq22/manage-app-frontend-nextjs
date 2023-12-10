import { createSlice } from "@reduxjs/toolkit"

const product = createSlice({
    name: "product",
    initialState: {
        isLoadingAddProduct: false,
        isLoadingUpdateProduct: false,
        isLoadingGetAllProduct: false,
        isLoadingGetDetailProduct: false,
        isLoadingDeleteProduct: false,
        listProducts: [],
        detailsProduct: {},
        dataFilter: {
            search: "",
            sort_by: "",
            sort_order: "",
            page: 1,
            number_product: null,
            page_size: 8,
        },

        messageAddProductSuccess: {},

        modalAddProduct: {
            isShowModalAddProduct: false,
        },
        modalUpdateProduct: {
            isShowModalUpdateProduct: false,
        },
        modalDeleteProduct: {
            isShowModalDeleteProduct: false,
        },

        productActive: {
            productName: "",
            price: "",
            ratingPoint: "",
            quantity: "",
            soldQuantity: "",
            description: "",
            discount: "",
            special: ""
        }
    },
    reducers: {
        setOpenModalAddProduct: (state, actions) => ({
            ...state,
            modalAddProduct: {
                ...state.modalAddProduct,
                isShowModalAddProduct: actions.payload,
            },
        }),
        setOpenModalUpdateProduct: (state, actions) => ({
            ...state,
            modalUpdateProduct: {
                ...state.modalUpdateProduct,
                isShowModalUpdateProduct: actions.payload,
            },
        }),
        setOpenModalDeleteProduct: (state, actions) => ({
            ...state,
            modalDeleteProduct: {
                ...state.modalDeleteProduct,
                isShowModalDeleteProduct: actions.payload,
            },
        }),

        requestAddProduct: (state) => ({
            ...state,
            isLoadingAddProduct: true,
        }),
        requestAddProductSuccess: (state, action) => ({
            ...state,
            isLoadingAddProduct: false,
            messageAddProductSuccess: {
                message: action.payload.data,
            }
        }),
        requestAddProductFail: (state, action) => ({
            ...state,
            isLoadingAddProduct: false,
        }),

        requestUpdateProduct: (state) => ({
            ...state,
            isLoadingUpdateProduct: true,
        }),
        requestUpdateProductSuccess: (state, action) => ({
            ...state,
            isLoadingUpdtateProduct: false,
            messageUpdateProductSuccess: {
                message: action.payload.data,
            }
        }),
        requestUpdateProductFail: (state) => ({
            ...state,
            isLoadingUpdateProduct: false,
        }),

        getAllProduct: (state) => ({
            ...state,
            isLoadingGetAllProduct: true
        }),
        getAllProductSuccess: (state, action) => ({
            ...state,
            listProducts: action.payload.data,
            isLoadingGetAllProduct: false
        }),
        getAllProductFail: (state) => ({
            ...state,
            isLoadingGetAllProduct: false
        }),

        getDetailsProduct: (state) => ({
            ...state,
            isLoadingGetDetailsProduct: true
        }),
        getDetailsProductSuccess: (state, action) => ({
            ...state,
            detailsProduct: action.payload.data,
            isLoadingGetDetailsProduct: false
        }),
        getDetailsProductFail: (state) => ({
            ...state,
            isLoadingGetDetailsProduct: false
        }),

        requestDeleteProduct: (state) => ({
            ...state,
            isLoadingDeleteProduct: true
        }),
        requestDeleteProductSuccess: (state, action) => ({
            ...state,
            isLoadingDeleteProduct: false
        }),
        requestDeleteProductFail: (state) => ({
            ...state,
            isLoadingDeleteProduct: false
        }),

        setProductActive: (state, action) => ({
            ...state,
            productActive: { ...action.payload }
        }),

        setProductDataFilter: (state, action) => ({
            ...state,
            dataFilter: { ...action.payload }
        }),
    }
});

export const {
    setOpenModalAddProduct, setOpenModalUpdateProduct, setOpenModalDeleteProduct,
    getAllProduct, getAllProductSuccess, getAllProductFail,
    getDetailsProduct, getDetailsProductSuccess, getDetailsProductFail,
    requestAddProduct, requestAddProductSuccess, requestAddProductFail,
    requestUpdateProduct, requestUpdateProductSuccess, requestUpdateProductFail,
    requestDeleteProduct, requestDeleteProductSuccess, requestDeleteProductFail,
    setProductActive, setProductDataFilter
} = product.actions

export default product.reducer;