import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputCheckbox } from 'freeassofront';
import { useForm, ResponsiveModalOrForm, InputDate } from '../ui';

function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  const { intl } = props;
  return (
    <ResponsiveModalOrForm
      className="m-5"
      size="lg"
      modal={true}
      title={intl.formatMessage({
        id: 'app.features.paymentType.form.title',
        defaultMessage: 'Payment type',
      })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-24">
            <InputText
              label={intl.formatMessage({
                id: 'app.features.paymentType.form.name',
                defaultMessage: 'Name',
              })}
              name="ptyp_name"
              required={true}
              value={values.ptyp_name}
              onChange={handleChange}
              error={getErrorMessage('ptyp_name')}
            />
          </div>
          <div className="col-12">
            <InputCheckbox
              label={intl.formatMessage({
                id: 'app.features.paymentType.form.receipt',
                defaultMessage: 'Send receipt',
              })}
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
              label={intl.formatMessage({
                id: 'app.features.paymentType.form.from',
                defaultMessage: 'From',
              })}
              name="ptyp_from"
              required={true}
              value={values.ptyp_from}
              onChange={handleChange}
              error={getErrorMessage('ptyp_from')}
            />
          </div>
          <div className="col-18">
            <InputDate
              label={intl.formatMessage({
                id: 'app.features.paymentType.form.to',
                defaultMessage: 'To',
              })}
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

export default injectIntl(Form);
