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
      title="Espèces" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.species.form.name',
              defaultMessage: 'Name',
            })}
            name="spe_name"
            id="spe_name"
            required={true}
            value={values.spe_name}
            onChange={handleChange}
            error={getErrorMessage('spe_name')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.species.form.scientific',
              defaultMessage: 'Scientific name',
            })}
            name="spe_scientific"
            id="spe_scientific"
            value={values.spe_scientific}
            onChange={handleChange}
            error={getErrorMessage('spe_scientific')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
