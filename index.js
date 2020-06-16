const express = require('express')

const path = require('path');

const app = express()

const russian_model = require('./russian_model')
const italian_model = require('./italian_model')
const mandarin_model = require('./mandarin_model')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// Russian table

app.get('/russian', (req, res) => {
  russian_model.getRussian()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/russian/word/:id', (req, res) => {
  russian_model.getRussianWord(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/russian/word', (req, res) => {
  russian_model.createRussianWord(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/russian/word/:id', (req, res) => {
  russian_model.deleteRussianWord(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// Italian table

app.get('/italian', (req, res) => {
  italian_model.getItalian()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/italian/word/:id', (req, res) => {
  italian_model.getItalianWord(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/italian/word', (req, res) => {
  italian_model.createItalianWord(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/italian/word/:id', (req, res) => {
  italian_model.deleteItalianWord(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})


// Mandarin table

app.get('/mandarin', (req, res) => {
  mandarin_model.getMandarin()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/mandarin/word/:id', (req, res) => {
  mandarin_model.getMandarinWord(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/mandarin/word', (req, res) => {
  mandarin_model.createMandarinWord(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/mandarin/word/:id', (req, res) => {
  mandarin_model.deleteMandarinWord(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})