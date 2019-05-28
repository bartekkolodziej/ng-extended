#!/usr/bin/env node
const exec = require('child_process').exec;
const fs = require("fs");

let htmlArguments = '';
let tsArguments = '';
let angularComponentPath = '';
let angularModulePath = 'app';
let params = {};

module.exports = {
    addComponent: function (choices) {
        console.log(">>>choises", choices);

        params = choices;
        parsePropsToHtmlString();

        if (choices.action === 'generate')
            createNewAngularComponent();
        else {
            delegateRequest();
            angularComponentPath = params.angularComponent;
        }
    }
};


function parsePropsToHtmlString() {
    Object.keys(params.props).forEach(e => {
        if (e === 'ngModel') {
            htmlArguments += `[(ngModel})]="${params.props[e]}" `;
            tsArguments += `e = ${params.props[e]} \n`
        }
        else {
            htmlArguments += `[${e}]="${params.props[e]}" `;
            if (typeof e !== 'number' && typeof e !== 'boolean')
                tsArguments += `e = ${params.props[e]} \n`;
        }
    });

}

function createNewAngularComponent() {
    exec(`ng generate component ${params.angularComponent} --module=app.module`, () => {
        console.log('crated component', value);
        angularComponentPath = `${params.angularComponent}/${params.angularComponent}`;
        delegateRequest();
    });
}


function delegateRequest() {
    switch (params.primengComponent) {
        case "inputtext":
            addInputText();
            break;
        case "dropdown":
            addDropdown();
            break;
        case "listbox":
            addListbox();
            break;
        case "multiselect":
            addMultiselect();
            break;
        case "table":
            addTable();
            break;
        case "inputtextarea":
            addInputTextArea();
            break;
        case "inputswitch":
            addInputSwitch();
            break;
        case "splitbutton":
            addSplitButton();
            break;
        case "mask":
            addMask();
            break;
        case "keyfilter":
            addKeyFilter();
            break;
        case "rating":
            addRating();
            break;
        case "password":
            addPassword();
            break;
        case "inputgroup":
            addInputGroup();
            break;
        case "chips":
            addChips();
            break;
        case "colorpicker":
            addColorPicker();
            break;
        case "gmap":
            addGMap();
            break;
        case "steps":
            addSteps();
            break;
        case "button":
            addButton();
            break;
        case "slider":
            addSlider();
            break;
        case "radio-button":
            addRadioButton();
            break;
        case "scroll-panel":
            addScrollPanel();
            break;
        case "accordion":
            addAccordion();
            break;
        case "sidebar":
            addSidebar();
            break;
        case "dialog":
            addDialog();
            break;
        case "carousel":
            addCarousel();
            break;
        case "menubar":
            addMenuBar();
            break;
        case "uploadComponent":
            addUploadComponent();
            break;
        case "card":
            addCard();
            break;
        case "tabview":
            addTabview();
            break;
        case "fieldSet":
            addFieldSet();
            break;
    }
}

function updateHtmlFile(dataToAppend) {
    fs.appendFile(angularComponentPath + ".component.html", dataToAppend, err => {
        if (err) throw err;
    });
}

function updateModule(importPrimeNgPath, primeNgModuleName) {
    let moduleData = fs.readFileSync(angularModulePath + ".module.ts"); //read existing contents into data
    let fd = fs.openSync(angularModulePath + ".module.ts", "w+");
    let buffer = new Buffer(importPrimeNgPath);

    moduleData = new Buffer(
        moduleData
            .toString()
            .replace("imports: [", "imports: [\n" + primeNgModuleName + ",")
    );

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, moduleData, 0, moduleData.length, buffer.length); //append old data
    fs.close(fd, err => {
        if (err) throw err;
    });
}

