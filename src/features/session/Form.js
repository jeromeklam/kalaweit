import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { injectIntl } from 'react-intl';
import { useForm, ResponsiveModalOrForm, InputSpin } from '../ui';
import { sessionStatus, sessionType } from './';

function Form(props) {
  const nYear = new Date().getFullYear() + 1;
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
      size="md"
      modal={true}
      title={props.intl.formatMessage({
        id: 'app.features.session.form.title',
        defaultMessage: 'Session',
      })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-24">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.session.form.name',
              defaultMessage: 'Name',
            })}
            name="sess_name"
            id="sess_name"
            required={true}
            value={values.sess_name}
            onChange={handleChange}
            error={getErrorMessage('sess_name')}
          />
        </div>
        <div className="col-md-12">
          <InputSpin
            label={props.intl.formatMessage({
              id: 'app.features.session.form.exercice',
              defaultMessage: 'Exercise',
            })}
            name="sess_exercice"
            id="sess_exercice"
            maxValue={nYear}
            minValue={1990}
            labelTop={true}
            value={values.sess_exercice}
            onChange={handleChange}
            error={getErrorMessage('sess_exercice')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-18">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.session.form.status',
              defaultMessage: 'Status',
            })}
            name="sess_status"
            id="sess_status"
            required={true}
            disabled={true}
            value={values.sess_status}
            options={sessionStatus}
            onChange={handleChange}
            error={getErrorMessage('sess_status')}
          />
        </div>
        <div className="col-sm-18">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.session.form.type',
              defaultMessage: 'Type',
            })}
            name="sess_type"
            id="sess_type"
            required={true}
            disabled={true}
            value={values.sess_type}
            options={sessionType}
            onChange={handleChange}
            error={getErrorMessage('sess_type')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
