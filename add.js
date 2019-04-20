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

function addSidebar(arguments) {
    console.log(arguments.position);
    if(!arguments.position)
        arguments.position = 'left';

    if(!arguments.fullScreen)
        arguments.fullScreen = false;

    let htmlToAppend = `<p-sidebar [(visible)]="display" position="${arguments.position}" [fullScreen]="${arguments.fullScreen}" [baseZIndex]="10000">\n` +
        'Content \n' +
        '</p-sidebar>\n' +
        '<button (click)="display = true" >Show sidebar</button>';

    let importPath = 'import {SidebarModule} from \'primeng/sidebar\'; \n';

    fs.appendFile(filePath + '.component.html', htmlToAppend,  err => {if (err) throw err});

    updateTsFile(filePath, 'display = false;');
    updateModule(modulePath , importPath, 'SidebarModule');
}


 function updateModule(modulePath, importPrimeNgPath, primeNgModuleName) {
    let moduleData = fs.readFileSync(modulePath + '.module.ts'); //read existing contents into data
    let fd = fs.openSync(modulePath + '.module.ts', 'w+');
    let buffer = new Buffer(importPrimeNgPath);

    moduleData = new Buffer(moduleData.toString().replace('imports: [', 'imports: [\n' + primeNgModuleName + ','));

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, moduleData, 0, moduleData.length, buffer.length); //append old data
    fs.close(fd);
}

function updateTsFile(filePath, dataToAppend) {
    let tsData = fs.readFileSync(filePath+ '.component.ts'); //read existing contents into data
    let fd = fs.openSync(filePath+ '.component.ts', 'w+');

    if(tsData.toString().includes('constructor()'))
        tsData = new Buffer(tsData.toString().replace('constructor()', '\n' + dataToAppend + '\n' + 'constructor()'));
    else if(/export class.*{/.test(tsData.toString())) {
        let componentName = tsData.toString().match(/export class (.*) {/)[1];
        tsData = new Buffer(tsData.toString().replace(/export class.*{/, 'export class ' + componentName + ' { \n' + dataToAppend));
    }

    fs.writeSync(fd, tsData, 0, tsData.length, 0); //append old data
    fs.close(fd);
}