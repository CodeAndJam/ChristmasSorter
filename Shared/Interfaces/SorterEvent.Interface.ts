import Member from "./Member.interface";

export default interface SorterEvent {
    name: string;
    participants: Array<Member>;
    giftPrice: string;
    date: Date;
    currency: string;
}