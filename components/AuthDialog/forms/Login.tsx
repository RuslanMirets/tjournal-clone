import React from 'react';
import { Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { LoginFormSchema } from '../../../utils/validations';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../../FormField';
import { LoginDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import { UserApi } from '../../../utils/api/user';
import { Alert } from '@material-ui/lab';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);
      console.log(data);
      setCookie(null, 'rtoken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (error: any) {
      console.warn('Login error', error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          {errorMessage && (
            <Alert severity="error" className="mb-20">
              {errorMessage}
            </Alert>
          )}
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              color="primary"
              variant="contained">
              Войти
            </Button>
            <Button color="primary" variant="text" onClick={onOpenRegister}>
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
