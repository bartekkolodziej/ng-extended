const assert = require('assert');
const fs = require('fs');
const exec = require('child_process').exec;


describe('nge-add', function() {

    afterEach(function() {
        exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {})
    });

    describe('sidebar', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test sidebar --position='right'", function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('SidebarModule'), true);
                assert.equal(tsData.toString().includes('display'), true);
                assert.equal(htmlData.toString().includes('</p-sidebar>'), true);

                done();
            });
        });
    });

    describe('inputtext', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test inputtext --model=text --placeholder=type_here " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('InputTextModule'), true);
                assert.equal(tsData.toString().includes('text'), true);
                ///////////////////////////////////////////////////////<input type="text" pInputText  [(ngModel)] = "text" placeholder = "type_here" />
                assert.equal(htmlData.toString().includes('<input type="text" pInputText  [(ngModel)] = "text" placeholder = "type_here" />'), true);

                done();
            });
        });
    });

    describe('dropdown', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dropdown --options=myopt --label=mylabel --editable=true --model=mymodel --placeholder=placeholder" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('DropdownModule'), true);
                assert.equal(tsData.toString().includes('myopt'), true);
                assert.equal(htmlData.toString().includes('<p-dropdown  [options] = "myopt" optionsLabel = "mylabel" editable = "true"  [(ngModel)] = "mymodel" placeholder = "placeholder" ></p-dropdown>'), true);

                done();
            });
        });
    });


    describe('listbox', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test listbox --options=myopt --label=mylabel --model=mymodel --multiple=multiple --checkbox=checkbox" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('ListboxModule'), true);
                assert.equal(tsData.toString().includes('myopt'), true);
                assert.equal(tsData.toString().includes('mylabel'), true);
                assert.equal(tsData.toString().includes('mymodel'), true);
                assert.equal(htmlData.toString().includes('<p-listbox  [options] = "myopt" optionsLabel = "mylabel" multiple = "multiple" checkbox = "checkbox"  [(ngModel)] =  "mymodel" ></p-listbox>'), true);

                done();
            });
        });
    });

    describe('multiselect', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test multiselect --options=myopt --label=mylabel --model=mymodel " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('MultiselectModule'), true);
                assert.equal(tsData.toString().includes('myopt'), true);
                assert.equal(tsData.toString().includes('mylabel'), true);
                assert.equal(tsData.toString().includes('mymodel'), true);
                ///////////////////////////////////////////////////////<p-multiselect [options] = "myopt" optionsLabel = "mylabel"  [(ngModel)] =  "mymodel" ></p-multiselect>
                assert.equal(htmlData.toString().includes('<p-multiselect [options] = "myopt" optionsLabel = "mylabel"  [(ngModel)] =  "mymodel" ></p-multiselect>'), true);

                done();
            });
        });
    });

    describe('table1', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('TableModule'), true);
                assert.equal(htmlData.toString().includes(`<p-table >
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
</p-table>`), true);

                done();
            });
        });
    });

    describe('table2', function() {
        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table --columns=mycols --value=myval" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('TableModule'), true);
                assert.equal(tsData.toString().includes(`
            mycols = [
                {field: "field1", header: "Header1"},
                {field: "field2", header: "Header2"},
                {field: "field3", header: "Header3"},
                {field: "field4", header: "Header4"}
            ];
        `), true);
                assert.equal(tsData.toString().includes(`
            myval = [
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"}
            ]
        `), true);
                assert.equal(htmlData.toString().includes(`
<p-table [columns]="mycols" [value]="myval">
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
`), true);

                done();
            });
        });
    });

});
