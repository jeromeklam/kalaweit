import React from 'react';
import { InputHidden, InputText, InputSelect, FormResponsive } from '../layout';
import useForm from '../layout/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Personne" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-md-18">
            <InputSelect
              label="Type"
              name="client_type.id"
              labelTop={true}
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
            />
          </div>
          <div className="col-md-18">
            <InputSelect
              label="Catégorie"
              name="client_category.id"
              labelTop={true}
              value={values.client_category ? values.client_category.id : null}
              onChange={handleChange}
              options={clientCategoryAsOptions(props.client_categories)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-18">
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
          <div className="col-sm-18">
            <InputText
              label="Prénom"
              name="cli_firstname"
              id="cli_firstname"
              labelTop={true}
              value={values.cli_firstname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-36">
            <InputText
              label="Adresse"
              name="cli_address1"
              labelTop={true}
              value={values.cli_address1}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-36">
            <InputText
              label=""
              name="cli_address2"
              labelTop={true}
              value={values.cli_address2}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-36">
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
          <div className="col-sm-9">
            <InputText
              label="Code postal"
              name="cli_cp"
              labelTop={true}
              value={values.cli_cp}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-27">
            <InputText
              label="Commune"
              name="cli_town"
              labelTop={true}
              value={values.cli_town}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </FormResponsive>
  );
}
