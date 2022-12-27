var db = require('./dbconnection'); 

var Devolucoes = {

   getDevolucoes: function (callback) {
      return db.query("SELECT * FROM devolucoes ORDER BY nome", 
                      null, callback);

   },

   addDevolucao: function (devolucao, callback) {
      return db.query("INSERT INTO devolucoes (id, nome, livro, status) VALUES (?,?,?,0)", 
         [
            devolucao.id, devolucao.nome, devolucao.livro
         ], callback);
   },

   excluirDevolucao: function (id, callback) {
      return db.query("DELETE FROM devolucoes WHERE id=?", [id], callback);
   },

   updateDevolucao: function (devolucao, callback) {
      return db.query("UPDATE devolucoes SET nome=?, livro=? WHERE id=?", 
         [
            devolucao.nome, devolucao.livro, devolucao.id
         ], callback);
   }

};

module.exports = Devolucoes;