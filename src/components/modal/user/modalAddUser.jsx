'use client'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { requestCreateUser, requestGetAllUser } from '@/api/user';
import { setOpenModalAddUser } from '@/states/modules/user';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Image } from 'react-bootstrap';
import NoImage from '@/components/notImage';
import NoImageCard from '@/components/notImageCard';

function ModalAddUser() {
    const dispatch = useDispatch();
    const isShowModal = useSelector(state => state.user.modalAddUser.isShowModalAddUser);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageCoverPreview, setImageCoverPreview] = useState(null);

    const [inputData, setInputData] = useState();
    const [errorMessages, setErrorMessages] = useState({});

    const MIN_NAME_PASS_LENGTH = 8;
    const MIN_PASS_LENGTH = 8;
    const MAX_NAME_LENGTH = 255;
    const MAX_PHONE_PASS_LENGTH = 20;
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const specialCharsDescription = /[$%^&*_[\]{}|]+/;
    const specialPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        if (e.target?.files?.[0] instanceof File) {
            const file = e.target.files[0];

            setInputData({ ...inputData, [name]: e.target.files[0] });
            if (name === 'image') {
                setImagePreview(URL.createObjectURL(file));
            } else if (name === 'imageMain') {
                setImageCoverPreview(URL.createObjectURL(file));
            }
        } else {
            setInputData({ ...inputData, [name]: value });
            setErrorMessages({ ...errorMessages, [name]: "" });
        }
        console.log(inputData);
    };

    const handleCLoseModal = () => {
        dispatch(setOpenModalAddUser(false))
        setInputData({});
        setErrorMessages({})
        setImagePreview(null);
        setImageCoverPreview(null);
    }

    const onClickSubmit = async (e) => {
        e.preventDefault();
        const isTrueName = specialChars.test(inputData.username);
        const isTrueFullName = specialChars.test(inputData.fullname);
        const isTrueDescription = specialCharsDescription.test(inputData.description);
        const isTruePhoneNumber = specialChars.test(inputData.phone);
        const isTruePass = specialPass.test(inputData.password);
        const errors = {};

        // if (!inputData.email) {
        //     errors.email = "Email do not empty !";
        // } else if (inputData.email.length < MIN_NAME_PASS_LENGTH || inputData.email.length > MAX_NAME_LENGTH) {
        //     errors.username = `Too long Email. Email only have length from ${MIN_NAME_PASS_LENGTH} to ${MAX_NAME_LENGTH} characters. Try again !`;
        // }

        // if (!inputData.password) {
        //     errors.password = "Password do not empty !";
        // } else if (isTruePass) {
        //     errors.password = "The Password must be match all conditions\n" +
        //         "\t- At least 8 characters in length.\n" +
        //         "\t- Contains at least one uppercase letter.\n" +
        //         "\t- Contains at least one lowercase letter.\n" +
        //         "\t- Contains at least one digit.\n" +
        //         "Try again !";
        // } else if (inputData.password.length < MIN_PASS_LENGTH || inputData.password.length > MAX_PHONE_PASS_LENGTH) {
        //     errors.password = `Out of range password length allowed. Password only have length from ${MIN_PASS_LENGTH} to ${MAX_PHONE_PASS_LENGTH} characters. Try again !`;
        // }

        // if (!inputData.username) {
        //     errors.username = "Username do not empty !";
        // } else if (isTrueName) {
        //     errors.username = "The Username includes invalid characters. Try again !";
        // } else if (inputData.username.length < MIN_NAME_PASS_LENGTH || inputData.username.length > MAX_NAME_LENGTH) {
        //     errors.username = `Too long Username. Username only have length from ${MIN_NAME_PASS_LENGTH} to ${MAX_NAME_LENGTH} characters. Try again !`;
        // }

        // if (!inputData.fullname) {
        //     errors.fullname = "Fullname do not empty !";
        // } else if (isTrueFullName) {
        //     errors.fullname = "The Fullname includes invalid characters. Try again !";
        // } else if (inputData.fullname.length < MIN_NAME_PASS_LENGTH || inputData.fullname.length > MAX_NAME_LENGTH) {
        //     errors.fullname = `Too long Fullname. Fullname only have length from ${MIN_NAME_PASS_LENGTH} to ${MAX_NAME_LENGTH} characters. Try again !`;
        // }

        // if (!inputData.description) {
        //     errors.description = "Description do not empty !";
        // } else if (isTrueDescription) {
        //     errors.description = "The description includes invalid characters. Try again !";
        // }

        // if (!inputData.phone) {
        //     errors.phone = "Phone Number do not empty !";
        // } else if (isTruePhoneNumber) {
        //     errors.phone = "Phone Number includes invalid characters. Try again !";
        // } else if (inputData.phone.length < MIN_NAME_PASS_LENGTH || inputData.phone.length > MAX_PHONE_PASS_LENGTH) {
        //     errors.phone = `Too long Phone Number. Phone Number only have length from ${MIN_NAME_PASS_LENGTH} to ${MAX_PHONE_PASS_LENGTH} characters. Try again !`;
        // }

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
        } else {

            requestCreateUser(inputData)
                .then((response) => {
                    console.log(response.status)
                    if (response.status < 300 && response.status >= 200) {

                        toast.success('Created New User Successfully !');
                        handleCLoseModal();
                        setTimeout(() => {
                            dispatch(requestGetAllUser());
                        }, 1000);
                    }
                    else {
                        toast.error('Failed To Create New User !');
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
                    <Modal.Title>Add new users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row gutter={[12, 16]} className="rowClass">
                            <Col span={8} className="drop-shadow-xl">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div className="p-6 flex items-center justify-center flex-col w-full max-w-md rounded-xl bg-slate-100 m-auto shadow-lg">
                                        <input
                                            id="file-input"
                                            className="hidden"
                                            name="image"
                                            type="file"
                                            required
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
                            </Col>
                            <Col span={8} className="drop-shadow-xl">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div className="p-6 flex items-center justify-center flex-col w-full max-w-md rounded-xl bg-slate-100 m-auto shadow-lg">
                                        <input
                                            id="file-input-cover"
                                            className="hidden"
                                            name="imageMain"
                                            type="file"
                                            required
                                            onChange={onChangeInput}
                                        />
                                        {
                                            imageCoverPreview ?
                                                <Image
                                                    htmlFor="file-input-cover"
                                                    className="w-full object-fill mb-5 rounded-xl"
                                                    style={{ width: '300px', height: '200px' }}
                                                    src={imageCoverPreview} alt="image cover preview"
                                                /> : <NoImageCard />
                                        }
                                        <label htmlFor="file-input-cover" className="font-semibold cursor-pointer bg-slate-100 rounded-xl py-3 px-5 bg-blue-600">
                                            Select Cover Image
                                        </label>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="email"
                                        type="text"
                                        required
                                        className="form-control form-control-user"
                                        id="email"
                                        placeholder="Input Email..."
                                        onChange={onChangeInput}
                                        value={inputData?.email || ""}
                                    />
                                    {errorMessages?.email ? <p className="text-danger ml-3">{errorMessages?.email}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Username <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="username"
                                        type="text"
                                        required
                                        className="form-control form-control-user"
                                        id="username"
                                        placeholder="Input Username..."
                                        onChange={onChangeInput}
                                        value={inputData?.username || ""}
                                    />
                                    {errorMessages?.username ? <p className="text-danger ml-3">{errorMessages?.username}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="form-control form-control-user"
                                        id="password"
                                        placeholder="Input Password..."
                                        onChange={onChangeInput}
                                        value={inputData?.password || ""}
                                    />
                                    {errorMessages?.password ? <p className="text-danger ml-3">{errorMessages?.password}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Fullname <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="fullname"
                                        type="text"
                                        required
                                        className="form-control form-control-user"
                                        id="fullname"
                                        placeholder="Input Fullname..."
                                        onChange={onChangeInput}
                                        value={inputData?.fullname || ""}
                                    />
                                    {errorMessages?.fullname ? <p className="text-danger ml-3">{errorMessages?.fullname}</p> : " "}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Phone Number <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <input
                                        name="phone"
                                        type="text"
                                        required
                                        className="form-control form-control-user"
                                        id="phone"
                                        placeholder="Input Phone Number..."
                                        onChange={onChangeInput}
                                        value={inputData?.phone || ""}
                                    />
                                    {errorMessages?.phone ? <p className="text-danger ml-3">{errorMessages?.phone}</p> : " "}
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

export default ModalAddUser; 