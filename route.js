const express = require('express');

const app = express(); 
app.use(express.json());

let persons=[
{id:0,name:'John'},
{id:1,name:'Jane'}
]; 

app.get('/persons',(req,res)=>{
            res.json(persons);
        })


function getPerson(id) {
  return persons.find(p => p.id === +id);
}

app.get('/persons/:id',(req,res)=>{
  res.json(getPerson(req.params.id));
})

function insertPerson(p) {
  p.id = persons.length;
  persons.push(p);
  return p;
}

app.post('/person',
      (req, res) => {
          const p = insertPerson(req.body);
          res.status(201)
              .set('Location', '/persons/' + p.id)
              .json(p);
      })

function removePerson(id) {
  persons = persons.filter(p => p.id !== +id);
}

app.delete('/person/:id',(req, res) => {
  removePerson(req.params.id);
  res.status(204)
  .end();
})

app.listen(3040,()=>{
  console.log('server yemshi');
});
