import React from 'react';
import { requestGetAllProduct } from "@/api/product";
import { setProductDataFilter } from "@/states/modules/product";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";



function PaginationProduct({ listProducts }) {
    const filter = useSelector(state => state.product.dataFilter)
    const dispatch = useDispatch();
    const handleChangePage = (e) => {
        dispatch(setProductDataFilter({ ...filter, page: e }))
        dispatch(requestGetAllProduct());
    }

    // console.log(filter)

    return (
        <>
            <div className="w-full flex items-center justify-center py-5 px-0 mt-12 mb-4 bg-slate-200 rounded-xl">
                <Pagination 
                    responsive
                    onChange={handleChangePage}
                    current={listProducts?.page}
                    pageSize={listProducts?.data?.page_size || 8}
                    total={listProducts?.total}
                    showSizeChanger={false}
                />
            </div>
        </>
    )
}

export default PaginationProduct