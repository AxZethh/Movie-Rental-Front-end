import { PaymentType } from "../enum/paymentType";
import { Film } from "./Film.dto";

export type RentalDto = {
    id?: string;
    consumer?: string;
    films: Film[];
    totalPrice?: number;
    paymentType: PaymentType;
    rentalDate?: Date;
}