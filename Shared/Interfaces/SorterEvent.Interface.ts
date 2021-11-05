import Member from "./Member.interface";

export default interface SorterEvent {
    name: string;
    templateBody: string;
    members: Array<Member>;
    date: Date;
}