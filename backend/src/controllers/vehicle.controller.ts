import { Vehicle } from '../models'
import { ApiError } from '../utils/ApiError'
import { ApiResponse } from '../utils/ApiResponse'
import { asyncHandler } from '../utils/AsyncHandler'

const RegistrationStatusOptions = ['active', 'maintenance', 'decommissioned']
const FleetIDOptions = ['corporate', 'rental', 'personal']

const addVehicles = asyncHandler(async (req, res) => {
    const { VIN, manufacturer, model, fleetID, owner, status } = req.body
    if (
        !VIN ||
        !manufacturer ||
        !model ||
        !fleetID ||
        !owner ||
        !status ||
        !VIN.trim() ||
        !manufacturer.trim() ||
        !model.trim() ||
        !fleetID.trim() ||
        !owner.trim() ||
        !status.trim()
    ) {
        throw new ApiError(400, 'Missing or Empty fields')
    }
    if (!RegistrationStatusOptions.includes(status.toLowerCase())) {
        throw new ApiError(400, 'Invalid Status')
    }
    if (!FleetIDOptions.includes(fleetID.toLowerCase())) {
        throw new ApiError(400, 'Invalid Fleet ID')
    }
    if (await Vehicle.exists({ VIN: VIN })) {
        throw new ApiError(400, 'Vehicle Already exists')
    }
    const newVehicle = new Vehicle({
        VIN,
        manufacturer,
        vehicle_model: model,
        fleetID,
        owner,
        registrationStatus: status,
        engineStatus: 'on',
        fuelLevel: 0
    })
    await newVehicle.save()
    res.status(200).json(new ApiResponse(200, 'Vehicle Added Successfully'))
})

const getVehicles = asyncHandler(async (req, res) => {
    const VIN = req.query.vin
    const fleetID = req.query.fleetID
    const registrationStatus = req.query.status
    let vehicle
    if (!VIN) {
        if (fleetID && registrationStatus) {
            vehicle = await Vehicle.find({ fleetID, registrationStatus }).lean()
        } else if (fleetID) {
            vehicle = await Vehicle.find({ fleetID }).lean()
        } else if (registrationStatus) {
            vehicle = await Vehicle.find({ registrationStatus }).lean()
        } else {
            vehicle = await Vehicle.find().lean()
        }
    } else {
        vehicle = await Vehicle.findOne({ VIN }).lean()
    }
    if (vehicle) {
        if (vehicle.length > 0) {
            res.status(200).json(new ApiResponse(200, vehicle, 'Vehicle Details Fetched'))
        }
        res.status(200).json(new ApiResponse(200, 'No vehicles'))
    }
})

const deleteVehicles = asyncHandler(async (req, res) => {
    const { VIN } = req.body
    if (!(await Vehicle.exists({ VIN }))) {
        throw new ApiError(404, 'Vehicle Not Found')
    }
    await Vehicle.deleteOne({ VIN })
    res.status(200).json(new ApiResponse(200, 'Vehicle Deleted Successfully'))
})

const getActiveInactiveCount = asyncHandler(async (req, res) => {
    const activeVehicleCount = await Vehicle.countDocuments({ active: true })
    const inactiveVehicleCount = await Vehicle.countDocuments({ active: false })
    res.status(200).json(
        new ApiResponse(
            200,
            { 'Active Vehicles': activeVehicleCount, inactiveVehicleCount: inactiveVehicleCount },
            'Counts Fetched Successfully'
        )
    )
})

export { addVehicles, getVehicles, deleteVehicles, getActiveInactiveCount }
