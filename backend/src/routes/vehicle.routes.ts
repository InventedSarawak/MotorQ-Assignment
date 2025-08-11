import { Router } from 'express'
import { addVehicles, getVehicles, deleteVehicles } from '../controllers'

const vehicleRoutes = Router()

vehicleRoutes.post('/add', addVehicles)
vehicleRoutes.get('/get', getVehicles)
vehicleRoutes.post('/delete', deleteVehicles)

export default vehicleRoutes
