const vscode = require("vscode");
const path = require("path");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension-webview.keyboard",
    () => {
      const panel = vscode.window.createWebviewPanel(
        `keyboard`,
        `keyboard`,
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      panel.webview.html = getWebviewContent(context, panel.webview);

      vscode.workspace.onDidChangeTextDocument((e) => {
        const key = e.contentChanges[0].text;
        const keys = convertKeys(key);
        panel.webview.postMessage({ keys: keys });
      });
    }
  );

  context.subscriptions.push(disposable);
}

function convertKeys(key) {
  if (key === "\r\n" || key === "\n") return ["enter"];
  else if (key === "\t") return ["tab"];
  else if (key === " ") return ["space"];
  else if (/^[A-Z]{1}$/.test(key)) return ["shift", key.toLowerCase()];
  else if (/^[a-z]{1}$/.test(key)) return [key];
  else return [];
}

function getWebviewOptions(extensionUri) {
  return {
    // Enable javascript in the webview
    enableScripts: true,

    // And restrict the webview to only loading content from our extension's `media` directory.
    localResourceRoots: [vscode.Uri.joinPath(extensionUri, "dist")],
  };
}

function getWebviewContent(context, webview) {
  const scriptPathOnDist = vscode.Uri.joinPath(
    context.extensionUri,
    "dist",
    "main.js"
  );

  const scriptUri = webview.asWebviewUri(scriptPathOnDist);

  const nonce = getNonce();

  return `<!DOCTYPE html>
          <html lang="ja">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
              <div id="app"></div>
              <script src=${scriptUri}></script>
          </body>
          </html>`;
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
