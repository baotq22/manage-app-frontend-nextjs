import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { useState } from "react";
import { requestGetAllEmployee } from "@/api/employee";
import { setEmployeeDataFilter } from "@/states/modules/employee";

const EmployeeSortIcon = ({ type }) => {

    const dispatch = useDispatch();
    const filter = useSelector(state => state.employee.dataFilter)
    const [sortOrder, setSortOrder] = useState('asc'); // Sắp xếp tăng dần (asc) là mặc định
    const handleSort = () => {
        const newSortOrder = (sortOrder === 'asc') ? 'desc' : 'asc'; // Đảo ngược thứ tự sắp xếp
        if (type === 'fullName') {
            setSortOrder(newSortOrder);
            dispatch(setEmployeeDataFilter({ ...filter, sort_by: 'name', sort_order: newSortOrder }))
            dispatch(requestGetAllEmployee());
        } else if (type === 'email') {
            setSortOrder(newSortOrder);
            dispatch(setEmployeeDataFilter({ ...filter, sort_by: 'email', sort_order: newSortOrder }))
            dispatch(requestGetAllEmployee());
        }else if (type === 'phone') {
            setSortOrder(newSortOrder);
            dispatch(setEmployeeDataFilter({ ...filter, sort_by: 'phone', sort_order: newSortOrder }))
            dispatch(requestGetAllEmployee());
        }
    }
    return (
        <svg onClick={handleSort} className={styles.sortIcon} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <g fill="currentColor">
                <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
            </g>
        </svg>
    )
}

export default EmployeeSortIcon;