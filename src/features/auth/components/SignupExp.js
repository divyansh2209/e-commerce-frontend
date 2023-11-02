import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const SignupExp = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            {user && <Navigate to="/" replace={true}></Navigate>}
            <div className="flex w-full h-screen">
                <div className="w-full flex items-center justify-center lg:w-1/2">
                    <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100 '>
                        <h1 className='text-4xl font-semibold'>Create Account
                        </h1>
                        <div className='mt-8'>


                            <form
                                className='flex flex-col justify-start'
                                noValidate
                                onSubmit={handleSubmit((data) => {
                                    dispatch(
                                        createUserAsync({
                                            email: data.email,
                                            password: data.password,
                                            addresses: [],
                                            role: 'user'
                                            //TODO: this role can be directly given on backend
                                        })
                                    );
                                    console.log(data);
                                })}>

                                <div className='flex flex-col'>
                                    <label className='text-lg font-medium'>Email</label>
                                    <input
                                        id="email"
                                        {...register('email', {
                                            required: 'email is required',
                                            pattern: {
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                message: 'email not valid',
                                            },
                                        })}
                                        type="email"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col mt-4'>
                                    <label className='text-lg font-medium'>Password</label>
                                    <input
                                        id="password"
                                        {...register('password', {
                                            required: 'password is required',
                                            pattern: {
                                                value:
                                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                message: `- at least 8 characters\n
                                                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                                    - Can contain special characters`,
                                            },
                                        })}
                                        type="password"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">{errors.password.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col mt-4'>
                                    <label className='text-lg font-medium'>Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        {...register('confirmPassword', {
                                            required: 'confirm password is required',
                                            validate: (value, formValues) =>
                                                value === formValues.password || 'password not matching',
                                        })}
                                        type="password"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Confirm Password"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>


                                <div className='mt-8 flex flex-col gap-y-4'>
                                    <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Signup</button>
                                </div>
                            </form>


                            <div className='mt-8 flex justify-center items-center'>
                                <p className='font-medium text-base'>Already a Member?</p>
                                <Link
                                    to="/login"
                                    className='ml-2 font-medium text-base text-violet-500'>Log In
                                </Link>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
                    <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
                    <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
                </div>
            </div>
        </>
    )
}

export default SignupExp