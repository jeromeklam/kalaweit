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
    <ResponsiveForm title="Type de client" onSubmit={handleSubmit} onCancel={handleCancel}>
      <InputHidden name="id" id="id" value={values.id} />
      <InputText
        label="Nom"
        name="clit_name"
        id="clit_name"
        value={values.clit_name}
        onChange={handleChange}
      />
    </ResponsiveForm>
  );
}
