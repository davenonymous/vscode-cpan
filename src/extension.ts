import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposableShow = vscode.commands.registerCommand('cpan.show', async () => {
		let module = await vscode.window.showInputBox({
			title: 'Lookup some perldoc on CPAN',
			prompt: 'Module',
		});
		if(module) {
			vscode.env.openExternal(vscode.Uri.parse(`https://metacpan.org/pod/${module}`));
		}
	});

	let disposableShowCursor = vscode.commands.registerCommand('cpan.showCursor', () => {
		const editor = vscode.window.activeTextEditor;
		const cursorWordRange = editor?.document.getWordRangeAtPosition(editor?.selection.active, /[^\s\-;]+/);
		const text = editor?.document.getText(cursorWordRange);
		vscode.env.openExternal(vscode.Uri.parse(`https://metacpan.org/pod/${text}`));
	});

	context.subscriptions.push(disposableShow, disposableShowCursor);
}

export function deactivate() {}