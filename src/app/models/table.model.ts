import { TypeColumnEnum } from "../utils/enums/type-column.enum";
import { ButtonProps } from "./button.model";

export interface TableColumnProps {
    id: string,
    label: string,
    type: TypeColumnEnum,
    actions?: ButtonProps[],
    onHandleClick?: ()=> void
}