import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateChanger from '../DateChanger';

import { setCurrentDateMock } from '../../../__mocks__/testHelper';
jest.mock('../../../store');

let date = [];

const renderAndGetComponentAndDate = () => {
  const component = render(<DateChanger />);
  const day = component.container.querySelector('#date-day');
  const month = component.container.querySelector('#date-month');
  const year = component.container.querySelector('#date-year');

  date = [ 
    Number(day.value), 
    Number(month.value), 
    Number(year.value)
  ];

  return [ component, day, month, year ];
}

describe('DateChanger', () => {
  afterEach(cleanup);

  test('Date is rendered', () => {
    const [ component, day, month, year ] = renderAndGetComponentAndDate();
    
    expect(day).toBeDefined();
    expect(month).toBeDefined();
    expect(year).toBeDefined();
  });

  test('Date can be changed backward and to current date', () => {
    const [ component, day ] = renderAndGetComponentAndDate();

    const previousDay = component.container.querySelector('#previous-day');
    fireEvent.click(previousDay);
    
    const currentDate = component.container.querySelector('#current-date');
    fireEvent.click(currentDate);

    expect(Number(day.value)).toBe(Number(date[0]));
  });
});