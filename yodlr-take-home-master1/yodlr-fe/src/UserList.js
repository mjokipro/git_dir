import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import UserRow from './UserRow';
import { getAllUsers } from './actions/users';

const UserList = (props) => {
    const dispatch = useDispatch();
    const { users } = useSelector(s => s.users);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {users ? users.map(u => <UserRow key={u.id} user={u} />) : "loading..."}
            </tbody>
        </Table>
    );
};

export default UserList;