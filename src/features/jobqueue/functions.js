/**
 * get status label with intl
 * 
 * @param Intl   intl
 * @param String code
 * 
 * @return String
 */
export function getStatusLabel(intl, code) {
  const message = intl.formatMessage({
    id: 'app.features.jobqueue.status.' + code.toLowerCase(),
    defaultMessage: code,
  });
  return message;
}
