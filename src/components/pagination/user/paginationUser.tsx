import { requestGetAllUser } from "@/api/user";
import { setUserDataFilter } from "@/states/modules/user";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";

function PaginationUser({ listUsers }) {
    const filter = useSelector(state => state.user.dataFilter)
    const dispatch = useDispatch();
    const handleChangePage = (e) => {
        dispatch(setUserDataFilter({ ...filter, page: e }))
        dispatch(requestGetAllUser());
    }

    return (
        <>
            <div className="w-full flex items-center justify-center py-5 px-0 mt-12 bg-slate-200 rounded-xl">
                <Pagination 
                    responsive
                    onChange={handleChangePage}
                    current={listUsers?.page}
                    pageSize={listUsers?.data?.page_size || 8}
                    total={listUsers?.total}
                    showSizeChanger={false}
                />
            </div>
        </>
    )
}

export default PaginationUser