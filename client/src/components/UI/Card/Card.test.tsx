import Card from './Card';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('<Card />', () => {
  it('Card component can be rendered without crashing', () => {
    render(<Card>Card content</Card>);
  });

  it('Displays the children correctly', () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText('Card content')).toBeInTheDocument();
  });

  it('Applies the correct CSS classes', () => {
    const { container } = render(
      <Card classes="custom-class">Card content</Card>
    );
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('Works correctly with different values of the classes prop', () => {
    const { container: container1 } = render(
      <Card classes="class1">Card content</Card>
    );
    expect(container1.firstChild).toHaveClass('card');
    expect(container1.firstChild).toHaveClass('class1');

    const { container: container2 } = render(
      <Card classes="class2">Card content</Card>
    );
    expect(container2.firstChild).toHaveClass('card');
    expect(container2.firstChild).toHaveClass('class2');
  });

  it('Works correctly without the classes prop', () => {
    const { container } = render(<Card>Card content</Card>);
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).not.toHaveClass('custom-class');
  });

  it('Works correctly without the children prop', () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass('card');
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
