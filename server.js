var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
const db = require('./repository');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/devolucoes', function (req, res) {
   db.getDevolucoes(function (err, rows) {
      if (err) {
         res.json(err);
      } 
      else {
         res.json(rows);
      }
   });
});

app.post('/devolucoes', function (req, res) {
   var obj = req.body;
   obj.data = new Date(obj.data);

   if (!obj.id) {
      obj.id = Math.trunc((new Date().getTime()) / 1000);
      db.addDevolucao(obj, function (err, rs) {
         if (err) {
            res.json(err);
         } 
         else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('Devolução registrada com sucesso!');
         }
      });
   } else {
      db.updateDevolucao(obj, function (err, rs) {
         if (err) {
            res.json(err);
         } 
         else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('Devolução atualizada com sucesso!');
         }
      });   
   }
});

app.delete('/devolucoes/:vid', function (req, res) {
   db.excluirDevolucao(req.params.vid, function (err, rs) {
      if (err) {
         res.json(err);
      } 
      else {
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.end('Devolução excluída com sucesso!');
      }
   });
});

var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("Escutando na porta %s", port);
});

