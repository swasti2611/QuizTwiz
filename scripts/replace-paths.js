const path = require("path");

const options = {
  files: path.join(path.resolve(), "build", "index.html"),
  from: [
    /href="\/qtfavicon\.ico"/g,
    /href="\/qtfavicon\.png"/g,
    /\/static\/media\//g,
  ],
  to: [
    'href="https://quiztwiz.b-cdn.net/qtfavicon.ico"',
    'href="https://quiztwiz.b-cdn.net/qtfavicon.png"',
    "https://playerstorage.b-cdn.net/quiztwiz/assets",
  ],
};

async function replacePaths() {
  const { replaceInFile } = await import("replace-in-file");
  try {
    const results = await replaceInFile(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

replacePaths();
