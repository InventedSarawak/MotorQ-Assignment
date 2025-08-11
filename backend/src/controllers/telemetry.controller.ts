import { Telemetry } from '../models'
import { asyncHandler } from '../utils/AsyncHandler'
import { ApiResponse } from '../utils/ApiResponse'

const postTelemetryData = asyncHandler(async (req, res) => {
    const { GPS_long, GPS_lat, speed, engineStatus, fuelLevel, odometer, diagnosticCode, timestamp } = req.body
    const newTelemetry = new Telemetry({
        GPS: {
            longitude: Number(GPS_long),
            latitude: Number(GPS_lat)
        },
        speed: Number(speed),
        engineStatus,
        fuelLevel: Number(fuelLevel),
        odometer,
        diagnosticCode,
        timestamp
    })
    await newTelemetry.save()
    res.status(200).json(new ApiResponse(200, 'Telemetry Added'))
})

const getTelemetryData = asyncHandler(async (req, res) => {})

export { postTelemetryData }
