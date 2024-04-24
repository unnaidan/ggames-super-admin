import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Input, Link, NextUIProvider } from '@nextui-org/react';
import { SIGN_IN } from '@src/graphql/mutations/sign-in';
import { CURRENT_USER } from '@src/graphql/queries/current-user';
import { withGuest } from '@src/hoc/withGuest';
import { getValidationErrorMessage, parseErrors } from '@src/lib/utils';
import { setAccessToken, setUser } from '@src/redux/auth/reducer';
import { ValidationError } from '@src/types';
import { Formik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Signin = withGuest((): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [
        errors,
        setErrors
    ] = useState<ValidationError[]>([]);
    const [
        getUser,
        getUserResult
    ] = useLazyQuery(CURRENT_USER, {
        fetchPolicy: 'no-cache',
        onCompleted: ({ currentUser }) => {
            dispatch(setUser(currentUser));
        }
    });
    const [
        signIn,
        signInResult
    ] = useMutation(SIGN_IN, {
        onError: err => {
            if (err.message === 'Bad Request Exception') {
                setErrors(parseErrors(err));
            }
        },
        onCompleted: ({ signIn }) => {
            dispatch(setAccessToken(signIn));
            getUser();
        }
    });

    return (
        <NextUIProvider navigate={navigate}>
            <Helmet>
                <title>
                    Нэвтрэх - GGames.mn
                </title>
            </Helmet>
            <main>
                <div className="h-screen grid grid-cols-1 xl:grid-cols-2">
                    <div className="flex items-center justify-center bg-white">
                        <div className="w-full max-w-xl">
                            <div className="p-4 xl:p-16">
                                <h2 className="text-3xl font-bold text-center">
                                    Нэвтрэх
                                </h2>
                                <div className="mt-2">
                                    <p className="text-center text-gray-500 font-light">
                                        Гишүүнчлэлийн эрхээрээ нэвтрээд тэмцээнээ<br />удирдаарай
                                    </p>
                                </div>
                                <Formik
                                    initialValues={{
                                        phone: '',
                                        password: ''
                                    }}
                                    onSubmit={variables => {
                                        setErrors([]);
                                        signIn({
                                            variables
                                        });
                                    }}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        handleSubmit
                                    }) => (
                                        <form
                                            onSubmit={handleSubmit}
                                            autoComplete="off"
                                            noValidate
                                        >
                                            <div className="mt-8">
                                                <div className="grid grid-col gap-y-3">
                                                    <Input
                                                        name="phone"
                                                        type="text"
                                                        label="Утасны дугаар"
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                        isInvalid={errors.some(({ property }) => property === 'phone')}
                                                        errorMessage={getValidationErrorMessage(errors, 'phone')}
                                                    />
                                                    <Input
                                                        name="password"
                                                        type="password"
                                                        label="Нууц үг"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        isInvalid={errors.some(({ property }) => property === 'password')}
                                                        errorMessage={getValidationErrorMessage(errors, 'password')}
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex justify-end">
                                                        <Link className="text-primary font-medium">
                                                            Нууц үгээ мартсан уу?
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Button
                                                        isLoading={signInResult.loading || getUserResult.loading}
                                                        color="primary"
                                                        type="submit"
                                                        fullWidth
                                                    >
                                                        Үргэлжлүүлэх
                                                    </Button>
                                                </div>
                                                <div className="mt-8">
                                                    <p className="text-center text-gray-500 font-light">
                                                        Бүртгүүлж амжаагүй юу? <Link className="text-primary font-medium">Бүртгүүлэх</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </NextUIProvider>
    );
});
