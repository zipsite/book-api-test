process.env.NODE_ENV = "test";
const fs = require("fs");



//Подключаем dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
let should = chai.should();

chai.use(chaiHttp);

describe("Books", () => {
    beforeEach((done) => {
        let books = JSON.parse(fs.readFileSync("db.json", "utf8"));
        books = [];
        fs.writeFileSync("db.json", JSON.stringify(books));
        done();
    });

    describe("/GET books", () => {
        it("it should GET all the books", (done) => {
            chai
                .request(server)
                .get("/api/books")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe("/POST books", () => {
        it("it should not POST a book without pages field", (done) => {
            let book = {
                name: "Drop it Like It's Hot",
                author: "Прасковья Морозова",
                year: 2022,
                tags: "cute",
                promiser: "Герман Комиссаров",
                dateTook: "20.10.2022",
                dateReturn: "14.06.2023"
            };
            chai
                .request(server)
                .post("/api/books")
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name");
                    res.body.should.have.property("author");
                    res.body.should.have.property("year");
                    res.body.should.have.property("tags");
                    res.body.should.have.property("promiser");
                    res.body.should.have.property("dateTook");
                    res.body.should.have.property("dateReturn");
                    done();
                });
        });
    });
});

describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
        let book = {
            name: "Drop it Like It's Hot",
            author: "Прасковья Морозова",
            year: 2022,
            tags: "cute",
            promiser: "Герман Комиссаров",
            dateTook: "20.10.2022",
            dateReturn: "14.06.2023"
        };

        let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

        let bookId = 0;
        for (let i = 0; i < books.length; i++) {
            bookId = bookId > books[i].id ? bookId : books[i].id;
        }

        book.id = bookId == 0 ? 0 : bookId + 1;

        books.push(book);

        fs.writeFileSync('db.json', JSON.stringify(books));

        chai.request(server)
            .get('/api/books/' + book.id)
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("name");
                res.body.should.have.property("author");
                res.body.should.have.property("year");
                res.body.should.have.property("tags");
                res.body.should.have.property("promiser");
                res.body.should.have.property("dateTook");
                res.body.should.have.property("dateReturn");
                done();
            });

    });
});

describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
        let book = {
            name: "Drop it Like It's Hot",
            author: "Прасковья Морозова",
            year: 2022,
            tags: "cute",
            promiser: "Герман Комиссаров",
            dateTook: "20.10.2022",
            dateReturn: "14.06.2023"
        };

        let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

        let bookId = 0;
        for (let i = 0; i < books.length; i++) {
            bookId = bookId > books[i].id ? bookId : books[i].id;
        }

        book.id = bookId == 0 ? 0 : bookId + 1;
        console.log(book.id);

        books.push(book);

        fs.writeFileSync('db.json', JSON.stringify(books));

        chai.request(server)
            .put('/api/books/' + book.id)
            .send({
                name: "Drop it Like It's Hot",
                author: "Прасковья Моро",
                year: 2025,
                tags: "cute",
                promiser: "Герман Комиссаров",
                dateTook: "20.10.2022",
                dateReturn: "14.06.2023"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("name");
                res.body.should.have.property("author");
                res.body.should.have.property("year");
                res.body.should.have.property("tags");
                res.body.should.have.property("promiser");
                res.body.should.have.property("dateTook");
                res.body.should.have.property("dateReturn");
                done();
            });
    });
});

describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
        let book = {
            name: "Drop it Like It's Hot",
            author: "Прасковья Морозова",
            year: 2022,
            tags: "cute",
            promiser: "Герман Комиссаров",
            dateTook: "20.10.2022",
            dateReturn: "14.06.2023"
        };

        let books = JSON.parse(fs.readFileSync('db.json', 'utf8'));

        let bookId = 0;
        for (let i = 0; i < books.length; i++) {
            bookId = bookId > books[i].id ? bookId : books[i].id;
        }

        book.id = bookId == 0 ? 0 : bookId + 1;

        books.push(book);

        fs.writeFileSync('db.json', JSON.stringify(books));
        chai.request(server)
            .delete('/api/books/' + book.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("name");
                res.body.should.have.property("author");
                res.body.should.have.property("year");
                res.body.should.have.property("tags");
                res.body.should.have.property("promiser");
                res.body.should.have.property("dateTook");
                res.body.should.have.property("dateReturn");
                done();
            });
    });
});