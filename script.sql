DROP TABLE devolucoes;

CREATE TABLE devolucoes (
	id int not null unique primary key,
    nome varchar(100) not null,
    livro varchar(100) not null,
    status smallint default 0
);

INSERT INTO devolucoes (id, nome, livro) VALUES
(1, 'Marcos', 'O Ateneu'),
(2, 'Mateus', 'Lucíola'),
(3, 'Lucas', 'Esaú e Jacó'),
(4, 'João', 'A República'),
(5, 'Maria', 'Crítica da Razão Pura'),
(6, 'José', 'Metafísica'),
(7, 'Pedro', 'Crime e Castigo'),
(8, 'Paulo', 'Os Irmãos Karamazov'),
(9, 'Tiago', 'Fenomenologia do Espírito'),
(10, 'Bartolomeu', 'Divina Comédia')
;

SELECT * FROM devolucoes ORDER BY nome;