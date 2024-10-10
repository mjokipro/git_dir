import React from 'react';
function UserRow({ user }) {
    const { firstName, lastName, email, state } = user;
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{state}</td>
        </tr>
    );
}
export default UserRow;