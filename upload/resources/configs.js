/**
 * @overview configurations of ccm component
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "image_upload": {
    key: "image_upload",
    fkey: 'test',
    keys: {        // additional DB keys if necessary (optional)
      semester: 172,
      fach: 'se',
      id: 'portrait'
    },
    server: 'https://kaul.inf.h-brs.de/data/form.php', // uniform server access

    upload_size: 100, // max. 100 MB, see php.ini upload_max_filesize = 120M
    upload_time: 80,  // max 80 sec,  see php.ini max_execution_time = 90

    content_type:  'image/*,.jpeg,.jpg,.png',  // which types to accept by file chooser
    // see https://stackoverflow.com/questions/181214/file-input-accept-attribute-is-it-useful
    type_regex:    'image/.*', // check type via regex, or see next line:
    suffix_regex:  '\.jpeg$|\.jpg$|\.png$' // or check via name suffix
    // both regex are alternatives or may both be omitted
  },
  "pdf_upload": {
    key: "pdf_upload",
    content_type: "application/pdf",
    suffix_regex: "\.pdf$"
  },
  "doc_upload": {
    key: "doc_upload",
    content_type: "application/doc, application/docx",
    suffix_regex: "\.doc$|\.docx$"
  },
  "ppt_upload": {
    key: "ppt_upload",
    content_type: "application/vnd.ms-powerpoint",
    suffix_regex: "\.ppt$|\.pptx$"
  }
};