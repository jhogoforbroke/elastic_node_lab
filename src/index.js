const express = require('express')
const elasticsearch = require('elasticsearch')

const elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})

const app = express()

app.get('/', (req, res) => {
  res.send('App running!')
})

app.get('/ping', (req, res) => {
  elasticClient.ping({
    requestTimeout: 30000
  }, (err) => {
    if (err) return res.status(500).json({ msg: 'ElasticSearch is down!' });
    return res.status(200).json({ msg: 'ElasticSearch Cluster is up!' });
  })
})

app.post('/api/elasticsearch/createIndex', (req, res) => {
  let index = req.body.name

  elasticClient.indices.create({
    index: index
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.get('/api/elasticsearch/indexExists/:index', (req, res) => {
  let index = req.params.index

  elasticClient.indices.exists({
    index: index
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.put('/api/elasticsearch/mapping/:index', (req, res) => {
  let index = req.params.index
  let { docType, payload } = req.body

  elasticClient.indices.putMapping({
    index: index,
    type: docType,
    body: payload
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.post('/api/elasticsearch/document', (req, res) => {
  let { index, docType, payload } = req.body

  elasticClient.index({
    index: index,
    type: docType,
    body: payload
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.put('/api/elasticsearch/document/:index', (req, res) => {
  let index = req.params.index
  let { docType, id, payload } = req.body

  elasticClient.update({
    index: index,
    type: docType,
    id: id,
    body: payload
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.get('/api/elasticsearch/search', (req, res) => {
  let { index, docType, body } = req.query

  elasticClient.search({
    index: index,
    type: docType,
    body: payload
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.delete('/api/elasticsearch/delete/document/:id', (req, res) => {
  let id = req.params.id
  let { index, docType } = req.body

  elasticClient.delete({
    index: index,
    type: docType,
    id: id
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.delete('/api/elasticsearch/delete/documents', (req, res) => {
  elasticClient.delete({
    index: '_all'
  })
  .then(() => { return res.status(200).json(resp) })
  .catch(() => { return res.status(500).json(err) })
})

app.listen(3000, () => {
  console.log('Apps running on port 3000!')
})
