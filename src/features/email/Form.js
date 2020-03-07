import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { useForm, InputTextarea, ResponsiveModalOrForm } from '../ui';

const tabs = [
  { key: '1', name: 'main', label: 'Description', shortcut: 'I', icon: 'client' },
  { key: '2', name: 'content', label: 'Contenu', shortcut: 'C', icon: 'misc' },
];

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <ResponsiveModalOrForm
      title="Email"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      tab={values.currentTab}
      tabs={tabs}
      modal={true}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-20">
          <InputText
            label="Sujet"
            name="email_subject"
            id="email_subject"
            value={values.email_subject}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-10">
          <InputText
            label="Code"
            name="email_code"
            id="email_code"
            value={values.email_code}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-6">
          <InputSelect
            label="Langue"
            name="lang.id"
            required={true}
            value={values.lang.id}
            onChange={handleChange}
            options={props.langs}
            addempty={true}
          />
        </div>
      </div>
      {values.currentTab === '1' && (
        <div className="row">
          <div className="col-sm-36">
            <InputText
              label="Email expéditeur"
              name="email_from"
              id="email_from"
              value={values.email_from}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-36">
            <InputText
              label="Nom expéditeur"
              name="email_from_name"
              id="email_from_name"
              value={values.email_from_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-36">
            <InputText
              label="Email retour"
              name="email_reply_to"
              id="email_reply_to"
              value={values.email_reply_to}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div className="row">
          <div className="col-sm-36">
            <InputTextarea
              label="Corps"
              name="email_body"
              id="email_body"
              value={values.email_body}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}
