import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import styles from './styles.module.sass';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useStore';
import { authorization } from '../../store/slices/authSlice';

type Props = {}

const Authorization = (props: Props) => {

    const dispatch = useAppDispatch()

    const [status, setStatus] = useState({} as any)

    const navigate = useNavigate()

    useEffect(() => {
        if (status) {
            toast(status?.payload?.message)
        }
    }, [status]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            const result = await dispatch(authorization({ values }))
            setStatus(result)
            if(result) navigate('/profile');
        },
    });

    return (
        <Layout>

            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className={styles.section}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <h2>Авторизация</h2>
                    <div className={styles.inputField}>
                        <input id="email" type="text" required {...formik.getFieldProps('email')} />
                        <label htmlFor="email">Почта</label>
                    </div>
                    <div className={styles.inputField}>
                        <input id="password" type="password" required {...formik.getFieldProps('password')} />
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <div>
                        <button type="submit" >Войти</button>
                        <span>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></span>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Authorization;