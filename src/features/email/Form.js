import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { injectIntl } from 'react-intl';
import { useForm, InputTextarea, ResponsiveModalOrForm } from '../ui';
import { emailCodes } from './';

function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab || '1', props.onSubmit, props.onCancel);
  const tabs = [
    {
      key: '1',
      name: 'main',
      label: props.intl.formatMessage({
        id: 'app.features.email.tab.main',
        defaultMessage: 'Description',
      }),
      shortcut: 'I',
      icon: 'client',
    },
    {
      key: '2',
      name: 'content',
      label: props.intl.formatMessage({
        id: 'app.features.email.tab.content',
        defaultMessage: 'Content',
      }),
      shortcut: 'C',
      icon: 'misc',
    },
  ];
  return (
    <ResponsiveModalOrForm
      title={props.intl.formatMessage({
        id: 'app.features.email.form.title',
        defaultMessage: 'Email model',
      })}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      tab={values._currentTab}
      tabs={tabs}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-26">
          <InputText
            label={props.intl.formatMessage({
              id: 'app.features.email.form.subject',
              defaultMessage: 'Subject',
            })}
            name="email_subject"
            id="email_subject"
            required={true}
            value={values.email_subject}
            onChange={handleChange}
            error={getErrorMessage('email_subject')}
          />
        </div>
        <div className="col-sm-10">
          <InputSelect
            label={props.intl.formatMessage({
              id: 'app.features.email.form.lang',
              defaultMessage: 'Lang',
            })}
            name="lang.id"
            required={true}
            value={values.lang.id}
            onChange={handleChange}
            options={props.langs}
            addempty={true}
          />
        </div>
      </div>
      <hr />
      {values._currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-sm-18">
              <InputText
                label={props.intl.formatMessage({
                  id: 'app.features.email.form.replyTo',
                  defaultMessage: 'Reply to email',
                })}
                name="email_reply_to"
                id="email_reply_to"
                value={values.email_reply_to}
                onChange={handleChange}
                error={getErrorMessage('email_reply_to')}
              />
            </div>
            <div className="col-sm-18">
              <InputSelect
                label={props.intl.formatMessage({
                  id: 'app.features.email.form.code',
                  defaultMessage: 'For',
                })}
                name="email_code"
                id="email_code"
                required={true}
                value={values.email_code}
                options={emailCodes}
                onChange={handleChange}
                error={getErrorMessage('email_code')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-18">
              <InputText
                label={props.intl.formatMessage({
                  id: 'app.features.email.form.fromEmail',
                  defaultMessage: 'From email',
                })}
                name="email_from"
                id="email_from"
                value={values.email_from}
                onChange={handleChange}
                error={getErrorMessage('email_from')}
              />
            </div>
            <div className="col-sm-18">
              <InputText
                label={props.intl.formatMessage({
                  id: 'app.features.email.form.fromName',
                  defaultMessage: 'From name',
                })}
                name="email_from_name"
                id="email_from_name"
                value={values.email_from_name}
                onChange={handleChange}
                error={getErrorMessage('email_from_name')}
              />
            </div>
          </div>
        </div>
      )}
      <hr />
      {values._currentTab === '2' && (
        <div className="row">
          <div className="col-sm-36">
            <InputTextarea
              label={props.intl.formatMessage({
                id: 'app.features.email.form.body',
                defaultMessage: 'Content',
              })}
              name="email_body"
              id="email_body"
              value={values.email_body}
              onChange={handleChange}
              error={getErrorMessage('email_body')}
            />
          </div>
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);
