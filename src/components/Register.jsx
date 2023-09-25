import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Register() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fname": inputs.fname,
            "lname": inputs.lname,
            "username": inputs.username,
            "password":inputs.password,
            "email": inputs.email,
            "avatar": inputs.avatar
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/users/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.status === 'ok'){
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'success'
                      }).then((value)=>{
                        navigate('/');
                      })
                }else{
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'error'
                      })
                }    
            })
            .catch(error => console.log('error', error));
        console.log(inputs);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>First Name:
                    <input
                        type="text"
                        name="fname"
                        value={inputs.fname || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Last Name:
                    <input
                        type="text"
                        name="lname"
                        value={inputs.lname || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Username:
                    <input
                        type="text"
                        name="username"
                        value={inputs.username || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Email:
                    <input
                        type="text"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Avatar:
                    <input
                        type="text"
                        name="avatar"
                        value={inputs.avatar || ""}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Register