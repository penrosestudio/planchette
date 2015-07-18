var data = {
    "name": "Jerry Philips",
    "pets": ["Betty", "Berty", "Billy"],
	"message":"I am a message!",
	"error":"I am an error!",
	"table": {
    	"tableName": "Pets table",
    	"buttonGroups": [
    	    ["edit", "delete"],
    	    ["add"]
    	],
    	"hasCheckboxColumn": true,
    	"hasEditColumn": true,
    	"tableHeaders": [
    	    "Name", "Breed", "Weight"
    	],
    	"rows": [{
        	"columns": ["Betty", "Poodle", "42kg"]
    	}, {
        	"columns": ["Berty", "Greyhound", "25kg"]
    	}, {
        	"columns": ["Billy", "French Bulldog", "12kg"]
    	}]
	},
	"form": {
        "title": "Edit form",
        "action": "/save",
        "submitLabel": "Save changes",
        "itemType": "Pet",
        "newItem": true,
        "itemTitle": "Billy",
		"hasKey": "true",
        "buttonGroups": [
			["back","save"]
		],
		"keyHeaders": [
			"Weight (kg)","Weight (lb)"
		],
		"keyRows": [{
			"columns": ["10kg", "22lb"]
		}, {
			"columns": ["20kg", "44lb"]
		}, {
			"columns": ["30kg", "66lb"]
		}],
		"formItems": [{
			"type": "subheader",
			"value": "Pet details:"
		}, {
			"required": "true",
			"id": "name",
			"type": "textInput",
			"label": "Name",
			"placeholder": "Name",
			"value":"Billy"
		}, {
			"required": "true",
			"id": "breed",
			"type": "select",
			"label": "Breed",
			"placeholder": "Breed",
            "values":["Poodle","Boxer","Greyhound","French Bulldog"]
		}, {
            "required": "true",
			"id": "email",
			"type": "emailInput",
			"label": "Pet Email Address",
			"placeholder": "This is the pet's email address",
			"value":""
		}, {
			"type": "subheader",
			"value": "Special pet details:"
		}, {
			"required": "true",
			"id": "description",
			"type": "textArea",
			"label": "Pet Description",
			"placeholder": "",
			"value":""
		}, {
			"required": "true",
			"id": "password",
			"type": "passwordInput",
			"label": "Pet Password",
			"placeholder": "Enter a password for your pet",
			"label2": "Confirm",
			"placeholder2": "Enter the pet password again",
			"value":""
		}]
	}
};