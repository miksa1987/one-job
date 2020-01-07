import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loginform from '../Loginform';
import { loginAndSetUserMock } from '../../../store/__mocks__/testHelper';

jest.mock('../../../store/store');

describe('Loginform', () => {
  afterEach(cleanup);

  test('Rendering is ok', () => {
    const component = render(<Loginform />);

    expect(component).toMatchSnapshot();
  });
  
  test('Form submit calls right functions', () => {
    const setView = jest.fn();
    const component = render(<Loginform setView={setView} />);
    const loginButton = component.container.querySelector('#log-in');

    fireEvent.click(loginButton);

    setTimeout(() => {
      expect(loginAndSetUserMock.mock.calls.length).toBe(1);
      expect(setView.mock.calls.length).toBe(1);
    }, 50);
  });
})