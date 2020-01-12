import React from 'react';
import { InputHidden, InputText, InputSelect, InputCheckbox, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <ResponsiveForm
      className="m-5"
      title="Type de cause"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-md-18">
          <InputText
            label="Nom"
            name="caut_name"
            id="caut_name"
            value={values.caut_name}
            onChange={handleChange}
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
            label="Limite"
            name="caut_mnt_type"
            id="caut_mnt_type"
            value={values.caut_mnt_type}
            onChange={handleChange}
            options={[
              { value: 'ANNUAL', label: 'Annuelle glissante' },
              { value: 'MAXIMUM', label: 'Globale' },
              { value: 'OTHER', label: 'Aucune' },
            ]}
          />
        </div>
        <div className="col-md-7">
          <InputText
            label="Montant"
            name="caut_max_mnt"
            id="caut_max_mnt"
            value={values.caut_max_mnt}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <InputText
            label="Don minimum"
            name="caut_min_mnt"
            id="caut_min_mnt"
            value={values.caut_min_mnt}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <InputCheckbox
            label="Reçu"
            name="caut_receipt"
            id="caut_receipt"
            checked={values.caut_receipt}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <InputCheckbox
            label="Certificat"
            name="caut_certificat"
            id="caut_certificat"
            checked={values.caut_certificat}
            onChange={handleChange}
          />
        </div>
      </div>
    </ResponsiveForm>
  );
}
