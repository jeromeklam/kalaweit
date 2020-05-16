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
        id: 'app.features.clientCategory.form.title',
        defaultMessage: 'Person category',
      })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.clientCategory.form.name',
              defaultMessage: 'Name',
            })}
            name="clic_name"
            id="clic_name"
            required={true}
            value={values.clic_name}
            onChange={handleChange}
            error={getErrorMessage('clic_name')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
