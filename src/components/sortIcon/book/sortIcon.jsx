import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { useState } from "react";
import { setBookDataFilter } from "@/states/modules/book";
import { requestGetAllBook } from "@/api/book";

const SortIcon = ({ type }) => {

    const dispatch = useDispatch();
    const filter = useSelector(state => state.book.dataFilter)
    const [sortOrder, setSortOrder] = useState('asc'); // Sắp xếp tăng dần (asc) là mặc định
    const handleSort = () => {
        const newSortOrder = (sortOrder === 'asc') ? 'desc' : 'asc'; // Đảo ngược thứ tự sắp xếp
        if (type === 'name') {
            setSortOrder(newSortOrder);
            dispatch(setBookDataFilter({ ...filter, sort_by: 'name', sort_order: newSortOrder }))
            dispatch(requestGetAllBook());
        } else if (type === 'date') {
            setSortOrder(newSortOrder);
            dispatch(setBookDataFilter({ ...filter, sort_by: 'year_creation', sort_order: newSortOrder }))
            dispatch(requestGetAllBook());
        } else if (type === 'total') {
            setSortOrder(newSortOrder);
            dispatch(setBookDataFilter({ ...filter, sort_by: 'total', sort_order: newSortOrder }))
            dispatch(requestGetAllBook());
        }
        console.log('type', type);
    }

    const handleType = (type) => {
        switch (type) {
            case 'name':
                return 'Tên sách';
            case 'date':
                return 'Thời gian';
            case 'total':
                return 'Số lượng';
            default:
                return '';
        }
    }

    return (
        <span onClick={handleSort}>{handleType(type)}</span>
    )
}

export default SortIcon;