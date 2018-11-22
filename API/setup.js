'use strict';

const fs = require('file-system');
 fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('.env'));