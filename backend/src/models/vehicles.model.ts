import mongoose, { Schema, model, Document, Types } from 'mongoose'

const FleetIDOptions = ['Corporate', 'Rental', 'Personal']

const RegistrationStatusOptions = ['Active', 'Maintenance', 'Decommissioned']

const EngineStatusOptions = ['On', 'Off', 'Idle']

export interface IVehicle extends Document {
    VIN: string
    manufacturer: string
    vehicle_model: string
    fleetID: 'Corporate' | 'Rental' | 'Personal'
    owner: string
    registrationStatus: 'Active' | 'Maintenance' | 'Decommissioned'
    engineStatus: 'On' | 'Off' | 'Idle'
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

export const Vehicle = model<IVehicle>('Vehicle', vehicleSchema)
