import React from 'react';
import { InputHidden, InputSelect, InputText, InputMonetary, InputCheckbox } from 'freeassofront';
import { InputDate, ResponsiveModalOrForm } from '../ui';
import useForm from '../ui/useForm';
import { paymentTypeAsOptions } from '../payment-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';
import { sessionAsOptions } from '../session/functions.js';
import { statusValues } from './';

const tabs = [
  { key: '1', name: 'main', label: 'Informations principales', shortcut: 'P', icon: '' },
  { key: '2', name: 'complement', label: 'Complément', shortcut: 'S', icon: '' },
  { key: '3', name: 'certificate', label: 'Certificat', shortcut: 'C', icon: '' },
];

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, '1', props.onSubmit, props.onCancel, null, props.errors);
  return (
    <ResponsiveModalOrForm
      title="Don"
      className="m-5"
      size="lg"
      tab={values.currentTab}
      tabs={tabs}
      onNavTab={handleNavTab}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-md-24">
              <ClientInputPicker
                label="Membre"
                labelTop={true}
                key="client"
                name="client"
                item={values.client || null}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-10">
              <InputCheckbox
                label="Mentionner sur le site"
                name="don_display_site"
                labelTop={true}
                checked={values.don_display_site === true}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-24">
              <CauseInputPicker
                label="Cause"
                labelTop={true}
                key="cause"
                name="cause"
                item={values.cause || null}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-2"></div>
            <div className="col-md-10">
              <InputCheckbox
                label="Provient d'un parrainage ou d'un don régulier"
                name="sponsorship.id"
                labelTop={true}
                disabled={true}
                checked={values.sponsorship.id > 0}
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
            <div className="col-md-12">
              <InputDate
                label="Totalisé jusqu'au"
                labelTop={true}
                name="don_end_ts"
                id="don_end_ts"
                inputSize={36}
                value={values.don_end_ts}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <InputCheckbox
                label="Provient d'une génération"
                name="origin.id"
                labelTop={true}
                disabled={true}
                checked={values.origin.id > 0}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <InputMonetary
                label="Montant"
                labelTop={true}
                name="don_mnt"
                id="don_mnt"
                inputMoney="EUR"
                dbMoney="EUR"
                value={values.don_mnt}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-10">
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
            <div className="col-md-6"></div>
            <div className="col-md-8">
              <InputSelect
                label="Statut"
                id="don_status"
                name="don_status"
                labelTop={true}
                value={values.don_status}
                onChange={handleChange}
                options={statusValues}
                error={getErrorMessage('don_status')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <InputText
                label="Description"
                id="con_desc"
                name="don_desc"
                labelTop={true}
                value={values.don_desc}
                onChange={handleChange}
                error={getErrorMessage('don_desc')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="row">
            <div className="col-md-10">
              <InputSelect
                label="Session"
                name="session.id"
                labelTop={true}
                value={values.session ? values.session.id : null}
                addempty={false}
                onChange={handleChange}
                options={sessionAsOptions(props.sessions)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <InputText
                label="Commentaires"
                id="don_domment"
                name="don_comment"
                labelTop={true}
                value={values.don_comment}
                onChange={handleChange}
                error={getErrorMessage('don_comment')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '3' && <div className="row"></div>}
      <hr />
    </ResponsiveModalOrForm>
  );
}
