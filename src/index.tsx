interface IType {
  name: string;
}

const a: IType = {
  name: 'Hello',
};


function b() {
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(a);
      resolve(1);
    }, 2000);
  });
}

b();
