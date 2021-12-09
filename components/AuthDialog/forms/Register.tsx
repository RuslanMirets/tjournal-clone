import React from 'react';
import { Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { RegisterFormSchema } from '../../../utils/validations';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField } from '../../FormField';

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onOpenLogin, onOpenRegister }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="fullName" label="Имя и фамилия" />
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained">
              Зарегистрироваться
            </Button>
            <Button color="primary" variant="text" onClick={onOpenLogin}>
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
