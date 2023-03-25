import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './Button';
import jest from 'jest-mock';

describe('<Button />', () => {
  it('Button can be rendered without crashing', () => {
    render(<Button>Click me</Button>);
  });

  it('Displays the children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('Passes the buttonType prop correctly', () => {
    const { container } = render(<Button buttonType="submit">Submit</Button>);
    expect(container.querySelector('button')).toHaveAttribute('type', 'submit');
  });

  it('Calls the buttonHandler prop when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button buttonHandler={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Applies the correct CSS class', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toHaveClass('button');
  });

  it('Works with different buttonType props', () => {
    // Submit button
    const { container: container1 } = render(
      <Button buttonType="submit">Submit</Button>
    );
    expect(container1.querySelector('button')).toHaveAttribute(
      'type',
      'submit'
    );

    // Reset button
    const { container: container2 } = render(
      <Button buttonType="reset">Reset</Button>
    );
    expect(container2.querySelector('button')).toHaveAttribute('type', 'reset');
  });

  it('Works correctly without buttonHandler prop', () => {
    render(<Button>Click me</Button>);
  });

  it('Works correctly without buttonType prop', () => {
    render(
      <Button buttonHandler={() => console.log('Button clicked!')}>
        Click me
      </Button>
    );
  });

  it('Works correctly without both buttonType and buttonHandler props', () => {
    render(<Button>Click me</Button>);
  });

  it('Works correctly without children prop', () => {
    render(<Button />);
  });
});
