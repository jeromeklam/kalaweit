import React from 'react';
import { InputCheckbox, InputHidden, InputSelect, InputText, InputTextarea, ResponsiveForm } from 'freeassofront';
import { InputDate, InputData } from '../ui';
import useForm from '../ui/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker } from './';

export default function InlineForm(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
  return (
    <form>
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-36">
          <InputText
            label="Montant"
            name="spo_mnt"
            labelTop={false}
            size="sm"
            labelSize={12}
            inputSize={24}
            value={values.spo_mnt}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}
