export const getFullName = (client) => {
  let fullname = '';
  if (client) {
    fullname = `${client.cli_firstname} ${client.cli_lastname}`;
  }
  return fullname.trim();
};