import React from 'react';
import {
  InputHidden,
  InlineInputSelect,
  InlineInputText,
  InlineInputCheckbox,
  InlineLabel,
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
          <div className="col-sm-3">
            {props.mode === 'client' && <InlineLabel label="Cause" />}
            {props.mode === 'cause' && <InlineLabel label="Membre" />}
          </div>
          <div className="col-sm-19">
            {props.mode === 'client' && (
              <CauseInputPicker
                label=""
                key="cause"
                name="cause"
                size="sm"
                inline
                labelSize={0}
                inputSize={36}
                labelTop={false}
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
          <div className="col-sm-7"></div>
          <div className="col-sm-7">
            <InlineInputCheckbox
              label="Envoyer les news"
              id="spo_send_news"
              name="spo_send_news"
              labelTop={false}
              size="sm"
              labelSize={0}
              inputSize={36}
              checked={values.spo_send_news}
              onChange={handleChange}
              error={getErrorMessage('spo_send_news')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <InlineLabel label="Du" />
          </div>
          <div className="col-sm-8">
            <InputDate
              label=""
              name="spo_from"
              labelTop={false}
              size="sm"
              inline
              labelSize={0}
              inputSize={36}
              value={values.spo_from}
              onChange={handleChange}
              error={getErrorMessage('spo_from')}
            />
          </div>
          <div className="col-sm-3">
            <InlineLabel label="Au" />
          </div>
          <div className="col-sm-8">
            <InputDate
              label=""
              name="spo_to"
              labelTop={false}
              size="sm"
              inline
              labelSize={0}
              inputSize={36}
              value={values.spo_to}
              onChange={handleChange}
              error={getErrorMessage('spo_to')}
            />
          </div>
          <div className="col-sm-7"></div>
          <div className="col-sm-7">
            <InlineInputCheckbox
              label="Afficher sur le site"
              id="spo_display_site"
              name="spo_display_site"
              labelTop={false}
              size="sm"
              labelSize={0}
              inputSize={36}
              checked={values.spo_display_site}
              onChange={handleChange}
              error={getErrorMessage('spo_display_site')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <InlineLabel label="Montant" />
          </div>
          <div className="col-sm-8">
            <InlineInputText
              label=""
              id="spo_mnt"
              name="spo_mnt"
              labelTop={false}
              size="sm"
              inline
              labelSize={0}
              inputSize={36}
              value={values.spo_mnt}
              onChange={handleChange}
              error={getErrorMessage('spo_mnt')}
            />
          </div>
          <div className="col-sm-3">
            <InlineLabel label="Type" />
          </div>
          <div className="col-sm-6">
            <InlineInputSelect
              label=""
              name="payment_type.id"
              labelTop={false}
              size="sm"
              inline
              labelSize={0}
              inputSize={36}
              value={values.payment_type.id}
              onChange={handleChange}
              options={paymentTypeAsOptions(props.paymentTypes)}
              error={getErrorMessage('ptyp_id')}
            />
          </div>
          <div className="col-sm-2">
            <InlineLabel label="Jour" />
          </div>
          <div className="col-sm-2">
            <InlineInputText
              label=""
              id="spo_freq_when"
              name="spo_freq_when"
              labelTop={false}
              size="sm"
              inline
              labelSize={0}
              inputSize={36}
              value={values.spo_freq_when}
              onChange={handleChange}
              error={getErrorMessage('spo_freq_when')}
            />
          </div>
          <div className="col-sm-12">
            <InlineInputText
              label=""
              id="spo_freq_detail"
              name="spo_freq_detail"
              labelTop={false}
              size="sm"
              inline
              labelSize={0}
              inputSize={36}
              value={values.spo_freq_detail}
              onChange={handleChange}
              error={getErrorMessage('spo_freq_detail')}
              placeholder="Remarques"
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}
