import { ElementRef } from '@angular/core';
import { NumbersOnlyDirective } from './numbers-only.directive';

class MockElementRef extends ElementRef {
  constructor(value: string) {
    super(null);
    this.nativeElement = { value };
  }
}

const mockElementNonNumeric = new MockElementRef('829dom');
const mockElementNumeric = new MockElementRef('829');

// const mockEvent = { stopPropagation: jest.fn() };
// const mockEvent = { preventDefault: jasmine.createSpy() };
// const mockEvent = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
const mockEvent = jasmine.createSpyObj('event', ['preventDefault']);

describe('NumbersOnlyDirective', () => {
  let directive: NumbersOnlyDirective;
  
  it('should create an instance', () => {
    const directive = new NumbersOnlyDirective(mockElementNumeric);
    expect(directive).toBeTruthy();
  });

  it('should NOT call stop propagation if the input only contains numbers', () => {
    directive = new NumbersOnlyDirective(mockElementNumeric);
    directive.onInputChange(mockEvent as any);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(0);
    // expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(0);
  });

  xit('should call stop propagation if the input NON contains numbers', () => {
    directive = new NumbersOnlyDirective(mockElementNonNumeric);
    directive.onInputChange(mockEvent as any);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    // expect(mockEvent.preventDefault).toHaveBeenCalled();


    // event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    // expect(event.preventDefault).toHaveBeenCalled();

  });

  xit('should remove NON numeric characters from input if there are ', () => {
    directive = new NumbersOnlyDirective(mockElementNonNumeric);
    directive.onInputChange(mockEvent as any);
    const inputValue = directive['elRef'].nativeElement.value;

    expect(inputValue).toBe('');
  });

});
