import fs from "fs";
import path from "path";
import prettier from "@prettier/sync";
import askForConfirmation from "./askForConfirmation.js";

const rootDir = process.cwd();

const backupFilesLocation = path.join(rootDir, "scripts/clearBackupFiles");
const templateRelativePath = "src/templates";

const cleanFolder = (filePath, toKeep) => {
  const dirPath = path.join(rootDir, filePath);
  fs.rmSync(dirPath, { recursive: true, force: true }); //remove path with its contents
  fs.mkdirSync(dirPath); //create empty path
  toKeep && fs.writeFileSync(`${dirPath}/.gitkeep`, ""); //add .gitkeep
};

const prepareDefaultContent = (typeOfSection, index) => {
  const content = `${typeOfSection === "fragment" ? `<!-- fragment ${index} start -->` : ""}
                        <table class="w-full">
                            <tr>
                                <td>${typeOfSection}-0${index}</td>
                            </tr>
                        </table>
                    ${typeOfSection === "fragment" ? `<!-- fragment ${index} end -->` : ""}`;

  return content;
};

const createFragmentsAndSections = () => {
  const array = Array.from({ length: 5 }, (v, i) => i + 1);

  ///Create all Sections
  array.forEach(element => {
    const content = prepareDefaultContent("section", element);
    const path = "src/components/sections";
    const fileName = `section-0${element}.html`;

    generateFile(path, fileName, content);
  });

  ///Create all Fragments
  array.forEach(element => {
    const content = prepareDefaultContent("fragment", element);
    const path = "src/components/fragments";
    const fileName = `fragment-0${element}.html`;

    generateFile(path, fileName, content);
  });
};

const clearUploadConfig = async () => {
  const jsonPath = path.join(rootDir, "uploadConfig.sandbox.json");
  fs.readFile(jsonPath, (err, jsonData) => {
    if (err) {
      console.log(err);
      return;
    }
    try {
      const data = JSON.parse(jsonData);
      data.name = "";
      data.subject = "";
      const formattedData = prettier.format(JSON.stringify(data), {
        parser: "json",
        printWidth: 20,
      });
      formattedData && fs.writeFileSync(jsonPath, formattedData);
      console.log("uploadConfig.sandbox.json restored successfully");
    } catch (err) {
      console.log(err);
    }
  });
};
const copyBackupFiles = () => {
  const filesToProceed = [
    {
      fileName: "tailwind.config.cjs", // Tailwind configurations
      sourcePath: path.join(backupFilesLocation, "tailwind.config.cjs"),
      destinationPath: path.join(rootDir, "tailwind.config.cjs"),
    },
    {
      fileName: "index.html", // Maiizzle template file where all email fragments are put together
      sourcePath: path.join(backupFilesLocation, "index.html"),
      destinationPath: path.join(rootDir, templateRelativePath, "index.html"),
    },
  ];
  //copy all backup Files
  filesToProceed.forEach(file => {
    fs.copyFile(
      file.sourcePath,
      file.destinationPath,
      fs.constants.COPYFILE_FICLONE,
      err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`${file.fileName} restored succesfully`);
      }
    );
  });
};

const generateFile = async (targetPath, targetFileName, content) => {
  const targetDir = path.join(rootDir, targetPath, targetFileName);
  const formattedContent = await prettier.format(content, { parser: "html" });

  fs.writeFileSync(targetDir, formattedContent);
  console.log(`SUCCESS: ${targetFileName} created successfully!`);
};

const cleanProjectFlow = () => {
  cleanFolder("src/components/fragments", false);
  cleanFolder("src/components/sections", false);
  cleanFolder(templateRelativePath, false);
  cleanFolder("src/images", true);
  createFragmentsAndSections();
  clearUploadConfig();
  copyBackupFiles();
};

await askForConfirmation(
  cleanProjectFlow,
  "WARNING: THIS ACTION WILL REMOVE ALL YOUR CHANGES IN THE SOURCE FILES (sections, fragments, templates, sandboxConfig, and Tailwind configuration). Do you want to proceed? (y/n)"
);
