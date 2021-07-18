const {
    restart
} = require('nodemon');

const {
    findAll
} = require('../models/Key');
const Key = require('../models/Key');

module.exports = {
    async index(req, res) {
        const key = req.query.key;
        if (!key) {
            return res.json({
                Status: "Acesso negado"
            })
        }
        const valid = await Key.findAll({
            where: {
                key_text: key
            }
        })
        if (valid.length > 0) {
            const keys = await Key.findAll();
            return res.json({
                keys
            })
        }
        return res.json({
            Status: "Acesso negado."
        })
    },
    async store(req, res) {
        const api_key = req.query.key;
        const key = req.body.key;
        const numberKeys = await Key.findAll();

        if (numberKeys.length === 0) {
            const create_key = await Key.create({
                key_text: key
            });
            return res.json({
                create_key
            });
        }

        if (api_key) {

            const valid = await Key.findAll({
                where: {
                    key_text: api_key
                }
            })
            if (valid.length > 0) {

                const keyExist = await Key.findAll({
                    where: {
                        key_text: key
                    }
                })

                if(keyExist.length > 0) {
                    return res.json({
                        Status: "Essa key já existe."
                    })
                }

                const create_key = await Key.create({
                    key_text: key
                });

                return res.json(create_key);
            }
            return res.json({
                Status: "Chave invalida."
            });

        }

        return res.json({
            Status: "Nao pode postar sem chave"
        });
    },
    async delete(req, res) {
        const api_key = req.query.key;
        if (api_key) {
            return res.json({Status: api_key})
        }
        return res.json({
            Erro: "Voce precisa de uma key para deletar outras keys."
        })
    }
};