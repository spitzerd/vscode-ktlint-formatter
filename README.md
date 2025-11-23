# Ktlint Formatter for VS Code

A VS Code extension that automatically formats Kotlin code using ktlint with zero configuration. ktlint is embedded in the extension, so you can start using it right away without any setup.

## ✨ Features

- **Zero Configuration**: No need to install or configure ktlint separately
- **Automatic Download**: The extension automatically downloads ktlint on first run
- **One-Click Formatting**: Integrated with VS Code's native formatting features
- **Kotlin Standard Style**: Follows the official Kotlin style guide via ktlint

## 🚀 Usage

1. Install the extension in VS Code
2. Open a Kotlin file (`.kt`, `.kts`)
3. Format your code:
   - **Keyboard Shortcut**: `Shift + Alt + F` (Windows/Linux) or `Shift + Option + F` (Mac)
   - **Context Menu**: Right-click and select "Format Document"
   - **Command Palette**: Run `Format Document`

### Format on Save

To enable automatic formatting when you save a file, configure VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "[kotlin]": {
    "editor.defaultFormatter": "rnoro.vscode-ktlint-formatter"
  },
  "[kotlin-script]": {
    "editor.defaultFormatter": "rnoro.vscode-ktlint-formatter"
  }
}
```

## 📋 Requirements

- VS Code 1.85.0 or later
- Java Runtime (required to run ktlint)

## 🔧 How It Works

1. The extension automatically downloads the ktlint binary when first activated
2. When formatting is requested, ktlint is executed to format the code
3. The formatted result is applied to the editor

## 🐛 Troubleshooting

### Formatting doesn't work

1. Check the "Ktlint Formatter" logs in the Output panel
2. Verify that Java is installed on your system
3. Try reloading the extension or restarting VS Code

### ktlint download fails

- Check your internet connection
- If you need proxy settings, configure VS Code's proxy settings

## 📝 License

MIT

## 🔗 Related Links

- [ktlint Official Site](https://pinterest.github.io/ktlint/)
- [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
