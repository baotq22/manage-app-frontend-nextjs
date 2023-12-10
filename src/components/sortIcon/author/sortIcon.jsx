import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { setDataFilter } from "@/states/modules/author";
import { useState } from "react";
import { requestGetAllAuthor } from "@/api/author";

const SortIcon = ({ type }) => {

    const dispatch = useDispatch();
    const filter = useSelector(state => state.author.dataFilter)
    const [sortOrder, setSortOrder] = useState('asc'); // Sắp xếp tăng dần (asc) là mặc định
    const handleSort = () => {
        const newSortOrder = (sortOrder === 'asc') ? 'desc' : 'asc'; // Đảo ngược thứ tự sắp xếp
        if (type === 'fullName') {
            setSortOrder(newSortOrder);
            dispatch(setDataFilter({ ...filter, sort_by: 'name', sort_order: newSortOrder }))
            dispatch(requestGetAllAuthor());
        } else if (type === 'date') {
            setSortOrder(newSortOrder);
            dispatch(setDataFilter({ ...filter, sort_by: 'date_of_birth', sort_order: newSortOrder }))
            dispatch(requestGetAllAuthor());
        }
        console.log('type', type);
    }
    return (
        <span onClick={handleSort}>{type === 'fullName'? 'Họ tên':'Ngày sinh'}</span>
    )
}

export default SortIcon;