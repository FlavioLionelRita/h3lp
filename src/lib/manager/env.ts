import { StringHelper } from './string'
import { Utils } from './utils'

export class EnvHelper {
	private utils: Utils
	private string: StringHelper
	constructor (utils: Utils, string: StringHelper) {
		this.utils = utils
		this.string = string
	}

	public get (text: string): string | undefined {
		const startIndex = text.indexOf('${')
		if (startIndex < 0) {
			return undefined
		}
		const endIndex = text.indexOf('}', startIndex + 2)
		if (endIndex < 0) {
			throw new Error(`Environment variable not found end character "?" in ${text}`)
		}
		return text.substring(startIndex + 2, endIndex)
	}

	public solve (source: any): void {
		if (typeof source !== 'object') {
			return
		}
		for (const name in source) {
			const child = source[name]
			if (typeof child === 'string' && child.indexOf('${') >= 0) {
				source[name] = this.replace(child)
			} else if (typeof child === 'object') {
				this.solve(child)
			}
		}
	}

	private replace (text: any): any {
		// there can be more than one environment variable in text
		while (text.indexOf('${') >= 0) {
			const environmentVariable = this.get(text)
			if (!environmentVariable) {
				continue
			}
			const environmentVariableValue = process.env[environmentVariable]
			if (environmentVariableValue === undefined || environmentVariableValue === null) {
				text = this.string.replace(text, '${' + environmentVariable + '}', '')
			} else {
				const objValue = this.utils.tryParse(environmentVariableValue)
				const value = objValue ? JSON.stringify(objValue) : environmentVariableValue
				text = this.string.replace(text, '${' + environmentVariable + '}', value)
			}
		}
		return text
	}
}
