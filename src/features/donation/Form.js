import React from 'react';
import { InputHidden, InputSelect, InputText } from 'freeassofront';
import { InputDate, ResponsiveModalOrForm } from '../ui';
import useForm from '../ui/useForm';
import { paymentTypeAsOptions } from '../payment-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.errors,
  );
  return (
    <ResponsiveModalOrForm
      title="Don"
      className="m-5"
      tab={values.currentTab}
      tabs={props.tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
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
      <div className="row">
        <div className="col-md-12">
          <InputDate
            label="Date"
            labelTop={true}
            name="don_ts"
            id="don_ts"
            inputSize={36}
            value={values.don_ts}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <InputText
            label="Montant"
            labelTop={true}
            name="don_mnt"
            id="don_mnt"
            value={values.don_mnt}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-6">
          <InputSelect
            label="Type"
            name="payment_type.id"
            labelTop={true}
            inline
            labelSize={36}
            inputSize={36}
            value={values.payment_type.id}
            onChange={handleChange}
            options={paymentTypeAsOptions(props.paymentTypes)}
            error={getErrorMessage('ptyp_id')}
          />
        </div>
      </div>
      <hr />
    </ResponsiveModalOrForm>
  );
}
