/**
 * @overview configs of ccm component regex
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "ab": {
    key: "ab",
    data: {
      regex: "^a.*b$", // (/a.*b/i).source,
      options: 'i',
      matching: "abcdefb",
      non_matching: "bacdef"
    }
  },

  "zipcode": {
    key: "zipcode",
    data: {
      regex: "^(D[- ]{0,1}){0,1}(?!00)\\d{2}\\d{3}$",
      options: 'i',
      matching: "D-12345",
      non_matching: "00345"
    }
  },

  "landline_number": {
    key: "landline_number",
    data: {
      regex: "^0[\\d]{1,3}[-,\\s,/]?[\\d]{3,}$",
      options: 'i',
      matching: "0123-123456789",
      non_matching: "0-123"
    }
  },

  "license_plate": {
    key: "license_plate",
    data: {
      regex: "^[A-Z]{1,3}[-|\\s][A-Z]{1,3}[-|\\s][0-9]{1,4}$",
      options: 'i',
      matching: "K-AB 123",
      non_matching: "1234-567"
    }
  },

  "e-mail": {
    key: "e-mail",
    data: {
      regex: "^[\\w\\d-.]+@[-A-Za-z0-9]+\\.[A-Za-z]{2,5}$",
      options: 'i',
      matching: "Karl.Mueller@h-brs.de",
      non_matching: "123@nix.germany"
    }
  },

  "web_address": {
    key: "web_address",
    data: {
      regex: "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*$",
      options: 'i',
      matching: "https://kaul.inf.h-brs.de",
      non_matching: "file://abc.de"
    }
  }

};
