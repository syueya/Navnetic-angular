import { MediaSourceEnum } from "src/app/modules/media-item/enums/MediaSourceEnum";

import { stringToBase64 } from "./convertUtil";
import { getFullUrl } from "./urlUtils";

export function imageProxy(imgUrl: string,mediaSource:MediaSourceEnum): string {
    const imageBase64 = stringToBase64(imgUrl);
    return getFullUrl(`/api/v1/media/imageProxy?url=${imageBase64}&source=${mediaSource}`);
  }