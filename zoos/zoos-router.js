const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/lambda.sqlite3'
    },
    // debug: true,
  };
  
  const db = knex(knexConfig)
  
  
  router.get('/', (req, res) => {
    // returns a promise that resolves to all 
    db('zoos').then(zoos => {
      res.status(200).json(zoos);
    }).catch(error => {
      res.status(500).json({error: "I dind't found your zoo"});
    })
    // get the zoos from the database
  
  });

  router.get('/:id', (req, res) => {
    // retrieve an animal by id
    const { id } = req.params;
    db('zoos').where({id })
    .first()
    .then(zoos => {
      res.status(200).json(zoos)
    }).catch(error => {
      res.status(500).json({error: "The animals are not here. Look at somewhere else"})
    })
  
  });
  
  router.post('/', (req, res) => {
    // add an animal  to the database
  db('zoos').insert(req.body)
  .then(ids => {
    const id = ids[0];
  }).then(zoos => {
    res.status(201).json(zoos)
  }).catch(error => {
    res.status(500).json({error: "It's not impossible to add more animals. Try again"})
  })
  
  });
  
  router.put('/:id', (req, res) => {
    // update zoos
  db('zoos').where({id: req.params.id}).update(req.body)
  .then(count => {
    if(count > 0){
      res.status(204).json(count);
    } else {
      res.status(404).json({error: "We can update the animal info right now"});
    }
  })
  .catch(error => {
    res.status(500).json({error: "The animals are not here. Look at somewhere else" })
  })
  
  });
  
  router.delete('/:id', (req, res) => {
    // remove animal
    db('zoos').where({id: req.params.id})
    .del()
    .then(count => {
      if(count > 0){
        res.status(200).json(count);
      } else {
        res.status(404).json({error: "The animal that you are trying to delete is already dead or maybe escaped before."});
      }
    })
    .catch(error => {
      res.status(500).json({error: "The animals are not here. Look at somewhere else"})
    })
  
  });




  module.exports = router;