const assert = require('assert');
const fs = require('fs');
const exec = require('child_process').exec;



describe('nge-add', function() {
    describe('sidebar', function() {
        it('should add content to given component.ts, component.html, and module.ts', function() {
            exec("nge-add ./angular-app/src/app/test-components/test ./angular-app/src/app/test-components/test sidebar --position='right'", function callback(error, stdout, stderr){
                let moduleData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.module.ts'); //read existing contents into data
                let tsData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.ts'); //read existing contents into data
                let htmlData = fs.readFileSync('./angular-app/src/app/test-components/test' + '.component.html'); //read existing contents into data

                assert.equal(moduleData.toString().includes('SidebarModule'), true);
                assert.equal(tsData.toString().includes('displaySidebar'), true);
                assert.equal(htmlData.toString().includes('</p-sidebar>'), true);

                exec("git checkout -- ./angular-app/src/app/test-components", (err, stdout, stderr) => {})
            });
        });
    });
});


function getModuleData() {

}