import React from 'react';
import { InputHidden, InputText, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';

/**
 * Functionnal Component
 */
export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <ResponsiveForm className="m-5" title="Grande Cause" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="camt_name"
          required={true}
          value={values.camt_name}
          onChange={handleChange}
        />
      </div>
    </ResponsiveForm>
  );
}
