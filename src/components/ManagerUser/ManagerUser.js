import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import './ManagerUser.scss';
import { getAllUsers, deleteUser, createUser, updateUser } from '../../services/userService';
import ModalConfirm from '../Modal/ModalConfirm';
import { toast } from 'react-toastify';
import ModalUser from '../Modal/ModalUser';

const ManagerUser = () => {

    const [listUsers, setListUsers] = useState([]);
    const [pageShow, setPageShow] = useState(1);
    const [limitShow, setLimitShow] = useState(4);
    const [countPage, setCountPage] = useState(1);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [userData, setUserData] = useState({});
    const [idDeleteModal, setIdDeleteModal] = useState(0);

    const [actionModal, setActionModal] = useState('CREATE');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllUsers(pageShow, limitShow);
                setListUsers(res.responseData.users);
                setCountPage(res.responseData.pageCount);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pageShow, limitShow, listUsers.length])

    const handleClickRefresh = () => {
        window.location.reload();
    }

    const handlePageClick = (e) => {
        setPageShow(e.selected + 1);
    }

    const handleCloseModal = () => {
        setIsShowModal(false);
    }

    const handleClickCreate = () => {
        setIsShowModal(true);
        setActionModal('CREATE');
    }

    const handleCreateUser = async (inputData) => {
        try {
            const res = await createUser(inputData);
            if (res.responseCode === 0) {
                setListUsers(prev => [...prev, res.responseData])
                if (listUsers.length + 1 > limitShow) {
                    setPageShow(prev => prev + 1);
                }
                setIsShowModal(false);
                toast.success(res.responseMessage)
            } else if (res.responseCode === -1) {
                toast.error(res.responseMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickUpdate = async (user) => {
        setActionModal('UPDATE');
        setIsShowModal(true);
        setUserData(user);
    }

    const handleConfirmUpdate = async (userData) => {
        const { username, address, gender, groupId, groupUsers } = userData;
        try {
            const res = await updateUser(userData.id, { username, address, gender, groupId });
            if (res.responseCode === 0) {
                setIsShowModal(false);
                toast.success(res.responseMessage);
                const listUsersAfterUpdate = listUsers.map(user => {
                    if (user.id === userData.id) {
                        user.username = username;
                        user.address = address;
                        user.gender = gender;
                        user['Group_User.name'] = groupUsers[groupId - 1].name;
                    }
                    return user;
                });
                setListUsers(listUsersAfterUpdate);
            } else if (res.responseCode === -1) {
                toast.error(res.responseMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = (id) => {
        setActionModal('DELETE');
        setIsShowModalDelete(true);
        setIdDeleteModal(id);

    }

    const confirmDeleteUser = async () => {
        try {
            const res = await deleteUser(idDeleteModal);
            setIsShowModalDelete(false);

            if (+res.responseCode === 0) {
                const usersRemainder = listUsers.filter(user => user.id !== idDeleteModal);
                if (usersRemainder.length === 0) {
                    setCountPage(prev => prev - 1);
                    setPageShow(prev => prev - 1);
                }
                setListUsers(usersRemainder);
                toast.success('Delete user successfully');
            } else {
                toast.error('Delete user failure!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowModalDelete = () => {
        setIsShowModalDelete(true);
    }

    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
    }


    return (
        <div className="users__management__container container">
            <h2 className="users__management__title">Users management</h2>
            <div className="users__management__btn">
                <button className="btn btn-primary" onClick={handleClickCreate}>
                    <span className='add-user-icon'>
                    <i className="fa-solid fa-user-plus"></i>
                    </span>
                    Create new user
                </button>
                <button className="btn btn-success" onClick={handleClickRefresh}>
                    <span className='refresh-icon'>
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                    </span>
                    Refresh
                </button>
            </div>
            <div className="table-responsive-md able-responsive-sm wrapper__table">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Group</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers.map((user, index) => {
                            let i = (pageShow - 1) * limitShow + index + 1;
                            return (
                                <tr key={index}>
                                    <th scope="row">{i}</th>
                                    <td>{user.username ? user.username : 'Unknown'}</td>
                                    <td>{user.email ? user.email : 'Unknown'}</td>
                                    <td>{user.address ? user.address : 'Unknown'}</td>
                                    <td>{user.phone ? user.phone : 'Unknown'}</td>
                                    <td>{user.gender ? user.gender : 'Unknown'}</td>
                                    <td>{user['Group_User.name'] ? user['Group_User.name'] : 'Unknown'}</td>
                                    <td>
                                        <span
                                            className='user__update__icon'
                                            onClick={() => handleClickUpdate(user)}
                                        >
                                            <i className="fa-solid fa-user-pen"></i>
                                        </span>
                                        <span
                                            className='user__delete__icon'
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='paginate'>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={countPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>

            </div>
            <ModalConfirm
                heading='Delete user ?'
                message='Are you sure to delete this user ?'
                contentActionBtn='Delete'
                isShowModalDelete={isShowModalDelete}
                handleShowModalDelete={handleShowModalDelete}
                handleCloseModalDelete={handleCloseModalDelete}
                handleAction={confirmDeleteUser}
            />

            <ModalUser
                isShowModal={isShowModal}
                actionModal={actionModal}
                handleAction={actionModal === 'CREATE' ? handleCreateUser : handleConfirmUpdate}
                handleCloseModal={handleCloseModal}
                userData={actionModal === 'CREATE' ? {} : userData}
            />
        </div>
    );
};

export default ManagerUser;