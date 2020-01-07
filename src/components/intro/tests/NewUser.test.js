import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewUser from '../NewUser';
import { createAndSetUserMock } from '../../../store/__mocks__/testHelper';

jest.mock('../../../store/store');

describe('NewUser', () => {
  afterEach(cleanup);

  test('Rendering is ok', () => {
    const component = render(<NewUser />);
    
    expect(component).toMatchSnapshot();
  });

  test('Form submit calls right functions', () => {
    const setView = jest.fn();
    const component = render(<NewUser setView={setView} />);
    const createButton = component.container.querySelector('#create-user');

    fireEvent.click(createButton);

    setTimeout(() => {
      expect(createAndSetUserMock.mock.calls.length).toBe(1);
      expect(setView.mock.calls.length).toBe(1);
    }, 50);
  });
})