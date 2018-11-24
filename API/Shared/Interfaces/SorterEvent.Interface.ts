import Member from "./Member.interface";

export  interface SorterEvent {
    name: string;
    giftPrice: number;
    currency?: string;
    members: Array<Member>;
    date: Date;
}