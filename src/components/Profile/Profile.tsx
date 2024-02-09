import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { logout, user } from '../../store/slices/authSlice'
import { IUser } from '../../types/IUser.types'
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.sass';

type Props = {}

const Profile = (props: Props) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const dispatch = useAppDispatch()
    const currentUserToken = useAppSelector(state => state.auth.token)

    useEffect(() => {
        async function fetchUser() {
            if (currentUserToken) {
                const actionResult = await dispatch(user({ currentUserToken }))

                const currUser = actionResult.payload as IUser;
                console.log(currUser);

                if (currUser) {
                    setCurrentUser(currUser);
                }
            }
        }
        fetchUser()
    }, [currentUserToken, dispatch])

    const exitProfile = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/')
    }

    if (!currentUser) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout>
            <div className={styles.section}>
                <div className={styles.box}>
                    <span className={styles.userInfo}>
                        <h1>{currentUser.user?.name ? currentUser.user?.name : 'Loading...'}</h1>

                        <h1>{currentUser.user?.surname ? currentUser.user?.surname : 'Loading...'}</h1>
                    </span>
                    <p>Email: {currentUser.user?.email ? currentUser.user?.email : 'Loading...'}</p>
                    <button onClick={() => exitProfile()}>
                        Выйти
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Profile