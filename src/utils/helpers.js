const definitionPrefixName = (prefix) => {
  switch (prefix) {
    case 0:
      return 'Hr.';
    case 1:
      return 'Fr.';
    case 2:
      return 'Firma';
    default:
      return '';
  }
};

const getRowColorByStatus = (status) => {
  switch (status) {
    case (1):
      return '#b91e1d'
    case (3):
      return '#323082'
    case (4):
      return '#0d976a'
    default: break
  }
}

export { definitionPrefixName, getRowColorByStatus }