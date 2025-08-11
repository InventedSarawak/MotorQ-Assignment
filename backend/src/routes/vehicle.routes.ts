import { Router } from 'express'
import { addVehicles } from '../controllers'
import { deleteVehicles, getVehicles } from '../controllers/vehicle.controller'

const vehicleRoutes = Router()

vehicleRoutes.post('/add', addVehicles)
vehicleRoutes.get('/get', getVehicles)
vehicleRoutes.post('/delete', deleteVehicles)

export default vehicleRoutes
