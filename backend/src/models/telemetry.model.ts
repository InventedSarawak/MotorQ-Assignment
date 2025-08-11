import mongoose, { Schema, model, Document, Types } from 'mongoose'

const EngineStatusOptions = ['on', 'off', 'idle']

export interface ITelemetry extends Document {
    coordinates: {
        longitude: number
        latitude: number
    }
    speed: number
    engineStatus: 'on' | 'off' | 'idle'
    fuelLevel: number
    odometer: number
    diagnosticCode: string
    timestamp: Date
}

const telemetrySchema = new Schema<ITelemetry>(
    {
        coordinates: {
            longitude: { type: Number, min: 0, max: 360, requried: true },
            latitude: { type: Number, min: 0, max: 360, requried: true }
        },
        speed: { type: Number, required: true },
        engineStatus: { type: String, enum: EngineStatusOptions, required: true },
        fuelLevel: { type: Number, max: 100, min: 0, required: true},
        odometer: { type: Number, required: true },
        diagnosticCode: { type: String }
    },
    { timestamps: true }
)

export const Telemetry = mongoose.models.Telemetry || model<ITelemetry>('Telemetry', telemetrySchema)
