import { EuropeanDatePipe } from './european-date.pipe';

describe('EuropeanDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EuropeanDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('Return a valid value from "2022/09/03" to "03-09-2022"', () => {
    const pipe = new EuropeanDatePipe();    
    
    let date = '2022-09-03';
    let euDate = pipe.transform(date);

    expect(euDate).toEqual('03/09/2022');
  });

});
