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
    case 'inputtext':
        addInputText(getArguments());
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
//**********************************************************************************************************************
//**********************************************************************************************************************
//
//        Bartosz Wróblewski:
//
//

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


function addDropdown(arguments){

    let disabledHTMLString = "";
    let disabledTSString = "";
    let modelHTMLString = "";
    let modelTSString = "";
    let placeholderHTML = "";
    let optionsHTML= "" ;
    let optionsTS = "";
    let editableHTML = "";
    let filterHTML = "";
    let labelHTML = "";
    if(arguments.disabled){
        disabledHTMLString = "[disabled] = \"" + arguments.disabled + "\"";
        if(arguments.disabled != "true" && arguments.disabled != "false"){
            disabledTSString = arguments.disabled + ": boolean = false;\n\n" +
                "toggle" + capitalize(arguments.disabled) + " (){\n" +
                "this." + arguments.disabled + " = !this."+ arguments.disabled + ";\n" +
                "}\n\n";
        }
    }

    if(arguments.model){
        modelHTMLString = "[(ngModel)] =  \"" + arguments.model + "\"";
        modelTSString = arguments.model + " : string;\n\n";
    }

    if(arguments.options) {
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +": " + capitalize(arguments.options) + "[];\n\n"
    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    if(arguments.placeholder) placeholderHTML = "placeholder = \"" + arguments.placeholder + "\"";

    if(arguments.editable) editableHTML = "editable = \"" + arguments.editable + "\"";

    if(arguments.filter) filterHTML = "filter = \"" + arguments.filter + "\"";

    let htmlToAppend = "<p-dropdown " +filterHTML + " " + optionsHTML + " " + labelHTML +  " " + editableHTML +" " + disabledHTMLString + " " + modelHTMLString + " " + placeholderHTML +  " ></p-dropdown>"

    let importPath = 'import {DropdownModule} from \'primeng/dropdown\'; \n';

    fs.appendFile(filePath + '.component.html', htmlToAppend,  err => {if (err) throw err});

    updateTsFile(filePath, editableTS+ optionsTS + modelTSString + disabledTSString );
    updateModule(modulePath , importPath, 'DropdownModule');
}




function addInputText(arguments) {

    let disabledHTMLString = "";
    let disabledTSString = "";
    let modelHTMLString = "";
    let modelTSString = "";
    let placeholderHTML = "";

    if (arguments.disabled) {
        disabledHTMLString = "[disabled] = \"" + arguments.disabled + "\"";
        if (arguments.disabled != "true" && arguments.disabled != "false") {
            disabledTSString = arguments.disabled + ": boolean = false;\n\n" +
                "toggle" + capitalize(arguments.disabled) + " (){\n" +
                "this." + arguments.disabled + " = !this." + arguments.disabled + ";\n" +
                "}\n\n";
        }


        if (arguments.model) {
            modelHTMLString = "[(ngModel)] =  \"" + arguments.model + "\"";
            modelTSString = arguments.model + " : string;\n\n";
        }

        if (arguments.placeholder) placeholderHTML = "placeholder = \"" + arguments.placeholder + "\"";

        let htmlToAppend = "<input type=\"text\" pInputText " + disabledHTMLString + " " + modelHTMLString + "" + placeholderHTML + " />"

        let importPath = 'import {InputTextModule} from \'primeng/inputtext\'; \n';

        fs.appendFile(filePath + '.component.html', htmlToAppend, err => {
            if (err) throw err
        });

        updateTsFile(filePath, modelTSString + disabledTSString);
        updateModule(modulePath, importPath, 'InputTextModule');
    }

}


//
//
//**********************************************************************************************************************
//**********************************************************************************************************************


    function addSidebar(arguments) {
        console.log(arguments.position);
        if (!arguments.position)
            arguments.position = 'left';

        if (!arguments.fullScreen)
            arguments.fullScreen = false;

        let htmlToAppend = `<p-sidebar [(visible)]="display" position="${arguments.position}" [fullScreen]="${arguments.fullScreen}" [baseZIndex]="10000">\n` +
            'Content \n' +
            '</p-sidebar>\n' +
            '<button (click)="display = true" >Show sidebar</button>';

        let importPath = 'import {SidebarModule} from \'primeng/sidebar\'; \n';

        fs.appendFile(filePath + '.component.html', htmlToAppend, err => {
            if (err) throw err
        });

        updateTsFile(filePath, 'display = false;');
        updateModule(modulePath, importPath, 'SidebarModule');
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
