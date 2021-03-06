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
const argumentsAsHtml = getArgumentsAsHtmlString();
const parameters=parseParametersToString();

switch (elementToAdd) {
    case 'sidebar':
        addSidebar();
        break;
    case 'dialog':
        addDialog();
        break;
    case 'carousel':
        addCarousel();
        break;
    case 'menubar':
        addMenuBar();
        break;
    case 'upload':
        addUploadComponent();
        break;
    case 'card':
        addCard();
        break;
    case 'tabview':
        addTabview();
        break;
    case 'fieldset':
        addFieldSet();
        break;
    case 'button':
        addButton();
        break;
    case 'slider':
        addSlider();
        break;
    case 'radio-button':
        addRadioButton();
        break;
    case 'scroll-panel':
        addScrollPanel();
        break;
    case 'accordion':
        addAccordion();
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

function addFieldSet() {
    let htmlToAppend = `<p-fieldset legend="Toggleable" [toggleable]="true" ${argumentsAsHtml}>
    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
    His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
    Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
    kind and benevolent to those who give respect, 
    but given to ruthless violence whenever anything stands against the good of the family.
</p-fieldset>`;
    let tsToAppend = ``;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule("import {FieldsetModule} from 'primeng/fieldset';\n", '\t\t FieldsetModule');
}

function addTabview() {
    let htmlToAppend = `<h3>Closable</h3>
    <p-tabView ${argumentsAsHtml}>
        <p-tabPanel header="Godfather I" [selected]="true">
            The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
        </p-tabPanel>
        <p-tabPanel header="Godfather II" [closable]="true">
            Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
        </p-tabPanel>
        <p-tabPanel header="Godfather III" [closable]="true">
            After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
        </p-tabPanel>
    </p-tabView>`;
    let tsToAppend = ``;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule("import {TabViewModule} from 'primeng/tabview';\n", '\t\t TabViewModule');

}

function addCard() {
    let htmlToAppend = `<p-card header="Advanced Card" subheader="Subheader" [style]="{width: '360px'}" styleClass="ui-card-shadow" ${argumentsAsHtml}>
    <p-header>
        <img src="Card" src="https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">
    </p-header>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
    <p-footer>
        <button pButton type="button" label="Save" icon="pi pi-check" style="margin-right: .25em"></button>
        <button pButton type="button" label="Cancel" icon="pi pi-times" class="ui-button-secondary"></button>
    </p-footer>
</p-card>`;
    let tsToAppend = ``;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule("import {CardModule} from 'primeng/card';\n", '\t\t CardModule');
}

function addButton(){

    let htmlToAppend=`<p-button  ${parameters} ></p-button>`
    updateHtmlFile(htmlToAppend);
    updateModule('import {ButtonModule} from \'primeng/button\'; \n', 'ButtonModule');


}

function addSlider(){
    let htmlToAppend=`<h3 class="first">Basic: {{value1}}</h3><p-slider [min]="0" [max]="100" ${argumentsAsHtml}></p-slider>`
    updateHtmlFile(htmlToAppend);
    let tsToAppend = `selectedValue: string = 'value1';`
    updateTsFile(tsToAppend);
    updateModule('import {SliderModule} from \'primeng/slider\'; \n', 'SliderModule');

}

function addRadioButton(){
    let htmlToAppend=`<div class="ui-g" style="width:250px;margin-bottom:10px">
        <div class="ui-g-12"><p-radioButton value="val1"   ${parameters}></p-radioButton></div>
    </div>`

    let tsToAppend = `
    selectedValue: string = 'val1';`

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {RadioButtonModule} from \'primeng/radiobutton\'; \n', 'RadioButtonModule');
}

function addScrollPanel(){

    let htmlToAppend =`<div class="ui-g-12 ui-md-4">
        <p-scrollPanel [style]="{width: '100%', height: '200px'}"   ${argumentsAsHtml}>
            <div style="padding:1em;line-height:1.5">
                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved
                son Michael has just come home from the war, but does not intend to become part of his father's business.
                Through Michael's life the nature of the family business becomes clear. The business of the family is just
                like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence
                whenever anything stands against the good of the family. The story begins as Don Vito Corleone, the head
                of a New York Mafia family, oversees his daughter's wedding. His beloved son Michael has just come home from
                the war, but does not intend to become part of his father's business. Through Michael's life the nature of
                the family business becomes clear. The business of the family is just like the head of the family, kind and
                benevolent to those who give respect, but given to ruthless violence whenever anything stands against the
                good of the family.
            </div>
        </p-scrollPanel>
    </div>`

    let tsToAppend = ``;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {ScrollPanelModule} from \'primeng/scrollpanel\'; \n', 'ScrollPanelModule');
}

