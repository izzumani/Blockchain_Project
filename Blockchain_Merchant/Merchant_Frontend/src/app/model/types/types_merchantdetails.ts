export type Merchant = {
    MerchantName: string;
    MerchantBitcoinKey: string;
    Address: string;
    City: string;
    Country: string;
    VatNumber: string;
    PinNumber: string;
}

export type MerchantQuery = {
    MerchantDetailsData : Merchant;
} 