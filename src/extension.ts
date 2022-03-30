// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';



export class NavigationButtonVsCodeExtension {
	context?: vscode.ExtensionContext;


	constructor() {
		this.context = undefined;
	}

	activate(context: vscode.ExtensionContext) {
		this.context = context;
		this.initToolbar();
	}

	deactivate() {
		if (this.context) {
			//TODO! free allocated resources
		}
	}

	initToolbar() {
		[
			['$(arrow-left)', 'NavButtons: Back', 'navbuttons.back', 'workbench.action.navigateBack'],
			['$(arrow-right)', 'NavButtons: Fwd', 'navbuttons.forward', 'workbench.action.navigateForward'],
		]
			.reverse()
			.forEach((item, index) => {
				const [text, tooltip, command, internalCommand] = item;

				this.context!.subscriptions.push(vscode.commands.registerCommand(command, () => {
					let ret = vscode.commands.executeCommand(internalCommand);
				}));

				const sbItem = vscode.window.createStatusBarItem(
					'navbarbuttons-toolbar',
					vscode.StatusBarAlignment.Left,
					22 + index + 1
				);
				sbItem.name = 'NavButtons: Toolbar';
				sbItem.text = text;
				sbItem.tooltip = tooltip;
				sbItem.command = command;
				sbItem.show();
				this.context!.subscriptions.push(sbItem);
			});

	}

}

export const extension = new NavigationButtonVsCodeExtension();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	extension.activate(context);
}

// this method is called when your extension is deactivated
export function deactivate() {

	extension.deactivate();

}
