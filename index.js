const { argv } = require("node:process");
const fs = require("node:fs");

const command = argv[2];

// Adding Tasks
if (command === "add") {
  let content = [];
  let id = 0;
  if (fs.existsSync("tracker.json")) {
    //file exists so append create record to json
    let file = JSON.parse(fs.readFileSync("tracker.json", "utf-8"));
    id = file.length;
    let temp = {
      id: id + 1,
      task: argv[3],
    };
    const newFile = [...file, temp];
    content = JSON.stringify(newFile);
  } else {
    //create record and make json
    id = 1;
    content = JSON.stringify([{ id: id, task: argv[3] }]);
  }
  //if not exists create else write file with above contents
  fs.writeFile("tracker.json", content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Task added successfully (ID:${id})`);
    }
  });
}

// Edit

if (command === "update") {
  let id = argv[3];
  let task = argv[4];
  if (fs.existsSync("tracker.json")) {
    let file = JSON.parse(fs.readFileSync("tracker.json", "utf-8"));
    if (parseInt(id) > file.length || parseInt(id) <= 0)
      throw new Error("Task does not exist, please create first");
    else {
      let newFile = file.map((f, _) => {
        if (f.id === parseInt(id)) {
          return { ...f, task: task };
        } else return f;
      });
      newFile = JSON.stringify(newFile);
      fs.writeFile("tracker.json", newFile, (err) => {
        if (err) console.error(err);
        else console.log(`Task (ID:${id}) updated successfully`);
      });
    }
  } else throw new Error("Task does not exist, please create first");
}
