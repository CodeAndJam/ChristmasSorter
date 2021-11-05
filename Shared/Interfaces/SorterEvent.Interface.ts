import Member from "./Member.interface";

export default class SorterEvent {
    name: string;
    templateBody: string;
    members: Array<Member>;
    date: Date;
}