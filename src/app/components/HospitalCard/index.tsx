import { HospitalInterface } from "@/interfaces/hospital"

interface HospitalCardProps {
    hospitalData: HospitalInterface
}

const HospitalCard = ({hospitalData}: HospitalCardProps) => {
    return (
        <div className="flex flex-col items-center justify-between border rounded-md p-3 border-blue-600 gap-2">
            <div className="mx-auto flex flex-col gap-2">
                <h5>{hospitalData.hospital_name}</h5>
                <p>{hospitalData.address}</p>
            </div>
            <div className="border w-full p-3">
                {hospitalData.info1 && hospitalData.info2 ? (
                    <p>{hospitalData.info1} {hospitalData.info2}</p>
                ) : (
                    hospitalData.rooms.length > 0 && (
                        <>
                            {hospitalData.rooms.map((room, index) => (
                                <p key={index}>- {room.room_name} ({room.class}) - Tersedia <b>{room.available}</b></p>
                            ))}
                        </>
                    )
                )}
            </div>
            <div className="w-full">
                <small>{hospitalData.updated_at}</small>
            </div>
        </div>
    )
}

export default HospitalCard