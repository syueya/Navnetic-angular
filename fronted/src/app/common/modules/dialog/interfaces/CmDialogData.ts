import { CmDialogDataModel } from "../enum/CmDialogDataModel";

export interface CmDialogData {
    /* 类型 */
    model:CmDialogDataModel;
    /* 标题 */
    title?: string;
    /* 内容 */
    content?: string;
    /* 确认按钮文字 */
    sureStr?: string;
    /* 取消按钮文字 */
    cancelStr?: string;

    /** 宽度 */
    width?:string;
}