const {picture, user} = require('../models')



class PictureController{
    static async allPicture(req, res){
        try {       
            let pictures = await picture.findAll({
                order:[
                  ['id', 'DESC']
                ],
                include:[
                    user
                ]
            })
            res.status(200).json(pictures);
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getPictureById(req, res){
        try {
            const id = +req.params.id;
            let result = await picture.findByPk(id,{
               include: 
                     [user] 
            });
            result
              ? res.status(200).json(result)
              : res.status(404).json({
                  message: `Picture not found!`,
                });
          } catch (e) {
            res.status(500).json({
              message: "Server Error",
            });
          }
    }
    static async selfPicture(req, res){
        try {
            const {id} = req.userData
            let result = await picture.findAll({
                where:{
                    userId:id
                },
               include: 
                     [user] 
            });
            result
              ? res.status(200).json(result)
              : res.status(404).json({
                  message: `Picture not found!`,
                });
          } catch (e) {
            res.status(500).json({
              message: "Server Error",
            });
          }
    }
    static async add(req, res){
        try {
            const { caption } = req.body;
            // const image = req.file.filename
            const{id} = req.userData
            let namePic =  req.protocol + "://" + req.get("host") + "/assets/" + req.file.filename;
            let result = await picture.create({
                image:namePic, caption, userId:id
            });
            res.status(201).json(result);
          } catch (error) {
            res.status(500).json(error);
          }
    }
    static async update(req, res){
        try {
            const id = +req.params.id;
            const { caption } = req.body;
            let product = await picture.update(
              {
                  caption
              },
              {
                where: { id },
              }
            );
    
            res.status(200).json (product);
          } catch (err) {
            res.status(500).json(err);
          };
    }
    static async remove(req, res){
        try {
            const id = +req.params.id;
            let result = await picture.destroy({ where: { id } })
    
            result === 1 ?
                res.status(200).json({
                    message: `Id ${id} deleted!`
                }) : res.status(400).json({
                    message: `Id ${id} not deleted!`
                })
        } catch (err) {
            res.status(500).json(err)
        }
      
    }
}

module.exports = PictureController