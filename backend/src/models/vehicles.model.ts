import mongoose, { Schema, model, Document, Types } from 'mongoose'

const FleetIDOptions = ['corporate', 'rental', 'personal']

const RegistrationStatusOptions = ['active', 'maintenance', 'decommissioned']

const EngineStatusOptions = ['on', 'off', 'idle']

export interface IVehicle extends Document {
    VIN: string
    manufacturer: string
    vehicle_model: string
    fleetID: 'corporate' | 'rental' | 'personal'
    owner: string
    registrationStatus: 'active' | 'maintenance' | 'decommissioned'
    engineStatus: 'on' | 'off' | 'idle'
    fuelLevel: number
}

const vehicleSchema = new Schema<IVehicle>({
    VIN: { type: String, required: true },
    manufacturer: { type: String, required: true },
    vehicle_model: { type: String, required: true },
    fleetID: { type: String, enum: FleetIDOptions },
    owner: { type: String, required: true },
    registrationStatus: { type: String, enum: RegistrationStatusOptions, required: true },
    engineStatus: { type: String, enum: EngineStatusOptions, required: true },
    fuelLevel: { type: Number, required: true, max: 100, min: 0}
})

export const Vehicle = mongoose.models.Vehicle || model<IVehicle>('Vehicle', vehicleSchema)
