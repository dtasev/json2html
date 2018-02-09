"use strict";
function getParent(json_dict) {
    let parent_elem;
    let props;
    Object.keys(json_dict).forEach(function (key) {
        parent_elem = document.createElement(key);
        props = json_dict[key];
    });
    return [parent_elem, props];
}
function parse(json_dict) {
    let [parent_elem, props] = getParent(json_dict);
    Object.keys(props).forEach(function (key) {
        if (key === "children") {
            props["children"].forEach(element => {
                parent_elem.appendChild(parse(element));
            });
        }
        else {
            parent_elem[key] = props[key];
        }
    });
    return parent_elem;
}
function main() {
    const elem = {
        "div": {
            "className": "w3-row w3-dark-grey w3-padding issue-margin-bottom",
            "children": [
                {
                    "input": {
                        "className": "w3-input w3-border",
                        "id": "Issues.ID_NEW_ISSUE_TITLE",
                        "type": "text",
                        "placeholder": "New issue title",
                        "autofocus": true
                    }
                },
                {
                    "textarea": {
                        "className": "w3-input w3-border",
                        "id": "Issues.ID_NEW_ISSUE_DETAILS",
                        "placeholder": "Details (Optional)"
                    }
                },
                {
                    "div": {
                        "className": "w3-dropdown-click margin-top-1em",
                        "children": [
                            {
                                "button": {
                                    "id": "Issues.ID_NEW_ISSUE_MILESTONES_BUTTON",
                                    "className": "w3-button full-width " + "Milestones.CLASS_BUTTON_NO_MILESTONE",
                                    "onclick": "Controls.toggleMilestones()",
                                    "children": [{
                                            "i": {
                                                "className": "fa fa-map-signs fa-1x",
                                                "aria-hidden": "true"
                                            }
                                        }]
                                }
                            },
                            {
                                "div": {
                                    "id": "Issues.ID_NEW_ISSUE_MILESTONES_LIST",
                                    "className": "w3-dropdown-content w3-bar-block w3-border"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };
    document.getElementById("test-id").appendChild(parse(elem));
}
main();
//# sourceMappingURL=main.js.map