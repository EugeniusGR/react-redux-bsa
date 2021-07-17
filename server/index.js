const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

const messages = "./messages.json";
const users = "./user.json";

app.use(cors());
app.use(bodyParser.json());

app.get("/api/messages", (req, res, next) => {
  fs.readFile(messages, "utf8", function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.post("/api/new-message", (req, res, next) => {
  fs.readFile(messages, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      obj.push(req.body);
      json = JSON.stringify(obj);
      fs.writeFile(messages, json, "utf8", function (err) {
        if (err) throw err;
      });
      res.send(data);
    }
  });
});

app.put("/api/edit-message/:id", (req, res, next) => {
  fs.readFile(messages, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);

      let newMessages = obj.map((value) => {
        if (value.id === req.params.id) {
          value.text = req.body.newText;
        }
        return value;
      });

      json = JSON.stringify(newMessages);
      fs.writeFile(messages, json, "utf8", function (err) {
        if (err) throw err;
      });
      res.send(data);
    }
  });
});

app.delete("/api/delete-message/:id", (req, res, next) => {
  fs.readFile(messages, "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);

      let newMessages = obj.filter((value) => {
        if (value.id !== req.params.id) {
          return value;
        }
      });
      json = JSON.stringify(newMessages);

      fs.writeFile(messages, json, "utf8", function (err) {
        if (err) throw err;
      });
      res.send(data);
    }
  });
});

app.get("/api/users", (req, res, next) => {
  fs.readFile(users, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/api/users/add-new", (req, res, next) => {
  fs.readFile(users, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      obj.push(req.body);
      json = JSON.stringify(obj);
      fs.writeFile(users, json, "utf8", function (err) {
        if (err) throw err;
      });
      res.send(json);
    }
  });
});

app.put("/api/users/update/:login", (req, res, next) => {
  fs.readFile(users, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);

      let newUsers = obj.map((value) => {
        if (value.login === req.params.login) {
          value.login = req.body.login;
          value.password = req.body.password;
          value.mail = req.body.mail;
          value.adminPermission = req.body.adminPermission;
        }
        return value;
      });

      json = JSON.stringify(newUsers);
      fs.writeFile(users, json, "utf8", function (err) {
        if (err) throw err;
      });
      res.send(data);
    }
  });
});

app.delete("/api/users/delete/:login", (req, res, next) => {
  fs.readFile(users, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);

      let newUsers = obj.filter((value) => {
        if (value.login !== req.params.login) {
          return value;
        }
      });
      json = JSON.stringify(newUsers);

      fs.writeFile(users, json, "utf8", function (err) {
        if (err) throw err;
      });
      res.send(data);
    }
  });
});

app.listen(3030);
