export type Currency = {
    currency: string;
    nameI18N?: string;
    exchangeRate?: {
        buy: string;
        sell: string;
    };
    flags?: string[];
    precision?: number;
};
