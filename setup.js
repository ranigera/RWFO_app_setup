function createInputField(description, var_name, value) {
    var inputContainer = document.createElement("div");

    // Display the explanation for each setting
    var label = document.createElement("label");
    label.innerHTML = description;
    inputContainer.appendChild(label);
    inputContainer.appendChild(document.createElement("br"));

    if (typeof value === "string" || typeof value === "number" || Array.isArray(value)) {
        // Open field for string or number
        var input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.id = var_name;
        input.style.width = "200px";
        input.classList.add(typeof value);
        inputContainer.appendChild(input);
    } else if (typeof value === "boolean") {
        value = value === true ? [true, false] : [false, true];
        // Dropdown for multiple-choice
        var select = document.createElement("select");
        select.id = var_name;
        for (var i = 0; i < value.length; i++) {
            var option = document.createElement("option");
            option.value = value[i];
            option.text = value[i];
            select.appendChild(option);
        }
        select.classList.add(typeof value);
        inputContainer.appendChild(select);
    }

    inputContainer.appendChild(document.createElement("br"));
    inputContainer.appendChild(document.createElement("br"));

    return inputContainer;
}

function mergeObjects(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
                // Recursively merge objects
                if (!target.hasOwnProperty(key)) {
                    target[key] = {};
                }
                mergeObjects(target[key], source[key]);
            } else {
                // Update or add property
                target[key] = source[key];
            }
        }
    }
}

function removeKeysByText(obj, text) {
    for (var key in obj) {
        if (key.includes(text)) {
            delete obj[key]
        } else if (typeof obj[key] === "object") {
            removeKeysByText(obj[key], text)
        }
    }
}

function customReplacer(key, value) {
    if (typeof value === 'function') {
        return value.toString();
    }
    return value;
}

