const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const templatePath = 'ai_templates/screen_template.ai'; // Adjust path to your template
const illustratorPath =
  '/Applications/Adobe Illustrator 2024/Adobe Illustrator 2024.app/Contents/MacOS/Adobe Illustrator'; // Adjust path as needed
const inputFolder = 'images'; // Folder with images and filenames
const outputFolder = 'output'; // Folder to save PNG files

function parseFileName(fileName) {
  const [firstLine, secondLine] = fileName.split('@');
  return { firstLine, secondLine };
}

function runExtendScript(
  templatePath,
  imagePath,
  firstLine,
  secondLine,
  outputFilePath,
  callback
) {
  const scriptPath = path.join(__dirname, 'processTemplate.jsx');
  const command = `"${illustratorPath}" -run "${scriptPath}" "${templatePath}" "${imagePath}" "${firstLine}" "${secondLine}" "${outputFilePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    callback();
  });
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error(`Error reading input folder: ${err.message}`);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(inputFolder, file);
    const { firstLine, secondLine } = parseFileName(
      file.replace(/\.[^/.]+$/, '')
    );
    const outputFilePath = path.join(
      outputFolder,
      `${firstLine}-${secondLine}.png`
    );

    runExtendScript(
      templatePath,
      filePath,
      firstLine,
      secondLine,
      outputFilePath,
      () => {
        console.log(`Processed ${file}`);
      }
    );
  });
});
