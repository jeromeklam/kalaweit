import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { useForm, ResponsiveModalOrForm, InputDate } from '../ui';
import { countryAsOptions } from '../country/functions.js';

const Form = props => {
  const { intl } = props;
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
      size="lg"
      modal={true}
      title={intl.formatMessage({
        id: 'app.features.receipt.form.title',
        defaultMessage: 'Receipt',
      })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-18">
          <InputText
            label={intl.formatMessage({
              id: 'app.features.receipt.form.number',
              defaultMessage: 'Number',
            })}
            name="rec_number"
            id="rec_number"
            required={true}
            value={values.rec_number}
            onChange={handleChange}
            error={getErrorMessage('rec_number')}
          />
        </div>
        <div className="col-sm-18">
          <InputDate
            label={intl.formatMessage({
              id: 'app.features.receipt.form.rec_gen_ts',
              defaultMessage: 'Generated on',
            })}
            name="rec_gen_ts"
            id="rec_gen_ts"
            required={true}
            value={values.rec_gen_ts}
            onChange={handleChange}
            error={getErrorMessage('rec_gen_ts')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-18">
          <InputText
            label={intl.formatMessage({
              id: 'app.features.receipt.form.fullname',
              defaultMessage: 'Member',
            })}
            name="rec_fullname"
            id="rec_fullname"
            required={true}
            value={values.rec_fullname}
            onChange={handleChange}
            error={getErrorMessage('rec_fullname')}
          />
        </div>
        <div className="col-sm-18">
          <InputText
            label={intl.formatMessage({
              id: 'app.features.receipt.form.email',
              defaultMessage: 'Email',
            })}
            name="rec_email"
            id="rec_email"
            required={true}
            value={values.rec_email}
            onChange={handleChange}
            error={getErrorMessage('rec_email')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label={intl.formatMessage({
              id: 'app.features.receipt.form.address1',
              defaultMessage: 'Address',
            })}
            name="rec_address1"
            id="rec_address1"
            required={true}
            value={values.rec_address1}
            onChange={handleChange}
            error={getErrorMessage('rec_address1')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label=""
            name="rec_address2"
            id="rec_address2"
            required={true}
            value={values.rec_address2}
            onChange={handleChange}
            error={getErrorMessage('rec_address2')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label=""
            name="rec_address3"
            id="rec_address3"
            required={true}
            value={values.rec_address3}
            onChange={handleChange}
            error={getErrorMessage('rec_address3')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-7">
          <InputText
            label={intl.formatMessage({
              id: 'app.features.receipt.form.postalCode',
              defaultMessage: 'Postal code',
            })}
            name="rec_cp"
            labelTop={true}
            value={values.rec_cp}
            onChange={handleChange}
            error={getErrorMessage('rec_cp')}
          />
        </div>
        <div className="col-sm-18">
          <InputText
            label={intl.formatMessage({
              id: 'app.features.receipt.form.town',
              defaultMessage: 'Town',
            })}
            name="rec_town"
            labelTop={true}
            value={values.rec_town}
            onChange={handleChange}
            error={getErrorMessage('rec_town')}
          />
        </div>
        <div className="col-sm-11">
          <InputSelect
            label={intl.formatMessage({
              id: 'app.features.receipt.form.country',
              defaultMessage: 'Country',
            })}
            name="country.id"
            labelTop={true}
            value={values.country ? values.country.id : null}
            onChange={handleChange}
            options={countryAsOptions(props.countries)}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
};

export default injectIntl(Form);
