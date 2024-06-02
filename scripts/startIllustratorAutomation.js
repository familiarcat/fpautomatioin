// File: startIllustratorAutomation.js
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export async function startIllustratorAutomation(aiFilePath, imagesFolderPath) {
  const imagesFolder = path.resolve(imagesFolderPath);
  const images = fs
    .readdirSync(imagesFolder)
    .filter((file) => file.endsWith('.jpg')); // Assuming PNG images for simplicity

  for (const imageFileName of images) {
    const scriptPath = path.join(process.cwd(), 'illustratorScript.jsx');
    const imagePath = path.join(imagesFolder, imageFileName);
    const screensFolder = path.join(process.cwd(), 'screens');

    if (!fs.existsSync(screensFolder)) {
      fs.mkdirSync(screensFolder);
    }

    const command = `osascript -e 'tell application "Adobe Illustrator" to do javascript (file "${scriptPath}") with arguments {"${aiFilePath}", "${imagePath}", "${screensFolder}"}'`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
}
