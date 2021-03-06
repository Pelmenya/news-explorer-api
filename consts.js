const urlRegEx = /^https?:\/\/[\W\w]*$/;
/*
  ^https?:\/\/([Ww]{3}\.)?([A-Za-z0-9]((-?[A-Za-z0-9]+)_?)+((\.[A-Za-z0-9]{2,})+_?)+|((2[0-5][0-5]\.
      |[0-1]?\d?\d?\.){3}(2[0-5][0-5]|[0-1]?\d?\d)))(:\d{2,5})?(\/[\S]*)*$/;
  */
const hexRegEx = /^[0-9a-fA-F]{24}$/;

module.exports = {
  urlRegEx,
  hexRegEx,
};
