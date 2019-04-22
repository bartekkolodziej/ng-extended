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
}

function addButton(){

let htmlToAppend=`<p-button ${argumentsAsHtml} ></p-button>`

updateHtmlFile(htmlToAppend);
updateModule('import {ButtonModule} from \'primeng/button\'; \n', 'ButtonModule');


  }

  function addSlider(){
    let htmlToAppend=`<p-slider [ngModel]="val" [min]="0" [max]="100" ${argumentsAsHtml}></p-slider>`
    updateHtmlFile(htmlToAppend);
    updateModule('import {SliderModule} from \'primeng/slider\'; \n', 'SliderModule');
    
}

function addRadioButton(){
    let htmlToAppend=`<div class="ui-g" style="width:250px;margin-bottom:10px">
    <div class="ui-g-12"><p-radioButton [model]="radioItems"  ${argumentsAsHtml}></p-radioButton></div>
</div>`

let tsToAppend = `
radioItems: Item[] = [
        {
            value: 'Option 1'
        },
        {
            value: 'Option 2'
        },
        {
            value: 'Option 3'
        },
    ]`

    updateHtmlFile(htmlToAppend);
    updateTsFile(tsToAppend);
    updateModule('import {RadioButtonModule} from \'primeng/radiobutton\'; \n', 'RadioButtonModule');
}

function addScrollPanel(){

    let htmlToAppend =`<div class="ui-g-12 ui-md-4">
    <p-scrollPanel [style]="{width: '100%', height: '200px'}" styleClass="custombar1"  ${argumentsAsHtml}>
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
