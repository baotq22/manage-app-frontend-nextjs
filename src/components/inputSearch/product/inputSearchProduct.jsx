import { Space } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { setProductDataFilter } from "@/states/modules/product";
import { requestGetAllProduct } from "@/api/product";


const InputSearchProduct = ({listProducts}) => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.product.dataFilter)
    const hanleClickSearch = (val) => {
        dispatch(setProductDataFilter({ ...filter, search: val }))
        dispatch(requestGetAllProduct());
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

export default InputSearchProduct;