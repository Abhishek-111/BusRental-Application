
export interface BusDetails {
    id:number,
    image:string,
    numberPlate:string,
    maker:string,
    model:string,
    rentalPrice:number,
    isAvailable:boolean
}

export interface searchBusParameters{
    Maker:string;
    Model:string;
    RentalPrice:number
}

// export interface BookingData{
//     busDetail:BusDetails
//     rentalDuration:number
// }

export interface BookingData{
    busId : number,
    numberPlate:string,
    maker:string,
    model:string,
    rentalPrice:number,
    rentalDuration:number
}

export interface RentalAgreementData{
    userId:number,
    vehicleId:number,
    rentalDuration:number,
    totalCost:number
    // requestForReturn:boolean,
    // validateReturnRequest:boolean
}

export interface UserRentalAgreements{
    busId:number,
    model:string,
    maker:string,
    rentalDuration:number,
    agreementDate:string,
    totalCost:number
}
export interface ReturnRequest{
    userId:number,
    busId:number
}

export interface AllRentalAgreements{
    agreementId:number,
    busId:number,
    userId:number,
    userPhone:string,
    userName:string,
    busModel:string,
    busMaker:string,
    rentalDuration:number,
    totalCost:number,
    requestForReturn:boolean,
    validateReturnRequest:boolean,
    bookingDate:string
    
}

