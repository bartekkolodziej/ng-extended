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

const argumentsAsHtml = getArgumentsAsHtmlString();

//other params are considered as additional arguments

switch (elementToAdd) {
    case 'sidebar':
        addSidebar(getArguments());
        break;
    case 'inputtext':
        addInputText(getArguments());
        break;
    case 'dropdown':
        addDropdown(getArguments());
        break;
    case 'listbox':
        addListbox(getArguments());
        break;
    case 'multiselect':
        addMultiselect(getArguments());
        break;
}




//**********************************************************************************************************************
//**********************************************************************************************************************
//
//        Bartosz Wróblewski:
//
//


function addMultiselet(arguments){

    let disabledHTML = "";
    let disabledTS = "";
    let modelHTML = "";
    let modelTS = "";
    let optionsHTML= "" ;
    let optionsTS = "";
    let labelHTML = "optionsLabel = \"label\"";


    if(arguments.disabled){
        disabledHTML = "[disabled] = \"" + arguments.disabled + "\"";
        if(arguments.disabled != "true" && arguments.disabled != "false"){
            disabledTS = arguments.disabled + ": boolean = false;\n\n" +
                "toggle" + capitalize(arguments.disabled) + " (){\n" +
                "this." + arguments.disabled + " = !this."+ arguments.disabled + ";\n" +
                "}\n\n";
        }
    }

    if(arguments.model){
        modelHTML = "[(ngModel)] =  \"" + arguments.model + "\"";
        modelTS = arguments.model + " : string;\n\n";
    }

    if(arguments.options) {
        optionsHTML = "[options] = \"" + arguments.options + "\"";

        let label = "label"
        if(arguments.label) label = arguments.label;
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +": " + capitalize(arguments.options) +
            `= [{label: "${label}1"},
            {label: "${label}2"},
            {label: "${label}3"},
            {label: "${label}4"},
            {label: "${label}5"},
            {label: "${label}6"}
             ];\n\n`;

    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    let htmlToAppend = "<p-multiselect " + optionsHTML + " " + labelHTML + " " + disabledHTML + " " + modelHTML + " ></p-multiselect>";

    let importPath = 'import {MultiselectModule} from \'primeng/multiselect\'; \n';

    updateHtmlFile(htmlToAppend);
    updateTsFile( optionsTS + modelTS + disabledTS );
    updateModule( importPath, 'MultiselectModule');


}


function addListbox(arguments){

    let disabledHTML = "";
    let disabledTS = "";
    let modelHTML = "";
    let modelTS = "";
    let optionsHTML= "" ;
    let optionsTS = "";
    let filterHTML = "";
    let labelHTML = "optionsLabel = \"label\"";
    let multipleHTML = "";
    let checkboxHMTL = "";

    if(arguments.disabled){
        disabledHTML = "[disabled] = \"" + arguments.disabled + "\"";
        if(arguments.disabled != "true" && arguments.disabled != "false"){
            disabledTS = arguments.disabled + ": boolean = false;\n\n" +
                "toggle" + capitalize(arguments.disabled) + " (){\n" +
                "this." + arguments.disabled + " = !this."+ arguments.disabled + ";\n" +
                "}\n\n";
        }
    }

    if(arguments.model){
        modelHTML = "[(ngModel)] =  \"" + arguments.model + "\"";
        modelTS = arguments.model + " : string;\n\n";
    }

    if(arguments.options) {
        optionsHTML = "[options] = \"" + arguments.options + "\"";

        let label = "label"
        if(arguments.label) label = arguments.label;
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +": " + capitalize(arguments.options) +
            `= [{label: "${label}1"},
            {label: "${label}2"},
            {label: "${label}3"},
            {label: "${label}4"},
            {label: "${label}5"},
            {label: "${label}6"}
             ];\n\n`;

    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    if(arguments.filter) filterHTML = "filter = \"filter\"";

    if(arguments.multiple) multipleHTML = "multiple = \"multiple\"";

    if(arguments.checkbox) checkboxHMTL = "checkbox = \"checkbox\"";

    let htmlToAppend = "<p-listbox " + filterHTML + " " + optionsHTML + " " + labelHTML +  " " + multipleHTML + " " + checkboxHMTL + " " + disabledHTML + " " + modelHTML + " ></p-listbox>";

    let importPath = 'import {ListboxModule} from \'primeng/listbox\'; \n';

    updateHtmlFile(htmlToAppend);

    updateTsFile( optionsTS + modelTS + disabledTS );
    updateModule( importPath, 'ListboxModule');

}

function addDropdown(arguments){

    let disabledHTML = "";
    let disabledTS = "";
    let modelHTML = "";
    let modelTS = "";
    let placeholderHTML = "";
    let optionsHTML= "" ;
    let optionsTS = "";
    let editableHTML = "";
    let filterHTML = "";
    let labelHTML = "optionsLabel = \"label\"";
    if(arguments.disabled){
        disabledHTML = "[disabled] = \"" + arguments.disabled + "\"";
        if(arguments.disabled != "true" && arguments.disabled != "false"){
            disabledTS = arguments.disabled + ": boolean = false;\n\n" +
                "toggle" + capitalize(arguments.disabled) + " (){\n" +
                "this." + arguments.disabled + " = !this."+ arguments.disabled + ";\n" +
                "}\n\n";
        }
    }

    if(arguments.model){
        modelHTML = "[(ngModel)] =  \"" + arguments.model + "\"";
        modelTS = arguments.model + " : string;\n\n";
    }

    if(arguments.options) {
        let label = "label"
        if(arguments.label) label = arguments.label;
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +": " + capitalize(arguments.options) +
            `= [{label: "${label}1"},
            {label: "${label}2"},
            {label: "${label}3"},
            {label: "${label}4"},
            {label: "${label}5"},
            {label: "${label}6"}
             ];\n\n`;
    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    if(arguments.placeholder) placeholderHTML = "placeholder = \"" + arguments.placeholder + "\"";

    if(arguments.editable) editableHTML = "editable = \"" + arguments.editable + "\"";

    if(arguments.filter) filterHTML = "filter = \"" + arguments.filter + "\"";

    let htmlToAppend = "<p-dropdown " +filterHTML + " " + optionsHTML + " " + labelHTML +  " " + editableHTML +" " + disabledHTML + " " + modelHTML + " " + placeholderHTML +  " ></p-dropdown>";

    let importPath = 'import {DropdownModule} from \'primeng/dropdown\'; \n';

    updateHtmlFile(htmlToAppend);

    updateTsFile(  optionsTS + modelTS + disabledTS );
    updateModule( importPath, 'DropdownModule');
}

function addInputText(arguments) {

    let disabledHTML = "";
    let disabledTS = "";
    let modelHTML = "";
    let modelTS = "";
    let placeholderHTML = "";

    if (arguments.disabled) {
        disabledHTML = "[disabled] = \"" + arguments.disabled + "\"";
        if (arguments.disabled != "true" && arguments.disabled != "false") {
            disabledTS = arguments.disabled + ": boolean = false;\n\n" +
                "toggle" + capitalize(arguments.disabled) + " (){\n" +
                "this." + arguments.disabled + " = !this." + arguments.disabled + ";\n" +
                "}\n\n";
        }


        if (arguments.model) {
            modelHTML = "[(ngModel)] =  \"" + arguments.model + "\"";
            modelTS = arguments.model + " : string;\n\n";
        }

        if (arguments.placeholder) placeholderHTML = "placeholder = \"" + arguments.placeholder + "\"";

        let htmlToAppend = "<input type=\"text\" pInputText " + disabledHTML + " " + modelHTML + "" + placeholderHTML + " />";

        let importPath = 'import {InputTextModule} from \'primeng/inputtext\'; \n';

        updateHtmlFile(htmlToAppend);

        updateTsFile( modelTS + disabledTS);
        updateModule( importPath, 'InputTextModule');
    }

}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
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

        updateTsFile( 'display = false;');
        updateModule( importPath, 'SidebarModule');
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

function addImportPathToTsFile(importPath) {
    let moduleData = fs.readFileSync(filePath + '.component.ts'); //read existing contents into data
    let fd = fs.openSync(modulePath + '.component.ts', 'w+');
    let buffer = new Buffer(importPath);

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, moduleData, 0, moduleData.length, buffer.length); //append old data
    fs.close(fd);
}

function getArgumentsAsHtmlString() {
    let properties = '';
    process.argv.forEach(e => {
        if(!e.includes('--'))
            return;
        let argument = e.replace('--', '').split('=')[0];
        let value = e.replace('--', '').split('=')[1];
        properties += `[${argument}]="${value}" `
    });

    return properties;
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
