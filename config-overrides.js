const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");

module.exports = function override(config, env) {
  if (env === "production") {
    config.plugins.push(
      new ReplaceInFileWebpackPlugin([
        {
          dir: "build",
          test: [/\.js$/, /\.html$/, /\.css$/],
          rules: [
            {
              search: /\/static\//g,
              replace: "https://quiztwiz.b-cdn.net/static/",
            },
            {
              search: /href="\/qtfavicon\.ico"/,
              replace: 'href="https://quiztwiz.b-cdn.net/qtfavicon.ico"',
            },
            {
              search: /href="\/qtfavicon\.png"/,
              replace: 'href="https://quiztwiz.b-cdn.net/qtfavicon.png"',
            },
            {
              search: /\/static\/media\//g,
              replace: "https://playerstorage.b-cdn.net/quiztwiz/assets",
            },
          ],
        },
      ])
    );
  }
  return config;
};
