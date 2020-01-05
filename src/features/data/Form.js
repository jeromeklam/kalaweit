import React from 'react';
import { InputHidden, InputText, InputSelect, ResponsiveForm } from 'freeassofront';
import { InputStringarray } from '../ui';
import { dataTypes } from './functions';
import useForm from '../layout/useForm';

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
  const optionsType = dataTypes();
  return (
    <ResponsiveForm title="Variable" onSubmit={handleSubmit} onCancel={handleCancel}>
      <InputHidden name="id" id="id" value={values.id} />
      <InputText
        label="Nom"
        name="data_name"
        required={true}
        value={values.data_name}
        onChange={handleChange}
      />
      <InputSelect
        label="Type"
        name="data_type"
        value={values.data_type}
        required={true}
        addempty={true}
        onChange={handleChange}
        options={optionsType}
      />
      {values.data_type === 'LIST' && (
        <InputStringarray
          label="Valeurs"
          name="data_content"
          value={values.data_content}
          onChange={handleChange}
          options={optionsType}
        />
      )}
    </ResponsiveForm>
  );
}
