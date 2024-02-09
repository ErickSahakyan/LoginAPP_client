import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import styles from './styles.module.sass';
import { registration } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../hooks/useStore';
import { Link, useNavigate } from 'react-router-dom';


type Props = {}

const Registration = (props: Props) => {
    const dispatch = useAppDispatch()
	const navigate = useNavigate()
    const [status, setStatus] = useState({} as any)
    

    useEffect(() => {
        if (status) {
            toast(status?.payload?.message)
        }
    }, [status]);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            const result = await dispatch(registration({values}))
            setStatus(result)
            if(result) navigate('/');
        },
    });

    return (
        <Layout>

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className={styles.section}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <h2>Регистрация</h2>
                    <div className={styles.inputField}>
                        <input id="email" type="text" {...formik.getFieldProps('name')} />
                        <label htmlFor="text">Имя</label>
                    </div>
                    <div className={styles.inputField}>
                        <input id="email" type="text" {...formik.getFieldProps('surname')} />
                        <label htmlFor="text">Фамилия</label>
                    </div>
                    <div className={styles.inputField}>
                        <input id="email" type="text" {...formik.getFieldProps('email')} />
                        <label htmlFor="email">Почта</label>
                    </div>
                    <div className={styles.inputField}>
                        <input id="password" type="password" {...formik.getFieldProps('password')} />
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <button type="submit" >Зарегистрироваться</button>
                        <span>Есть аккаунт? <Link to="/">Войти</Link></span>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Registration;