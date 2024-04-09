/* eslint-disable prettier/prettier */
export const imagePerform = (data, staticUrl: string) => {
    if (data.length) {
        return data.map(elt => {
            if (elt && elt.avatar) {
                elt.avatar = `${staticUrl}${elt.avatar}`;
            }
            if (elt.sellerInfo && elt.sellerInfo.identityCard && elt.sellerInfo.identityCard.url) {
                elt.sellerInfo.identityCard.url = `${staticUrl}${elt.sellerInfo.identityCard.url}`;
            }
            return elt;
        })
    }
    if (data && data.avatar) {
        data.avatar = `${staticUrl}${data.avatar}`;
    }
    if (data.sellerInfo && data.sellerInfo.identityCard && data.sellerInfo.identityCard.url) {
        data.sellerInfo.identityCard.url = `${staticUrl}${data.sellerInfo.identityCard.url}`;
    }
    return data;
}