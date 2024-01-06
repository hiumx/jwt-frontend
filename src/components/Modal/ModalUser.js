import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllGroupUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

function ModalUser(props) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('Male');
    const [groupId, setGroupId] = useState(1);

    const defaultValidInput = {
        email: true,
        phone: true,
        address: true,
        username: true,
        password: true,
        gender: true,
        groupId: true,
    }
    const [validInput, setValidInput] = useState(defaultValidInput);

    const [groupUsers, setGroupUsers] = useState([]);

    useEffect(() => {
        async function fetchGroupUsers() {
            const res = await getAllGroupUser();
            setGroupUsers(res);
        }
        fetchGroupUsers();
    }, [])

    useEffect(() => {
        if (props.actionModal === 'UPDATE' && !_.isEmpty(props.userData)) {
            const { email, phone, username, address, gender, groupId } = props.userData;
            setEmail(email);
            setPhone(phone);
            setUsername(username);
            setAddress(address);
            setGender(gender);
            setGroupId(+groupId);
        } else if (props.actionModal === 'CREATE') {
            freeInputData();
        }
    }, [props.userData])

    const validateUserInput = () => {
        let userInput = {};

        props.actionModal === 'CREATE'
            ? userInput = { email, phone, address, username, password, gender, groupId }
            : userInput = { address, username, gender, groupId }

        for (const key in userInput) {
            if (!userInput[key]) {
                toast.error(`Please enter ${key}!`);
                setValidInput({ ...defaultValidInput, [key]: false })
                return false;
            }

            if (key === 'email' && !email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                toast.error('Email invalid!')
                setValidInput({ ...defaultValidInput, email: false })
                return false;
            }

            if (props.actionModal === 'CREATE' && key === 'password' && !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
                toast.error('Password must be 6 -16 characters and has least a number, least a special character')
                setValidInput({ ...defaultValidInput, password: false })
                return false;
            }

        }
        return true;
    }

    const freeInputData = () => {
        setEmail('');
        setPhone('');
        setUsername('');
        setAddress('');
        setPassword('');
        setGender('male');
        setGroupId(1);
    }

    const handleClickConfirmAction = () => {
        if (validateUserInput()) {
            if (props.actionModal === 'CREATE') {
                props.handleAction({ email, phone, username, address, password, gender, groupId });
                // freeInputData();
            } else if (props.actionModal === 'UPDATE') {
                const userIdUpdate = props.userData.id;
                props.handleAction({ id: userIdUpdate, username, address, gender, groupId, groupUsers });
            }
        }

    }


    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.isShowModal}
            onHide={() => {
                props.handleCloseModal();
                if(props.actionModal === 'CREATE')
                    freeInputData();
            }
            }
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.actionModal === 'UPDATE' ? 'Update user' : 'Create new user'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modal__content'>
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <label className='form-label'>Email</label>
                            <input
                                className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter your email...'
                                disabled={props.actionModal === 'UPDATE'}
                            />
                        </div>
                        <div className='col-lg-6'>
                            <label className='form-label'>Phone</label>
                            <input
                                className={validInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder='Enter your phone number...'
                                disabled={props.actionModal === 'UPDATE'}
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>

                        <div className='col-lg-12'>
                            <label className='form-label'>Address</label>
                            <input
                                className={validInput.address ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder='Enter your address...'
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className={props.actionModal === 'UPDATE' ? 'col-lg-12' : 'col-lg-6'}>
                            <label className='form-label'>Username</label>
                            <input
                                className={validInput.username ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder='Enter username...'
                            />
                        </div>
                        {props.actionModal === 'CREATE' &&
                            <div className='col-lg-6'>
                                <label className='form-label'>Password</label>
                                <input
                                    className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Enter your password...'
                                />
                            </div>
                        }

                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <label className='form-label'>Gender</label>
                            <select
                                className="form-select form-select-md mb-3"
                                aria-label=".form-select-lg example"
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className='col-lg-6'>
                            <label className='form-label'>Group user</label>
                            <select
                                className="form-select form-select-md mb-3"
                                aria-label=".form-select-lg example"
                                onChange={(e) => setGroupId(e.target.value)}
                                value={groupId}
                            >
                                {groupUsers.length > 0 &&
                                    groupUsers.map((groupUser, index) => <option key={index} value={groupUser.id}>{groupUser.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleClickConfirmAction}
                >
                    {props.actionModal === 'UPDATE' ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;
