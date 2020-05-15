import React from 'react';
import { InputHidden, InputText, InputSelect, InputCheckbox, InputMonetary } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';
import { causeTypeMntType, causeTypeFamily } from './';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  let minDate = true;
  let maxDate = true;
  let maxLabel = "Maximum";
  if (values.caut_mnt_type === 'OTHER') {
    minDate = false;
    maxDate = false;
  }
  if (values.caut_mnt_type === 'ANNUAL') {
    minDate = false;
    maxLabel = 'Montant annuel';
  }
  return (
    <ResponsiveModalOrForm
      className="m-5"
      size="lg"
      modal={true}
      title="Mission"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-18">
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
        <div className="col-sm-18">
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
        <div className="col-md-12">
          <InputSelect
            label="Totalisation"
            name="caut_mnt_type"
            id="caut_mnt_type"
            value={values.caut_mnt_type}
            onChange={handleChange}
            options={causeTypeMntType}
          />
        </div>
        <div className="col-sm-12">
          <InputMonetary
            label="Don minimum"
            labelTop={true}
            name="caut_min_mnt"
            id="caut_min_mnt"
            inputMoney="EUR"
            dbMoney="EUR"
            disabled={!minDate}
            value={minDate ? values.caut_min_mnt : ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-12">
          <InputMonetary
            label={maxLabel}
            labelTop={true}
            name="caut_max_mnt"
            id="caut_max_mnt"
            inputMoney="EUR"
            dbMoney="EUR"
            disabled={!maxDate}
            value={maxDate ? values.caut_max_mnt : ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <InputSelect
            label="Fonctionnement"
            name="caut_family"
            id="caut_family"
            value={values.caut_family}
            onChange={handleChange}
            options={causeTypeFamily}
          />
        </div>
        <div className="col-sm-12">
          <InputCheckbox
            label="Emission d'un reçu"
            name="caut_receipt"
            id="caut_receipt"
            checked={values.caut_receipt}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-12">
          <InputCheckbox
            label="Emission d'un certificat"
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
