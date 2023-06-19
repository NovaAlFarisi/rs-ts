
export interface RoomsInterface {
    room_name: string,
    class: string,
    available: string
}

export interface HospitalInterface {
    hospital_code: string,
    hospital_name: string,
    detail: string,
    address: string,
    hotline: string,
    rooms: Array<RoomsInterface>,
    updated_at?: string,
    info1?: string,
    info2?: string
}

export type HospitalsType = Array<HospitalInterface>
export type HospitalCategoryType = 'non-covid' | 'covid'