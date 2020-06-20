import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputSelect, InputCheckbox, InputMonetary } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';
import { causeTypeMntType, causeTypeFamily } from './';

function Form(props) {
  const modify = props.modify || false; 
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  let minDate = true;
  let maxDate = true;
  let maxLabel = props.intl.formatMessage({
    id: 'app.features.causeType.form.mntMax',
    defaultMessage: 'Maximum amount',
  });
  if (values.caut_mnt_type === 'OTHER') {
    minDate = false;
    maxDate = false;
  }
  if (values.caut_mnt_type === 'ANNUAL') {
    minDate = false;
    maxLabel = props.intl.formatMessage({
      id: 'app.features.causeType.form.mntAnnual',
      defaultMessage: 'Annual amount',
    });
  }
  return (
    <ResponsiveModalOrForm
      className="m-5"
      size="lg"
      height="md"
      modal={true}
      title={props.intl.formatMessage({
        id: 'app.features.causeType.form.title',
        defaultMessage: 'Mission',
      })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-18">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.name',
              defaultMessage: 'Name',
            })}
            name="caut_name"
            id="caut_name"
            required={true}
            value={values.caut_name}
            onChange={handleChange}
            error={getErrorMessage('caut_name')}
          />
        </div>
        <div className="col-sm-18">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.mainType',
              defaultMessage: 'Program',
            })}
            name="cause_main_type.id"
            id="cause_main_type.id"
            value={values.cause_main_type.id}
            onChange={handleChange}
            options={props.causeMainType}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.mntType',
              defaultMessage: 'Totalization',
            })}
            name="caut_mnt_type"
            id="caut_mnt_type"
            disabled={modify}
            value={values.caut_mnt_type}
            onChange={handleChange}
            options={causeTypeMntType}
          />
        </div>
        <div className="col-sm-12">
          <InputMonetary
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.minMnt',
              defaultMessage: 'Minimum amount',
            })}
            labelTop={true}
            name="caut_min_mnt"
            id="caut_min_mnt"
            inputMoney="EUR"
            dbMoney="EUR"
            disabled={!minDate}
            value={minDate ? values.caut_min_mnt : ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-12">
          <InputMonetary
            label={maxLabel}
            labelTop={true}
            name="caut_max_mnt"
            id="caut_max_mnt"
            inputMoney="EUR"
            dbMoney="EUR"
            disabled={!maxDate}
            value={maxDate ? values.caut_max_mnt : ''}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.family',
              defaultMessage: 'Operation',
            })}
            name="caut_family"
            id="caut_family"
            disabled={modify}
            value={values.caut_family}
            onChange={handleChange}
            options={causeTypeFamily}
          />
        </div>
        <div className="col-sm-12">
          <InputCheckbox
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.receipt',
              defaultMessage: 'Receipt',
            })}
            name="caut_receipt"
            id="caut_receipt"
            checked={values.caut_receipt}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-12">
          <InputCheckbox
            label={props.intl.formatMessage({
              id: 'app.features.causeType.form.certificate',
              defaultMessage: 'Certificate',
            })}
            name="caut_certificat"
            id="caut_certificat"
            checked={values.caut_certificat}
            onChange={handleChange}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
