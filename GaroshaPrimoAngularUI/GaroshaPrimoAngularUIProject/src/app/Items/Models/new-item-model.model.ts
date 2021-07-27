export class NewItemModel {
    ItemNameEnglish: string;
    ItemOtherName: string;
    ProducerCompanyId: number;
    ItemSellingPrice: number;
    ItemBuyingDiscountPercentage: number;
    ItemBuyingPrice: number;
    TaxesPercentageOnBuying: number;
    TaxesValueOnBuying: number;
    TaxesPercentageOnSelling: number;
    TaxesValueOnSelling: number;
    ItemDescription: string;
    ItemStatus: string;

    ItemCodes: string[];
    TherapeuticClassesIds: number[];
    IngredientsIds: number[];
}