function addAccordion(){

    let htmlToAppend =`<p-accordion [multiple]="true"  ${argumentsAsHtml}>
        <p-accordionTab header="Godfather I">
            The story begins  as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
        </p-accordionTab>
        <p-accordionTab header="Godfather II">
            Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
       </p-accordionTab>
        <p-accordionTab header="Godfather III">
            After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
        </p-accordionTab>
    </p-accordion>`

    let tsToAppend = ``;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {AccordionModule} from \'primeng/accordion\'; \n', 'AccordionModule');

}

function addUploadComponent() {

    let htmlToAppend = `
    <h3 class="first">File uplo${argumentsAsHtml}ad</h3>
    <p-fileUpload url="./upload.php" (onUpload)="onUpload($event)"
            multiple="multiple"  maxFileSize="1000000" ${argumentsAsHtml}>
        <ng-template pTemplate="content">
            <ul *ngIf="uploadedFiles.length">
                <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
            </ul>
        </ng-template>
    </p-fileUpload>`

    let tsToAppend = `
    uploadedFiles: any[] = [];


    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    `;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {FileUploadModule} from \'primeng/fileupload\'; \n', 'FileUploadModule');

}

function addMenuBar() {
    let htmlToAppend = `
    <p-menubar [model]="menubarItems" ${argumentsAsHtml}>
        <div>
            <input type="text" pInputText placeholder="Search">
            <button pButton style="margin-left:.25em">Logout</button>
        </div>
    </p-menubar>`

    let tsToAppend = `
    menubarItems: MenuItem[] = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {separator:true},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
                ]
            },
            {
                label: 'Help',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search', 
                        icon: 'pi pi-fw pi-search', 
                        items: [
                            {
                                label: 'Text', 
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                    ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {label: 'Save', icon: 'pi pi-fw pi-save'},
                            {label: 'Update', icon: 'pi pi-fw pi-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                        ]
                    }
                ]
            },
            {separator:true},
            {
                label: 'Quit', icon: 'pi pi-fw pi-times'
            }
        ];
        `;

    addImportPathToTsFile('import {MenuItem} from \'primeng/api\';\n');
    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {MenubarModule} from \'primeng/menubar\';\n', 'MenubarModule');
}

function addCarousel() {
    let htmlToAppend = `
    <p-carousel headerText="Cars" [value]="carouselItems" ${argumentsAsHtml} >
        <ng-template let-item pTemplate="item">
        <div style="padding: 32px">
            {{item.label}}:{{item.value}}
        </div>
        </ng-template>
    </p-carousel>`

    let tsToAppend = `
    carouselItems = [
            {label: 'Audi', value: 'Black'},
            {label: 'BMW', value: 'White'},
            {label: 'Honda', value: 'Blue'},
            {label: 'Renault', value: 'White'},
            {label: 'VW', value: 'Red'},
            {label: 'Jaguar', value: 'Blue'},
            {label: 'Ford', value: 'Yellow'},
            {label: 'Mercedes', value: 'Brown'},
            {label: 'Ford', value: 'Black'}
        ];
        `;
    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {CarouselModule} from \'primeng/carousel\'; \n', 'CarouselModule');
}

function addDialog() {
    let htmlToAppend =
        `\n<p-dialog header="Godfather I" 
                  [(visible)]="displayDialog" 
                  [modal]="true" 
                  [maximizable]="true" 
                  [baseZIndex]="10000"
                  ${argumentsAsHtml}>
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

    updateHtmlFile(htmlToAppend);
    updateTsFile('displayDialog = false;');
    updateModule('import {DialogModule} from \'primeng/dialog\'; \n', 'DialogModule');

}

function addSidebar() {
    let htmlToAppend =
        `\n<p-sidebar [(visible)]="displaySidebar" 
                    position="left"
                    ${argumentsAsHtml}>
            Content
        </p-sidebar>
        <button type="text" (click)="displaySidebar = true">Show sidebar</button>\n`;

    updateHtmlFile(htmlToAppend);
    updateTsFile('displaySidebar = false;');
    updateModule('import {SidebarModule} from \'primeng/sidebar\'; \n', 'SidebarModule');
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
        if (!e.includes('--'))
            return;
        let argument = e.replace('--', '').split('=')[0];
        let value = e.replace('--', '').split('=')[1];
        if(argument=='ngModel')
            properties += `[(${argument})]="${value}" `
        else
            properties += `[${argument}]="${value}" `
    });

    return properties;
}

function parseParametersToString() {
    let properties = '';
    process.argv.forEach(e => {
        if (!e.includes('--'))
            return;
        let argument = e.replace('--', '').split('=')[0];
        let value = e.replace('--', '').split('=')[1];
        if(argument=='ngModel')
            properties += `[(${argument})]="${value}" `
        else
            properties += `${argument}="${value}" `
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
