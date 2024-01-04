import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import './ManagerUser.scss';
import { getAllUsers } from '../../services/userService';

const ManagerUser = () => {

    const [listUsers, setListUsers] = useState([]);
    const [pageShow, setPageShow] = useState(1);
    const [limitShow, setLimitShow] = useState(4);
    const [countPage, setCountPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUsers(pageShow, limitShow);
                setListUsers(result.users);
                setCountPage(result.pageCount)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [pageShow, limitShow])

    const handleClickRefresh = () => {
        window.location.reload();
    }

    const handlePageClick = (e) => {
        setPageShow(e.selected + 1);
    }

    return (
        <div className="users__management__container">
            <h2 className="users__management__title">Users management</h2>
            <div className="users__management__btn">
                <button className="btn btn-success" onClick={handleClickRefresh}>Refresh</button>
                <button className="btn btn-primary">Create new user</button>
            </div>
            <div className="wrapper__table">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
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
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name ? user.name : 'Unknown'}</td>
                                    <td>{user.email ? user.email : 'Unknown'}</td>
                                    <td>{user.address ? user.address : 'Unknown'}</td>
                                    <td>{user.phone ? user.phone : 'Unknown'}</td>
                                    <td>{user.gender ? user.gender : 'Unknown'}</td>
                                    <td>{user['Group_User.description'] ? user['Group_User.description'] : 'Unknown'}</td>
                                    <td>
                                        <button className='btn btn-info user__update__btn'>Update</button>
                                        <button className='btn btn-danger user__delete__btn'>Delete</button>
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
        </div>
    );
};

export default ManagerUser;