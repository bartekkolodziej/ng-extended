#!/usr/bin/env node
const process = require("process");
const addModule = require("./add");
const menu = require("./cli");

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const components = {
    inputtext: ["disabled", "model", "placeholder"],
    table: ["columns", "value"],
    multiselect: ["disabled", "model", "options", "label"],
    listbox: [
        "disabled",
        "model",
        "checkbox",
        "options",
        "filter",
        "label",
        "multiple"
    ],
    dropdown: [
        "disabled",
        "model",
        "placeholder",
        "options",
        "filter",
        "label",
        "editable"
    ],
    inputtextarea: ["disabled", "model", "autoResize", "cols", "rows"],
    keyfilter: ["validate", "model", "placeholder", "filter"],
    rating: ["disabled", "model", "stars", "cancel", "readonly"],
    password: [
        "disabled",
        "model",
        "weakLabel",
        "mediumLabel",
        "strongLabel",
        "showPassword"
    ],
    mask: ["disabled", "model", "mask", "slotCharacter", "characterPattern"],
    splitbutton: ["disabled", "model", "label"],
    inputswitch: ["disabled", "model", "placeholder"],
    button: [
        "type",
        "label",
        "icon",
        "disabled",
        "style",
        "styleClass",
        "onClick"
    ],
    slider: ["animate", "disabled", "min", "max", "step", "style", "styleClass"],
    "radio-button": ["name", "value", "label", "disabled", "style", "styleClass"],
    "scroll-panel": ["style", "styleClass"],
    accordion: ["multiple", "style", "styleClass", "activeIndex"],
    inputgroup: [],
    chips: ["field", "max", "disabled", "style", "styleClass", "inputStyle"],
    colorpicker: ["style", "styleClass", "inline", "disabled", "onChange"],
    gmap: [
        "options",
        "overlays",
        "style",
        "styleClass",
        "onMapClick",
        "onMapDragEnd"
    ],
    steps: ["model", "activeIndex", "readonly", "style", "styleClass"]
};

let choice = {
    action: '',
    angularComponent: '',
    primengComponent: "",
    props: {}
};

consoleMenu();

function generateOptions(optionsArr) {
    return optionsArr
        .sort()
        .map((title, hotkey) => ({hotkey: `${hotkey + 1}`, title}));
}

function consoleMenu() {
    const options = [{
        hotkey: '0',
        title: 'Generate new angular component',
        selected: true,
    },
        {
            hotkey: '1',
            title: 'Edit existing component',
        }];

    menu([...options, {separator: true}], {
        header: "What do you want to do?",
        border: true,
        pageSize: 5
    }).then(item => {
        if (item) {
            item.hotkey === '0' ? choice.action = 'generate' : choice.action = 'edit';
            typeAngularComponentName();
        } else {
            console.log("You cancelled the menu.");
        }
    });
}

function typeAngularComponentName() {
    rl.question(`Enter component name: `, value => {
        choice.angularComponent = value;
        rl.pause();
        selectPrimengComponent(true);
    });
}

function selectPrimengComponent(skip) { //skip parameter is workaround, readline gets buggy otherwise
    const options = generateOptions(Object.keys(components));

    menu([...options, {separator: true}], {
        header: "Select primeNG component",
        border: true,
        pageSize: 5
    }).then(item => {
        if(skip){
            selectPrimengComponent(false);
            return;
        }
        if (item) {
            choice.primengComponent = item.title;
            showMenu(item, choice);
        } else {
            console.log("You cancelled the menu.");
        }
        return item;
    });
}

function showMenu(item, choice) {
    let componentProps = generateOptions(components[`${item.title}`]).filter(e => choice.props[e.title] === undefined);

    menu(
        [
            {hotkey: "0", title: "Continue", selected: true},
            ...componentProps,
            {separator: true}
        ],
        {
            header: "Which props do you want to edit?",
            border: true,
            pageSize: 5
        }
    ).then(_item => {
        if (_item.hotkey === '0') {
            console.log("You want to add: " + choice.primengComponent);
            populateProps(choice);
        } else if (_item) {
            choice.props[`${_item.title}`] = true;
            showMenu(item, choice);
        } else {
            console.log("You cancelled the menu.");
        }
        return _item;
    });
}

function populateProps(choice = {}) {
    if (!Object.keys(choice.props).length) {
        process.stdin.pause();
        return;
    }
    console.log(">>>props", choice.props);

    let i = 0;
    const propsKeys = Object.keys(choice.props);
    const recursiveAsyncReadLine = () => {
        rl.question(`Enter value for ${propsKeys[i]}: `, value => {
            choice.props[`${propsKeys[i]}`] = value;
            i++;
            if (i >= propsKeys.length) {
                process.stdin.pause();
                addModule.addComponent(choice);
                return rl.close();
            }
            recursiveAsyncReadLine();
        });
    };
    recursiveAsyncReadLine();
}
