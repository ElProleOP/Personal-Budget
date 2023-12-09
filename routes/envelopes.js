const { Router } = require('express');
const routerEnvelopes = Router();
const envelopesFunctions = require('./helper');

routerEnvelopes.param('id', (req, res, next, id) => {
    if (isNaN(id)) {
        res.status(400).send('Id must be a number');
    } else {
        next();
    }
});


routerEnvelopes.get('/', envelopesFunctions.getAll);
routerEnvelopes.post('/', envelopesFunctions.save);
routerEnvelopes.get('/:id', envelopesFunctions.getById);
routerEnvelopes.post('/transfer/:from/:to', envelopesFunctions.transferBudget);
routerEnvelopes.put('/:id', envelopesFunctions.update);
routerEnvelopes.delete('/:id', envelopesFunctions.delete);
module.exports = routerEnvelopes;