import React from 'react';
import { InputHidden, InputText } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <ResponsiveModalOrForm
      className="m-5"
      size="lg"
      modal={true}
      title="Type de site"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label="Nom"
            name="sitt_name"
            id="sitt_name"
            value={values.sitt_name}
            onChange={handleChange}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}
