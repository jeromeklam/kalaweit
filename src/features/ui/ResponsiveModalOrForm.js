import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { ResponsiveForm, ResponsiveModal } from 'freeassofront';

class ResponsiveModalOrForm extends Component {
  static propTypes = {};

  render() {
    const { intl } = this.props;
    if (this.props.modal) {
      const buttons = [
        {
          name: intl.formatMessage({
            id: 'app.form.button.save',
            defaultMessage: 'Save',
          }),
          function: this.props.onSubmit,
          theme: 'primary',
          icon: 'valid',
        },
        {
          name: intl.formatMessage({
            id: 'app.form.button.cancel',
            defaultMessage: 'Cancel',
          }),
          function: this.props.onClose,
          theme: 'secondary',
          icon: 'close',
        },
      ];
      return (
        <ResponsiveModal
          {...this.props}
          size={this.props.size || 'fullscreen'}
          show={true}
          buttons={buttons}
        />
      );
    }
    return <ResponsiveForm {...this.props} />;
  }
}

export default injectIntl(ResponsiveModalOrForm);