function updateTsFile(dataToAppend) {
    let tsData = fs.readFileSync(angularComponentPath + ".component.ts"); //read existing contents into data
    let fd = fs.openSync(angularComponentPath + ".component.ts", "w+");

    if (tsData.toString().includes("constructor()"))
        tsData = new Buffer(
            tsData
                .toString()
                .replace("constructor()", "\n" + dataToAppend + "\n" + "constructor()")
        );
    else if (/export class.*{/.test(tsData.toString())) {
        let componentName = tsData.toString().match(/export class (.*) {/)[1];
        tsData = new Buffer(
            tsData
                .toString()
                .replace(
                    /export class.*{/,
                    "export class " + componentName + " { \n" + dataToAppend
                )
        );
    }

    fs.writeSync(fd, tsData, 0, tsData.length, 0); //append old data
    fs.close(fd, err => {
        if (err) throw err;
    });
}

function addImportPathToTsFile(importPath) {
    let moduleData = fs.readFileSync(angularComponentPath + ".component.ts"); //read existing contents into data
    let fd = fs.openSync(angularModulePath + ".component.ts", "w+");
    let buffer = new Buffer(importPath);

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, moduleData, 0, moduleData.length, buffer.length); //append old data
    fs.close(fd, err => {
        if (err) throw err;
    });
}

function addSteps() {
    let htmlToAppend = `<p-steps  [model]="items" ${htmlArguments}></p-steps>`;
    let tsToAppend = `
        items = [
            {label: 'Step 1'},
            {label: 'Step 2'},
            {label: 'Step 3'}
        ];`;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule("import {StepsModule} from 'primeng/steps'; \n", "StepsModule");
    updateModule("import {MenuItem} from 'primeng/api'; \n", "MenuItem");
}

function addGMap() {
    let htmlToAppend = `<p-gmap ${htmlArguments}></p-gmap>`;
    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule("import {GMapModule} from 'primeng/gmap'; \n", "GMapModule");
}

function addColorPicker() {
    let htmlToAppend = `<p-colorPicker ${htmlArguments} [(ngModel)]="color"></p-colorPicker>`;
    let tsToAppend = ` color: string;`;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(
        "import {ColorPickerModule} from 'primeng/colorpicker'; \n",
        "ColorPickerModule"
    );
}

function addChips() {
    let htmlToAppend = `<h3 class="first">Basic</h3><p-chips ${htmlArguments} [(ngModel)]="values"></p-chips>`;

    let tsToAppend = `values = ['abc', 'efg', 'hij'];`;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule("import {ChipsModule} from 'primeng/chips'; \n", "ChipsModule");
}

function addInputGroup() {
    let htmlToAppend = `<h3 class="first">Addons</h3>
    <div class="ui-g ui-fluid">
        <div class="ui-g-12 ui-md-4">
            <div class="ui-inputgroup">
                <span class="ui-inputgroup-addon"><i class="fa fa-user"></i></span>
                <input type="text" pInputText placeholder="Username">         
            </div>
        </div>`;

    updateTsFile(tsArguments);
    updateHtmlFile(htmlToAppend);
    updateModule(
        "import {InputGroupModule} from 'primeng/inputgroup'; \n",
        "InputGroupModule"
    );
}

function addInputSwitch() {
    let htmlToAppend =
        `<p-inputSwitch ${htmlArguments} ngModel="checked"></p-inputSwitch><br/>`;

    let importPath = "import {InputSwitchModule} from 'primeng/inputswitch'; \n";

    let tsToAppend = 'checked = true';

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(importPath, "InputSwitchModule");
}

function addSplitButton() {
    let htmlToAppend = `<p-splitButton ${htmlArguments} [model]="items"></p-splitButton><br/>`;

    let tsToAppend = `items = [
            {label: 'Update', icon: 'pi pi-refresh'},
            {label: 'Delete', icon: 'pi pi-times'},
            {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
            {label: 'Setup', icon: 'pi pi-cog'}
        ];`;

    let importPath = "import {SplitButtonModule} from 'primeng/splitbutton'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(importPath, "SplitButtonModule");
}

function addMask() {
    let htmlToAppend = `<p-inputMask ${htmlArguments} [(ngModel)]="val" mask="99-9999"></p-inputMask><br/>`;

    let importPath = "import {InputMaskModule} from 'primeng/inputmask'; \n";
    let tsToAppend = 'val: string;';

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(importPath, "InputMaskModule");
}

function addPassword() {
    let htmlToAppend =
        `<input type="password" [(ngModel)]="val" pPassword ${htmlArguments} /><br/>`;

    let tsToAppend = 'val: string;';
    let importPath = "import {PasswordModule} from 'primeng/password'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(importPath, "PasswordModule");
}

function addRating() {
    let htmlToAppend = `<p-rating [(ngModel)]="val" ${htmlArguments}></p-rating><br/>`;

    let tsToAppend = 'val = 12';
    let importPath = "import {RatingModule} from 'primeng/rating'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(importPath, "RatingModule");
}

function addKeyFilter() {
    let htmlToAppend =
        `<input type="text" ${htmlArguments} pKeyFilter="int" /><br/>`;

    let importPath = "import {KeyFilterModule} from 'primeng/keyfilter'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(importPath, "KeyFilterModule");
}

function addInputTextArea() {
    let htmlToAppend = `<textarea ${htmlArguments}></textarea><br/>`;

    let importPath = "import {InputTextareaModule} from 'primeng/inputtextarea'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(importPath, "InputTextareaModule");
}

function addTable() {
    let tsToAppend = `cols = [
            { field: 'brand', header: 'Brand' },
            { field: 'lastYearSale', header: 'Last year sale' },
            { field: 'thisYearSale', header: 'This year sale' },
            { field: 'lastYearProfit', header: 'Last year profit' }
            { field: 'thisYearProfit', header: 'This year profit' }
        ];
        values = [
            { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
            { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
            { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
            { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
            { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
            { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
            { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
            { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
            { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
            { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
        ];`;

    let htmlToAppend = `
    <p-table [columns]="cols" [value]="values" ${htmlArguments}>
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

    let importPath = "import {TableModule} from 'primeng/table'; \n";
    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(importPath, "TableModule");
}

function addMultiselect() {
    let htmlToAppend = `<p-multiselect ${htmlArguments} ></p-multiselect><br/>`;

    let importPath = "import {MultiSelectModule} from 'primeng/multiselect'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(importPath, "MultiSelectModule");
}

function addListbox() {
    let htmlToAppend = `<p-listbox ${htmlArguments} ></p-listbox><br/>`;

    let importPath = "import {ListboxModule} from 'primeng/listbox'; \n";

    updateHtmlFile(htmlToAppend);

    updateTsFile(tsArguments);
    updateModule(importPath, "ListboxModule");
}

function addDropdown() {
    let htmlToAppend = `<p-dropdown ${htmlArguments}></p-dropdown><br/>`;

    let importPath = "import {DropdownModule} from 'primeng/dropdown'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(importPath, "DropdownModule");
}

function addInputText() {
    let htmlToAppend = `<input type="text" pInputText ${htmlArguments} /><br/>`;
    let importPath = "import {InputTextModule} from 'primeng/inputtext'; \n";

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(importPath, "InputTextModule");
}

function addFieldSet() {
    let htmlToAppend = `<p-fieldset legend="Toggleable" [toggleable]="true" ${htmlArguments}>
    The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
    His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
    Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
    kind and benevolent to those who give respect, 
    but given to ruthless violence whenever anything stands against the good of the family.
</p-fieldset>`;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(
        "import {FieldsetModule} from 'primeng/fieldset';\n",
        "\t\t FieldsetModule"
    );
}

function addTabview() {
    let htmlToAppend = `<h3>Closable</h3>
    <p-tabView ${htmlArguments}>
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

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule(
        "import {TabViewModule} from 'primeng/tabview';\n",
        "\t\t TabViewModule"
    );
}

function addCard() {
    let htmlToAppend = `<p-card header="Advanced Card" [style]="{width: '360px'}" styleClass="ui-card-shadow" ${htmlArguments}>
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

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments);
    updateModule("import {CardModule} from 'primeng/card';\n", "\t\t CardModule");
}

function addButton() {
    let htmlToAppend = `<p-button  ${parameters} ></p-button>`;
    updateTsFile(tsArguments);
    updateHtmlFile(htmlToAppend);
    updateModule(
        "import {ButtonModule} from 'primeng/button'; \n",
        "ButtonModule"
    );
}

function addSlider() {
    let htmlToAppend = `<p-slider [min]="0" [max]="100" [(ngModel)]="selectedValue" ${htmlArguments}></p-slider>`;
    updateHtmlFile(htmlToAppend);
    let tsToAppend = `selectedValue = 123;`;
    updateTsFile(tsArguments + tsToAppend);
    updateModule(
        "import {SliderModule} from 'primeng/slider'; \n",
        "SliderModule"
    );
}

function addRadioButton() {
    let htmlToAppend = `<div class="ui-g" style="width:250px;margin-bottom:10px">
        <div class="ui-g-12"><p-radioButton value="val1" [(ngModel)]="selectedValue"  ${htmlArguments}></p-radioButton></div>
    </div>`;

    let tsToAppend = `
    selectedValue = '123;`;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(
        "import {RadioButtonModule} from 'primeng/radiobutton'; \n",
        "RadioButtonModule"
    );
}

function addScrollPanel() {
    let htmlToAppend = `<div class="ui-g-12 ui-md-4">
        <p-scrollPanel [style]="{width: '100%', height: '200px'}"   ${htmlArguments}>
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
    </div>`;

    updateHtmlFile(htmlToAppend);
    updateModule(
        "import {ScrollPanelModule} from 'primeng/scrollpanel'; \n",
        "ScrollPanelModule"
    );
}

function addAccordion() {
    let htmlToAppend = `<p-accordion [multiple]="true"  ${htmlArguments}>
        <p-accordionTab header="Godfather I">
            The story begins  as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
        </p-accordionTab>
        <p-accordionTab header="Godfather II">
            Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.
       </p-accordionTab>
        <p-accordionTab header="Godfather III">
            After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.
        </p-accordionTab>
    </p-accordion>`;

    updateHtmlFile(htmlToAppend);
    updateModule(
        "import {AccordionModule} from 'primeng/accordion'; \n",
        "AccordionModule"
    );
}

function addUploadComponent() {
    let htmlToAppend = `
    <h3 class="first">File upload</h3>
    <p-fileUpload url="./upload.php" (onUpload)="onUpload($event)" ${htmlArguments}>
        <ng-template pTemplate="content">
            <ul *ngIf="uploadedFiles.length">
                <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
            </ul>
        </ng-template>
    </p-fileUpload>`;

    let tsToAppend = `
    uploadedFiles: any[] = [];


    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    `;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(
        "import {FileUploadModule} from 'primeng/fileupload'; \n",
        "FileUploadModule"
    );
}

function addMenuBar() {
    let htmlToAppend = `
    <p-menubar [model]="menubarItems" ${htmlArguments}>
        <div>
            <input type="text" pInputText placeholder="Search">
            <button pButton style="margin-left:.25em">Logout</button>
        </div>
    </p-menubar>`;

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

    addImportPathToTsFile("import {MenuItem} from 'primeng/api';\n");
    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + tsToAppend);
    updateModule(
        "import {MenubarModule} from 'primeng/menubar';\n",
        "MenubarModule"
    );
}