document.addEventListener("DOMContentLoaded", function () {

    var container = document.createElement("div");
    document.body.appendChild(container);

    var h2 = document.createElement("h2");
    h2.innerHTML = 'General';
    container.appendChild(h2);

    // iterate the keys and values of app_settings:
    for (var key in app_settings) {
        // check if key include the word "SETUP_TEXT_":
        // After this
        if (key.includes("SETUP_TEXT_use_warehouse_state_query")) { // Made for the manipulation check settings
            var hr = document.createElement("hr"); // Create a new <hr> element
            container.appendChild(hr);
            var h2 = document.createElement("h2");
            h2.innerHTML = 'Manipulation check';
            container.appendChild(h2);
            var description = app_settings[key], var_name = key.replace("SETUP_TEXT_", ""), value = app_settings[key.replace("SETUP_TEXT_", "")];
            var inputField = createInputField(description, var_name, value);
            container.appendChild(inputField);

            for (key2 in app_settings['coinCollectionTask']) {
                if (key2.includes("SETUP_TEXT_")) {
                    var description = app_settings['coinCollectionTask'][key2], var_name = 'coinCollectionTask.'.concat(key2.replace("SETUP_TEXT_", "")), value = app_settings['coinCollectionTask'][key2.replace("SETUP_TEXT_", "")];
                    var inputField = createInputField(description, var_name, value);
                    container.appendChild(inputField);
                }
            }

        } else if (key.includes("SETUP_TEXT_")) {
            var description = app_settings[key], var_name = key.replace("SETUP_TEXT_", ""), value = app_settings[key.replace("SETUP_TEXT_", "")];
            var inputField = createInputField(description, var_name, value);
            container.appendChild(inputField);

        } else if (key === 'rewards') {
            var hr = document.createElement("hr"); // Create a new <hr> element
            container.appendChild(hr);
            var h2 = document.createElement("h2");
            h2.innerHTML = 'Reinforcement main parameters (win/loss/cost)';
            container.appendChild(h2);
            var h3 = document.createElement("h3");
            h3.innerHTML = '<u>Win (Reward) parameters:</u>';
            container.appendChild(h3);
            for (var key2 in app_settings[key]) {
                if (key2.includes("SETUP_TEXT_includeAversiveOutcome")) {
                    var h3 = document.createElement("h3");
                    h3.innerHTML = '<u>Loss (Punishment) parameters:</u>';
                    h3.style.marginBottom = "0";
                    container.appendChild(h3);
                    var li = document.createElement("li");
                    li.innerHTML = 'Choosing to integrate loss will introduce "bombs" into the game that indicate money loss.';
                    li.style.marginBottom = "2%";
                    container.appendChild(li);
                    var description = app_settings[key][key2], var_name = key.concat('.', key2.replace("SETUP_TEXT_", "")), value = app_settings[key][key2.replace("SETUP_TEXT_", "")];
                    var inputField = createInputField(description, var_name, value);
                    container.appendChild(inputField);
                    var h4 = document.createElement("h4");
                    h4.innerHTML = 'NOTE: If the "Include loss outcomes" is set to false, ignore the loss related parameters below.';
                    h4.style.marginTop = "0";
                    container.appendChild(h4);
                } else if (key2.includes("SETUP_TEXT_")) {
                    var description = app_settings[key][key2], var_name = key.concat('.', key2.replace("SETUP_TEXT_", "")), value = app_settings[key][key2.replace("SETUP_TEXT_", "")];
                    var inputField = createInputField(description, var_name, value);
                    container.appendChild(inputField);
                    // chack if key2 is an object:
                }
            }

        } else if (key === 'cost') {
            var h3 = document.createElement("h3");
            h3.innerHTML = '<u>Entry cost parameters:</u>';
            container.appendChild(h3);
            for (var key2 in app_settings[key]) {
                if (key2.includes("SETUP_TEXT_")) {
                    var description = app_settings[key][key2], var_name = key.concat('.', key2.replace("SETUP_TEXT_", "")), value = app_settings[key][key2.replace("SETUP_TEXT_", "")];
                    var inputField = createInputField(description, var_name, value);
                    container.appendChild(inputField);
                    // chack if key2 is an object:
                }
            }
            var p = document.createElement("p");
            p.innerHTML = '<i>* Other cost parameters can be manually edited in the output file (settings.js).</i>';
            container.appendChild(p);

        } else if (key === 'group_vars') {
            var hr = document.createElement("hr"); // Create a new <hr> element
            container.appendChild(hr);
            var h2 = document.createElement("h2");
            h2.innerHTML = 'Groups - duration and manipulation days';
            container.appendChild(h2);
            var li = document.createElement("li");
            li.innerHTML = 'You can selectively use only one/two groups. Group assignment is based only on the subject number extracted from the links you choose to send to the participants.';
            container.appendChild(li);
            var li = document.createElement("li");
            li.innerHTML = 'Therefore, you can just ignore the parameters of unused groups.';
            container.appendChild(li);
            for (var key2 in app_settings[key]) {
                if (key2.includes("SETUP_TEXT_")) {
                    curr_group = key2.replace("SETUP_TEXT_", "")
                    var h3 = document.createElement("h3");
                    h3.innerHTML = curr_group.replace(/_/g, ' ');
                    container.appendChild(h3);
                    var h4 = document.createElement("h4");
                    h4.innerHTML = app_settings[key][key2];
                    container.appendChild(h4);
                    app_settings[key][curr_group]
                    for (var key3 in app_settings[key][curr_group]) {
                        if (key3.includes("SETUP_TEXT_")) {
                            var description = app_settings[key][curr_group][key3], var_name = key.concat('.', key2.replace("SETUP_TEXT_", ""), '.', key3.replace("SETUP_TEXT_", "")), value = app_settings[key][curr_group][key3.replace("SETUP_TEXT_", "")];
                            var inputField = createInputField(description, var_name, value);
                            container.appendChild(inputField);
                        }
                    }
                }
            }
            var hr = document.createElement("hr"); // Create a new <hr> element
            container.appendChild(hr);
            var h2 = document.createElement("h2");
            h2.innerHTML = 'Other manipulation parameters';
            container.appendChild(h2);

        } else if (key === 'hideOutcome') {
            var hr = document.createElement("hr"); // Create a new <hr> element
            container.appendChild(hr);
            var h2 = document.createElement("h2");
            h2.innerHTML = 'Hiding the outcome parameters';
            container.appendChild(h2);
            for (var key2 in app_settings[key]) {
                if (key2.includes("SETUP_TEXT_TITLE_")) {
                    var h3 = document.createElement("h3");
                    h3.innerHTML = '<u>' + app_settings[key][key2] + '</u>';
                    container.appendChild(h3);
                } else if (key2.includes("SETUP_TEXT_SUB_TITLE_")) {
                    var h4 = document.createElement("h4");
                    h4.innerHTML = app_settings[key][key2];
                    container.appendChild(h4);
                } else if (key2.includes("SETUP_TEXT_")) {
                    var description = app_settings[key][key2], var_name = key.concat('.', key2.replace("SETUP_TEXT_", "")), value = app_settings[key][key2.replace("SETUP_TEXT_", "")];
                    var inputField = createInputField(description, var_name, value);
                    container.appendChild(inputField);
                    console.log('MNBNBN')
                    // chack if key2 is an object:
                } else if (typeof app_settings[key][key2] === "object") {
                    for (var key3 in app_settings[key][key2]) {
                        if (key3.includes("SETUP_TEXT_")) {
                            var description = app_settings[key][key2][key3], var_name = key.concat('.', key2.replace("SETUP_TEXT_", ""), '.', key3.replace("SETUP_TEXT_", "")), value = app_settings[key][key2][key3.replace("SETUP_TEXT_", "")];
                            var inputField = createInputField(description, var_name, value);
                            container.appendChild(inputField);
                        }
                    }
                }
            }
        }
    }

    // Save the settings to a new file
    var saveButton = document.createElement("button");
    saveButton.innerHTML = "Create the settings.js file";
    saveButton.style.borderRadius = "12px"; // Adjust the border radius for rounded edges
    saveButton.style.fontSize = "130%"; // Adjust the font size for larger text
    saveButton.style.display = "block"; // Change the display to block
    saveButton.style.padding = "0.5%"; // Change the padding
    saveButton.style.margin = "0 auto"; // Set margin to auto for center alignment

    saveButton.onclick = function () {
        var updatedSettings = {};

        // Get values from input fields and update the settings object
        var inputFields = container.getElementsByTagName("input");
        var selectFields = container.getElementsByTagName("select");

        for (var i = 0; i < inputFields.length; i++) {
            var inputField = inputFields[i];
            var val = inputField.value
            val = inputField.className === 'number' ? Number(inputField.value) : val;
            if (inputField.className === 'object') {
                val = !!inputField.value ? inputField.value.split(',').map(x => Number(x)) : [];
            }
            if (inputField.id.includes('.')) {
                var keys = inputField.id.split('.')
                var obj_to_add = keys.reduceRight((acc, key) => ({ [key]: acc }), val)
                mergeObjects(updatedSettings, obj_to_add)
            } else {
                updatedSettings[inputField.id] = val;
            }
        }

        for (var i = 0; i < selectFields.length; i++) {
            var selectField = selectFields[i];
            var val = selectField.value
            val = selectField.className === 'object' ? selectField.value === 'true' ? true : false : val;
            if (selectField.id.includes('.')) {
                var keys = selectField.id.split('.')
                var obj_to_add = keys.reduceRight((acc, key) => ({ [key]: acc }), val)
                mergeObjects(updatedSettings, obj_to_add)
            } else {
                updatedSettings[selectField.id] = val;
            }
        }

        // Merge the updated settings object with the original settings object
        mergeObjects(app_settings, updatedSettings)
        // remove any key that includes SETUP_TEXT in all levels:
        removeKeysByText(app_settings, 'SETUP_TEXT')

        // Convert and format the updated settings object to JSON string
        var settingsJSON = "window.app_settings = " + JSON.stringify(app_settings, customReplacer, 2)
            .replace(/"([^"]+)":/g, '$1:')
            .replace(/\[\n\s+/g, '[')
            .replace(/\n\s+\]/g, ']')
            .replace(/(\[[^\[\]]*?)(?:\n\s+)/g, '$1')
            .replace(/\s+(?=[^\[\]]*?\])/g, '')
            .replace(/\\t/g, '\t').replace(/\\n/g, '\n')
            .replace(/"(\s*function\s*\(.*?\)\s*{[\s\S]*?})"/g, '$1');
        settingsJSON = settingsJSON.replace('confirmationCodeTextMessage: "\n', 'confirmationCodeTextMessage: "\\n')

        // Save the settings to a new file named "settings.js"
        var a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(settingsJSON);
        a.download = "settings.js";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    document.body.appendChild(saveButton);
});
