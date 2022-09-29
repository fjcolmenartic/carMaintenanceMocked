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

const mockEvent = jasmine.createSpyObj('event', ['stopPropagation']);

describe('NumbersOnlyDirective', () => {
  let directive: NumbersOnlyDirective;
  
  it('should create an instance', () => {
    const directive = new NumbersOnlyDirective(mockElementNumeric);
    expect(directive).toBeTruthy();
  });

  it('should remove NON numeric characters from input if there are any', () => {
    directive = new NumbersOnlyDirective(mockElementNonNumeric);
    // directive.onInputChange(mockEvent as any);
    directive.onInputChange(mockEvent as any);
    const inputValue = directive['elRef'].nativeElement.value;

    expect(inputValue).toBe('829');
  });

});
