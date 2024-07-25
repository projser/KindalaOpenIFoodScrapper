const minimist = require('minimist');
const path = require('path');
const ServiceStore = require('./Service/ServiceStore');
const DependencyRegistry = require('./Registry/DependencyRegistry');



// Parse command-line arguments
const args = minimist(process.argv.slice(2));
const { type, recipient,location } = args;



if (!type || !recipient || !location) {
  console.error('Usage: node script.js --type IFood --recipient <recipient> --location <path to folder where the files are>');
  process.exit(1);
}

// Resolve the file name dynamically based on the type argument
const fileName = type.charAt(0).toUpperCase() + type.slice(1) + 'Store';
const filePath = path.resolve(__dirname, 'Store', fileName + '.js');

// Dynamically load the notification class based on the file name
const ServiceStoreClass = require(filePath);

const registry = new DependencyRegistry();
const params = { recipient,location };

// Register the notification instance in the registry
registry.register(type + 'Store', new ServiceStoreClass(params));

// Retrieve the notification instance from the registry
const store = registry.get(type + 'Store');

// Create and use the NotificationService
const storeService = new ServiceStore(store);
storeService.execute();
