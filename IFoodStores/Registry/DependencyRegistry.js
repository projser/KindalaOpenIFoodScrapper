class DependencyRegistry {
    constructor() {
      this.dependencies = {};
    }
  
    register(name, dependency) {
      this.dependencies[name] = dependency;
    }
  
    get(name) {
      const dependency = this.dependencies[name];
      if (!dependency) {
        throw new Error(`Dependency ${name} not found`);
      }
      return dependency;
    }
  }
  
  module.exports = DependencyRegistry;
  