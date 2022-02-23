export const imagePerform = (data, static_url: string) => {
    if (data.length) {
        return data.map(elt => {
            if (elt && elt.avatar) {
                elt.avatar = `${static_url}${elt.avatar}`;
            }
            if (elt.seller_info && elt.seller_info.identity_card && elt.seller_info.identity_card.url) {
                elt.seller_info.identity_card.url = `${static_url}${elt.seller_info.identity_card.url}`;
            }
            return elt;
        })
    }
    if (data && data.avatar) {
        data.avatar = `${static_url}${data.avatar}`;
    }
    if (data.seller_info && data.seller_info.identity_card && data.seller_info.identity_card.url) {
        data.seller_info.identity_card.url = `${static_url}${data.seller_info.identity_card.url}`;
    }
    return data;
}