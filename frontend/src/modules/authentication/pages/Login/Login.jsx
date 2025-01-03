import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../common/contexts/AuthContext';
import Button from '../../../common/components/Button';
import styles from './Login.module.css'
import icon from '../../../common/assets/img/brand/icon.webp'

export default function Login() {

    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData(e.target)
        const user = Object.fromEntries(data.entries())

        const response = await login(user);
        if (response.success) {
            toast.success('Successfully logged in!');
        } else {
            setError(response.message);
        }

        setLoading(false);

    };


    return (
        <div className={styles.loginPageWrapper}>

            <div style={{ maxWidth: 470 }} className='w-100'>

                <img src={icon} style={{ maxWidth: 60 }} className='mb-4' alt="" />

                <h2 className='mb-4 bold'>Log in</h2>

                {error && <span className='text-danger small'>{error}</span>} { }

                <form onSubmit={handleSubmit}>
                    <div className='py-2'>
                        <label className='mb-1'>Email</label>
                        <input type="text" name='email' className='form-control py-3' placeholder='Enter your email' />
                    </div>
                    <div className='py-2'>
                        <label className='mb-1'>Password</label>
                        <input type="password" name='password' className='form-control py-3' placeholder='••••••••' />
                    </div>

                    <div className='py-2 mt-3'>
                        <Button variant="primary" size="lg" type="submit" loading={loading} >
                            Log In
                        </Button>
                    </div>

                    <div className='d-flex justify-content-center py-4'>
                        <span className='px-1 txt-lighter'>Don't have an account?</span>
                        <Link to="/register" className='px-1 fw-500 text-decoration-none'>Sign Up</Link>
                    </div>

                </form>

            </div>

        </div>
    )
}
