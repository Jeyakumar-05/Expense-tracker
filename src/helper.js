//Local storage

//get item
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key)); // save as JSON format
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
