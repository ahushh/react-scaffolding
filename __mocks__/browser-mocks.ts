const myGlobal: any = global;

const createMyStorage = () => ({
  removeItem: jest.fn(),
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn()
});


myGlobal.localStorage = createMyStorage();
myGlobal.sessionStorage = createMyStorage();


