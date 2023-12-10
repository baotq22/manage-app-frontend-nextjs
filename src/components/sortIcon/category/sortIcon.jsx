import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { useState } from "react";
import { setCategoriesDataFilter } from "@/states/modules/category";
import { requestGetAllCategory } from "@/api/category";

const SortIcon = ({ type }) => {

    const dispatch = useDispatch();
    const filter = useSelector(state => state.category.dataFilter)
    const [sortOrder, setSortOrder] = useState('asc'); // Sắp xếp tăng dần (asc) là mặc định
    const handleSort = () => {
        const newSortOrder = (sortOrder === 'asc') ? 'desc' : 'asc'; // Đảo ngược thứ tự sắp xếp
        if (type === 'fullName') {
            setSortOrder(newSortOrder);
            dispatch(setCategoriesDataFilter({ ...filter, sort_by: 'name', sort_order: newSortOrder }))
            dispatch(requestGetAllCategory());
        }
        console.log('type', type);
    }
    return (
        <span onClick={handleSort}>{type === 'fullName'? 'Tên thể loại':''}</span>

    )
}

export default SortIcon;