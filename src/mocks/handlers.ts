import { rest } from 'msw';
import fxData from 'mocks/data/fx.json';
const getCurrenciesUrl = 'https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343';
export const handlers = [
    rest.get(getCurrenciesUrl, (req, resp, ctx) => {
        return resp(ctx.json(fxData));
    })
];
export const currencyHandlerException = rest.get(getCurrenciesUrl, async (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'Deliberately broken request' }))
);
export const currencyHandlerEmpty = rest.get(getCurrenciesUrl, async (req, res, ctx) => {
    return res(ctx.json({ ...fxData, fx: [] }));
});
