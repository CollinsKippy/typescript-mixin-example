// 1. //////////////////
class OnlyName {
  name: string = '';
}

type ConstructorA = new (...args: any[]) => {};

function mixinAge<T extends ConstructorA>(base: T) {
  return class extends base {
    age: number = 0;
  };
}

const NameAgeClass = mixinAge(OnlyName);

const jack = new NameAgeClass();
jack.name = 'Jack';
jack.age = 25;

console.log(jack);

// 2. ////////////////////
class DeviceWithBasicLogging {
  name: string = '';

  constructor(name: string) {
    this.name = name;
  }

  log(s: string): void {
    console.log(s);
  }
}

type ConstructorB<T extends {}> = new (...args: any[]) => T;
type Loggable = ConstructorB<{ log: (s: string) => void }>;

function mixinNamedLogging<T extends Loggable>(base: T) {
  return class extends base {
    logWithName(name: string) {
      this.log('Hello there. ' + name);
    }
  };
}

const DeviceWithNamedLoggingClass = mixinNamedLogging(DeviceWithBasicLogging);
const newDevice = new DeviceWithNamedLoggingClass('Gadget A');
newDevice.logWithName(newDevice.name);

// 3. Pass in Anonymous Class /////////////////////////
function mixinAnonymous<T extends ConstructorB<{}>>(base: T) {
  return class extends base {};
}

const NoClass = mixinAnonymous(class {});
