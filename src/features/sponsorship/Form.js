import React from 'react';
import {
  InputHidden,
  InputSelect,
  InputText,
  InputCheckbox,
} from 'freeassofront';
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
      className=""
      title="Parrainages"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-16">
            {props.mode === 'client' && (
              <CauseInputPicker
                label="Cause"
                key="cause"
                name="cause"
                labelTop={true}
                item={values.cause || null}
                onChange={handleChange}
                error={getErrorMessage('cli_id')}
              />
            )}
            {props.mode === 'cause' && (
              <ClientInputPicker
                label="Membre"
                key="client"
                name="client"
                labelTop={true}
                item={values.client || null}
                onChange={handleChange}
                error={getErrorMessage('cau_id')}
              />
            )}
          </div>
          <div className="col-sm-4">
            <InputCheckbox
              label="Envoyer les news"
              id="spo_send_news"
              name="spo_send_news"
              labelTop={true}
              checked={values.spo_send_news}
              onChange={handleChange}
              error={getErrorMessage('spo_send_news')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <InputDate
              label="Du"
              name="spo_from"
              labelTop={true}
              value={values.spo_from}
              onChange={handleChange}
              error={getErrorMessage('spo_from')}
            />
          </div>
          <div className="col-sm-8">
            <InputDate
              label="Au"
              name="spo_to"
              labelTop={true}
              value={values.spo_to}
              onChange={handleChange}
              error={getErrorMessage('spo_to')}
            />
          </div>
          <div className="col-sm-4">
            <InputCheckbox
              label="Afficher sur le site"
              id="spo_display_site"
              name="spo_display_site"
              labelTop={true}
              checked={values.spo_display_site}
              onChange={handleChange}
              error={getErrorMessage('spo_display_site')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <InputText
              label="Montant"
              id="spo_mnt"
              name="spo_mnt"
              labelTop={true}
              value={values.spo_mnt}
              onChange={handleChange}
              error={getErrorMessage('spo_mnt')}
            />
          </div>
          <div className="col-sm-6">
            <InputSelect
              label="Type"
              name="payment_type.id"
              labelTop={true}
              value={values.payment_type.id}
              onChange={handleChange}
              options={paymentTypeAsOptions(props.paymentTypes)}
              error={getErrorMessage('ptyp_id')}
            />
          </div>
          <div className="col-sm-2">
            <InputText
              label="Jour"
              id="spo_freq_when"
              name="spo_freq_when"
              labelTop={true}
              value={values.spo_freq_when}
              onChange={handleChange}
              error={getErrorMessage('spo_freq_when')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <InputText
              label="Remarques"
              id="spo_freq_detail"
              name="spo_freq_detail"
              labelTop={true}
              value={values.spo_freq_detail}
              onChange={handleChange}
              error={getErrorMessage('spo_freq_detail')}
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}
