import React from 'react';
import {
  InputHidden,
  InlineInputSelect,
  InlineLabel,
  InlineInputText,
  InlineInputCheckbox,
} from 'freeassofront';
import { InputDate } from '../ui';
import useForm from '../ui/useForm';
import { paymentTypeAsOptions } from '../payment-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';

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
          <div className="form-group row form-group-sm">
            <div className="col-sm-10">
              <InlineLabel label="Montant" htmlFor="spo_mnt" size="sm" />
            </div>
            <div className="col-sm-10">
              <InlineInputText
                label="Montant"
                id="spo_mnt"
                name="spo_mnt"
                labelTop={false}
                size="sm"
                inline={true}
                value={values.spo_mnt}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-16">
              <InlineInputSelect
                label=""
                name="payment_type.id"
                labelTop={false}
                size="sm"
                inline={true}
                value={values.payment_type.id}
                onChange={handleChange}
                options={paymentTypeAsOptions(props.payment_types)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-36">
          <InputDate
            label="Du"
            name="spo_from"
            labelTop={false}
            size="sm"
            labelSize={10}
            inputSize={26}
            value={values.spo_from}
            onChange={handleChange}
          />
        </div>
        <div className="col-36">
          <InputDate
            label="Au"
            name="spo_to"
            labelTop={false}
            size="sm"
            labelSize={10}
            inputSize={26}
            value={values.spo_to}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-36">
          <div className="form-group row form-group-sm">
            <div className="col-sm-10">
              <InlineLabel label="Options" htmlFor="spo_mnt" size="sm" />
            </div>
            <div className="col-sm-10">
              <InlineInputCheckbox
                label="Site"
                id="spo_display_site"
                name="spo_display_site"
                labelTop={false}
                size="sm"
                inline={true}
                checked={values.spo_display_site}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-36">
          {(props.mode === 'client' && values.cause && values.cause.id > 0) && (
            <CauseInputPicker
              label="Cause"
              key="cause"
              name="cause"
              size="sm"
              labelSize={10}
              inputSize={26}
              labelTop={false}
              item={values.cause || null}
              onChange={handleChange}
            />
          )}
          {props.mode === 'cause' && (
            <ClientInputPicker
              label="Membre"
              key="client"
              name="client"
              size="sm"
              labelSize={10}
              inputSize={26}
              labelTop={false}
              item={values.client || null}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </form>
  );
}
