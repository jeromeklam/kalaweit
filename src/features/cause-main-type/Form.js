import React from 'react';
import { InputHidden, InputText } from 'freeassofront';
import { injectIntl } from 'react-intl';
import { useForm, ResponsiveModalOrForm } from '../ui';

function Form(props) {
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
        id: 'app.features.causeMainType.form.title',
        defaultMessage: 'Program',
      })}
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
            label={props.intl.formatMessage({
              id: 'app.features.causeMainType.form.name',
              defaultMessage: 'Name',
            })}
          name="camt_name"
          required={true}
          value={values.camt_name}
          onChange={handleChange}
          error={getErrorMessage('camt_name')}
        />
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
