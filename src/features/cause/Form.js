import React from 'react';
import { InputCheckbox, InputHidden, InputSelect, InputText, InputMonetary  } from 'freeassofront';
import { InputDate, InputData, ResponsiveModalOrForm, InputTextarea, InputSpin } from '../ui';
import useForm from '../ui/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker } from './';

export default function Form(props) {
  const nYear = new Date().getFullYear(); 
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab, getErrorMessage } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
    props.errors,
  );
  return (
    <ResponsiveModalOrForm
      title="Cause"
      className="m-5"
      tab={values.currentTab}
      tabs={props.tabs}
      size="xl"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-md-12">
          <InputSelect
            label="Mission"
            name="cause_type.id"
            labelTop={true}
            value={values.cause_type ? values.cause_type.id : null}
            addempty={true}
            onChange={handleChange}
            options={causeTypeAsOptions(props.cause_types)}
          />
        </div>
        <div className="col-md-12">
          <InputText
            label="Nom"
            name="cau_name"
            id="cau_name"
            labelTop={true}
            required={true}
            value={values.cau_name}
            onChange={handleChange}
            error={getErrorMessage('cau_name')}
          />
        </div>
        <div className="col-md-12">
          <SiteInputPicker
            label="Site"
            labelTop={true}
            key="site"
            name="site"
            item={values.site || null}
            onChange={handleChange}
          />
        </div>
      </div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-6">
              <InputSelect
                label="Sexe"
                labelTop={true}
                name="cau_sex"
                id="cau_sex"
                value={values.cau_sex}
                onChange={handleChange}
                options={[
                  { label: 'Male', value: 'M' },
                  { label: 'Femelle', value: 'F' },
                ]}
              />
            </div>
            <div className="col-md-6">
              <InputSpin
                label="Année de naissance"
                name="cau_year"
                id="cau_year"
                maxValue={nYear}
                minValue={1990}
                labelTop={true}
                value={values.cau_year}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
            </div>
            <div className="col-7">
              <InputCheckbox
                label="Visible sur le site"
                name="cau_public"
                labelTop={true}
                checked={values.cau_public === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-7">
              <InputCheckbox
                label="Don régulier disponible"
                name="cau_available"
                labelTop={true}
                checked={values.cau_available === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-1">
            </div>
            <div className="col-md-7">
              <InputMonetary
                label="Montant récolté"
                labelTop={true}
                name="cau_mnt"
                id="cau_mnt"
                inputMoney="EUR"
                dbMoney="EUR"
                value={values.cau_mnt}
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <InputDate
                label="Entrée"
                labelTop={true}
                name="cau_from"
                id="cau_from"
                value={values.cau_from}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-9">
              <InputDate
                label="Sortie"
                labelTop={true}
                name="cau_to"
                id="cau_to"
                value={values.cau_to}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputData
                key="cau_string_3"
                name="cau_string_3"
                labelTop={true}
                value={values.cau_string_3}
                datas={props.tab_datas}
                config={props.tab_configs}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-5">
            </div>
            <div className="col-md-7">
              <InputMonetary
                label="Restant"
                labelTop={true}
                name="cau_mnt_left"
                id="cau_mnt_left"
                inputMoney="EUR"
                dbMoney="EUR"
                value={values.cau_mnt_left}
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-18">
              <CauseInputPicker
                label="Père"
                labelTop={true}
                key="parent1"
                name="parent1"
                item={values.parent1 || null}
                onChange={handleChange}
              />
            </div>
            <div className="col-18">
              <CauseInputPicker
                label="Mère"
                labelTop={true}
                key="parent2"
                name="parent2"
                item={values.parent2 || null}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="row">
            <div className="col-md-12">
              <ClientInputPicker
                label="Soigneur"
                key="proprietary"
                name="proprietary"
                labelTop={true}
                item={values.proprietary || null}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-36">
              <InputTextarea
                label="Observations"
                labelTop={true}
                name="cau_desc"
                value={values.cau_desc}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}
