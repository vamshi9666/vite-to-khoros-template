const fs = require("fs");

function bundleJS(params) {
  const jsContent = fs.readFileSync(`./dist/main.js`);

  const doesCssFileExist = fs.existsSync("./dist/main.css");

  let htmlWrapperContent = `
        <script>
            ${jsContent}
        </script>
    `;

    console.log("does ", doesCssFileExist);

  if (doesCssFileExist) {
    const styleContent = fs.readFileSync("./dist/main.css");

    htmlWrapperContent += `
        <style>
            ${styleContent}
        </style>
    `;
  }

  fs.writeFileSync(
    `./dist/khoros-output.html`,
    htmlWrapperContent
  );
  const { exec } = require('child_process');


//   exec(`echo "${htmlWrapperContent.replace(/"/g, '\\"')}" | pbcopy`, (err) => {
//     if (err) {
//       console.log('Error copying to clipboard:', err);
//     } else {
//       console.log('File contents copied to clipboard.');
//     }
//   });
    // clipboard.writeSync(htmlWrapperContent)

    const {platform} = require("os")
  var proc = require("child_process").spawn( platform().includes("win")?"clip":"pbcopy" );
  proc.stdin.write(htmlWrapperContent);
  proc.stdin.end();
}

bundleJS()