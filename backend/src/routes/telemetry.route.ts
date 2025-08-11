import { Router } from 'express'
import { postTelemetryData } from '../controllers'

const TelemetryRoutes = Router()

TelemetryRoutes.post('/add', postTelemetryData)

export default TelemetryRoutes
