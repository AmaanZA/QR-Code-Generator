/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import * as fs from 'node:fs';

inquirer
  .prompt([{
    "name": "URL",
    "message": "Type in a URL"
  }
  ])
  .then((answers) => {
    var qr_svg = qr.image(answers.URL, { type: 'svg' });
    qr_svg.pipe(fs.createWriteStream('QR_CODE.svg'));
    var svg_string = qr.imageSync("QR_CODE", { type: 'svg' });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("tty error");
    } else {
      console.log("other error");
    }
});