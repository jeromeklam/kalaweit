import React from 'react';
import { InputHidden, InputSelect, InputTextArea, InputCheckbox, ResponsiveForm } from 'freeassofront';
import { InputText } from 'freeassofront';
import useForm from '../ui/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';
import { countryAsOptions } from '../country/functions.js';
import { langAsOptions } from '../lang/functions.js';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
  );
  return (
    <ResponsiveForm
      title="Membre"
      tab={values.currentTab}
      tabs={props.tabs}
      onNavTab={handleNavTab}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-9">
            <InputText
              label="Nom"
              name="cli_lastname"
              id="cli_lastname"
              required={true}
              labelTop={true}
              value={values.cli_lastname}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-9">
            <InputText
              label="Prénom"
              name="cli_firstname"
              id="cli_firstname"
              labelTop={true}
              value={values.cli_firstname}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-7">
            <InputSelect
              label="Catégorie"
              name="client_category.id"
              labelTop={true}
              value={values.client_category ? values.client_category.id : null}
              onChange={handleChange}
              options={clientCategoryAsOptions(props.client_categories)}
            />
          </div>
          <div className="col-sm-7">
            <InputSelect
              label="Type"
              name="client_type.id"
              labelTop={true}
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
            />
          </div>
          <div className="col-sm-4">
            <InputCheckbox
              label="Actif"
              name="cli_active"
              labelTop={true}
              checked={values.cli_active === true}
              onChange={handleChange}
            />
          </div>
        </div>
        {values.currentTab === '1' && (
          <div>
            <div className="row">
              <div className="col-sm-25">
                <InputText
                  label="Adresse"
                  name="cli_address1"
                  labelTop={true}
                  value={values.cli_address1}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-7">
                <InputCheckbox
                  label="Certificats"
                  name="cli_certificat"
                  labelTop={true}
                  checked={values.cli_certificat === true}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-4">
                <InputCheckbox
                  label="Reçus"
                  name="cli_receipt"
                  labelTop={true}
                  checked={values.cli_receipt === true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-25">
                <InputText
                  label=""
                  name="cli_address2"
                  labelTop={true}
                  value={values.cli_address2}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-25">
                <InputText
                  label=""
                  name="cli_address3"
                  labelTop={true}
                  value={values.cli_address3}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-7">
                <InputText
                  label="Code postal"
                  name="cli_cp"
                  labelTop={true}
                  value={values.cli_cp}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-18">
                <InputText
                  label="Commune"
                  name="cli_town"
                  labelTop={true}
                  value={values.cli_town}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-11">
                <InputSelect
                  label="Pays"
                  name="country.id"
                  labelTop={true}
                  value={values.country ? values.country.id : null}
                  onChange={handleChange}
                  options={countryAsOptions(props.countries)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-16">
                <InputText
                  label="Email"
                  name="cli_email"
                  labelTop={true}
                  value={values.cli_email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <InputText
                  label="Téléphone"
                  name="cli_phone_home"
                  labelTop={true}
                  value={values.cli_phone_home}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <InputSelect
                  label="Langue"
                  name="lang.id"
                  labelTop={true}
                  value={values.lang ? values.lang.id : null}
                  onChange={handleChange}
                  options={langAsOptions(props.languages)}
                />
              </div>
            </div>
          </div>
        )}
        {values.currentTab === '2' && (
          <div>
            <div className="row">
              <div className="col-sm-8">
                <InputText
                  label="Téléphone (2)"
                  name="cli_phone_gsm"
                  labelTop={true}
                  value={values.cli_phone_gsm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-36">
                <InputTextArea
                  label="Commentaires"
                  labelTop={true}
                  name="cli_desc"
                  id="cli_desc"
                  value={values.cli_desc}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ResponsiveForm>
  );
}