function addCarousel() {
    let htmlToAppend = `
    <p-carousel headerText="Cars" [value]="carouselItems" ${htmlArguments} >
        <ng-template let-item pTemplate="item">
        <div style="padding: 32px">
            {{item.label}}:{{item.value}}
        </div>
        </ng-template>
    </p-carousel>`;

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
    updateTsFile(tsArguments + tsToAppend);
    updateModule(
        "import {CarouselModule} from 'primeng/carousel'; \n",
        "CarouselModule"
    );
}

function addDialog() {
    let htmlToAppend = `\n<p-dialog header="Godfather I" 
                  [(visible)]="displayDialog" 
                  ${htmlArguments}>
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
    updateTsFile(tsArguments + "displayDialog = false;");
    updateModule(
        "import {DialogModule} from 'primeng/dialog'; \n",
        "DialogModule"
    );
}

function addSidebar() {
    let htmlToAppend = `\n<p-sidebar [(visible)]="displaySidebar" ${htmlArguments}>
            Content
        </p-sidebar>
        <button type="text" (click)="displaySidebar = true">Show sidebar</button>\n`;

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsArguments + "displaySidebar = false;");
    updateModule(
        "import {SidebarModule} from 'primeng/sidebar'; \n",
        "SidebarModule"
    );
}
