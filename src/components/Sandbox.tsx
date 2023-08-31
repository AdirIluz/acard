import { FunctionComponent, useContext, useEffect, useState } from "react";
import { deleteUser, getUsers, } from "../services/usersService";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbackService";
import { SiteTheme } from "../App";


interface SandboxProps {
    user: any;
}

const Sandbox: FunctionComponent<SandboxProps> = ({ user }) => {
    const [users, setUsers] = useState([]);
    const isAdmin = user.role === "Admin";
    const theme = useContext(SiteTheme);


    useEffect(() => {
        getUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm(`Are you sure ??`)) {
            deleteUser(id)
                .then((res) => successMsg("User deleted successfully!"))
                .catch((err) => console.log(err));
        }
    }

    // Usage example
    return (<div className={`sandbox-container container  ${theme.background} ${theme.color}`}>
        {isAdmin ? (<div>
            <h2>User List</h2>
            <table className={`table table-bordered table-condensed `} >
                <thead>
                    <tr >
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 'Admin' ? (
                                'Admin'
                            ) : (<div>
                                <label>
                                    <input
                                        type="radio"
                                        name={`role_${user.id}`}
                                        value="User"
                                        checked={user.role === 'User'}
                                    />
                                    User
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`role_${user.id}`}
                                        value="Business"
                                        checked={user.role === 'Business'}

                                    />
                                    Business
                                </label>
                            </div>)}
                            </td>
                            {user.role === "Admin" ? (<td></td>) : (<td onClick={() => handleDelete(user.id as number)}><i className={`fa-solid fa-trash`}></i></td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>) :
            (<div>This user is not Admin</div>)}
    </div>
    );
};


export default Sandbox;