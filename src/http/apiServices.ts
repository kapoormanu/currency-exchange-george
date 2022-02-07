import { HttpCurrencyService } from 'http/services/HttpCurrencyService';
import { AxiosHttpClient } from 'http/clients/AxiosHttpClient';

export const currencyService = HttpCurrencyService(AxiosHttpClient());