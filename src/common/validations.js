import { BehaviorSubject } from 'rxjs'

export const isEmail = email =>/[^@]+@[^.]+\..+/.test(email) ? false : 'This is not a valid email';

export const isRequired = field => field && field !== '' ? false : 'Field is required';

export const validateAll = obj => {
    for (const field in obj) {
        if (obj.hasOwnProperty(field) && (!obj[field] || obj[field] === '')) {
            return false;
        }
    }
    return true;
};

export class FormControl {
    valid = false;
    invalid = true;
    pending = false;
    touched = false;
    untouched = true;
    errorList = [];

    valueChanges = new BehaviorSubject('');

    constructor(fieldName, validations) {
        this.name = fieldName;
        this.validations = validations;
        this.validate(this.value);
    }

    get value() {
        return this.valueChanges.getValue();
    }

    validate(val) {
        this.errorList = [];
        this.valid = this.validations.reduce((acc, validate) => {
            const result = validate(val);
            if (!!result) {
                this.errorList.push(result);
            }
            return acc && !result;
        }, true);
        this.invalid = !this.valid;
    }

    set value(val) {
        this.pending = true;
        this.validate(val);
        this.valueChanges.next(val);
        this.pending = false;
    }

    hasError() {
        return !!this.errorList.length;
    }

    markAsTouched() {
        this.touched = true;
        this.untouched = false;
    }

    markAsUntouched() {
        this.untouched = true;
        this.touched = false;
    }

}


export class FormGroup {
    fields = [];
    constructor(schema) {
        for (const field of schema) {
            this.fields.push(new FormControl(field[0], field[1]));
        }
    }

    get value() {
        const val = {};
        for (const field of this.fields) {
            val[field.name] = field.value;
        }
        return val;
    }

    set value(val) {
        for (const field in val) {
            if (val.hasOwnProperty(field)) {
                const ctrl = this.get(field);
                if (ctrl) {
                    ctrl.value = val[field];
                }
            }
        }
    }

    get(ctrlName) {
        return this.fields[this.fields.findIndex(field => field.name === ctrlName)];
    }

    get valid() {
        return this.fields.map(ctrl => ctrl.valid).reduce((acc, next) => acc && next, true);
    }
}
