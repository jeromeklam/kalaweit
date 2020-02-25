import React from 'react';
import { InputCheckbox, InputHidden, InputSelect, InputText, InputTextarea, ResponsiveForm } from 'freeassofront';
import { InputDate, InputData, ResponsiveModalOrForm } from '../ui';
import useForm from '../ui/useForm';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
  return (
    <ResponsiveModalOrForm
      title="Don"
      className="m-5"
      tab={values.currentTab}
      tabs={props.tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-md-12">
          <InputDate
            label="Date"
            labelTop={true}
            name="don_ts"
            id="don_ts"
            value={values.don_ts}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <ClientInputPicker
            label="Donateur"
            labelTop={true}
            key="client"
            name="client"
            item={values.client || null}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <InputText
            label="Montant"
            labelTop={true}
            name="don_mnt"
            id="don_mnt"
            value={values.don_mnt}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-18">
          <CauseInputPicker
            label="Cause"
            labelTop={true}
            key="cause"
            name="cause"
            item={values.cause || null}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
    </ResponsiveModalOrForm>
  );
}
