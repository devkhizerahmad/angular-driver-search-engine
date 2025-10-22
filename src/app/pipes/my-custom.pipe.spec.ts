import { MyCustomPipe } from "./my-custom.pipe";

describe('MyCustomPipePipe', () => {
  it('create an instance', () => {
    const pipe = new MyCustomPipe();
    expect(pipe).toBeTruthy();
  });
});
