
import { render } from "@testing-library/react";
// Importing the jest testing library
// import '@testing-library/jest-dom'
import TagDetail from "./TagDetail";
// import TagCard from "./TagCard";
 
// afterEach function runs after each test suite is executed
// afterEach(() => {
    
// })
 
it("renders without crashing", function() {
    render(<TagDetail />);
  });
  
  it("matches snapshot with no jobs", function() {
    const { asFragment } = render(<TagDetail />);
    expect(asFragment()).toMatchSnapshot();
  });