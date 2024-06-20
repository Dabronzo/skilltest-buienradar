import { z } from 'zod';


const measurementSchema = z.object({
    id: z.string(),
    timestamp: z.string().optional(),
    temperature: z.number().optional(),
    groundtemperature: z.number().optional(),
    feeltemperature: z.number().optional(),
    windgusts: z.number().optional(),
    windspeedBft: z.number().optional(),
    humidity: z.number().optional(),
    precipitation: z.number().optional(),
    sunpower: z.number().optional(),
    stationid: z.number(),
});

const stationSchema = z.object({
    id: z.string(),
    stationid: z.number(),
    stationname: z.string(),
    lat: z.number(),
    lon: z.number(),
    regio: z.string(),
});

export const buienradarAPISchema = z.array(z.object({
    $id: z.string(),
    timestamp: z.string().optional(),
    temperature: z.number().optional(),
    groundtemperature: z.number().optional(),
    feeltemperature: z.number().optional(),
    windgusts: z.number().optional(),
    windspeedBft: z.number().optional(),
    humidity: z.number().optional(),
    precipitation: z.number().optional(),
    sunpower: z.number().optional(),
    stationid: z.number(),
    stationname: z.string(),
    lat: z.number(),
    lon: z.number(),
    regio: z.string(),
}))

const chartDataSchema = z.object({
    x: z.array(z.string()),
    y: z.array(z.number()),
})




export type Measurement = z.infer<typeof measurementSchema>;
export type Station = z.infer<typeof stationSchema>;
export type BuienradarAPI = z.infer<typeof buienradarAPISchema>;
export type ChartDataType = z.infer<typeof chartDataSchema>;