const fs = require('fs');

const envelopesFunctions = {
    getAll: async (req,res) => {
        try{
        const data = await fs.promises.readFile('./routes/envelopes.json', 'utf8').then((data) => {
            return JSON.parse(data)
        })
        res.json(data)
        } catch(err){
            console.log(err)
        }
    },
    save : async (req,res) => {
        try{
        let data = await fs.promises.readFile('./routes/envelopes.json', 'utf8').then((data) => {
            return JSON.parse(data)
        })
        const object = req.body
        object.id = data.length + 1
        data.push(object)
        await fs.promises.writeFile('./routes/envelopes.json', JSON.stringify(data))
        res.json(object)
        }catch(err){
            console.log(err)
        }
    },
    getById: async (req,res) => {
        try{
        const data = await fs.promises.readFile('./routes/envelopes.json', 'utf8').then((data) => {
            return JSON.parse(data)
        })
        const id = req.params.id
        const envelope = data.find(e => e.id == id)
        res.json(envelope)
        }catch(err){
            console.log(err)
        }
    },
    transferBudget: async (req,res) => {
        try {
            const data = await fs.promises.readFile('./routes/envelopes.json', 'utf8').then((data) => {
                return JSON.parse(data)
            })
            if (req.params.from == req.params.to) {
                res.status(400).send('From and To params must be different')
            }
            if (typeof req.params.from !== 'string'  || typeof req.params.from !== 'string') {
                res.status(400).send('From and To params must be strings')
            }
            const tranfered = data.find(e => e['title'] == req.params.from)
            const toTransfer = data.find(e => e['title'] == req.params.to)
            if (!tranfered ||!toTransfer) {
                res.status(400).send('Envelope not found')
            }
            tranfered.budget -= req.body.budget
            toTransfer.budget += req.body.budget
            await fs.promises.writeFile('./routes/envelopes.json', JSON.stringify(data))
            res.send('Budget transfered')
        }catch(err){
            console.log(err)
        }
    },
    delete: async (req,res) => {
        try{
        const data = await fs.promises.readFile('./routes/envelopes.json', 'utf8').then((data) => {
            return JSON.parse(data)
        })
        const id = req.params.id
        const envelope = data.find(e => e.id == id)
        data.splice(data.indexOf(envelope),1)
        await fs.promises.writeFile('./routes/envelopes.json', JSON.stringify(data))
        res.json(envelope)
        }catch(err){
            console.log(err)
        }
    },
    update: async (req,res) => {
        try{
        const data = await fs.promises.readFile('./routes/envelopes.json', 'utf8').then((data) => {
            return JSON.parse(data)
        })
        const id = req.params.id
        const envelope = data.find(e => e.id == id)
        envelope.title = req.body.title
        envelope.budget = req.body.budget
        await fs.promises.writeFile('./routes/envelopes.json', JSON.stringify(data))
        res.json(envelope)
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = envelopesFunctions;