import { TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label }) => {
  const { register, formState } = useFormContext();
  return (
    <TextField
      className="mb-20"
      {...register(name)}
      name={name}
      error={!!formState.errors[name]?.message}
      helperText={formState.errors[name]?.message}
      size="small"
      label={label}
      variant="outlined"
      fullWidth
    />
  );
};
