const fs = require("fs")
const path = require('path');
class ServiceStore {
    constructor(store) {
      this.store = store;
    }
  
    execute() {
      const folderPath = this.store.getFolderPath();
      this.processFilesInFolder(folderPath);
   
    }
    processFilesInFolder(folderPath) {
      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error(`Unable to scan directory: ${err}`);
          return;
        }
  
        files.forEach(file => {
          const filePath = path.join(folderPath, file);
         
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Unable to read file ${file}: ${err}`);
              return;
            }
            console.log(filePath)
            // Send the content of each file to the store.execute method
            this.store.execute(data);
          });
        });
      });
    }
  }
  
  module.exports = ServiceStore;
  