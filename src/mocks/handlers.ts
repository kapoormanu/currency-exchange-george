import { rest } from 'msw';
import fxData from 'mocks/data/fx.json';
import { GET_CURRENCIES_ENDPOINT } from 'http/endpoints';

const defaultHandler = () => {
    return rest.get(GET_CURRENCIES_ENDPOINT, (req, resp, ctx) => {
        return resp(ctx.json(fxData));
    });
};

export const currencyHandlerException = rest.get(GET_CURRENCIES_ENDPOINT, async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
);
export const currencyHandlerEmpty = rest.get(GET_CURRENCIES_ENDPOINT, async (req, res, ctx) => {
    return res(ctx.json({ ...fxData, fx: [] }));
});

export const handlers = [defaultHandler()];
