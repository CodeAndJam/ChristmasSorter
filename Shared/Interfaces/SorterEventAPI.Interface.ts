import { Member } from "./Member.interface.ts";

export interface SorterEvent {
  name: string;
  giftPrice: number;
  currency?: string;
  members: Array<Member>;
  date: string;
}
