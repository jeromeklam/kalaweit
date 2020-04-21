export const getReceiptModes = (intl) => {
  return [
    { value: 'AUTO', label: intl.formatMessage({ id: 'app.features.receipt.mode.auto', defaultMessage: 'Generated' }) },
    { value: 'MANUAL', label: intl.formatMessage({ id: 'app.features.receipt.mode.manual', defaultMessage: 'Manual' }) },
  ];
}

export const getReceiptSendMethods = (intl) => {
  return [
    { value: 'EMAIL', label: intl.formatMessage({ id: 'app.features.receipt.sendMethod.email', defaultMessage: 'Email' }) },
    { value: 'MANUAL', label: intl.formatMessage({ id: 'app.features.receipt.sendMethod.manual', defaultMessage: 'Manual' }) },
    { value: 'UNKNOWN', label: intl.formatMessage({ id: 'app.features.receipt.sendMethod.unknown', defaultMessage: 'Unknown' }) },
  ];
}