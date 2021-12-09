import React from 'react';
import { Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { LoginFormSchema } from '../../../utils/validations';
import { FormProvider, useForm } from 'react-hook-form';
import { FormField } from '../../FormField';

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid}
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
