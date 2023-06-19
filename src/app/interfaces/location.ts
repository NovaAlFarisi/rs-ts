export interface ProvincesInterface {
    id: string,
    nama: string
}

export interface DistrictInterface {
    id: string,
    nama: string
}


export type ProvincesType = Array<ProvincesInterface>
export type DistrictType = Array<DistrictInterface>