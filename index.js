const { argv } = require("node:process");
const fs = require("node:fs");

const command = argv[2];

// Adding Tasks

if (command === "add") {
  let content = "";
  let record = {
    id: 1,
    description: argv[3],
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  if (fs.existsSync("tracker.json")) {
    //file exists so append create record to json
    let file = JSON.parse(fs.readFileSync("tracker.json", "utf-8"));
    record.id = file.length + 1;
    const newFile = [...file, record];
    content = JSON.stringify(newFile);
  } else {
    //create record and make json
    content = JSON.stringify([record]);
  }
  //if not exists create else write file with above contents
  fs.writeFile("tracker.json", content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Task added successfully (ID:${record.id})`);
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
          return { ...f, description: task, updatedAt: Date.now() };
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

// Delete

if (command === "delete") {
  let id = argv[3];
  if (fs.existsSync("tracker.json")) {
    let file = JSON.parse(fs.readFileSync("tracker.json", "utf-8"));
    let newFile = file.filter((f, _) => f.id != parseInt(id));
    if (newFile.length === file.length)
      throw new Error("Task specified does not exist");
    let content = JSON.stringify(newFile);
    fs.writeFileSync("tracker.json", content, (err) => {
      if (err) throw new Error(err);
      else console.log(`Task (ID:${id}) deleted successfully`);
    });
  } else throw new Error("No Task Exist, Please add before deleting");
}

// List all tasks

if (command === "list") {
  if (fs.existsSync("tracker.json")) {
    let file = JSON.parse(fs.readFileSync("tracker.json", "utf-8"));
    if (file.length === 0)
      throw new Error("No Tasks Exist, Consider adding some");
    file.map((f, _) => {
      console.log("\n");
      console.log(`Task ID - ${f.id}`);
      console.log(`Description - ${f.description}`);
      console.log(`Status - ${f.status}`);
      console.log(`Created At - ${f.createdAt}`);
      console.log(`Updated At - ${f.updatedAt}`);
    });
  } else {
    throw new Error("No Tasks Exist, Consider adding some");
  }
}
