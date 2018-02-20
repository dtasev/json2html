import { J2H } from "../ts/json2html";
import "mocha";
import { expect } from "chai";

function myfunc() {
    alert("I have been summoned");
}

describe('Parser', () => {
    it('should parse correcly', () => {
        // this is taken from what is believed to be a working version of the code
        const expected_html = '<div class="w3-row w3-dark-grey w3-padding issue-margin-bottom" title="apples"><input class="w3-input w3-border" id="apples" type="text" placeholder="New issue title" autofocus=""><textarea class="w3-input w3-border" id="Issues.ID_NEW_ISSUE_DETAILS" placeholder="Details (Optional)"></textarea><div class="w3-dropdown-click margin-top-1em"><button id="Issues.ID_NEW_ISSUE_MILESTONES_BUTTON" class="w3-button full-width Milestones.CLASS_BUTTON_NO_MILESTONE" onclick="Controls.toggleMilestones()"><i class="fa fa-map-signs fa-1x"></i></button><div id="Issues.ID_NEW_ISSUE_MILESTONES_LIST" class="w3-dropdown-content w3-bar-block w3-border"></div></div><button onclick="function myfunc() {\r\n    alert(&quot;I have been summoned&quot;);\r\n}">click me to call function</button></div>';
        const id_in_variable = "apples";
        const input_json = {
            "div": {
                "className": "w3-row w3-dark-grey w3-padding issue-margin-bottom",
                "title": "apples",
                "children": [{
                    "input": {
                        "className": "w3-input w3-border",
                        "id": id_in_variable,
                        "type": "text",
                        "placeholder": "New issue title",
                        "autofocus": true
                    }
                }, {
                    "textarea": {
                        "className": "w3-input w3-border",
                        "id": "Issues.ID_NEW_ISSUE_DETAILS",
                        "placeholder": "Details (Optional)"
                    }
                }, {
                    "div": { // options for the issues
                        "className": "w3-dropdown-click margin-top-1em",
                        "children": [{
                            "button": {
                                "id": "Issues.ID_NEW_ISSUE_MILESTONES_BUTTON",
                                "className": "w3-button full-width " + "Milestones.CLASS_BUTTON_NO_MILESTONE",
                                "onclick": "Controls.toggleMilestones()",
                                "children": {
                                    "i": {
                                        "className": "fa fa-map-signs fa-1x",
                                        "aria-hidden": "true"
                                    }
                                }
                            }
                        }, {
                            "div": {
                                "id": "Issues.ID_NEW_ISSUE_MILESTONES_LIST",
                                "className": "w3-dropdown-content w3-bar-block w3-border"
                            }
                        }]
                    }
                }, {
                    "button": {
                        "onclick": myfunc,
                        "textContent": "click me to call function"
                    }
                }]
            }
        };
        const html = J2H.parse(input_json).outerHTML;
        expect(html).to.equal(expected_html);
    });
    it('should parse a single child', () => {
        const expected = '<div class="w3-row w3-dark-grey w3-padding issue-margin-bottom" title="apples"><input class="w3-input w3-border" id="apples" type="text" placeholder="New issue title" autofocus=""></div>';
        const input = {
            "div": {
                "className": "w3-row w3-dark-grey w3-padding issue-margin-bottom",
                "title": "apples",
                "children": {
                    "input": {
                        "className": "w3-input w3-border",
                        "id": "apples",
                        "type": "text",
                        "placeholder": "New issue title",
                        "autofocus": true
                    }
                }
            }
        };
        const html = J2H.parse(input).outerHTML;
        expect(html).to.equal(expected);
    });
    it('should parse a list of children with one child', () => {
        const expected = '<div class="w3-row w3-dark-grey w3-padding issue-margin-bottom" title="apples"><input class="w3-input w3-border" id="apples" type="text" placeholder="New issue title" autofocus=""></div>';
        const input = {
            "div": {
                "className": "w3-row w3-dark-grey w3-padding issue-margin-bottom",
                "title": "apples",
                "children": [{
                    "input": {
                        "className": "w3-input w3-border",
                        "id": "apples",
                        "type": "text",
                        "placeholder": "New issue title",
                        "autofocus": true
                    }
                }]
            }
        };
        const html = J2H.parse(input).outerHTML;
        expect(html).to.equal(expected);
    });
    it('should parse a list of children with many children', () => {
        const expected = '<div class="w3-row w3-dark-grey w3-padding issue-margin-bottom" title="apples"><input class="w3-input w3-border" id="apples" type="text" placeholder="New issue title" autofocus=""><button>Apples</button></div>';
        const input = {
            "div": {
                "className": "w3-row w3-dark-grey w3-padding issue-margin-bottom",
                "title": "apples",
                "children": [{
                    "input": {
                        "className": "w3-input w3-border",
                        "id": "apples",
                        "type": "text",
                        "placeholder": "New issue title",
                        "autofocus": true
                    }
                }, {
                    "button": {
                        "textContent": "Apples"
                    }
                }]
            }
        };
        const html = J2H.parse(input).outerHTML;
        expect(html).to.equal(expected);
    });

});