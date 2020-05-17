import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputSelect, InputMonetary, InputCheckbox } from 'freeassofront';
import { InputDate, ResponsiveModalOrForm, InputSponsors, InputTextarea } from '../ui';
import useForm from '../ui/useForm';
import { paymentTypeAsOptions } from '../payment-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '../cause';
import { sessionAsOptions } from '../session/functions.js';
import { statusValues } from './';

const afterChange = (name, item) => {
  switch (name) {
    case 'cause': {
      if (item.cause) {
        if (item.cause.id > 0 && item.cause.cause_type) {
          let cautDuration = item.cause.cause_type.caut_once_duration;
          if (item.don_end_ts === null) {
            try {
              let myDate = new Date(item.don_real_ts);
              switch (cautDuration) {
                case '1Y': {
                  myDate.setFullYear(myDate.getFullYear() + 1);
                  item.don_end_ts = myDate.toUTCString();
                  break;
                }
                case '1M': {
                  myDate.setMonth(myDate.getMonth() + 1);
                  item.don_end_ts = myDate.toUTCString();
                  break;
                }
                default: {
                  item.don_end_ts = null;
                }
              }
            } catch (ex) {
              console.log(ex);
            }
          }
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, '1', props.onSubmit, props.onCancel, null, props.errors, afterChange);
  /**
   * Quelques petites variables de travail
   */
  let cauEndDate = false;
  let cauFamily = 'OTHER';
  if (values.cause) {
    cauFamily = values.cause.cau_family;
  }
  /**
   * Render
   */
  const { intl } = props;
  const tabs = [
    {
      key: '1',
      name: 'main',
      label: intl.formatMessage({
        id: 'app.features.donation.tab.main',
        defaultMessage: 'Donation',
      }),
      shortcut: 'P',
      icon: '',
    },
    {
      key: '2',
      name: 'sponsors',
      label: intl.formatMessage({
        id: 'app.features.donation.tab.sponsors',
        defaultMessage: 'Sponsors',
      }),
      shortcut: 'S',
      icon: '',
    },
    {
      key: '3',
      name: 'certificate',
      label: intl.formatMessage({
        id: 'app.features.donation.tab.sertificate',
        defaultMessage: 'Certificate',
      }),
      shortcut: 'C',
      icon: '',
    },
  ];
  return (
    <ResponsiveModalOrForm
      title={intl.formatMessage({
        id: 'app.features.donation.form.title',
        defaultMessage: 'Donation',
      })}
      className="m-5"
      size="xl"
      tab={values.currentTab}
      tabs={tabs}
      onNavTab={handleNavTab}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div>
        <div className="row">
          <div className="col-sm-14">
            <ClientInputPicker
              label={intl.formatMessage({
                id: 'app.features.donation.form.client',
                defaultMessage: 'Member',
              })}
              labelTop={true}
              key="client"
              name="client"
              item={values.client || null}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-14">
            <CauseInputPicker
              label={intl.formatMessage({
                id: 'app.features.donation.form.cause',
                defaultMessage: 'Mission',
              })}
              labelTop={true}
              key="cause"
              name="cause"
              item={values.cause || null}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-8">
            <InputSelect
              label={intl.formatMessage({
                id: 'app.features.donation.form.session',
                defaultMessage: 'Session',
              })}
              name="session.id"
              labelTop={true}
              value={values.session ? values.session.id : null}
              addempty={false}
              onChange={handleChange}
              options={sessionAsOptions(props.sessions)}
            />
          </div>
        </div>
      </div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-md-8">
              <InputDate
                label={intl.formatMessage({
                  id: 'app.features.donation.form.realTs',
                  defaultMessage: 'Done on',
                })}
                labelTop={true}
                name="don_real_ts"
                id="don_real_ts"
                inputSize={36}
                value={values.don_real_ts}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-8">
              <InputDate
                label={intl.formatMessage({
                  id: 'app.features.donation.form.endTs',
                  defaultMessage: 'End on',
                })}
                labelTop={true}
                name="don_end_ts"
                id="don_end_ts"
                inputSize={36}
                value={values.don_end_ts}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <InputCheckbox
                label={intl.formatMessage({
                  id: 'app.features.donation.form.sponsorship',
                  defaultMessage: 'Sponsorship',
                })}
                name="sponsorship.id"
                labelTop={true}
                disabled={true}
                checked={values.sponsorship.id > 0}
              />
            </div>
            <div className="col-md-8">
              <InputCheckbox
                label={intl.formatMessage({
                  id: 'app.features.donation.form.origin',
                  defaultMessage: 'Generated',
                })}
                name="origin.id"
                labelTop={true}
                disabled={true}
                checked={values.origin.id > 0}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <InputMonetary
                label={intl.formatMessage({
                  id: 'app.features.donation.form.mnt',
                  defaultMessage: 'Amount',
                })}
                labelTop={true}
                name="don_mnt"
                id="don_mnt"
                inputMoney="EUR"
                dbMoney="EUR"
                value={values.don_mnt}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-8">
              <InputSelect
                label={intl.formatMessage({
                  id: 'app.features.donation.form.type',
                  defaultMessage: 'Type',
                })}
                name="payment_type.id"
                labelTop={true}
                inline
                labelSize={36}
                inputSize={36}
                value={values.payment_type.id}
                onChange={handleChange}
                options={paymentTypeAsOptions(props.paymentTypes)}
                error={getErrorMessage('ptyp_id')}
              />
            </div>
            <div className="col-md-4"></div>
            <div className="col-sm-8">
              <InputCheckbox
                label={intl.formatMessage({
                  id: 'app.features.donation.form.displaySite',
                  defaultMessage: 'Show on site',
                })}
                name="don_display_site"
                labelTop={true}
                checked={values.don_display_site === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-8">
              <InputSelect
                label={intl.formatMessage({
                  id: 'app.features.donation.form.status',
                  defaultMessage: 'Status',
                })}
                id="don_status"
                name="don_status"
                labelTop={true}
                value={values.don_status}
                onChange={handleChange}
                options={statusValues}
                error={getErrorMessage('don_status')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <InputTextarea
                label={intl.formatMessage({
                  id: 'app.features.donation.form.comment',
                  defaultMessage: 'Comments',
                })}
                name="don_comment"
                labelTop={true}
                value={values.don_comment}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="row"></div>
          <div className="row">
            <div className="col-sm-36">
              <InputSponsors
                label={intl.formatMessage({
                  id: 'app.features.donation.form.sponsors',
                  defaultMessage: 'Sponsors',
                })}
                id="don_sponsors"
                name="don_sponsors"
                value={values.don_sponsors}
                onChange={handleChange}
                error={getErrorMessage('don_sponsors')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '3' && <div className="row"></div>}
      <hr />
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
