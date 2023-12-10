'use client'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setOpenModalDeleteUser } from '../../../states/modules/user/index';
import { requestDeleteUser, requestGetAllUser } from '../../../api/user/index';


function ModalDeleteUser() {
    const dispatch = useDispatch();
    const isShowModal = useSelector(state => state.user.modalDeleteUser.isShowModalDeleteUser);
    const userDetails = useSelector(state => state.user.userActive)

    const handleDelete = () => {
        requestDeleteUser(userDetails._id)
            .then(({ data }) => {
                if (data.status === 200) {
                    toast.success('Xóa sách thành công');
                    dispatch(requestGetAllUser());
                    handleCLoseModal();
                }
            })
            .catch((data) => {
                if (data.status !== 200) {
                    toast.error('Xóa sách thất bại !');
                }
            })
    };

    const handleCLoseModal = () => {
        dispatch(setOpenModalDeleteUser(false));
    }

    return (
        <>
            <ToastContainer transition={Slide} />
            <Modal show={isShowModal} onHide={() => handleCLoseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Action to Delete ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this user: {<span style={{ color: 'red' }}>{userDetails.username}</span>}  ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Yes</Button>
                    <Button variant="secondary" onClick={handleCLoseModal}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;