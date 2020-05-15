import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';
import { speciesAsOptions } from '../species/functions.js';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  return (
    <ResponsiveModalOrForm 
      className="m-5"
      size="md"
      modal={true} 
      title="Sous-espèces" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label="Nom"
            name="sspe_name"
            id="sspe_name"
            required={true}
            value={values.sspe_name}
            onChange={handleChange}
            error={getErrorMessage('sspe_name')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputSelect
            label="Espèce"
            name="species.id"
            labelTop={true}
            value={values.species ? values.species.id : null}
            onChange={handleChange}
            options={speciesAsOptions(props.species)}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}
