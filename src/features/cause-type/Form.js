import React from 'react';
import { InputHidden, InputText, InputSelect, InputCheckbox, InputMonetary } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';
import { causeTypeMntType } from './';

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
      size="xl"
      modal={true}
      title="Type de cause"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-md-18">
          <InputText
            label="Nom"
            name="caut_name"
            id="caut_name"
            required={true}
            value={values.caut_name}
            onChange={handleChange}
            error={getErrorMessage('caut_name')}
          />
        </div>
        <div className="col-md-18">
          <InputSelect
            label="Grande cause"
            name="cause_main_type.id"
            id="cause_main_type.id"
            value={values.cause_main_type.id}
            onChange={handleChange}
            options={props.causeMainType}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <InputSelect
            label="Totalisation"
            name="caut_mnt_type"
            id="caut_mnt_type"
            value={values.caut_mnt_type}
            onChange={handleChange}
            options={causeTypeMntType}
          />
        </div>
        <div className="col-md-7">
          <InputMonetary
            label="Maximum"
            labelTop={true}
            name="caut_max_mnt"
            id="caut_max_mnt"
            inputMoney="EUR"
            dbMoney="EUR"
            value={values.caut_max_mnt}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <InputMonetary
            label="Don minimum"
            labelTop={true}
            name="caut_min_mnt"
            id="caut_min_mnt"
            inputMoney="EUR"
            dbMoney="EUR"
            value={values.caut_min_mnt}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
        </div>
        <div className="col-md-6">
          <InputCheckbox
            label="Reçu"
            name="caut_receipt"
            id="caut_receipt"
            checked={values.caut_receipt}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <InputCheckbox
            label="Certificat"
            name="caut_certificat"
            id="caut_certificat"
            checked={values.caut_certificat}
            onChange={handleChange}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}
