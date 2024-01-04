import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllGroupUser } from '../../services/userService';

function ModalUser(props) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [groupId, setGroupId] = useState(1);
    const [groupUsers, setGroupUsers] = useState([]);

    useEffect(() => {
        async function fetchGroupUsers() {
            const res = await getAllGroupUser();
            setGroupUsers(res);
        }
        fetchGroupUsers();
    }, [])

    const freeInputData = () => {
        setEmail('');
        setPhone('');
        setUsername('');
        setAddress('');
        setPassword('');
        setGender('male');
        setGroupId(1);
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.isShowModalCreate}
            onHide={props.handleCloseModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modal__content'>
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <label className='form-label'>Email</label>
                            <input
                                className='form-control'
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter your email...'
                            />
                        </div>
                        <div className='col-lg-6'>
                            <label className='form-label'>Phone</label>
                            <input
                                className='form-control'
                                type='text'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder='Enter your phone number...'
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>

                        <div className='col-lg-12'>
                            <label className='form-label'>Address</label>
                            <input
                                className='form-control'
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder='Enter your address...'
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <label className='form-label'>Username</label>
                            <input
                                className='form-control'
                                type='text'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder='Enter username...'
                            />
                        </div>
                        <div className='col-lg-6'>
                            <label className='form-label'>Password</label>
                            <input
                                className='form-control'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Enter your password...'
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-lg-6'>
                            <label className='form-label'>Gender</label>
                            <select
                                className="form-select form-select-md mb-3"
                                aria-label=".form-select-lg example"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option defaultChecked value="Male">Male</option>
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
                    onClick={
                        () => { 
                            props.handleAction({ email, phone, username, address, password, gender, groupId });
                            freeInputData();
                        }
                    }
                >
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUser;
