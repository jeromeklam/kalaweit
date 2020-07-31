import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { useForm, ResponsiveModalOrForm, InputTextarea } from '../ui';
import { siteTypeAsOptions } from '../site-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';

function Form(props) {
  const { intl } = props;
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, '1', props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  const tabs = [
    {
      key: '1',
      name: 'identification',
      label: intl.formatMessage({ id: 'app.features.site.tab.identity', defaultMessage: 'Identity' }),
      shortcut: 'L',
      icon: 'location',
    },
    {
      key: '2',
      name: 'divers',
      label: intl.formatMessage({ id: 'app.features.site.tab.other', defaultMessage: 'Other' }),
      shortcut: 'D',
      icon: 'misc',
    },
  ];
  return (
    <ResponsiveModalOrForm
      className="m-5"
      title={values.site_name}
      size="lg"
      modal
      tab={values._currentTab}
      tabs={tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      {values._currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-sm-12">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.name',
                  defaultMessage: 'Name',
                })}
                required={true}
                name="site_name"
                value={values.site_name}
                onChange={handleChange}
                error={getErrorMessage('site_name')}
              />
            </div>
            <div className="col-sm-12">
              <InputSelect
                label={intl.formatMessage({
                  id: 'app.features.site.form.type',
                  defaultMessage: 'Type',
                })}
                name="site_type.id"
                required={true}
                value={values.site_type ? values.site_type.id : null}
                onChange={handleChange}
                options={siteTypeAsOptions(props.site_types)}
                addempty={true}
              />
            </div>
            <div className="col-sm-12">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.code',
                  defaultMessage: 'Code',
                })}
                name="site_code"
                value={values.site_code}
                onChange={handleChange}
                error={getErrorMessage('site_code')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.address',
                  defaultMessage: 'Address',
                })}
                name="site_address1"
                value={values.site_address1}
                onChange={handleChange}
                error={getErrorMessage('site_address1')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-9">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.postalCode',
                  defaultMessage: 'CP',
                })}
                name="site_cp"
                value={values.site_cp}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-27">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.town',
                  defaultMessage: 'Town',
                })}
                name="site_town"
                value={values.site_town}
                onChange={handleChange}
                error={getErrorMessage('site_town')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.area',
                  defaultMessage: 'Area',
                })}
                name="site_area"
                value={values.site_area}
                onChange={handleChange}
                error={getErrorMessage('site_area')}
              />
            </div>
          </div>
        </div>
      )}
      {values._currentTab === '2' && (
        <div>
          <div className="row">
            <div className="col-sm-36">
              <InputText
                label={intl.formatMessage({
                  id: 'app.features.site.form.plots',
                  defaultMessage: 'CP',
                })}
                name="site_plots"
                value={values.site_plots}
                onChange={handleChange}
                error={getErrorMessage('site_plots')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <ClientInputPicker
                label={intl.formatMessage({
                  id: 'app.features.site.form.owner',
                  defaultMessage: 'Owner',
                })}
                key="owner"
                name="owner"
                item={values.owner || null}
                onChange={handleChange}
                error={getErrorMessage('owner')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <ClientInputPicker
                label={intl.formatMessage({
                  id: 'app.features.site.form.sanitary',
                  defaultMessage: 'Sanitary',
                })}
                key="sanitary"
                name="sanitary"
                item={values.sanitary || null}
                onChange={handleChange}
                error={getErrorMessage('sanitary')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <InputTextarea
                label={intl.formatMessage({
                  id: 'app.features.site.form.comments',
                  defaultMessage: 'Comments',
                })}
                name="site_desc"
                value={values.site_desc}
                onChange={handleChange}
                error={getErrorMessage('site_desc')}
              />
            </div>
          </div>
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
