const { argv } = require("node:process");
const fs = require("node:fs");

const command = argv[2];

if (command === "add") {
  let content = [];
  let id = 0;
  if (fs.existsSync("tracker.json")) {
    //file exists so append create record to json
    let file = JSON.parse(fs.readFileSync("tracker.json", "utf-8"));
    id = file.length;
    let temp = {
      id: id,
      task: argv[3],
    };
    const newFile = [...file, temp];
    content = JSON.stringify(newFile);
  } else {
    //create record and make json
    id = 0;
    content = JSON.stringify([{ id: id, task: argv[3] }]);
  }
  //if not exists create else write file with above contents
  fs.writeFile("tracker.json", content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`task added successfully ID:${id}`);
    }
  });
}
