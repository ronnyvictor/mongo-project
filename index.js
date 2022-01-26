const mongdb = require ('mongodb')

const client = new mongdb.MongoClient('mongodb://localhost:27017')

const connectClient = async () => {
    await client.connect()
}

const getUserCollection = () => {
    const db = client.db('mongo-project')
    const col = db.collection ('users')
    return col
}

const getProductCollection = () => {
    const db = client.db('mongo-project')
    const col = db.collection ('products')
    return col
}

const insertUser = async () => {
    const col = getUserCollection()
    await col.insertOne({
        first: 'Ronny',
        last: 'Victor'
    })
    console.log("User  Inserted!")
}

const insertProduct = async () => {
    const col = getProductCollection()
    await col.insertOne({
        name: 'Apple',
        description: 'Type of fruit'
    })
    console.log("Product Inserted!")
}

const getUsers = async () => {
    const col = getUserCollection()
    const users = await col.find({}).toArray()
    return users
}

const getProducts = async () => {
    const col = getProductCollection()
    const products = await col.find({}).toArray()
    return products
}

connectClient()
.then(() => insertUser())
.then(() => insertProduct())
.then (() => getUsers())
.then((users) => console.log(users))
.then (() => getProducts())
.then((products) => console.log(products))
.then(() => client.close())