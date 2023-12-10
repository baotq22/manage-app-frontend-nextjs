'use client'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setOpenModalDeleteProduct } from '../../../states/modules/product/index';
import { requestsDeleteProduct, requestGetAllProduct } from '../../../api/product/index';


function ModalDeleteProduct() {
    const dispatch = useDispatch();
    const isShowModal = useSelector(state => state.product.modalDeleteProduct.isShowModalDeleteProduct);
    const productDetails = useSelector(state => state.product.productActive);

    const handleDelete = () => {
        requestsDeleteProduct(productDetails._id)
            .then(({ data }) => {
                if (data.status === 200) {
                    toast.success('Delete Successfully !');
                    dispatch(requestGetAllProduct());
                    handleCLoseModal();
                }
            })
            .catch((data) => {
                if (data.status !== 200) {
                    toast.error('Delete Failed !');
                }
            })
    };

    const handleCLoseModal = () => {
        dispatch(setOpenModalDeleteProduct(false));
    }

    return (
        <>
            <ToastContainer transition={Slide} />
            <Modal show={isShowModal} onHide={() => handleCLoseModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Action to Delete ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this product: {<span style={{ color: 'red' }}>{productDetails.productName}</span>}  ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Yes</Button>
                    <Button variant="secondary" onClick={handleCLoseModal}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteProduct;