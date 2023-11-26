import { Router } from 'express'
import { UserRouter } from './UserRouter'

export class MasterRouter {
	private readonly _router = Router()

	constructor () {
		this._configure()
	}

	get router () {
		return this._router
	}

	/**
	 * Connect routes to their matching routers.
	 */
	private _configure () {
	}
}
