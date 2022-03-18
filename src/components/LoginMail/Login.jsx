import { useState } from "react"
import { useAuth } from "../../Context/authContext"
import { useNavigate } from 'react-router-dom'
import { Alert } from "../Alerts/Alert"

import { collection, getDoc, getDocs, doc} from "firebase/firestore";
import db from "../firebase"

export const Login = () => {
    //aparecen en blanco cada campo
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { login, loginWithGoogle, resetPassword } = useAuth();
    // const navigate = useNavigate();
    const [error, setError] = useState();
    
    const handleChange = ({target: {name, value}}) => 
        // console.log(e.target.name, e.target.value);
        //console.log(name, value)
        setUser({...user, [name]: value })
            // console.log(user);
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(user.email, user.password)
            //Si todo sale bien lo envía a la página en navigate
            //navigate('/admin')
        } catch (error) {
            //sino sale bien lanza un error
            // console.log(error.message);
            console.log(error.code)
            //personalización de los mensajes de error
            if (error.code === "auth/internal-error") {
                setError('Correo invalido')
            } else if (error.code === "auth/invalid-email") {
                setError('Por favor, verifica que el correo ingresado sea correcto')
            } else if (error.code === "auth/wrong-password") {
                setError('El usuario o la contraseña es invalida, vuelve a intentarlo')
            } else if (error.code === "auth/too-many-requests") {
                setError('El acceso a esta cuenta ha sido temporalmente deshabilitado debido a muchos intentos fallidos de inicio de sesión. Puedes restaurarlo inmediatamente reestableciendo tu contraseña o puedes intentarlo más tarde')
            } else if (error.code === "auth/user-not-found") {
                setError('Usuario no registrado')
            } else {
                setError(error.message)
            }
        }
    };

    const handleWithGoogleSignin = async(user) => {
        await loginWithGoogle()
    }

    const handleResetPassword = async() => {
        if (!user.email) return setError("Por favor, ingresa un email.")
        try {
            await resetPassword(user.email)
            setError('Hemos enviado un correo con el enlace para reestablecer tu contraseña :D')
        } catch (error) {
            setError(error.message)
        }
    }
    // console.log(user)

    return (
        //formulario para el registro
        <div>
            {error && <Alert message={error}/>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="ejemplo_123@mail.com" onChange={handleChange}></input>
                <br/>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" name="password" id="password" onChange={handleChange} placeholder="Contraseña"/>
                <br/>
                <button style={{ width: 300 }}> Entrar </button>
            </form>
            <br/>
            <button style={{ width: 300 }} onClick={ handleWithGoogleSignin} variant="secundary">
                Inicia sesión con Google
            </button>
            <br/>
                <a href='#!' onClick={handleResetPassword}>¿Olvidaste tu contraseña? </a>
        </div>
    )
}