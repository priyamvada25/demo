import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YourComponent from './YourComponent';

// Mock functions
const mockNavigatePage = jest.fn();
const mockRemoveQueryParamsFromURL = jest.fn();
const mockGetUIContextPath = jest.fn(() => '/ui-context');
const mockGetQueryParamByName = jest.fn();
const mockIsIpad = jest.fn(() => false);

// Mock the services used in your component
jest.mock('./domService', () => ({
  removeQueryParamsFromURL: mockRemoveQueryParamsFromURL,
  getUIContextPath: mockGetUIContextPath,
  isIpad: mockIsIpad
}));

jest.mock('./utils', () => ({
  getQueryParamByName: mockGetQueryParamByName
}));

// Mocking history object
const mockHistory = {
  navigatePage: mockNavigatePage
};

describe('YourComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to the indirect-order-confirmation page with refresh query parameter', () => {
    // Setup mocks for this test case
    mockGetQueryParamByName.mockReturnValue('1233');
    sessionStorage.setItem('path', '/some/path/indirect-order-confirmation');

    // Render the component
    render(<YourComponent history={mockHistory} />);

    // Assert that the navigatePage function was called with the correct URL
    expect(mockNavigatePage).toHaveBeenCalledWith('/ui-context/indirect-order-confirmation');

    // Optionally, assert that the removeQueryParamsFromURL was called
    expect(mockRemoveQueryParamsFromURL).toHaveBeenCalled();
  });
});
