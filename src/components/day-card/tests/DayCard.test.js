import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DayCard from '../DayCard';

import { saveTodoMock } from '../../../__mocks__/testHelper';
jest.mock('../../../store');

describe('DayCard', () => {
  afterEach(cleanup);
  
  test('Everything gets rendered', () => {
    const component = render(<DayCard />);
    const oneJobText = component.container.querySelector('#one-job-text');
    const todoText = component.container.querySelector('#todo-text');
    const reflectText = component.container.querySelector('#reflect-text');

    expect(oneJobText).toHaveTextContent('What is your one job today?');
    expect(todoText).toHaveTextContent('test');
    expect(reflectText).toHaveTextContent('test');
  });

  test('Todo text gets saved(saveTodo is called)', () => {
    saveTodoMock.mockClear();
    const component = render(<DayCard />);
    
    const todoText = component.container.querySelector('#todo-text');
    const reflectText = component.container.querySelector('#reflect-text');

    fireEvent.click(todoText);
    fireEvent.change(todoText, { target: { value: 'changed' } });
    fireEvent.focus(reflectText);
    fireEvent.blur(todoText);

    expect(saveTodoMock.mock.calls.length).toBe(1);
  });
  
  test('Reflect text gets saved(saveTodo is called)', () => {
    saveTodoMock.mockClear();
    const component = render(<DayCard />);
    
    const todoText = component.container.querySelector('#todo-text');
    const reflectText = component.container.querySelector('#reflect-text');

    fireEvent.click(reflectText);
    fireEvent.change(reflectText, { target: { value: 'changed' } });
    fireEvent.focus(todoText);
    fireEvent.blur(reflectText);

    expect(saveTodoMock.mock.calls.length).toBe(1);
  });

  test('Set reminder time saves the todo', () => {
    saveTodoMock.mockClear();
    const component = render(<DayCard />);
    
    const timeHours = component.container.querySelector('#todo-time-hours');
    const setTime = component.container.querySelector('#todo-time-set');

    fireEvent.change(timeHours, { target: { value: 23 } });
    fireEvent.click(setTime);

    expect(saveTodoMock.mock.calls.length).toBe(1);
  });
});