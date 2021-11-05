import { EmailList } from "./EmailList.interface";
import { SorterEvent } from "./SorterEventAPI.interface";

export interface ISorterEventBody {
  event: SorterEvent;
  recipient: EmailList;
}
