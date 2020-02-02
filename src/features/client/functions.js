export const getFullName = client => {
  let fullname = '';
  if (client && client.cli_firstname && client.cli_lastname) {
    fullname = `${client.cli_firstname} ${client.cli_lastname}`;
  }
  return fullname.trim();
};