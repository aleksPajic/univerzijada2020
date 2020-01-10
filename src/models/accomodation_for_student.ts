export interface AccomodationForStudent {
    student: string,
    hotel: {
        name: string,
        address: string
    },
    restaurant: {
        name: string,
        address: string
    }
}