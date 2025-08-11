import { Telemetry, Vehicle } from '../models'
import { asyncHandler } from '../utils/AsyncHandler'
import { ApiResponse } from '../utils/ApiResponse'

const getActiveInactiveCount = asyncHandler(async (req, res) => {
    const { GPS, speed, engineStatus, fuelLevel, odometer, diagnosticCode, timestamp } = req.body
    const newTelemetry = new Telemetry({
        GPS,
        speed,
        engineStatus,
        fuelLevel,
        odometer,
        diagnosticCode,
        timestamp
    })
    await newTelemetry.save()
    res.status(200).json(new ApiResponse(200, 'Telemetry Added'))
})

export { getActiveInactiveCount }
