import React from 'react';
import {
  InputHidden,
  InputSelect,
  InputText,
  InputCheckbox,
  InputMonetary,
} from 'freeassofront';
import { injectIntl } from 'react-intl';
import { InputDate, ResponsiveModalOrForm } from '../ui';
import useForm from '../ui/useForm';
import { paymentTypeAsOptions } from '../payment-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';

const tabs = [
  { key: '1', name: 'main', label: 'Informations principales', shortcut: 'M', icon: '' },
  { key: '2', name: 'sponsors', label: 'Parrains', shortcut: 'P', icon: '' },
];

function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.errors,
  );
  const { intl } = props;
  return (
    <ResponsiveModalOrForm
      className=""
      title={intl.formatMessage({ id: 'app.features.sponsorship.form.title', defaultMessage: 'Sponsorship' })}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-26">
            {props.mode === 'client' && (
              <CauseInputPicker
                label={intl.formatMessage({ id: 'app.features.sponsorship.form.cause', defaultMessage: 'Cause' })}
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
                label={intl.formatMessage({ id: 'app.features.sponsorship.form.client', defaultMessage: 'Member' })}
                key="client"
                name="client"
                labelTop={true}
                item={values.client || null}
                onChange={handleChange}
                error={getErrorMessage('cau_id')}
              />
            )}
          </div>
          <div className="col-sm-10">
            <InputCheckbox
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.news', defaultMessage: 'Send news' })}
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
          <div className="col-sm-13">
            <InputDate
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.from', defaultMessage: 'From' })}
              name="spo_from"
              labelTop={true}
              value={values.spo_from}
              onChange={handleChange}
              error={getErrorMessage('spo_from')}
            />
          </div>
          <div className="col-sm-13">
            <InputDate
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.to', defaultMessage: 'To' })}
              name="spo_to"
              labelTop={true}
              value={values.spo_to}
              onChange={handleChange}
              error={getErrorMessage('spo_to')}
            />
          </div>
          <div className="col-sm-10">
            <InputCheckbox
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.site', defaultMessage: 'Display on site' })}
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
            <InputMonetary
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.amount', defaultMessage: 'Amount' })}
              labelTop={true}
              name="spo_mnt"
              id="spo_mnt"
              inputMoney="EUR"
              dbMoney="EUR"
              value={values.spo_mnt}
              onChange={handleChange}
              error={getErrorMessage('spo_mnt')}
            />
          </div>
          <div className="col-sm-10">
            <InputSelect
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.type', defaultMessage: 'Type' })}
              name="payment_type.id"
              labelTop={true}
              value={values.payment_type.id}
              onChange={handleChange}
              options={paymentTypeAsOptions(props.paymentTypes)}
              error={getErrorMessage('ptyp_id')}
            />
          </div>
          <div className="col-sm-3">
            <InputText
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.day', defaultMessage: 'Day' })}
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
          <div className="col-sm-36">
            <InputText
              label={intl.formatMessage({ id: 'app.features.sponsorship.form.comments', defaultMessage: 'Comments' })}
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

export default injectIntl(Form);
