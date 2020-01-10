export interface Accomodation {
    name: string,
    address: string,
    impressions: {
        comment: string,
        rating: number,
        student: string
    }[]
}