const assert = require('assert');
const fs = require('fs');
const exec = require('child_process').exec;


describe('nge-add', function () {

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

});


