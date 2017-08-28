var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key))
    {
      arr.push(key + "=" + 1);
    }
  }

  return arr.toString();
}

var orm = {
  all: function(table, cb)
    {
      var queryString = "SELECT * FROM " + table;
      connection.query(queryString, function(err, result)
      {
        if(err) throw err;
        cb(result);
      });
    },
    create: function(table, cols, vals, cb)
    {
      var queryString = "INSERT INTO " + table + " ("+cols.toString()+") VALUES ("+printQuestionMarks(vals.length)+")";

      console.log("Create: " + queryString);

      connection.query(queryString, vals, function(err, result)
      {
        if(err) throw err;
        cb(result);
      });
    },
    update: function(table, objColVals, condition, cb)
    {
      var queryString = "UPDATE "+table+" SET " +objToSql(objColVals)+" WHERE "+ condition;
      console.log(queryString);
      connection.query(queryString, function(err, result)
      {
        if(err) {throw err;}
        cb(result);
      });
    },
    delete: function(table, condition, cb)
    {
      var queryString = "DELETE FROM "+table+" WHERE "+condition;
      connection.query(queryString, function(err, result)
      {
        if(err) {throw err;}
        cb(result);
      });
    }
}

module.exports = orm;
