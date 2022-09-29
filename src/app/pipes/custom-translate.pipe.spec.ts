import { CustomTranslatePipe } from './custom-translate.pipe';

describe('(4) CustomTranslatePipe test', () => {
  // Default method - automatic
  it('create an instance', () => {
    const pipe = new CustomTranslatePipe();
    expect(pipe).toBeTruthy();
  });

  // Checking values
  it('Must return "** Debes ingresar email"', () => {
    const pipe = new CustomTranslatePipe();
    const transform = pipe.transform('STEP_1');
    expect(transform).toEqual('** Debes ingresar email');
  });

  it('Must return "** Resolver la operación matemática"', () => {
    const pipe = new CustomTranslatePipe();
    const transform = pipe.transform('STEP_2');
    expect(transform).toEqual('** Resolver la operación matemática');
  });

  // Checking on undefined values
  it('Must return "udefined"', () => {
    const pipe = new CustomTranslatePipe();
    const result = pipe.transform('STEP_0');
    expect(result).toEqual(undefined);
  });

});
