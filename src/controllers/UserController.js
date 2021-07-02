const {
    restart
} = require('nodemon');
const User = require('../models/User');
const Key = require('../models/Key');
const { use } = require('../routes');

module.exports = {
    async index(req, res) {
        const key = req.query.key;
        if (!key) {
            return res.json({
                Status: "Acesso negado."
            })
        }
        const valid = await Key.findAll({
            where: {
                key_text: key
            }
        })
        if (valid.length > 0) {
            //Valid key, we need to check for user id now
            const id = req.params.id;
            if(id) {
                const user = await User.findAll({
                    where: {
                        id: id
                    }
                })
                if(user.length > 0) {
                    return res.json({
                        user
                    })
                }
                return res.json({
                    Status: "Usuario nao existe"
                })
                
            }
            const users = await User.findAll();
            return res.json({
                users
            });
        }
        return res.json({
            Status: "Acesso negado."
        })
    },
    async store(req, res) {
        const key = req.query.key;
        const { name, ip } = req.body;

        if (!key) {
            return res.json({
                Status: "Voce nao pode criar usuarios."
            })
        }
        const valid = await Key.findAll({
            where: {
                key_text: key
            }
        })
        if (valid.length > 0) {
            const users = await User.findAll({
                where: {
                    name: name,
                    ip: ip
                }
            });
            if(users.length > 0) {
                return res.json({
                    Status: "Usuário ja existe"
                })
            }

            const create_user = await User.create({
                name: name,
                ip: ip
            });
    
            return res.json(create_user);


        }

    }
};