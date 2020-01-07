import React from 'react';
import { InputHidden, InputText, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <ResponsiveForm title="Types de site" onSubmit={handleSubmit} onCancel={handleCancel}>
      <InputHidden name="id" id="id" value={values.id} />
      <InputText
        label="Nom"
        name="sitt_name"
        id="sitt_name"
        value={values.sitt_name}
        onChange={handleChange}
      />
    </ResponsiveForm>
  );
}
