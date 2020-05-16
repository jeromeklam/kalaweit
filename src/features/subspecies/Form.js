import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';
import { injectIntl } from 'react-intl';
import { speciesAsOptions } from '../species/functions.js';

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
        id: 'app.features.subspecies.form.title',
        defaultMessage: 'Subspecies',
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
              id: 'app.features.subspecies.form.name',
              defaultMessage: 'Name',
            })}
            name="sspe_name"
            id="sspe_name"
            required={true}
            value={values.sspe_name}
            onChange={handleChange}
            error={getErrorMessage('sspe_name')}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-36">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.subspecies.form.species',
              defaultMessage: 'Species',
            })}
            name="species.id"
            labelTop={true}
            value={values.species ? values.species.id : null}
            onChange={handleChange}
            options={speciesAsOptions(props.species)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.subspecies.form.scientific',
              defaultMessage: 'Scientific name',
            })}
            name="sspe_scientific"
            id="sspe_scientific"
            value={values.sspe_scientific}
            onChange={handleChange}
            error={getErrorMessage('sspe_scientific')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
