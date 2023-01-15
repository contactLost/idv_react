import * as AxiosConfig from "../AxiosConfig.js";



export async function addItem(itemDesc: string,itemName: string,itemQuan: number){

    const result = await AxiosConfig.default.post(
        "/item/additem",
        {
            "itemDesc": "itemDesc",
            "itemName": "itemName",
            "itemQuan": itemQuan
        })
    
    return result.data;
}

export async function getItemList() {
    const result = await AxiosConfig.default.get(
        "/item/getItemsOfUser"
    )

    return result;
}

export class ItemListResponse{

    itemList: [
        {
            "id": number,
            "itemName": string,
            "itemDescription": string,
            "itemQuantity": number,
            "itemOwner": null
        }
    ]

}

