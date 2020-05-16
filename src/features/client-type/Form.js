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
        id: 'app.features.clientType.form.title',
        defaultMessage: 'Person type',
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
              id: 'app.features.clientType.form.name',
              defaultMessage: 'Name',
            })}
            name="clit_name"
            id="clit_name"
            required={true}
            value={values.clit_name}
            onChange={handleChange}
            error={getErrorMessage('clit_name')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
