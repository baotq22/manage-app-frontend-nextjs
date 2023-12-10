import { Space } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataFilter } from "@/states/modules/user";
import { requestGetAllUser } from "@/api/user";


const InputSearchUser = ({listUsers}) => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.user.dataFilter)
    const hanleClickSearch = (val) => {
        dispatch(setUserDataFilter({ ...filter, search: val }))
        dispatch(requestGetAllUser());
    }

    return (
        <div className="inline-block float-right my-2">
            <Space.Compact>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={hanleClickSearch}
                />
            </Space.Compact>
        </div >
    )
}

export default InputSearchUser;