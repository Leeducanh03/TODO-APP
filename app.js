// Bài 1
// const express = require('express')
//  const app = express()
//  const port = 3000

//  app.get('/', (req, res) => {
//    res.send('Hello World!')
//  })

//  app.listen(port, () => {
//    console.log(`Example app listening on http://127.0.0.1:${port}`)
//  })

// Bài 2
// const express = require('express')
// const app = express()
// const port = 3000
// const fs = require("fs");
// const bodyParser = require("body-parser");
// const { json } = require('body-parser');


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Buoc1
app.get('/api/v1/todos', (req, res) => {
  fs.readFile("./dev-data/todos.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        err: err,
        status: "fail",
        message: err.message,
      });
    }
    res.status(200).json({
      status: "successfully",
      data: JSON.parse(data)
    })
  })
})

// Buoc2.
app.get('/api/v1/todos/:id', (req, res) => {
  let { id } = req.params;
  fs.readFile("./dev-data/todos.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        err: err,
        status: "fail",
        message: err.message,
      });
    }
    data = JSON.parse(data)
    let filter = data.filter((e) => `${e.id}` === id)
    res.status(200).json({
      status: "success",
      data: filter
    })
  })
})

// Buoc3.
app.post('/api/v1/todos', (req, res) => {
  let { title, id, userId, completed } = req.body;
  let reqq = {
    userId,
    id,
    title,
    completed
  }
  fs.readFile("./dev-data/todos.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        err: err,
        status: "fail",
        message: err.message
      });
    }
    data = JSON.parse(data);
    let find = data.find((e) => `${e.title}` === title)
    data.push(reqq);
    if (!find) {
      fs.writeFile("./dev-data/todos.json", JSON.stringify(data), (err) => {
        if (err) {
          res.status(200).json({
            err: err,
            status: "fail",
            message: err.message,
          });
        }
        res.status(200).json({
          data: data,
          status: "Create successfully",
        });
      })

    }
  })
})

// Buoc4.
app.put('/api/v1/todos/:id', checkExist, (req, res) => {
  let { id } = req.params;
  fs.readFile("./dev-data/todos.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        err: err,
        status: "fail",
        message: err.message,
      });
    }
    data = JSON.parse(data);
    let findIndex = data.findIndex((e, i) => `${e.id}` === id);
    data[findIndex] = { ...data[findIndex], ...req.body }
    if (!findIndex) {
      res.status(500).json({
        status: "fail",
        message: "Todo not found"
      })
    }
    fs.writeFile("./dev-data/todos.json", JSON.stringify(data), (err) => {
      if (err) {
        res.status(500).json({
          err: err,
          status: "fail",
          message: err.message,
        })
      }
    })
    res.status(200).json({
      status: "successfully",
      message: "Update successfully"
    })
  })
})

// B5.
app.delete('/api/v1/todos/:id', (req, res) => {
  let { id } = req.params;
  fs.readFile("./dev-data/todos.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        err: err,
        status: "fail",
        message: err.message,
      });
    }
    data = JSON.parse(data);
    let findIndex = data.findIndex((e, i) => `${e.id}` === id);
    data[findIndex] = { ...data[findIndex], ...req.body }
    if (!findIndex) {
      res.status(500).json({
        status: "fail",
        message: "Todo not found"
      })
    }
    data.splice(findIndex, 1);
    fs.writeFile("./dev-data/todos.json", JSON.stringify(data), (err) => {
      if (err) {
        res.status(500).json({
          err: err,
          status: "fail",
          message: err.message
        })
      }
      res.status(200).json({
        status: "successfully",
        message: "Delete successfully"
      })
    })
  })
})

// Bài 3.
function checkExist(req, res, next) {
  let { id } = req.params;
  fs.readFile("./dev-data/questions.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({
        err,
        status: "fail",
        mesage: err.mesage
      });
    } else {
      data = JSON.parse(data);
      let findIndex = data.findIndex((e, i) => `${e.id}` === id);
      data[findIndex] = { ...data[findIndex], ...req.body }
      if (!findIndex) res.status(500).json({ message: "Todo not found" });
      next();
    }

  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Bài 4
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("index.html", {root: "public"});
})


app.listen(port, () => {
    console.log(`server is listen on http://127.0.0.1:${port}`);
})