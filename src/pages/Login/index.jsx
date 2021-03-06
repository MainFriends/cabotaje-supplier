import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import useForm from '../../hooks/useForm';
import LoginForm from '../../components/LoginForm';
import loginService from '../../services/login';

const Login = () => {
    document.title = "Cabotaje Supplier - Login"

    const [errorMessage, setErrorMessage] = useState('');
    const {login} = useUser();

    const [formLogin, setFormLogin] = useForm({
        EMAIL: '',
        PASSWORD: ''
    });

    //Comprabamos si existe mensaje de alerta.
    useEffect(() => {
        const message = window.localStorage.getItem('userMessage');

        if(message){
            setErrorMessage(message);
            setTimeout(() => {
                setErrorMessage('');
                window.localStorage.removeItem('userMessage');
            }, 5000);
        }
    },[])

    const handleLoginSubmit = e => {
        e.preventDefault();

        //Validar formulario
        const {EMAIL, PASSWORD} = formLogin;
        if(EMAIL === '' || PASSWORD === ''){
            setErrorMessage('Introduce un correo y contraseña válido.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        //Validar loginService
        loginService(formLogin)
            .then(data => {
                //Guardamos información en el Local Storage
                login(data);
            })
            .catch(err => {
                const {message} = err.response.data;
                setErrorMessage(message);
                document.querySelector('#password').value = '';
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            })
    }

    return (
        <LoginForm 
            setFormLogin={setFormLogin}
            handleLoginSubmit={handleLoginSubmit}
            errorMessage={errorMessage}
        />
    )
}

export default Login;