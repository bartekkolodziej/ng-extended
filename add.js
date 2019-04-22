#!/usr/bin/env node
const process = require('process');
const fs = require('fs');

//first two arguments in process array are irrelevant, next are passed by user
//first passed param is considered as component path
const filePath = process.argv[2];
//second passed param is considered as module path
const modulePath = process.argv[3];
//third passed param is considered as element to add
const elementToAdd = process.argv[4];

//other params are considered as additional arguments

switch (elementToAdd) {
    case 'sidebar':
        addSidebar(getArguments());
        break;
    case 'dialog':
        addDialog(getArguments());

}


function addDialog(arguments) {
    let htmlToAppend =
        `\n<p-dialog header="Godfather I" 
                  [(visible)]="displayDialog" 
                  [modal]="${arguments.modal ? arguments.modal : true}" 
                  [maximizable]="${arguments.maximizable ? arguments.maximizable : true}" 
                  [baseZIndex]="10000">
            <span>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                kind and benevolent to those who give respect,
                but given to ruthless violence whenever anything stands against the good of the family.</span>
                <p-footer>
                    <button type="button" (click)="displayDialog=false">Yes</button>
                    <button type="button" (click)="displayDialog=false">No</button>
                </p-footer>
        </p-dialog>

        <button type="button" (click)="displayDialog = true" pButton>Show dialog</button>\n`;

    let importPath = 'import {DialogModule} from \'primeng/dialog\'; \n';

    updateHtmlFile(htmlToAppend);
    updateTsFile('displayDialog = false;');
    updateModule(importPath, 'DialogModule');

}

function addSidebar(arguments) {
    let htmlToAppend =
        `\n<p-sidebar [(visible)]="displaySidebar" 
                    position="${arguments.left ? arguments.left : 'left'}"
                    [fullScreen]="${arguments.fullScreen ? arguments.fullScreen : false}">
            Content
        </p-sidebar>
        <button type="text" (click)="displaySidebar = true">Show sidebar</button>\n`;

    let importPath = 'import {SidebarModule} from \'primeng/sidebar\'; \n';

    updateHtmlFile(htmlToAppend);
    updateTsFile('displaySidebar = false;');
    updateModule(importPath, 'SidebarModule');
}


function updateHtmlFile(dataToAppend) {

    fs.appendFile(filePath + '.component.html', dataToAppend, err => {
        if (err) throw err
    });
}

function updateModule(importPrimeNgPath, primeNgModuleName) {
    let moduleData = fs.readFileSync(modulePath + '.module.ts'); //read existing contents into data
    let fd = fs.openSync(modulePath + '.module.ts', 'w+');
    let buffer = new Buffer(importPrimeNgPath);

    moduleData = new Buffer(moduleData.toString().replace('imports: [', 'imports: [\n' + primeNgModuleName + ','));

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, moduleData, 0, moduleData.length, buffer.length); //append old data
    fs.close(fd);
}

function updateTsFile(dataToAppend) {
    let tsData = fs.readFileSync(filePath + '.component.ts'); //read existing contents into data
    let fd = fs.openSync(filePath + '.component.ts', 'w+');

    if (tsData.toString().includes('constructor()'))
        tsData = new Buffer(tsData.toString().replace('constructor()', '\n' + dataToAppend + '\n' + 'constructor()'));
    else if (/export class.*{/.test(tsData.toString())) {
        let componentName = tsData.toString().match(/export class (.*) {/)[1];
        tsData = new Buffer(tsData.toString().replace(/export class.*{/, 'export class ' + componentName + ' { \n' + dataToAppend));
    }

    fs.writeSync(fd, tsData, 0, tsData.length, 0); //append old data
    fs.close(fd);
}

function getArguments() {
    const passedArguments = {};
    process.argv.forEach(e => {
        let argument = e.replace('--', '').split('=')[0];
        let value = e.replace('--', '').split('=')[1];
        passedArguments[argument] = value;
    });

    return passedArguments;
}