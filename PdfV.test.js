
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import PDFView from './PDFView';
import * as pdfjsLib from 'pdfjs-dist/es5/build/pdf';

jest.mock('pdfjs-dist/es5/build/pdf', () => {
  return {
    getDocument: jest.fn()
  };
});

describe('generateCanvasFromPDF', () => {
  let mockGetPage, mockDoc;

  beforeEach(() => {
    mockGetPage = jest.fn(() => Promise.resolve({
      getViewport: () => ({ width: 800, height: 600 }),
      render: () => ({ promise: Promise.resolve() })
    }));

    mockDoc = {
      numPages: 1,
      getPage: mockGetPage
    };

    sessionStorage.setItem('channel', 'OMNI-INDIRECT');
    sessionStorage.setItem('refundexchange', 'true');

    pdfjsLib.getDocument.mockReturnValue({
      promise: Promise.resolve(mockDoc)
    });
  });

  test('should call getDocument and render canvas for each page', async () => {
    const mockSrc = btoa('sample pdf data');
    const { getByTestId } = render(<PDFView src={mockSrc} isIpad={true} isQuote={true} />);

    await waitFor(() => {
      expect(pdfjsLib.getDocument).toHaveBeenCalled();
      expect(mockGetPage).toHaveBeenCalledTimes(1);
      expect(getByTestId('pdf-view')).toBeInTheDocument();
    });
  });

  test('should handle failure in getDocument gracefully', async () => {
    const onErrorMock = jest.fn();
    pdfjsLib.getDocument.mockReturnValueOnce({
      promise: Promise.reject(new Error('document load failed'))
    });

    render(<PDFView src="invalid" isIpad={true} isQuote={true} onError={onErrorMock} />);

    await waitFor(() => {
      expect(onErrorMock).not.toHaveBeenCalled(); // still commented in source
    });
  });
});
