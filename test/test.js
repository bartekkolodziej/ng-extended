const assert = require('assert');
const fs = require('fs');
const exec = require('child_process').exec;


describe('nge-add', function () {


    describe('button', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test button --label='ok' --styleClass='ui-button-warning'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-button>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test button --label='ok' --styleClass='ui-button-warning'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('ButtonModule'), true);
                done();
            });
        });
    });

    describe('radio-button', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test radio-button --label='yes' --value='val1' --ngModel='selectedValue'", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('selectedValue'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test radio-button --label='yes' --value='val1' --ngModel='selectedValue'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-radioButton>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test radio-button --label='yes' --value='val1' --ngModel='selectedValue'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('RadioButtonModule'), true);
                done();
            });
        });
    });

    describe('slider', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test slider --ngModel='value1' --style='{'width':'14em'}'", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('selectedValue'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test slider --ngModel='value1' --style='{'width':'14em'}'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-slider>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test slider --ngModel='value1' --style='{'width':'14em'}'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('SliderModule'), true);
                done();
            });
        });
    });


    describe('scroll-panel', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test scroll-panel --styleClass='ui-scrollpanel-bar'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-scrollPanel>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test scroll-panel --styleClass='ui-scrollpanel-bar'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('ScrollPanelModule'), true);
                done();
            });
        });
    });

    describe('accordion', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test accordion --styleClass='ui-scrollpanel'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-accordion>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test accordion --styleClass='ui-scrollpanel'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('AccordionModule'), true);
                done();
            });
        });
    });

    describe('sidebar', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test sidebar --position='right'", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('displaySidebar'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test sidebar --position='right'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-sidebar>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test sidebar --position='right'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('SidebarModule'), true);
                done();
            });
        });
    });

    describe('dialog', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dialog", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('DialogModule'), true);
                done();
            });
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dialog", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('displayDialog'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dialog", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-dialog>'), true);
                done();
            });
        });
    });

    describe('carousel', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test carousel --headerText='testText'", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('carouselItems'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test carousel --headerText='testText'", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-carousel>'), true);
                assert.equal(htmlData.toString().includes('testText'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test carousel --headerText='testText'", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('CarouselModule'), true);
                done();
            });
        });
    });


    describe('menubar', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test menubar ", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('menubarItems'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test menubar ", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-menubar>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test menubar ", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('MenubarModule'), true);
                done();
            });
        });
    });

    describe('upload', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test upload", function callback(error, stdout, stderr) {
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                assert.equal(tsData.toString().includes('uploadedFiles: any[] = [];'), true);
                done();
            });
        });

        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test upload", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-fileUpload>'), true);
                done();
            });
        });

        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test upload", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('FileUploadModule'), true);
                done();
            });
        });
    });

    describe('fieldset', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });
        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test fieldset", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-fieldset>'), true);
                done();
            });
        });
        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test fieldset", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('FieldsetModule'), true);
                done();
            });
        });
    });

    describe('tabview', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });
        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test tabview", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-tabView>'), true);
                done();
            });
        });
        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test tabview", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('TabViewModule'), true);
                done();
            });
        });
    });
    describe('card', function () {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });
        it('should add content to given component.html', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test card", function callback(error, stdout, stderr) {
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data
                assert.equal(htmlData.toString().includes('</p-card>'), true);
                done();
            });
        });
        it('should add content to given module.ts', function (done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test card", function callback(error, stdout, stderr) {
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                assert.equal(moduleData.toString().includes('CardModule'), true);
                done();
            });
        });
    });

    describe('inputtext1', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test inputtext --model=text --placeholder=type_here " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('InputTextModule'), true);

                done();
            });
        });
    });


    describe('inputtext2', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test inputtext --model=text --placeholder=type_here " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data


                assert.equal(tsData.toString().includes('text'), true);

                done();
            });
        });
    });


    describe('inputtext3', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test inputtext --model=text --placeholder=type_here " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(htmlData.toString().includes('<input type="text" pInputText  [(ngModel)] = "text" placeholder = "type_here" />'), true);

                done();
            });
        });
    });

    describe('dropdown1', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dropdown --options=myopt --label=mylabel --editable=true --model=mymodel --placeholder=placeholder" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('DropdownModule'), true);

                done();
            });
        });
    });

    describe('dropdown2', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dropdown --options=myopt --label=mylabel --editable=true --model=mymodel --placeholder=placeholder" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data


                assert.equal(tsData.toString().includes('myopt'), true);

                done();
            });
        });
    });

    describe('dropdown3', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test dropdown --options=myopt --label=mylabel --editable=true --model=mymodel --placeholder=placeholder" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(htmlData.toString().includes('<p-dropdown  [options] = "myopt" optionsLabel = "mylabel" editable = "true"  [(ngModel)] = "mymodel" placeholder = "placeholder" ></p-dropdown>'), true);

                done();
            });
        });
    });

    describe('listbox1', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test listbox --options=myopt --label=mylabel --model=mymodel --multiple=multiple --checkbox=checkbox" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('ListboxModule'), true);

                done();
            });
        });
    });

    describe('listbox2', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test listbox --options=myopt --label=mylabel --model=mymodel --multiple=multiple --checkbox=checkbox" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes('myopt'), true);

                done();
            });
        });
    });

    describe('listbox3', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test listbox --options=myopt --label=mylabel --model=mymodel --multiple=multiple --checkbox=checkbox" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes('mylabel'), true);

                done();
            });
        });
    });

    describe('listbox4', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test listbox --options=myopt --label=mylabel --model=mymodel --multiple=multiple --checkbox=checkbox" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes('mymodel'), true);

                done();
            });
        });
    });

    describe('listbox5', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test listbox --options=myopt --label=mylabel --model=mymodel --multiple=multiple --checkbox=checkbox" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(htmlData.toString().includes('<p-listbox  [options] = "myopt" optionsLabel = "mylabel" multiple = "multiple" checkbox = "checkbox"  [(ngModel)] =  "mymodel" ></p-listbox>'), true);

                done();
            });
        });
    });

    describe('multiselect1', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test multiselect --options=myopt --label=mylabel --model=mymodel " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(htmlData.toString().includes('<p-multiselect [options] = "myopt" optionsLabel = "mylabel"  [(ngModel)] =  "mymodel" ></p-multiselect>'), true);

                done();
            });
        });
    });

    describe('multiselect2', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test multiselect --options=myopt --label=mylabel --model=mymodel " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes('myopt'), true);

                done();
            });
        });
    });

    describe('multiselect3', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test multiselect --options=myopt --label=mylabel --model=mymodel " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes('mylabel'), true);

                done();
            });
        });
    });

    describe('multiselect4', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test multiselect --options=myopt --label=mylabel --model=mymodel " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes('mymodel'), true);

                done();
            });
        });
    });

    describe('multiselect5', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test multiselect --options=myopt --label=mylabel --model=mymodel " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(htmlData.toString().includes('<p-multiselect [options] = "myopt" optionsLabel = "mylabel"  [(ngModel)] =  "mymodel" ></p-multiselect>'), true);

                done();
            });
        });
    });


    describe('table11', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('TableModule'), true);

                done();
            });
        });
    });

    describe('table12', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table " , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

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

    describe('table21', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table --columns=mycols --value=myval" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('TableModule'), true);

                done();
            });
        });
    });

    describe('table22', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table --columns=mycols --value=myval" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(tsData.toString().includes(`
            mycols = [
                {field: "field1", header: "Header1"},
                {field: "field2", header: "Header2"},
                {field: "field3", header: "Header3"},
                {field: "field4", header: "Header4"}
            ];
        `), true);

                done();
            });
        });
    });

    describe('table23', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table --columns=mycols --value=myval" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data


                assert.equal(tsData.toString().includes(`
            myval = [
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"},
                {field1: "value1", field2: "value2", field3: "value3", field4: "value4"}
            ]
        `), true);

                done();
            });
        });
    });

    describe('table24', function() {
        afterEach(function () {
            exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {
            })
        });

        it('should add content to given component.ts, component.html, and module.ts', function(done) {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test table --columns=mycols --value=myval" , function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data


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


