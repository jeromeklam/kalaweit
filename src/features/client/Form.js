import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputSelect, InputCheckbox } from 'freeassofront';
import { InputTextarea, ResponsiveModalOrForm } from '../ui';
import { InputText } from 'freeassofront';
import useForm from '../ui/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';
import { countryAsOptions } from '../country/functions.js';
import { langAsOptions } from '../lang/functions.js';
import { InlineSponsorships } from '../sponsorship';
import { InlineDonations } from '../donation';

function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab || '1',
    props.onSubmit,
    props.onCancel,
  );
  const tabs = [
    {
      key: '1',
      name: 'identity',
      label: props.intl.formatMessage({
        id: 'app.features.client.tab.main',
        defaultMessage: 'Identity',
      }),
      shortcut: 'I',
      icon: 'client',
    },
    {
      key: '2',
      name: 'complement',
      label: props.intl.formatMessage({
        id: 'app.features.client.tab.more',
        defaultMessage: 'Complement',
      }),
      shortcut: 'C',
      icon: 'misc',
    },
  ];
  const modifTabs = [
    {
      key: '3',
      name: 'sponsorship',
      label: props.intl.formatMessage({
        id: 'app.features.client.tab.sponsorships',
        defaultMessage: 'Sponsorships',
      }),
      shortcut: 'I',
      icon: 'client',
    },
    {
      key: '4',
      name: 'donation',
      label: props.intl.formatMessage({
        id: 'app.features.client.tab.donations',
        defaultMessage: 'Donations',
      }),
      shortcut: 'C',
      icon: 'misc',
    },
  ];
  return (
    <ResponsiveModalOrForm
      title={props.intl.formatMessage({
        id: 'app.features.client.form.title',
        defaultMessage: 'Member',
      })}
      className="m-5"
      tab={values.currentTab}
      tabs={!props.modify ? tabs : tabs.concat(modifTabs)}
      size="xl"
      onNavTab={handleNavTab}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={true}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-9">
            <InputText
              label={props.intl.formatMessage({
                id: 'app.features.client.form.lastname',
                defaultMessage: 'Lastname',
              })}
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
              label={props.intl.formatMessage({
                id: 'app.features.client.form.firstname',
                defaultMessage: 'Firstname',
              })}
              name="cli_firstname"
              id="cli_firstname"
              labelTop={true}
              value={values.cli_firstname}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-7">
            <InputSelect
              label={props.intl.formatMessage({
                id: 'app.features.client.form.category',
                defaultMessage: 'Category',
              })}
              name="client_category.id"
              labelTop={true}
              value={values.client_category ? values.client_category.id : null}
              onChange={handleChange}
              options={clientCategoryAsOptions(props.client_categories)}
            />
          </div>
          <div className="col-sm-7">
            <InputSelect
              label={props.intl.formatMessage({
                id: 'app.features.client.form.type',
                defaultMessage: 'Type',
              })}
              name="client_type.id"
              labelTop={true}
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
            />
          </div>
          <div className="col-sm-4">
            <InputCheckbox
              label={props.intl.formatMessage({
                id: 'app.features.client.form.active',
                defaultMessage: 'Active',
              })}
              name="cli_active"
              labelTop={true}
              checked={values.cli_active === true}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr />
        {values.currentTab === '1' && (
          <div>
            <div className="row">
              <div className="col-sm-24">
                <InputText
                  label=""
                  name="cli_address1"
                  labelTop={true}
                  value={values.cli_address1}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <InputCheckbox
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.certificate',
                    defaultMessage: 'Certificate',
                  })}
                  name="cli_certificat"
                  labelTop={false}
                  labelSize={20}
                  inputSize={16}
                  checked={values.cli_certificat === true}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <InputCheckbox
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.receipt',
                    defaultMessage: 'Receipt',
                  })}
                  name="cli_receipt"
                  labelSize={20}
                  inputSize={16}
                  labelTop={false}
                  checked={values.cli_receipt === true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-24">
                <InputText
                  label=""
                  name="cli_address2"
                  labelTop={true}
                  value={values.cli_address2}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-11">
                <InputCheckbox
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.displaySite',
                    defaultMessage: 'Show on site',
                  })}
                  name="cli_display_site"
                  labelTop={false}
                  labelSize={22}
                  inputSize={14}
                  checked={values.cli_display_site === true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-24">
                <InputText
                  label=""
                  name="cli_address3"
                  labelTop={true}
                  value={values.cli_address3}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-11">
                <InputCheckbox
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.sendNews',
                    defaultMessage: 'Send news',
                  })}
                  name="cli_send_news"
                  labelTop={false}
                  labelSize={22}
                  inputSize={14}
                  checked={values.cli_send_news === true}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-7">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.cp',
                    defaultMessage: 'Postcode',
                  })}
                  name="cli_cp"
                  labelTop={true}
                  value={values.cli_cp}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-17">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.town',
                    defaultMessage: 'Town',
                  })}
                  name="cli_town"
                  labelTop={true}
                  value={values.cli_town}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-11">
                <InputSelect
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.country',
                    defaultMessage: 'Country',
                  })}
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
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.email',
                    defaultMessage: 'Email',
                  })}
                  name="cli_email"
                  labelTop={true}
                  value={values.cli_email}
                  className={values.cli_email === values.cli_email_refused ? 'text-warning' : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-8">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.phoneHomr',
                    defaultMessage: 'Phone',
                  })}
                  name="cli_phone_home"
                  labelTop={true}
                  value={values.cli_phone_home}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <InputSelect
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.lang',
                    defaultMessage: 'Lang',
                  })}
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
              <div className="col-sm-16">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.email2',
                    defaultMessage: 'Second email',
                  })}
                  name="cli_email2"
                  labelTop={true}
                  value={values.cli_email2}
                  className={values.cli_email2 === values.cli_email_refused ? 'text-warning' : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-8">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.phoneGsm',
                    defaultMessage: 'Second phone',
                  })}
                  name="cli_phone_gsm"
                  labelTop={true}
                  value={values.cli_phone_gsm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-16">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.emailRefused',
                    defaultMessage: 'Refused email',
                  })}
                  name="cli_email_refused"
                  labelTop={true}
                  className="text-warning"
                  value={values.cli_email_refused}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-36">
                <InputTextarea
                  label={props.intl.formatMessage({
                    id: 'app.features.client.form.desc',
                    defaultMessage: 'Comments',
                  })}
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
        {values.currentTab === '3' && (
          <div className="border border-secondary rounded overflow-x-hidden">
            <InlineSponsorships mode="client" id={values.id} />
          </div>
        )}
        {values.currentTab === '4' && (
          <div className="border border-secondary rounded overflow-x-hidden">
            <InlineDonations mode="client" id={values.id} />
          </div>
        )}
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
