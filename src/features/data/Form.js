import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { InputStringarray, ResponsiveModalOrForm } from '../ui';
import { dataTypes } from './functions';
import useForm from '../ui/useForm';

/**
 * Functionnal Component
 */
function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  const optionsType = dataTypes();
  return (
    <ResponsiveModalOrForm
      className="m-5"
      title={props.intl.formatMessage({
        id: 'app.features.data.form.title',
        defaultMessage: 'Custom Data',
      })}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div classname="row">
        <div className="col-sm-36">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.data.form.name',
              defaultMessage: 'Name',
            })}
            name="data_name"
            required={true}
            value={values.data_name}
            onChange={handleChange}
            error={getErrorMessage('data_name')}
          />
        </div>
      </div>
      <div classname="row">
        <div className="col-sm-36">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.data.form.type',
              defaultMessage: 'Type',
            })}
            name="data_type"
            value={values.data_type}
            required={true}
            addempty={true}
            onChange={handleChange}
            options={optionsType}
            error={getErrorMessage('data_type')}
          />
        </div>
      </div>
      {values.data_type === 'LIST' && (
        <div classname="row">
          <div className="col-sm-36">
            <InputStringarray
              label={props.intl.formatMessage({
                id: 'app.features.data.form.values',
                defaultMessage: 'Values',
              })}
              name="data_content"
              value={values.data_content}
              onChange={handleChange}
              options={optionsType}
            />
          </div>
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
