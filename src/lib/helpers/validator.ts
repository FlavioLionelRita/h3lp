export class Validator {
	private reInt:RegExp
	private reDecimal:RegExp
	private reAlphanumeric:RegExp
	private reAlpha:RegExp
	private reDate:RegExp
	private reDateTime: RegExp
	private reTime: RegExp
	constructor () {
		this.reInt = /^[0-9]+$/ // /^\d+$/
		this.reDecimal = /^[0-9]*[.][0-9]+$/ // /^\d+\.\d+$/
		this.reAlphanumeric = /[a-zA-Z0-9_.]+$/
		this.reAlpha = /[a-zA-Z]+$/
		this.reDate = /^\d{4}-\d{2}-\d{2}$/
		this.reDateTime = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
		// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
		this.reTime = /\[0-2]\d:[0-5]\d:[0-5]\d/
	}

	public isObject (obj:any):boolean {
		return obj && typeof obj === 'object' && obj.constructor === Object && !Array.isArray(obj)
	}

	public isEmpty (value:any):boolean {
		return value === null || value === undefined || value.toString().trim().length === 0
	}

	public isPositiveInteger (value:any) {
		if (typeof value !== 'string') {
			return false
		}
		const num = Number(value)
		return Number.isInteger(num) && num >= 0
	}

	public isNull (value: any): boolean {
		return value === undefined || value === null
	}

	public isNotNull (value: any): boolean {
		return !this.isNull(value)
	}

	public isNotEmpty (value: string): boolean {
		return !this.isEmpty(value)
	}

	public isBoolean (value: any): boolean {
		return typeof value === 'boolean'
	}

	public isNumber (value: any): boolean {
		return this.isDecimal(value)
	}

	public isInteger (value: any): boolean {
		return Number.isInteger(value)
	}

	public isDecimal (value: any): boolean {
		return !isNaN(value)
	}

	public isString (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return typeof value === 'string'
	}

	public isDate (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		if (typeof value === 'string') {
			return this.isDateFormat(value as string)
		} else {
			return typeof value.getMonth === 'function'
		}
	}

	public isDateTime (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		if (typeof value === 'string') {
			return this.isDateTimeFormat(value as string)
		} else {
			return typeof value.getMonth === 'function'
		}
	}

	public isArray (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return Array.isArray(value)
	}

	public isTime (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		if (typeof value === 'string') {
			return this.isTimeFormat(value as string)
		} else {
			return typeof value.getMonth === 'function'
		}
	}

	public isBooleanFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return ['true', 'false'].includes(value.toString())
	}

	public isNumberFormat (value: any): boolean {
		return this.isDecimalFormat(value)
	}

	public isIntegerFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return this.reInt.test(value)
	}

	public isDecimalFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return this.reDecimal.test(value)
	}

	public isAlphanumeric (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return this.reAlphanumeric.test(value)
	}

	public isAlpha (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return this.reAlpha.test(value)
	}

	public isDateFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return this.reDate.test(value)
	}

	public isDateTimeFormat (value: any): boolean {
		return this.reDateTime.test(value)
	}

	public isTimeFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return this.reTime.test(value)
	}

	public between (value: any, from: any, to: any): boolean {
		if (value === null || value === undefined || from === null || from === undefined || to === null || to === undefined) {
			return false
		}
		return value >= from && value < to
	}

	public includes (list: any[]|string, value: any): boolean {
		if (list && value) {
			return list.includes(value)
		} else {
			return false
		}
	}
}