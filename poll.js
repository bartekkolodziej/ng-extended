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
    table: ["columns", "value", 'style',
        'styleClass',
        'tableStyle',
        'tableStyleClass',
        'paginator',
        'rows',
        'totalRecords',
        'pageLinks',
        'alwaysShowPaginator',
        'paginatorPosition',
        'currentPageReportTemplate',
        'showCurrentPageReport',
        'sortMode',
        'sortField',
        'sortOrder',
        'rowGroupMode',
        'defaultSortOrder',
        'customSort',
        'selectionMode',
        'selection',
        'contextMenuSelection',
        'contextMenuSelectionMode',
        'dataKey',
        'metaKeySelection',
        'lazy',
        'lazyLoadOnInit',
        'compareSelectionBy',
        'csvSeparator',
        'exportFilename',
        'filterDelay',
        'rowExpandMode',
        'scrollable',
        'scrollHeight',
        'virtualScroll',
        'virtualScrollDelay',
        'virtualRowHeight',
        'frozenWidth',
        'responsive',
        'resizableColumns',
        'columnResizeMode',
        'reorderableColumns',
        'loading',
        'loadingIcon',
        'showLoader',
        'rowHover',
        'paginatorDropdownAppendTo',
        'resetPageOnSort',
        'stateKey',
        'stateStorage',
        'editMode'],
    multiselect: ['optionLabel',
        'disabled',
        'readonly',
        'filter',
        'filterBy',
        'filterPlaceHolder',
        'defaultLabel',
        'appendTo',
        'style',
        'styleClass',
        'panelStyle',
        'panelStyleClass',
        'scrollHeight',
        'overlayVisible',
        'tabindex',
        'dataKey',
        'name',
        'inputId',
        'displaySelectedLabel',
        'maxSelectedLabels',
        'selectedItemsLabel',
        'showToggleAll',
        'resetFilterOnHide',
        'dropdownIcon',
        'showHeader',
        'selectionLimit',
        'baseZIndex',
        'autoZIndex',
        'showTransitionOptions',
        'hideTransitionOptions',
        'itemSize',
        'virtualScroll',
        'ariaFilterLabel',],
    listbox: [
        'options',
        'optionLabel',
        'multiple',
        'checkbox',
        'filter',
        'filterMode',
        'filterValue',
        'readonly',
        'disabled',
        'style',
        'styleClass',
        'listStyle',
        'metaKeySelection',
        'dataKey',
        'showToggleAll',
        'ariaFilterLabel',
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
    radioButton: ["name", "value", "label", "disabled", "style", "styleClass"],
    scrollPanel: ["style", "styleClass"],
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
    steps: ["model", "activeIndex", "readonly", "style", "styleClass"],
    fieldSet: ['legend',
        'toggleable',
        'collapsed',
        'style',
        'styleClass',
        'transitionOptions'],
    tabview: ['orientation',
        'activeIndex',
        'style',
        'styleClass'],
    card: ['header',
        'subheader',
        'style',
        'styleClass'],
    menubar: ['model',
        'autoDisplay',
        'style',
        'styleClass',
        'baseZIndex',
        'autoZIndex'],
    carousel: ['numVisible',
        'firstVisible',
        'headerText',
        'effectDuration',
        'circular',
        'breakpoint',
        'responsive',
        'autoplayInterval',
        'easing',
        'pageLinks',
        'style',
        'styleClass'],
    dialog: ['header',
        'draggable',
        'resizable',
        'contentStyle',
        'visible',
        'modal',
        'blockScroll',
        'closeOnEscape',
        'dismissableMask',
        'rtl',
        'closable',
        'responsive',
        'breakpoint',
        'appendTo',
        'style',
        'styleClass',
        'showHeader',
        'positionLeft',
        'positionTop',
        'baseZIndex',
        'autoZIndex',
        'minX',
        'minY',
        'focusOnShow',
        'focusTrap',
        'maximizable',
        'transitionOptions',
        'closeIcon',
        'minimizeIcon',
        'maximizeIcon'],
    sidebar: ['visible',
        'position',
        'fullScreen',
        'appendTo',
        'style',
        'styleClass',
        'blockScroll',
        'baseZIndex',
        'autoZIndex',
        'modal',
        'dismissible',
        'showCloseIcon'],
    uploadComponent: ['name',
        'url',
        'method',
        'multiple',
        'accept',
        'disabled',
        'auto',
        'maxFileSize',
        'invalidFileSizeMessageSummary',
        'invalidFileSizeMessageDetail',
        'invalidFileTypeMessageSummary',
        'invalidFileTypeMessageDetail',
        'style',
        'styleClass',
        'previewWidth',
        'chooseLabel',
        'uploadLabel',
        'cancelLabel',
        'withCredentials',
        'mode',
        'customUpload',
        'showUploadButton',
        'showCancelButton'],
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
        if (skip) {
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
