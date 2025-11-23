# Ktlint Formatter for VS Code

A zero-configuration VS Code extension that formats Kotlin code using ktlint. No setup required - just install and start formatting!

## ✨ Features

- 🚀 **Zero Configuration**: No ktlint installation or setup needed
- 📦 **Automatic Setup**: Downloads ktlint (v1.8.0) automatically on first use
- 🎯 **Native Integration**: Works with VS Code's built-in formatting commands
- 📝 **Kotlin Standard**: Follows the official Kotlin coding conventions
- 📜 **Script Support**: Formats both `.kt` and `.kts` files
- ✅ **Status Notifications**: Visual feedback on formatting success/failure

## 📥 Installation

### From GitHub Releases

1. Download the latest `.vsix` file from [Releases](https://github.com/rnoro/vscode-ktlint-formatter/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
4. Type "Install from VSIX" and select it
5. Choose the downloaded `.vsix` file

**Command Line:**

```bash
code --install-extension vscode-ktlint-formatter-0.1.0.vsix
```

### From VS Code Marketplace

_Coming soon!_

## 🎨 Usage

### Manual Formatting

Open any Kotlin file (`.kt` or `.kts`) and format using:

- **Keyboard**: `Shift + Alt + F` (Windows/Linux) or `Shift + Option + F` (Mac)
- **Context Menu**: Right-click → "Format Document"
- **Command Palette**: `Ctrl+Shift+P` → "Format Document"

### Auto Format on Save

Add to your VS Code `settings.json`:

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

- **VS Code**: 1.85.0 or later
- **Java Runtime**: Required to execute ktlint (check with `java -version`)

## 🔧 How It Works

1. Extension activates when you open a Kotlin file
2. On first use, ktlint binary (v1.8.0) is downloaded automatically
3. Formatting requests are processed through ktlint
4. Results are applied to your editor with status notifications

## 🐛 Troubleshooting

### Formatting doesn't work

1. **Check Output Panel**: View → Output → Select "Ktlint Formatter"
2. **Verify Java**: Run `java -version` in terminal
3. **Reload Extension**: Press `F1` → "Reload Window"

### Download fails

- Check your internet connection
- Verify proxy settings if behind corporate firewall
- Check VS Code's network settings

### Manual ktlint download location

Ktlint is stored at: `~/.vscode/globalStorage/rnoro.vscode-ktlint-formatter/ktlint`

## 🤝 Contributing

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/rnoro/vscode-ktlint-formatter/issues).

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🔗 Related Resources

- [ktlint Official Site](https://pinterest.github.io/ktlint/)
- [Kotlin Coding Conventions](https://kotlinlang.org/docs/coding-conventions.html)
