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
    case 'table':
        addTable(getArguments());
        break;
}





//**********************************************************************************************************************
//**********************************************************************************************************************
//
//        Bartosz Wróblewski:
//
//

function capitalize (s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function addTable(arguments){
    let columnsHTML="";
    let columnsTS = "";
    let valueHTML = "";
    let valueTS = "";
    let htmlToAppend = "";

    if(!arguments.columns || !arguments.value){
        htmlToAppend = `
<p-table >
    <ng-template pTemplate="header">
        <tr>
            <th>Header1</th>
            <th>Header2</th>
            <th>Header3</th>
            <th>Header4</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" >
        <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
        </tr>
        <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
        </tr>
        <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
        </tr>
        <tr>
            <td>value1</td>
            <td>value2</td>
            <td>value3</td>
            <td>value4</td>
        </tr>
    </ng-template>
</p-table>
`;
    }
    else {
        if (arguments.columns) {
            columnsHTML = arguments.columns;
            columnsTS = `
            ${arguments.columns} = [
                {field: "field1", header: "Header1"},
                {field: "field2", header: "Header2"},
                {field: "field3", header: "Header3"},
                {field: "field4", header: "Header4"}
            ];
        `;
        }

        if (arguments.value) {
            valueHTML = arguments.value;
            valueTS = `
            ${arguments.value} = [
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"}
            ]
        `;
        }

        htmlToAppend = `
<p-table [columns]="${columnsHTML}" [value]="${valueHTML}">
    <ng-template pTemplate="header" let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{col.header}}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr>
            <td *ngFor="let col of columns">
                    {{rowData[col.field]}}
            </td>
        </tr>
    </ng-template>
</p-table>
`;
    }
    let importPath = 'import {TableModule} from \'primeng/table\'; \n';
    updateHtmlFile(htmlToAppend);
    updateTsFile( columnsTS + valueTS );
    updateModule( importPath, 'TableModule');
}

function addMultiselect(arguments){

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
        let label = "label"
        if(arguments.label) label = arguments.label;
        let item="item";
        if(arguments.model) item = arguments.model;
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +
            `= [{${label}: "${item}1"},
            {${label}: "${item}2"},
            {${label}: "${item}3"},
            {${label}: "${item}4"},
            {${label}: "${item}5"},
            {${label}: "${item}6"}
             ];\n\n`;
    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    let htmlToAppend = "<p-multiselect " + optionsHTML + " " + labelHTML + " " + disabledHTML + " " + modelHTML + " ></p-multiselect><br/>";

    let importPath = 'import {MultiSelectModule} from \'primeng/multiselect\'; \n';

    updateHtmlFile(htmlToAppend);
    updateTsFile( optionsTS + modelTS + disabledTS );
    updateModule( importPath, 'MultiSelectModule');


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
        modelTS = arguments.model + " : string = '';\n\n";
    }

    if(arguments.options) {
        let label = "label"
        if(arguments.label) label = arguments.label;
        let item="item";
        if(arguments.model) item = arguments.model;
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +
            `= [{${label}: "${item}1"},
            {${label}: "${item}2"},
            {${label}: "${item}3"},
            {${label}: "${item}4"},
            {${label}: "${item}5"},
            {${label}: "${item}6"}
             ];\n\n`;
    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    if(arguments.filter) filterHTML = "filter = \"filter\"";

    if(arguments.multiple) multipleHTML = "multiple = \"multiple\"";

    if(arguments.checkbox) checkboxHMTL = "checkbox = \"checkbox\"";

    let htmlToAppend = "<p-listbox " + filterHTML + " " + optionsHTML + " " + labelHTML +  " " + multipleHTML + " " + checkboxHMTL + " " + disabledHTML + " " + modelHTML + " ></p-listbox><br/>";

    console.log(htmlToAppend);

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
        modelHTML = "[(ngModel)] = \"" + arguments.model + "\"";
        modelTS = arguments.model + " : string;\n\n";
    }

    if(arguments.options) {
        let label = "label"
        if(arguments.label) label = arguments.label;
        let item="item";
        if(arguments.model) item = arguments.model;
        optionsHTML = "[options] = \"" + arguments.options + "\"";
        optionsTS = arguments.options +
            `= [{${label}: "${item}1"},
            {${label}: "${item}2"},
            {${label}: "${item}3"},
            {${label}: "${item}4"},
            {${label}: "${item}5"},
            {${label}: "${item}6"}
             ];\n\n`;
    }

    if(arguments.label) labelHTML =  "optionsLabel = \"" + arguments.label + "\"";

    if(arguments.placeholder) placeholderHTML = "placeholder = \"" + arguments.placeholder + "\"";

    if(arguments.editable) editableHTML = "editable = \"" + arguments.editable + "\"";

    if(arguments.filter) filterHTML = "filter = \"" + arguments.filter + "\"";

    let htmlToAppend = "<p-dropdown " +filterHTML + " " + optionsHTML + " " + labelHTML +  " " + editableHTML +" " + disabledHTML + " " + modelHTML + " " + placeholderHTML +  " ></p-dropdown><br/>";

    let importPath = 'import {DropdownModule} from \'primeng/dropdown\'; \n';

    updateHtmlFile(htmlToAppend);

    updateTsFile(  optionsTS + modelTS + disabledTS );
    updateModule( importPath, 'DropdownModule');
}

function addInputText(arguments) {

    console.log("input text");
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
                "}\n";
        }
    }

        if (arguments.model) {
            modelHTML = "[(ngModel)] = \"" + arguments.model + "\"";
            modelTS = arguments.model + " : string;";
        }

        if (arguments.placeholder) placeholderHTML = "placeholder = \"" + arguments.placeholder + "\"";

        let htmlToAppend = "<input type=\"text\" pInputText " + disabledHTML + " " + modelHTML + " " + placeholderHTML + " /><br/>";

        let importPath = 'import {InputTextModule} from \'primeng/inputtext\'; \n';
        console.log("htmlToAppend:");
        console.log(htmlToAppend);

        updateHtmlFile(htmlToAppend);

        updateTsFile( modelTS + disabledTS);
        updateModule( importPath, 'InputTextModule');


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
    fs.close(fd, err => {
        if (err) throw err
    });
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
    fs.close(fd, err => {
        if (err) throw err
    });
}

function addImportPathToTsFile(importPath) {
    let moduleData = fs.readFileSync(filePath + '.component.ts'); //read existing contents into data
    let fd = fs.openSync(modulePath + '.component.ts', 'w+');
    let buffer = new Buffer(importPath);

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, moduleData, 0, moduleData.length, buffer.length); //append old data
    fs.close(fd, err => {
        if (err) throw err
    });
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
