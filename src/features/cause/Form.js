import React from 'react';
import { injectIntl } from 'react-intl';
import { InputCheckbox, InputHidden, InputSelect, InputText, InputMonetary } from 'freeassofront';
import { InputDate, InputData, ResponsiveModalOrForm, InputTextarea, InputSpin } from '../ui';
import useForm from '../ui/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { subspeciesAsOptions } from '../subspecies';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker } from './';
import { InlineSponsorships } from '../sponsorship';
import { InlineDonations } from '../donation';
import { InlinePhotos, InlineSponsors } from './';

function Form(props) {
  const nYear = new Date().getFullYear();
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  const tabs = [
    {
      key: '1',
      name: 'identification',
      label: props.intl.formatMessage({
        id: 'app.features.cause.form.main',
        defaultMessage: 'Mission',
      }),
      shortcut: 'A',
      icon: 'cause',
    },
    {
      key: '2',
      name: 'divers',
      label: props.intl.formatMessage({
        id: 'app.features.cause.form.more',
        defaultMessage: 'Complement',
      }),
      shortcut: 'D',
      icon: 'misc',
    },
  ];
  const modifTabs = [
    {
      key: '3',
      name: 'sponsorship',
      label: props.intl.formatMessage({
        id: 'app.features.cause.tab.sponsorships',
        defaultMessage: 'Sponsorships',
      }),
      shortcut: 'I',
      icon: 'client',
    },
    {
      key: '4',
      name: 'donation',
      label: props.intl.formatMessage({
        id: 'app.features.cause.tab.donations',
        defaultMessage: 'Donations',
      }),
      shortcut: 'C',
      icon: 'misc',
    },
    {
      key: '5',
      name: 'picture',
      label: props.intl.formatMessage({
        id: 'app.features.cause.tab.pictures',
        defaultMessage: 'Pictures',
      }),
      shortcut: 'C',
      icon: 'misc',
    },
    {
      key: '6',
      name: 'sponsor',
      label: props.intl.formatMessage({
        id: 'app.features.cause.tab.sponsors',
        defaultMessage: 'Sponsors',
      }),
      shortcut: 'C',
      icon: 'misc',
    },
  ];
  return (
    <ResponsiveModalOrForm
      title={values.cau_name ? values.cau_name : ''}
      className="m-5"
      tab={values._currentTab}
      tabs={!props.modify ? tabs : tabs.concat(modifTabs)}
      size="xl"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      {values._currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-md-7">
              <InputSelect
                label={props.intl.formatMessage({
                  id: 'app.features.cause.form.causeType',
                  defaultMessage: 'Mission',
                })}
                name="cause_type.id"
                labelTop={true}
                value={values.cause_type ? values.cause_type.id : null}
                addempty={true}
                onChange={handleChange}
                options={causeTypeAsOptions(props.cause_types)}
              />
            </div>
            <div className="col-md-7">
              <InputText
                label={props.intl.formatMessage({
                  id: 'app.features.cause.form.name',
                  defaultMessage: 'Name',
                })}
                name="cau_name"
                id="cau_name"
                labelTop={true}
                required={true}
                value={values.cau_name}
                onChange={handleChange}
                error={getErrorMessage('cau_name')}
              />
            </div>
            {values.cause_type && values.cause_type.caut_family === 'ANIMAL' && (
              <div className="col-md-10">
                <InputSelect
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.subspecies',
                    defaultMessage: 'Subspecies',
                  })}
                  name="subspecies.id"
                  labelTop={true}
                  value={values.subspecies ? values.subspecies.id : null}
                  addempty={true}
                  onChange={handleChange}
                  options={subspeciesAsOptions(props.subspecies)}
                />
              </div>
            )}
            <div className="col-md-12">
              <SiteInputPicker
                label={props.intl.formatMessage({
                  id: 'app.features.cause.form.site',
                  defaultMessage: 'Location',
                })}
                labelTop={true}
                key="site"
                name="site"
                item={values.site || null}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="row">
              <div className="col-6">
                {values.cause_type && values.cause_type.caut_family === 'ANIMAL' && (
                  <InputSelect
                    label={props.intl.formatMessage({
                      id: 'app.features.cause.form.sex',
                      defaultMessage: 'Sex',
                    })}
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
                )}
              </div>
              <div className="col-md-6">
                {values.cause_type && values.cause_type.caut_family === 'ANIMAL' && (
                  <InputSpin
                    label={props.intl.formatMessage({
                      id: 'app.features.cause.form.cauYear',
                      defaultMessage: 'Born in',
                    })}
                    name="cau_year"
                    id="cau_year"
                    maxValue={nYear}
                    minValue={1990}
                    labelTop={true}
                    value={values.cau_year}
                    onChange={handleChange}
                  />
                )}
              </div>
              <div className="col-md-2"></div>
              <div className="col-7">
                <InputCheckbox
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.public',
                    defaultMessage: 'Show on site',
                  })}
                  name="cau_public"
                  labelTop={true}
                  checked={values.cau_public === true}
                  onChange={handleChange}
                />
              </div>
              <div className="col-7">
                <InputCheckbox
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.available',
                    defaultMessage: 'Sponsorship',
                  })}
                  name="cau_available"
                  labelTop={true}
                  checked={values.cau_available === true}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-7">
                <InputMonetary
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.mnt',
                    defaultMessage: 'Raised',
                  })}
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
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.from',
                    defaultMessage: 'From',
                  })}
                  labelTop={true}
                  name="cau_from"
                  id="cau_from"
                  value={values.cau_from}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-9">
                <InputDate
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.to',
                    defaultMessage: 'End',
                  })}
                  labelTop={true}
                  name="cau_to"
                  id="cau_to"
                  value={values.cau_to}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                {values.cau_end && (
                  <InputData
                    key="cau_string_3"
                    name="cau_string_3"
                    labelTop={true}
                    value={values.cau_string_3}
                    datas={props.tab_datas}
                    config={props.tab_configs}
                    onChange={handleChange}
                  />
                )}
              </div>
              <div className="col-md-5"></div>
              <div className="col-md-7">
                <InputMonetary
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.left',
                    defaultMessage: 'Left',
                  })}
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
          </div>
          {values.cause_type && values.cause_type.caut_family === 'ANIMAL' && (
            <div className="row">
              <div className="col-18">
                <CauseInputPicker
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.parent1',
                    defaultMessage: 'Father',
                  })}
                  labelTop={true}
                  key="parent1"
                  name="parent1"
                  item={values.parent1 || null}
                  onChange={handleChange}
                />
              </div>
              <div className="col-18">
                <CauseInputPicker
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.parent2',
                    defaultMessage: 'Mother',
                  })}
                  labelTop={true}
                  key="parent2"
                  name="parent2"
                  item={values.parent2 || null}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {values.cause_type.caut_certificat && (
            <div className="row">
              <div className="col-sm-12">
                <InputMonetary
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.unitBase',
                    defaultMessage: 'Certificate base quantity',
                  })}
                  labelTop={true}
                  name="cau_unit_base"
                  id="cau_unit_base"
                  inputMoney="EUR"
                  dbMoney="EUR"
                  value={values.cau_unit_base}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.unitUnit',
                    defaultMessage: 'Certificate base unit',
                  })}
                  name="cau_unit_unit"
                  id="cau_unit_unit"
                  labelTop={true}
                  required={true}
                  value={values.cau_unit_unit}
                  onChange={handleChange}
                  error={getErrorMessage('cau_unit_unit')}
                />
              </div>
              <div className="col-sm-12">
                <InputMonetary
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.unitMnt',
                    defaultMessage: 'Certificate base amount',
                  })}
                  labelTop={true}
                  name="cau_unit_mnt"
                  id="cau_unit_mnt"
                  inputMoney="EUR"
                  dbMoney="EUR"
                  value={values.cau_unit_mnt}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {values._currentTab === '2' && (
        <div>
          {values.cause_type && values.cause_type.caut_family === 'ANIMAL' && (
            <div className="row">
              <div className="col-md-12">
                <ClientInputPicker
                  label={props.intl.formatMessage({
                    id: 'app.features.cause.form.proprietary',
                    defaultMessage: 'Sanitary',
                  })}
                  key="proprietary"
                  name="proprietary"
                  labelTop={true}
                  item={values.proprietary || null}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-36">
              <InputTextarea
                label={props.intl.formatMessage({
                  id: 'app.features.cause.form.desc',
                  defaultMessage: 'Description',
                })}
                labelTop={true}
                name="cau_desc"
                value={values.cau_desc}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      {values._currentTab === '3' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineSponsorships mode="cause" id={values.id} />
        </div>
      )}
      {values._currentTab === '4' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineDonations mode="cause" id={values.id} />
        </div>
      )}
      {values._currentTab === '5' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlinePhotos cauId={values.id} />
        </div>
      )}
      {values._currentTab === '6' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineSponsors cauId={values.id} />
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
