import Member from "./Member.interface";

export  interface SorterEvent {
    name: String;
    templateBody: String;
    members: Array<Member>;
    date: Date;
}