'use client'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { requestCreateProduct, requestGetAllProduct } from '@/api/product';
import { setOpenModalAddProduct } from '@/states/modules/product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Image } from 'react-bootstrap';
import NoImage from '@/components/notImage';

function ModalAddProduct() {
    const dispatch = useDispatch();
    const isShowModal = useSelector(state => state.product.modalAddProduct.isShowModalAddProduct);
    const [imagePreview, setImagePreview] = useState(null);

    const [inputData, setInputData] = useState();
    const [errorMessages, setErrorMessages] = useState({});

    const MIN_NAME_LENGTH = 1;
    const MAX_NAME_LENGTH = 255;
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const specialCharsDescription = /[$%^&*_[\]{}|]+/;

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        if (e.target?.files?.[0] instanceof File) {
            const file = e.target.files[0];
            setInputData({ ...inputData, [name]: e.target.files[0] });
            setImagePreview(URL.createObjectURL(file));
        } else {
            // Xử lý các trường input khác như bình thường
            setInputData({ ...inputData, [name]: value });
            setErrorMessages({ ...errorMessages, [name]: "" });
        }
        console.log(inputData);
    };


    const handleCLoseModal = () => {
        dispatch(setOpenModalAddProduct(false))
        setInputData({});
        setErrorMessages({})
        setImagePreview(null);
    }

    const onClickSubmit = async (e) => {
        e.preventDefault();
        console.log('Log của onClickSubmit')
        const isTrueName = specialChars.test(inputData?.productName);
        const isTrueDescription = specialCharsDescription.test(inputData?.description);
        const errors = {};

        if (!inputData?.productName) {
            errors.productName = "Product Name do not empty !";
        } else if (isTrueName) {
            errors.productName = "The Product Name includes invalid characters. Try again !";
        } else if (inputData?.productName.length < MIN_NAME_LENGTH || inputData?.productName.length > MAX_NAME_LENGTH) {
            errors.productName = `Product Name have length from ${MIN_NAME_LENGTH} to ${MAX_NAME_LENGTH} characters !`;
        }

        if (!inputData?.price || inputData?.price < 0) {
            errors.price = "Price do not empty and must be greater than 0 !";
        }

        if (!inputData?.ratingPoint || inputData?.ratingPoint < 0) {
            errors.ratingPoint = "Rating point do not empty and must be greater than 0 !";
        }

        if (!inputData?.quantity || inputData?.quantity < 0) {
            errors.quantity = "Quantity do not empty and must be greater than 0 !";
        }

        if (!inputData?.soldQuantity || inputData?.soldQuantity < 0) {
            errors.soldQuantity = "Quantity do not empty and must be greater than 0 !";
        }

        if (!inputData?.description) {
            errors.description = "Description do not empty !";
        } else if (isTrueDescription) {
            errors.description = "The description includes invalid characters. Try again !";
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
        } else {

            requestCreateProduct(inputData)
                .then((response) => {
                    console.log(response.status)
                    if (response.status < 300 && response.status >= 200) {

                        toast.success('Created New Product Successfully!');
                        handleCLoseModal();
                        setTimeout(() => {
                            dispatch(requestGetAllProduct());
                        }, 1000);
                    }
                    else {
                        toast.error('Failed To Create New Product!');
                    }
                }
            )
        }
    }

    return (
        <>
            <ToastContainer transition={Slide} />
            <Modal
                show={isShowModal}
                onHide={() => handleCLoseModal()}
                backdrop="static"
                keyboard={false}
                size='xl'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div className="p-6 flex items-center justify-center flex-col w-full max-w-md rounded-xl bg-slate-100 m-auto shadow-lg">
                                    <input
                                        id="file-input"
                                        className="hidden"
                                        name="image" type="file" required
                                        onChange={onChangeInput}
                                    />
                                    {
                                        imagePreview ?
                                            <Image
                                                htmlFor="file-input"
                                                className="w-full object-fill mb-5 rounded-xl"
                                                style={{ width: '300px', height: '200px' }}
                                                src={imagePreview} alt="image preview"
                                            /> : <NoImage />
                                    }
                                    <label htmlFor="file-input" className="font-semibold cursor-pointer bg-slate-100 rounded-xl py-3 px-5 bg-blue-600">
                                        Select Image
                                    </label>
                                </div>
                            </Form.Group>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Product Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="productName"
                                        type="text"
                                        required
                                        className="form-control form-control-user"
                                        id="productName"
                                        placeholder="Input Product Name..."
                                        onChange={onChangeInput}
                                        value={inputData?.productName || ""}
                                    />
                                    {errorMessages?.productName ? <p className="text-danger ml-3">{errorMessages?.productName}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="price"
                                        type="number"
                                        required
                                        className="form-control form-control-user"
                                        id="price"
                                        placeholder="Input Price..."
                                        onChange={onChangeInput}
                                        value={inputData?.price || ""}
                                    />
                                    {errorMessages?.price ? <p className="text-danger ml-3">{errorMessages?.price}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Rating Point <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="ratingPoint"
                                        id="ratingPoint"
                                        required
                                        type="number"
                                        className="form-control"
                                        placeholder="Input Rating Point..."
                                        onChange={onChangeInput}
                                        value={inputData?.ratingPoint || ""}
                                    />
                                    {errorMessages?.ratingPoint ? <p className="text-danger ml-3">{errorMessages?.ratingPoint}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Quantity <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="quantity"
                                        id="quantity"
                                        type="number"
                                        className="form-control"
                                        onChange={onChangeInput}
                                        placeholder="Input Quantity..."
                                        value={inputData?.quantity || ""}
                                    />
                                    {errorMessages?.quantity ? <p className="text-danger ml-3">{errorMessages?.quantity}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Sold Quantity <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="soldQuantity"
                                        id="soldQuantity"
                                        type="number"
                                        className="form-control"
                                        onChange={onChangeInput}
                                        placeholder="Input Sold Quantity..."
                                        value={inputData?.soldQuantity || ""}
                                    />
                                    {errorMessages?.soldQuantity ? <p className="text-danger ml-3">{errorMessages?.soldQuantity}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Description <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <textarea
                                        name="description"
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        aria-describedby="name"
                                        placeholder="Input Description..."
                                        onChange={onChangeInput}
                                        value={inputData?.description || ""}
                                    />
                                    {errorMessages?.description ? <p className="text-danger ml-3">{errorMessages?.description}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Row gutter={[16, 24]} className="rowClass">
                                        <Col span={12} className="drop-shadow-xl">
                                            <Form.Label>% Discount <span style={{ color: 'red' }}>*</span></Form.Label>
                                            <input
                                                name="discount"
                                                type="number"
                                                className="form-control"
                                                id="discount"
                                                placeholder="Input % Discount..."
                                                onChange={onChangeInput}
                                                value={inputData?.discount || ""}
                                            />
                                        </Col>
                                        <Col span={12} className="drop-shadow-xl">
                                            <Form.Label>Special <span style={{ color: 'red' }}>*</span></Form.Label>
                                            <input
                                                name="special"
                                                type="number"
                                                className="form-control"
                                                id="special"
                                                placeholder="Input % Discount..."
                                                onChange={onChangeInput}
                                                value={inputData?.special || ""}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <p className="mt-4">The field with &quot;<span className="text-red-500">*</span>&quot; mark is required</p>
                        </Row>
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={onClickSubmit}>Add</Button>
                    <Button variant="secondary" onClick={handleCLoseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddProduct;