import React from 'react';
import { InputHidden, InputText, InputCheckbox } from 'freeassofront';
import { useForm, ResponsiveModalOrForm, InputDate } from '../ui';

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
      size="lg"
      modal={true}
      title="Type de paiement"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-24">
            <InputText
              label="Nom"
              name="ptyp_name"
              required={true}
              value={values.ptyp_name}
              onChange={handleChange}
              error={getErrorMessage('ptyp_name')}
            />
          </div>
          <div className="col-12">
            <InputCheckbox
              label="Donne lieu à un reçu"
              name="ptyp_receipt"
              required={true}
              checked={values.ptyp_receipt}
              onChange={handleChange}
              error={getErrorMessage('ptyp_receipt')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-18">
            <InputDate
              label="Du"
              name="ptyp_from"
              required={true}
              value={values.ptyp_from}
              onChange={handleChange}
              error={getErrorMessage('ptyp_from')}
            />
          </div>
          <div className="col-18">
            <InputDate
              label="Au"
              name="ptyp_to"
              required={true}
              value={values.ptyp_to}
              onChange={handleChange}
              error={getErrorMessage('ptyp_to')}
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}
